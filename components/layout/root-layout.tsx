"use client";

import Link from 'next/link';
import MainNav from "@/components/main-nav";
import { Sidebar } from "@/components/sidebar";
import Footer from "@/components/footer";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-[#f8fafc]">
      {/* Glass Header */}
      <header className="fixed top-0 w-full bg-[#0f172a]/95 backdrop-blur-lg border-b border-[rgba(255,255,255,0.1)] z-30 h-24">
        <div className="w-full px-6 h-full flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <div className="w-14">
              <Sidebar />
            </div>
            <Link href="/" className="text-6xl font-bold transition-all duration-300 hover:scale-105 group">
              <span className="text-[#ff6b6b] tracking-tight group-hover:text-[#ffd93d] transition-colors">wed</span>
              <span className="text-[#ffd93d] tracking-tight group-hover:text-[#ff6b6b] transition-colors">space</span>
            </Link>
          </div>

          {/* Right Section */}
          <MainNav />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24">
        {children}
      </main>

      <Footer />
    </div>
  );
}
