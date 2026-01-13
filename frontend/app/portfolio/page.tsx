'use client';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useAccount } from 'wagmi';
import { useUSDTBalance, useClaimFaucet } from '@/hooks/useContentNFT';
import { MOCK_CONTENT, type ContentData } from '@/lib/mockData';
import { formatUnits } from 'viem';
import { Wallet, TrendingUp, DollarSign, Gift, ExternalLink, User, Image as ImageIcon } from 'lucide-react';

export default function PortfolioPage() {
  const { address, isConnected } = useAccount();
  const { balance: usdtBalance } = useUSDTBalance(address);
  const { claim, isPending: isClaiming } = useClaimFaucet();

  // Filter content created by the user and content they've "invested" in from mock data
  const createdContent = MOCK_CONTENT.filter(c => c.creator.toLowerCase() === address?.toLowerCase());

  // For demo: Assume user owns shares in content they didn't create
  const holdings = MOCK_CONTENT.filter(c => c.creator.toLowerCase() !== address?.toLowerCase());

  const handleClaimFaucet = async () => {
    try {
      await claim();
    } catch (error) {
      console.error('Faucet claim failed:', error);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-8 py-20 text-center">
          <Wallet className="w-20 h-20 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-8">
            Connect your wallet to view your portfolio and manage your investments
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Portfolio</h1>
          <p className="text-gray-400">
            Track your investments and earnings from viral content
          </p>
        </div>

        {/* Wallet Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-300">USDT Balance</span>
            </div>
            <div className="text-3xl font-bold">
              ${usdtBalance ? Number(formatUnits(usdtBalance, 6)).toFixed(2) : '0.00'}
            </div>
            <button
              onClick={handleClaimFaucet}
              disabled={isClaiming}
              className="mt-4 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm hover:bg-purple-500/30 transition flex items-center gap-2"
            >
              <Gift className="w-4 h-4" />
              {isClaiming ? 'Claiming...' : 'Claim Testnet USDT'}
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-300">Total Invested</span>
            </div>
            <div className="text-3xl font-bold">$450.00</div>
            <div className="text-sm text-gray-400 mt-2">Across {holdings.length} assets</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-300">Total Earnings</span>
            </div>
            <div className="text-3xl font-bold text-green-400">+$84.50</div>
            <div className="text-sm text-gray-400 mt-2">+18.7% ROI</div>
          </div>
        </div>

        {/* Holdings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><User /> My Holdings</h2>
          
          {holdings.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">No investments yet</h3>
              <p className="text-gray-400 mb-6">
                Start investing in viral content to see your portfolio here
              </p>
              <button
                onClick={() => window.location.href = '/explore'}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-bold hover:scale-105 transition"
              >
                Explore Content
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {holdings.map((content) => (
                <HoldingCard key={content.tokenId} content={content} />
              ))}
            </div>
          )}
        </div>

        {/* Created Content */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><ImageIcon /> My Created Content</h2>
          {createdContent.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">No content created yet</h3>
              <p className="text-gray-400 mb-6">
                Tokenize your viral content and start earning
              </p>
              <button
                onClick={() => window.location.href = '/create'}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-bold hover:scale-105 transition"
              >
                Tokenize Content
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {createdContent.map((content) => (
                <HoldingCard key={content.tokenId} content={content} isCreatorView={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Updated component to display individual holding from mock data
function HoldingCard({ content, isCreatorView = false }: { content: ContentData; isCreatorView?: boolean }) {
  // Mock balance for demo purposes
  const balance = isCreatorView ? content.totalShares / 2n : BigInt(Math.floor(Math.random() * 100) + 10);

  const sharePrice = formatUnits(content.sharePrice, 6);
  const totalValue = (Number(balance) * Number(sharePrice)).toFixed(2);
  const totalRevenue = formatUnits(content.totalRevenue, 6);
  const sharePercentage = ((Number(balance) / Number(content.totalShares)) * 100).toFixed(2);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-sm text-gray-400 mb-1">Token #{content.tokenId}</div>
          <a
            href={content.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
          >
            View Original <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
          {['Tweet', 'Meme', 'Video', 'Other'][Number(content.contentType)]}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">{isCreatorView ? 'Creator Shares' : 'Shares Owned'}</span>
          <span className="font-bold">{balance.toString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Ownership</span>
          <span className="font-bold text-purple-400">{sharePercentage}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Current Value</span>
          <span className="font-bold">${totalValue}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-white/10">
          <span className="text-sm text-gray-400">Content Revenue</span>
          <span className="font-bold text-green-400">${totalRevenue}</span>
        </div>
      </div>

      <button className="w-full px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition">
        View Analytics (Coming Soon)
      </button>
    </div>
  );
}