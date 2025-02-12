"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1e293b] border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-white text-xl font-bold">
              WedSpace
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/venues"
                className="text-gray-300 hover:text-white transition"
              >
                Venues
              </Link>
              <Link
                href="/vendors"
                className="text-gray-300 hover:text-white transition"
              >
                Vendors
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white transition"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white transition"
              >
                Contact
              </Link>
            </div>

            {/* Search and Menu Icons */}
            <div className="flex items-center space-x-4">
              <Link
                href="/search"
                className="text-gray-300 hover:text-white transition p-2 rounded-full hover:bg-[rgba(255,255,255,0.1)]"
              >
                <Search className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-gray-300 hover:text-white transition md:hidden p-2 rounded-full hover:bg-[rgba(255,255,255,0.1)]"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed right-0 top-0 bottom-0 w-64 bg-[#1e293b] p-6">
            <div className="flex flex-col space-y-6">
              <Link
                href="/search"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </Link>
              <Link
                href="/venues"
                className="text-gray-300 hover:text-white transition"
                onClick={() => setIsSidebarOpen(false)}
              >
                Venues
              </Link>
              <Link
                href="/vendors"
                className="text-gray-300 hover:text-white transition"
                onClick={() => setIsSidebarOpen(false)}
              >
                Vendors
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white transition"
                onClick={() => setIsSidebarOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white transition"
                onClick={() => setIsSidebarOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
