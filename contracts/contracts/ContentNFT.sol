// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title ContentNFT
 * @dev Tokenizes viral content with fractional ownership
 */
contract ContentNFT is ERC1155, Ownable, ReentrancyGuard {
    uint256 private _currentTokenId;
    IERC20 public paymentToken; // USDT
    
    enum ContentType { Tweet, Meme, Video, Other }
    enum LicenseStatus { Pending, Approved, Rejected, Executed }
    
    struct ViralContent {
        uint256 tokenId;
        address creator;
        string contentHash; // IPFS hash
        string twitterUrl; // Original tweet/content URL
        ContentType contentType;
        uint256 totalShares; // e.g., 1000 shares
        uint256 sharePrice; // Price per share in USDT
        uint256 createdAt;
        uint256 totalRevenue; // Lifetime earnings
        bool isActive;
    }
    
    struct LicensingDeal {
        uint256 dealId;
        uint256 tokenId;
        address brand;
        uint256 offerAmount;
        string usageRights; // Description of how brand will use it
        uint256 duration; // License duration in days
        LicenseStatus status;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 createdAt;
        uint256 votingEndsAt;
    }
    
    // Storage
    mapping(uint256 => ViralContent) public contents;
    mapping(uint256 => LicensingDeal) public licensingDeals;
    mapping(uint256 => mapping(address => bool)) public hasVoted; // dealId => voter => voted
    
    uint256 private _currentDealId;
    
    // Revenue split percentages (basis points, 10000 = 100%)
    uint256 public constant CREATOR_SHARE = 4000; // 40%
    uint256 public constant SHAREHOLDER_SHARE = 4000; // 40%
    uint256 public constant PLATFORM_SHARE = 2000; // 20%
    
    // Events
    event ContentTokenized(uint256 indexed tokenId, address indexed creator, uint256 totalShares, uint256 sharePrice);
    event SharesPurchased(uint256 indexed tokenId, address indexed buyer, uint256 amount);
    event LicensingDealProposed(uint256 indexed dealId, uint256 indexed tokenId, address brand, uint256 amount);
    event VoteCast(uint256 indexed dealId, address indexed voter, bool support, uint256 weight);
    event DealExecuted(uint256 indexed dealId, uint256 indexed tokenId, uint256 amount);
    event RevenueDistributed(uint256 indexed tokenId, uint256 creatorAmount, uint256 shareholderAmount, uint256 platformAmount);
    
    constructor(address _paymentToken) ERC1155("") Ownable(msg.sender) {
        paymentToken = IERC20(_paymentToken);
    }
    
    /**
     * @dev Tokenize viral content
     */
    function tokenizeContent(
        string memory _contentHash,
        string memory _twitterUrl,
        ContentType _contentType,
        uint256 _totalShares,
        uint256 _sharePrice
    ) external returns (uint256) {
        require(_totalShares > 0, "Shares must be > 0");
        require(_sharePrice > 0, "Price must be > 0");
        
        uint256 newTokenId = _currentTokenId++;
        
        contents[newTokenId] = ViralContent({
            tokenId: newTokenId,
            creator: msg.sender,
            contentHash: _contentHash,
            twitterUrl: _twitterUrl,
            contentType: _contentType,
            totalShares: _totalShares,
            sharePrice: _sharePrice,
            createdAt: block.timestamp,
            totalRevenue: 0,
            isActive: true
        });
        
        // Mint 50% to creator, 50% available for sale
        uint256 creatorShares = _totalShares / 2;
        _mint(msg.sender, newTokenId, creatorShares, "");
        
        emit ContentTokenized(newTokenId, msg.sender, _totalShares, _sharePrice);
        
        return newTokenId;
    }
    
    /**
     * @dev Purchase shares of viral content
     */
    function purchaseShares(uint256 _tokenId, uint256 _amount) external nonReentrant {
        ViralContent storage content = contents[_tokenId];
        require(content.isActive, "Content not active");
        require(_amount > 0, "Amount must be > 0");
        
        uint256 totalCost = _amount * content.sharePrice;
        
        // Transfer USDT from buyer to creator
        require(
            paymentToken.transferFrom(msg.sender, content.creator, totalCost),
            "Payment failed"
        );
        
        // Mint shares to buyer
        _mint(msg.sender, _tokenId, _amount, "");
        
        emit SharesPurchased(_tokenId, msg.sender, _amount);
    }
    
    /**
     * @dev Brand proposes licensing deal
     */
    function proposeLicensingDeal(
        uint256 _tokenId,
        uint256 _offerAmount,
        string memory _usageRights,
        uint256 _duration
    ) external returns (uint256) {
        require(contents[_tokenId].isActive, "Content not active");
        require(_offerAmount > 0, "Offer must be > 0");
        
        uint256 newDealId = _currentDealId++;
        
        licensingDeals[newDealId] = LicensingDeal({
            dealId: newDealId,
            tokenId: _tokenId,
            brand: msg.sender,
            offerAmount: _offerAmount,
            usageRights: _usageRights,
            duration: _duration,
            status: LicenseStatus.Pending,
            votesFor: 0,
            votesAgainst: 0,
            createdAt: block.timestamp,
            votingEndsAt: block.timestamp + 7 days
        });
        
        emit LicensingDealProposed(newDealId, _tokenId, msg.sender, _offerAmount);
        
        return newDealId;
    }
    
    /**
     * @dev Shareholders vote on licensing deal
     */
    function voteOnDeal(uint256 _dealId, bool _support) external {
        LicensingDeal storage deal = licensingDeals[_dealId];
        require(deal.status == LicenseStatus.Pending, "Deal not pending");
        require(block.timestamp < deal.votingEndsAt, "Voting ended");
        require(!hasVoted[_dealId][msg.sender], "Already voted");
        
        uint256 voterShares = balanceOf(msg.sender, deal.tokenId);
        require(voterShares > 0, "No shares owned");
        
        hasVoted[_dealId][msg.sender] = true;
        
        if (_support) {
            deal.votesFor += voterShares;
        } else {
            deal.votesAgainst += voterShares;
        }
        
        emit VoteCast(_dealId, msg.sender, _support, voterShares);
    }
    
    /**
     * @dev Execute approved licensing deal
     */
    function executeDeal(uint256 _dealId) external nonReentrant {
        LicensingDeal storage deal = licensingDeals[_dealId];
        require(deal.status == LicenseStatus.Pending, "Deal not pending");
        require(block.timestamp >= deal.votingEndsAt, "Voting not ended");
        
        ViralContent storage content = contents[deal.tokenId];
        
        // Check if deal passed (simple majority)
        if (deal.votesFor > deal.votesAgainst) {
            deal.status = LicenseStatus.Approved;
            
            // Transfer payment from brand
            require(
                paymentToken.transferFrom(deal.brand, address(this), deal.offerAmount),
                "Payment failed"
            );
            
            // Distribute revenue
            _distributeRevenue(deal.tokenId, deal.offerAmount);
            
            deal.status = LicenseStatus.Executed;
            content.totalRevenue += deal.offerAmount;
            
            emit DealExecuted(_dealId, deal.tokenId, deal.offerAmount);
        } else {
            deal.status = LicenseStatus.Rejected;
        }
    }
    
    /**
     * @dev Internal function to distribute revenue
     */
    function _distributeRevenue(uint256 _tokenId, uint256 _amount) private {
        ViralContent storage content = contents[_tokenId];
        
        uint256 creatorAmount = (_amount * CREATOR_SHARE) / 10000;
        uint256 shareholderAmount = (_amount * SHAREHOLDER_SHARE) / 10000;
        uint256 platformAmount = (_amount * PLATFORM_SHARE) / 10000;
        
        // Pay creator
        require(paymentToken.transfer(content.creator, creatorAmount), "Creator payment failed");
        
        // Pay platform (owner)
        require(paymentToken.transfer(owner(), platformAmount), "Platform payment failed");
        
        // Shareholder amount stays in contract for claiming
        // In production, implement pro-rata claiming mechanism
        
        emit RevenueDistributed(_tokenId, creatorAmount, shareholderAmount, platformAmount);
    }
    
    /**
     * @dev Get content details
     */
    function getContent(uint256 _tokenId) external view returns (ViralContent memory) {
        return contents[_tokenId];
    }
    
    /**
     * @dev Get licensing deal details
     */
    function getDeal(uint256 _dealId) external view returns (LicensingDeal memory) {
        return licensingDeals[_dealId];
    }
    
    /**
     * @dev Update URI
     */
    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }
}