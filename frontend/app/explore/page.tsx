'use client';
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ContentCard } from '@/components/ContentCard';
import { PurchaseModal } from '@/components/PurchaseModal';
import { useGetContent } from '@/hooks/useContentNFT';
import { Search, Filter, TrendingUp } from 'lucide-react';

export default function ExplorePage() {
  const [selectedTokenId, setSelectedTokenId] = useState<number | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // In production, you'd fetch all content from a subgraph or backend
  // For now, we'll show a few example tokens
  const tokenIds = [0, 1, 2, 3, 4]; // Adjust based on deployed tokens

  const handlePurchase = (tokenId: number) => {
    setSelectedTokenId(tokenId);
    setIsPurchaseModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore Viral Content</h1>
          <p className="text-gray-400">
            Invest in trending content and earn yield from brand licensing
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Volume', value: '$1.2M', icon: '💰' },
            { label: 'Active Content', value: '247', icon: '🔥' },
            { label: 'Avg. ROI', value: '127%', icon: '📈' },
            { label: 'Total Creators', value: '1,284', icon: '👥' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by creator, content type..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="0">Tweets</option>
            <option value="1">Memes</option>
            <option value="2">Videos</option>
          </select>

          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Trending Badge */}
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <span className="text-lg font-bold">Trending Now</span>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {tokenIds.map((tokenId) => (
            <ContentLoader
              key={tokenId}
              tokenId={tokenId}
              onPurchase={handlePurchase}
            />
          ))}
        </div>

        {/* Empty State (if no results) */}
        {tokenIds.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No content found</h3>
            <p className="text-gray-400 mb-6">Be the first to tokenize viral content!</p>
            <button
              onClick={() => window.location.href = '/create'}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-bold hover:scale-105 transition"
            >
              Tokenize Content
            </button>
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      {selectedTokenId !== null && (
        <PurchaseModalWrapper
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
          tokenId={selectedTokenId}
        />
      )}
    </div>
  );
}

// Helper component to load individual content
function ContentLoader({ 
  tokenId, 
  onPurchase 
}: { 
  tokenId: number; 
  onPurchase: (id: number) => void;
}) {
  const { content, isLoading, error } = useGetContent(tokenId);

  if (isLoading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-pulse">
        <div className="h-4 bg-white/10 rounded mb-4"></div>
        <div className="h-20 bg-white/10 rounded mb-4"></div>
        <div className="h-4 bg-white/10 rounded"></div>
      </div>
    );
  }

  if (error || !content) {
    return null; // Skip if content doesn't exist yet
  }

  return (
    <ContentCard
      tokenId={tokenId}
      creator={content.creator}
      twitterUrl={content.twitterUrl}
      contentType={Number(content.contentType)}
      totalShares={content.totalShares}
      sharePrice={content.sharePrice}
      totalRevenue={content.totalRevenue}
      onPurchase={onPurchase}
    />
  );
}

// Wrapper to load content data for modal
function PurchaseModalWrapper({
  isOpen,
  onClose,
  tokenId,
}: {
  isOpen: boolean;
  onClose: () => void;
  tokenId: number;
}) {
  const { content } = useGetContent(tokenId);

  if (!content) return null;

  return (
    <PurchaseModal
      isOpen={isOpen}
      onClose={onClose}
      tokenId={tokenId}
      sharePrice={content.sharePrice}
      tokenName={`Token #${tokenId}`}
    />
  );
}