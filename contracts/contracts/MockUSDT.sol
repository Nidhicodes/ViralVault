// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MockUSDT
 * @dev Mock USDT for testing on testnet
 */
contract MockUSDT is ERC20, Ownable {
    constructor() ERC20("Mock USDT", "USDT") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10**6); // 1M USDT
    }

    function decimals() public pure override returns (uint8) {
        return 6; // USDT has 6 decimals
    }

    // Faucet for testnet
    function faucet() external {
        _mint(msg.sender, 1000 * 10**6); // 1000 USDT
    }
    
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}