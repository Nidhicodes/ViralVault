"use client"
import React, { useState } from 'react';
import { TrendingUp, Zap, DollarSign, Users, Twitter, Share2, ChevronRight } from 'lucide-react';

export default function ViralVaultLanding() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const trendingContent = [
    {
      id: 1,
      type: 'Tweet',
      creator: '@cryptoEmma',
      content: 'Just turned my viral thread into an asset...',
      views: '12.4M',
      shares: 1000,
      price: '$2.50',
      change: '+124%',
      revenue: '$8,450'
    },
    {
      id: 2,
      type: 'Meme',
      creator: '@memeKing',
      content: 'Mantle to the moon 🚀',
      views: '8.2M',
      shares: 750,
      price: '$1.80',
      change: '+89%',
      revenue: '$5,200'
    },
    {
      id: 3,
      type: 'Video',
      creator: '@techReviewer',
      content: 'Why Web3 will change everything',
      views: '5.1M',
      shares: 500,
      price: '$3.20',
      change: '+156%',
      revenue: '$12,100'
    }
  ];

  const stats = [
    { label: 'Total Volume', value: '$1.2M', icon: DollarSign },
    { label: 'Active Creators', value: '2,847', icon: Users },
    { label: 'Content Tokenized', value: '12,439', icon: Share2 },
    { label: 'Avg. ROI', value: '127%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Zap className="w-8 h-8 text-purple-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            ViralVault
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-purple-400 transition">Explore</a>
          <a href="#" className="hover:text-purple-400 transition">Create</a>
          <a href="#" className="hover:text-purple-400 transition">Invest</a>
          <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-medium hover:scale-105 transition">
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm mb-6">
            🔥 Built on Mantle Network • Ultra-low fees
          </div>
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Turn Your{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Viral Content
            </span>
            <br />
            Into Tradeable Assets
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Tokenize your tweets, memes, and videos. Let fans invest in your success.
            Earn real yield from brand licensing deals.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-bold text-lg hover:scale-105 transition flex items-center gap-2">
              Tokenize Content
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border-2 border-white/20 rounded-full font-bold text-lg hover:bg-white/10 transition">
              Browse Opportunities
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-8 py-8 border-y border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <stat.icon className="w-5 h-5 text-purple-400" />
                <span className="text-3xl font-bold">{stat.value}</span>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Content */}
      <section className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">🔥 Trending Now</h2>
            <button className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {trendingContent.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition cursor-pointer"
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                      {item.type}
                    </span>
                    <p className="text-sm text-gray-400 mt-2">{item.creator}</p>
                  </div>
                  <Twitter className="w-5 h-5 text-blue-400" />
                </div>
                
                <p className="text-lg mb-4">{item.content}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span>👀 {item.views} views</span>
                  <span>📊 {item.shares} shares sold</span>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xs text-gray-400">Share Price</p>
                    <p className="text-xl font-bold text-purple-400">{item.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">24h Change</p>
                    <p className="text-lg font-bold text-green-400">{item.change}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400">Total Revenue</p>
                  <p className="text-lg font-bold">{item.revenue}</p>
                </div>
                
                {hoveredCard === item.id && (
                  <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-medium hover:scale-105 transition">
                    Buy Shares
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-8 py-16 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Tokenize</h3>
              <p className="text-gray-400">
                Upload your viral content and mint it as fractional NFTs. You keep 50%, sell 50% to fans.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Fans Invest</h3>
              <p className="text-gray-400">
                Your community buys shares starting at $1. They become stakeholders in your content's success.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Earn Yield</h3>
              <p className="text-gray-400">
                When brands license your content, revenue splits automatically. 40% you, 40% shareholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Turn Viral Into Value?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 2,847 creators already earning from their content
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-bold text-lg hover:scale-105 transition">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-purple-400" />
            <span className="font-bold">ViralVault</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-purple-400">Docs</a>
            <a href="#" className="hover:text-purple-400">Twitter</a>
            <a href="#" className="hover:text-purple-400">Discord</a>
            <a href="#" className="hover:text-purple-400">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}