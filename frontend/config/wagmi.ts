import { http, createConfig } from 'wagmi';
import { mantleSepoliaTestnet, mantle } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// Mantle Sepolia custom chain (if not in wagmi)
export const mantleSepolia = {
  id: 5003,
  name: 'Mantle Sepolia Testnet',
  network: 'mantle-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'MNT',
    symbol: 'MNT',
  },
  rpcUrls: {
    default: { http: ['https://rpc.sepolia.mantle.xyz'] },
    public: { http: ['https://rpc.sepolia.mantle.xyz'] },
  },
  blockExplorers: {
    default: { 
      name: 'Mantlescan', 
      url: 'https://sepolia.mantlescan.xyz' 
    },
  },
  testnet: true,
} as const;

export const config = createConfig({
  chains: [mantleSepolia, mantle],
  connectors: [
    injected(),
    walletConnect({ 
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '' 
    }),
  ],
  transports: {
    [mantleSepolia.id]: http(),
    [mantle.id]: http(),
  },
});

// Contract addresses (update after deployment)
export const CONTRACTS = {
  CONTENT_NFT: process.env.NEXT_PUBLIC_CONTENT_NFT_ADDRESS || '0x',
  MOCK_USDT: process.env.NEXT_PUBLIC_MOCK_USDT_ADDRESS || '0x',
} as const;

// ABIs
export const CONTENT_NFT_ABI = [
  {
    "inputs": [
      {"internalType": "string","name": "_contentHash","type": "string"},
      {"internalType": "string","name": "_twitterUrl","type": "string"},
      {"internalType": "uint8","name": "_contentType","type": "uint8"},
      {"internalType": "uint256","name": "_totalShares","type": "uint256"},
      {"internalType": "uint256","name": "_sharePrice","type": "uint256"}
    ],
    "name": "tokenizeContent",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256","name": "_tokenId","type": "uint256"},
      {"internalType": "uint256","name": "_amount","type": "uint256"}
    ],
    "name": "purchaseShares",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],
    "name": "getContent",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256","name": "tokenId","type": "uint256"},
          {"internalType": "address","name": "creator","type": "address"},
          {"internalType": "string","name": "contentHash","type": "string"},
          {"internalType": "string","name": "twitterUrl","type": "string"},
          {"internalType": "uint8","name": "contentType","type": "uint8"},
          {"internalType": "uint256","name": "totalShares","type": "uint256"},
          {"internalType": "uint256","name": "sharePrice","type": "uint256"},
          {"internalType": "uint256","name": "createdAt","type": "uint256"},
          {"internalType": "uint256","name": "totalRevenue","type": "uint256"},
          {"internalType": "bool","name": "isActive","type": "bool"}
        ],
        "internalType": "struct ContentNFT.ViralContent",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address","name": "account","type": "address"},
      {"internalType": "uint256","name": "id","type": "uint256"}
    ],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"},
      {"indexed": true,"internalType": "address","name": "creator","type": "address"},
      {"indexed": false,"internalType": "uint256","name": "totalShares","type": "uint256"},
      {"indexed": false,"internalType": "uint256","name": "sharePrice","type": "uint256"}
    ],
    "name": "ContentTokenized",
    "type": "event"
  },
] as const;

export const MOCK_USDT_ABI = [
  {
    "inputs": [],
    "name": "faucet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address","name": "spender","type": "address"},
      {"internalType": "uint256","name": "amount","type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool","name": "","type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "account","type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
] as const;