// frontend/lib/mockData.ts
// Use this until you have real on-chain data

export interface ContentData {
  tokenId: number;
  creator: string;
  twitterUrl: string;
  contentType: number;
  totalShares: bigint;
  sharePrice: bigint;
  totalRevenue: bigint;
  createdAt: number;
  description: string;
  imageUrl: string;
}

// Seed this with your test data after tokenizing
export const MOCK_CONTENT: ContentData[] = [
  {
    tokenId: 0,
    creator: '0x3a7F2E21F2475A2A3297A42606555234A51fB274', // Example creator address
    twitterUrl: 'https://twitter.com/VitalikButerin/status/15882522 Vitalik Tweet',
    contentType: 0, // Tweet
    totalShares: BigInt(1000),
    sharePrice: BigInt(5000000), // $5.00
    totalRevenue: BigInt(12500000000), // $12,500
    createdAt: Date.now() - 86400000 * 3, // 3 days ago
    description: 'Vitalik Buterin on the future of Ethereum scaling solutions.',
    imageUrl: '/images/content-0.jpg',
  },
  {
    tokenId: 1,
    creator: '0x4B5418A3f5B34e320d41E959141617D5A8527a29', // Example creator address
    twitterUrl: 'https://twitter.com/cobie/status/163356027 Cobie on Market Cycles',
    contentType: 0, // Tweet
    totalShares: BigInt(2000),
    sharePrice: BigInt(2500000), // $2.50
    totalRevenue: BigInt(5000000000), // $5,000
    createdAt: Date.now() - 86400000 * 5, // 5 days ago
    description: 'Cobie shares his wisdom on navigating crypto market cycles.',
    imageUrl: '/images/content-1.jpg',
  },
  {
    tokenId: 2,
    creator: '0x9C8B525b29e7163E20bBfA2E121A79bA8e8b8B28', // Example creator address
    twitterUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ Classic Meme Video',
    contentType: 2, // Video
    totalShares: BigInt(5000),
    sharePrice: BigInt(1000000), // $1.00
    totalRevenue: BigInt(25000000000), // $25,000
    createdAt: Date.now() - 86400000 * 10, // 10 days ago
    description: 'A legendary video that became a cornerstone of internet culture.',
    imageUrl: '/images/content-2.jpg',
  },
  {
    tokenId: 3,
    creator: '0x3a7F2E21F2475A2A3297A42606555234A51fB274', // Example creator address
    twitterUrl: 'https://knowyourmeme.com/memes/distracted-boyfriend Distracted Boyfriend Meme',
    contentType: 1, // Meme
    totalShares: BigInt(1000),
    sharePrice: BigInt(10000000), // $10.00
    totalRevenue: BigInt(100000000000), // $100,000
    createdAt: Date.now() - 86400000 * 2, // 2 days ago
    description: 'The iconic "Distracted Boyfriend" stock photo that took over the internet.',
    imageUrl: '/images/content-3.jpg',
  },
  {
    tokenId: 4,
    creator: '0x4B5418A3f5B34e320d41E959141617D5A8527a29', // Example creator address
    twitterUrl: 'https://twitter.com/cdixon/status/14479951 Chris Dixon on Web3',
    contentType: 0, // Tweet
    totalShares: BigInt(1500),
    sharePrice: BigInt(3000000), // $3.00
    totalRevenue: BigInt(9000000000), // $9,000
    createdAt: Date.now() - 86400000 * 7, // 7 days ago
    description: 'Chris Dixon explains the mental models of Web3 in a viral thread.',
    imageUrl: '/images/content-4.jpg',
  },
  {
    tokenId: 5,
    creator: '0x9C8B525b29e7163E20bBfA2E121A79bA8e8b8B28', // Example creator address
    twitterUrl: 'https://knowyourmeme.com/memes/woman-yelling-at-a-cat Woman Yelling at Cat',
    contentType: 1, // Meme
    totalShares: BigInt(2500),
    sharePrice: BigInt(4000000), // $4.00
    totalRevenue: BigInt(50000000000), // $50,000
    createdAt: Date.now() - 86400000 * 1, // 1 day ago
    description: 'The hilarious "Woman Yelling at a Cat" meme, a modern classic.',
    imageUrl: '/images/content-5.jpg',
  },
];

// Helper to get all content
export function getAllContent(): ContentData[] {
  return MOCK_CONTENT;
}

// Helper to get single content
export function getContentById(tokenId: number): ContentData | undefined {
  return MOCK_CONTENT.find(c => c.tokenId === tokenId);
}

// Helper to filter by type
export function getContentByType(type: number): ContentData[] {
  return MOCK_CONTENT.filter(c => c.contentType === type);
}