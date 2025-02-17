"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  Home,
  Search,
  Building2,
  Users,
  Settings,
  LogOut
} from 'lucide-react';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Handle clicks outside the sidebar
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar-panel');
      const trigger = document.getElementById('sidebar-trigger');
      
      if (isOpen && 
          sidebar && 
          trigger && 
          !sidebar.contains(event.target as Node) && 
          !trigger.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
          
      {/* Sidebar panel */}
      <div 
        id="sidebar-panel"
        className={`fixed left-0 top-0 h-screen w-[280px] sm:w-[320px] bg-[#0f172a] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: '#0f172a' }}
      >
        <div className="flex flex-col h-full" style={{ backgroundColor: '#0f172a' }}>
          {/* Logo Section */}
          <div className="px-8 py-7 border-b border-[rgba(255,255,255,0.1)] bg-[#0f172a]">
            <div className="flex justify-end pr-6">
              <Link href="/" className="text-3xl sm:text-4xl font-bold flex items-center" onClick={() => setIsOpen(false)}>
                <span className="text-[#ff6b6b]">wed</span>
                <span className="text-[#ffd93d]">space</span>
              </Link>
            </div>
          </div>
              
          {/* Main Navigation */}
          <nav className="flex-1 py-8 bg-[#0f172a]">
            <div className="space-y-2">
              <Link 
                href="/" 
                className="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.05)] px-8 py-4 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Home className="w-6 h-6" />
                <span className="text-base">Home</span>
              </Link>
              <Link 
                href="/search" 
                className="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.05)] px-8 py-4 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Search className="w-6 h-6" />
                <span className="text-base">Search</span>
              </Link>
              <Link 
                href="/venues" 
                className="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.05)] px-8 py-4 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Building2 className="w-6 h-6" />
                <span className="text-base">Venues</span>
              </Link>
              <Link 
                href="/vendors" 
                className="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.05)] px-8 py-4 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Users className="w-6 h-6" />
                <span className="text-base">Vendors</span>
              </Link>
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="border-t border-[rgba(255,255,255,0.1)] bg-[#0f172a]">
            <div className="py-6">
              <Link 
                href="/settings" 
                className="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.05)] px-8 py-4 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="w-6 h-6" />
                <span className="text-base">Settings</span>
              </Link>
              <button 
                onClick={() => {
                  console.log('Logout clicked');
                  setIsOpen(false);
                }} 
                className="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.05)] px-8 py-4 transition-colors w-full"
              >
                <LogOut className="w-6 h-6" />
                <span className="text-base">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trigger button - Always visible */}
      <button 
        id="sidebar-trigger"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }} 
        className="fixed top-4 md:top-7 left-4 md:left-6 z-50 p-2 md:p-3 hover:bg-[rgba(255,255,255,0.1)] rounded-full transition-colors"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>
    </>
  );
}