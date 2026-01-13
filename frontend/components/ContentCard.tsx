'use client';
import { useState } from 'react';
import { Twitter, TrendingUp } from 'lucide-react';
import { formatUnits } from 'viem';

interface ContentCardProps {
  tokenId: number;
  creator: string;
  twitterUrl: string;
  contentType: number;
  totalShares: bigint;
  sharePrice: bigint;
  totalRevenue: bigint;
  onPurchase: (tokenId: number) => void;
}

const contentTypes = ['Tweet', 'Meme', 'Video', 'Other'];

export function ContentCard({
  tokenId,
  creator,
  twitterUrl,
  contentType,
  totalShares,
  sharePrice,
  totalRevenue,
  onPurchase
}: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const price = formatUnits(sharePrice, 6);
  const revenue = formatUnits(totalRevenue, 6);

  return (
    <div
      className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
            {contentTypes[contentType]}
          </span>
          <p className="text-sm text-gray-400 mt-2">
            {creator.slice(0, 6)}...{creator.slice(-4)}
          </p>
        </div>
        <Twitter className="w-5 h-5 text-blue-400" />
      </div>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg mb-4 block hover:text-purple-400 transition"
      >
        View Original Content →
      </a>

      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
        <span>📊 {totalShares.toString()} total shares</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div>
          <p className="text-xs text-gray-400">Share Price</p>
          <p className="text-xl font-bold text-purple-400">${price}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Total Revenue</p>
          <p className="text-lg font-bold text-green-400">${revenue}</p>
        </div>
      </div>

      {isHovered && (
        <button
          onClick={() => onPurchase(tokenId)}
          className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-medium hover:scale-105 transition"
        >
          Buy Shares
        </button>
      )}
    </div>
  );
}