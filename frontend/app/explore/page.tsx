'use client';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ContentCard } from '@/components/ContentCard';
import { PurchaseModal } from '@/components/PurchaseModal';
import { getAllContent, getContentById, type ContentData } from '@/lib/mockData';
import { Search, Filter } from 'lucide-react';

export default function ExplorePage() {
  const [selectedContent, setSelectedContent] = useState<ContentData | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Get all content
  const allContent = getAllContent();

  // Filter content
  const filteredContent = allContent.filter(content => {
    const matchesType = filterType === 'all' || content.contentType === Number(filterType);
    const matchesSearch = content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.twitterUrl.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handlePurchase = (tokenId: number) => {
    const content = getContentById(tokenId);
    if (content) {
      setSelectedContent(content);
      setIsPurchaseModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore Viral Content</h1>
          <p className="text-gray-400">
            Invest in trending content and earn yield from brand licensing
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-2xl font-bold">$1.2M</div>
            <div className="text-sm text-gray-400">Total Volume</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-2xl font-bold">{allContent.length}</div>
            <div className="text-sm text-gray-400">Active Content</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-2xl mb-2">📈</div>
            <div className="text-2xl font-bold">127%</div>
            <div className="text-sm text-gray-400">Avg. ROI</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-2xl font-bold">1,284</div>
            <div className="text-sm text-gray-400">Total Creators</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by creator, content..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="0">Tweets</option>
            <option value="1">Memes</option>
            <option value="2">Videos</option>
          </select>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filteredContent.map((content) => (
            <ContentCard
              key={content.tokenId}
              tokenId={content.tokenId}
              creator={content.creator}
              twitterUrl={content.twitterUrl}
              contentType={content.contentType}
              totalShares={content.totalShares}
              sharePrice={content.sharePrice}
              totalRevenue={content.totalRevenue}
              onPurchase={handlePurchase}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredContent.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No content found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      {selectedContent && (
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
          tokenId={selectedContent.tokenId}
          sharePrice={selectedContent.sharePrice}
          tokenName={`Token #${selectedContent.tokenId}`}
        />
      )}
    </div>
  );
}