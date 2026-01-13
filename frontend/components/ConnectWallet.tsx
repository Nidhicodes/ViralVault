// frontend/hooks/useContentNFT.ts
import { useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS, CONTENT_NFT_ABI, MOCK_USDT_ABI } from '@/config/wagmi';
import { parseUnits } from 'viem';

export function useTokenizeContent() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const tokenize = async (
    contentHash: string,
    twitterUrl: string,
    contentType: number,
    totalShares: number,
    sharePrice: string
  ) => {
    return writeContract({
      address: CONTRACTS.CONTENT_NFT,
      abi: CONTENT_NFT_ABI,
      functionName: 'tokenizeContent',
      args: [
        contentHash,
        twitterUrl,
        contentType,
        BigInt(totalShares),
        parseUnits(sharePrice, 6) // USDT has 6 decimals
      ]
    });
  };

  return { 
    tokenize, 
    isPending, 
    isConfirming, 
    isSuccess, 
    error,
    hash 
  };
}

export function usePurchaseShares() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const purchase = async (tokenId: number, amount: number) => {
    return writeContract({
      address: CONTRACTS.CONTENT_NFT,
      abi: CONTENT_NFT_ABI,
      functionName: 'purchaseShares',
      args: [BigInt(tokenId), BigInt(amount)]
    });
  };

  return { purchase, isPending, isConfirming, isSuccess, error, hash };
}

export function useGetContent(tokenId: number) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACTS.CONTENT_NFT,
    abi: CONTENT_NFT_ABI,
    functionName: 'getContent',
    args: [BigInt(tokenId)],
  });

  return { content: data, isLoading, error, refetch };
}

export function useGetBalance(address: `0x${string}` | undefined, tokenId: number) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACTS.CONTENT_NFT,
    abi: CONTENT_NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(tokenId)] : undefined,
  });

  return { balance: data, isLoading, error, refetch };
}

// USDT Hooks
export function useApproveUSDT() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const approve = async (amount: string) => {
    return writeContract({
      address: CONTRACTS.MOCK_USDT,
      abi: MOCK_USDT_ABI,
      functionName: 'approve',
      args: [CONTRACTS.CONTENT_NFT, parseUnits(amount, 6)]
    });
  };

  return { approve, isPending, isConfirming, isSuccess, error };
}

export function useUSDTBalance(address: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACTS.MOCK_USDT,
    abi: MOCK_USDT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  return { balance: data, isLoading, error, refetch };
}

export function useClaimFaucet() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const claim = async () => {
    return writeContract({
      address: CONTRACTS.MOCK_USDT,
      abi: MOCK_USDT_ABI,
      functionName: 'faucet',
    });
  };

  return { claim, isPending, isConfirming, isSuccess, error };
}