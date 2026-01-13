'use client';
import Link from 'next/link';
import { ConnectWallet } from './ConnectWallet';
import { Zap } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-black/50 backdrop-blur">
      <Link href="/" className="flex items-center gap-2">
        <Zap className="w-8 h-8 text-purple-400" />
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          ViralVault
        </span>
      </Link>
      <div className="flex items-center gap-8">
        <Link href="/explore" className="hover:text-purple-400 transition">
          Explore
        </Link>
        <Link href="/create" className="hover:text-purple-400 transition">
          Create
        </Link>
        <Link href="/portfolio" className="hover:text-purple-400 transition">
          Portfolio
        </Link>
        <ConnectWallet />
      </div>
    </nav>
  );
}
