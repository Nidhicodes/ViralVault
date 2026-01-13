'use client';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useTokenizeContent } from '@/hooks/useContentNFT';
import { useAccount } from 'wagmi';
import { Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function CreatePage() {
  const { address, isConnected } = useAccount();
  const { tokenize, isPending, isConfirming, isSuccess, error } = useTokenizeContent();

  const [formData, setFormData] = useState({
    twitterUrl: '',
    contentType: '0', // 0=Tweet, 1=Meme, 2=Video
    totalShares: '1000',
    sharePrice: '1.00',
  });

  const [contentHash, setContentHash] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // In production: upload content screenshot to IPFS here
      const mockHash = `Qm${Date.now()}`; // Mock IPFS hash
      setContentHash(mockHash);

      await tokenize(
        mockHash,
        formData.twitterUrl,
        Number(formData.contentType),
        Number(formData.totalShares),
        formData.sharePrice
      );
    } catch (err) {
      console.error('Tokenization failed:', err);
    }
  };

  const estimatedRaise = (Number(formData.totalShares) / 2 * Number(formData.sharePrice)).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Tokenize Your Viral Content</h1>
          <p className="text-gray-400">
            Turn your tweets, memes, and videos into tradeable assets
          </p>
        </div>

        {!isConnected ? (
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-6 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <p className="text-lg">Please connect your wallet to tokenize content</p>
          </div>
        ) : isSuccess ? (
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Content Tokenized! 🎉</h2>
            <p className="text-gray-300 mb-6">
              Your content has been successfully tokenized as an NFT.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/explore'}
                className="px-6 py-3 bg-purple-500 rounded-lg hover:bg-purple-600 transition"
              >
                View in Marketplace
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
              >
                Tokenize Another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Content Type */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <label className="block text-sm font-medium mb-3">Content Type</label>
              <div className="grid grid-cols-3 gap-4">
                {['Tweet', 'Meme', 'Video'].map((type, idx) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, contentType: idx.toString() })}
                    className={`p-4 rounded-lg border-2 transition ${
                      formData.contentType === idx.toString()
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      {idx === 0 ? '🐦' : idx === 1 ? '😂' : '🎥'}
                    </div>
                    <p className="font-medium">{type}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Twitter URL */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <label className="block text-sm font-medium mb-3">Content URL</label>
              <input
                type="url"
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="https://twitter.com/username/status/123456"
                required
              />
              <p className="text-xs text-gray-400 mt-2">
                Link to your original content (Twitter, etc.)
              </p>
            </div>

            {/* Share Configuration */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Share Configuration</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Total Shares</label>
                  <input
                    type="number"
                    value={formData.totalShares}
                    onChange={(e) => setFormData({ ...formData, totalShares: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-500 focus:outline-none"
                    min="100"
                    step="100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price per Share (USDT)</label>
                  <input
                    type="number"
                    value={formData.sharePrice}
                    onChange={(e) => setFormData({ ...formData, sharePrice: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-purple-500 focus:outline-none"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">You receive (50%)</span>
                  <span className="font-bold">{Number(formData.totalShares) / 2} shares</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">For sale (50%)</span>
                  <span className="font-bold">{Number(formData.totalShares) / 2} shares</span>
                </div>
                <div className="flex justify-between items-center pt-2 mt-2 border-t border-white/20">
                  <span className="text-sm text-gray-300">Estimated raise</span>
                  <span className="text-xl font-bold text-green-400">${estimatedRaise}</span>
                </div>
              </div>
            </div>

            {/* Revenue Split Info */}
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-3">💰 Revenue Distribution</h3>
              <p className="text-sm text-gray-300 mb-4">
                When brands license your content, revenue splits automatically:
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Creator (You)</span>
                  <span className="font-bold">40%</span>
                </div>
                <div className="flex justify-between">
                  <span>Shareholders (Fans)</span>
                  <span className="font-bold">40%</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span className="font-bold">20%</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending || isConfirming}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-bold text-lg hover:scale-105 transition disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
            >
              {isPending || isConfirming ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  {isPending ? 'Confirm in Wallet...' : 'Processing...'}
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Tokenize Content
                </>
              )}
            </button>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 text-sm">
                  {error.message || 'Transaction failed. Please try again.'}
                </p>
              </div>
            )}

            <p className="text-xs text-gray-400 text-center">
              By tokenizing, you agree that you own the rights to this content
            </p>
          </form>
        )}
      </div>
    </div>
  );
}