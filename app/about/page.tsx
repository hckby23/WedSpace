"use client";

import { Heart, Users, Building2, Search, Star, Clock } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#ff6b6b] to-[#ffd93d] text-transparent bg-clip-text">
          About WedSpace
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Your trusted partner in creating unforgettable wedding experiences. We connect couples 
          with the perfect venues and vendors to make their dream wedding a reality.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-[#1e293b] rounded-3xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            At WedSpace, we believe every love story deserves the perfect setting. Our mission is to 
            simplify the wedding planning journey by providing a curated marketplace of exceptional 
            venues and trusted vendors. We're dedicated to making the process of finding and booking 
            wedding services as magical as the big day itself.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-[#1e293b] p-8 rounded-2xl">
          <div className="w-12 h-12 bg-[rgba(255,107,107,0.1)] rounded-xl flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-[#ff6b6b]" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Easy Discovery</h3>
          <p className="text-gray-400">
            Find your perfect venue or vendor with our powerful search and filtering system.
          </p>
        </div>

        <div className="bg-[#1e293b] p-8 rounded-2xl">
          <div className="w-12 h-12 bg-[rgba(255,217,61,0.1)] rounded-xl flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-[#ffd93d]" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Curated Selection</h3>
          <p className="text-gray-400">
            Access our handpicked collection of top-rated venues and professional vendors.
          </p>
        </div>

        <div className="bg-[#1e293b] p-8 rounded-2xl">
          <div className="w-12 h-12 bg-[rgba(255,107,107,0.1)] rounded-xl flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-[#ff6b6b]" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Time-Saving</h3>
          <p className="text-gray-400">
            Streamline your wedding planning process with our efficient booking system.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-2">
            <Building2 className="w-6 h-6 text-[#ff6b6b]" />
            <span>500+</span>
          </div>
          <p className="text-gray-400">Unique Venues</p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-2">
            <Users className="w-6 h-6 text-[#ffd93d]" />
            <span>1000+</span>
          </div>
          <p className="text-gray-400">Professional Vendors</p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white mb-2">
            <Heart className="w-6 h-6 text-[#ff6b6b]" />
            <span>5000+</span>
          </div>
          <p className="text-gray-400">Happy Couples</p>
        </div>
      </div>
    </div>
  );
}
