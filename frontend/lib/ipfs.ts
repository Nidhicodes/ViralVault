// frontend/lib/ipfs.ts
// Mock IPFS for hackathon demo
// Replace with real Pinata later

export async function uploadToIPFS(file: File): Promise<string> {
  // For demo: generate fake IPFS hash
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  const fakeHash = `Qm${timestamp}${random}`;

  // In production, you'd do:
  // const pinata = new PinataSDK({ pinataJwt: process.env.PINATA_JWT });
  // const upload = await pinata.upload.file(file);
  // return upload.IpfsHash;

  console.log('📦 Mock IPFS upload:', fakeHash);
  return fakeHash;
}

export async function uploadJSONToIPFS(data: object): Promise<string> {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  const fakeHash = `Qm${timestamp}${random}`;

  console.log('📦 Mock JSON upload:', fakeHash, data);
  return fakeHash;
}

export function getIPFSUrl(hash: string): string {
  // If you have real hashes later, use:
  // return `https://gateway.pinata.cloud/ipfs/${hash}`;

  // For demo, return placeholder
  return `/images/placeholder.jpg`;
}
