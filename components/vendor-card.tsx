"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface VendorCardProps {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  price: string;
  imageUrl: string;
}

export default function VendorCard({
  id,
  name,
  description,
  location,
  category,
  price,
  imageUrl,
}: VendorCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <article className="group relative bg-[rgba(30,41,59,0.75)] backdrop-blur-lg rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.05)] transition-all duration-500 hover:transform hover:-translate-y-3 hover:scale-102 hover:shadow-2xl">
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[rgba(15,23,42,0.5)] backdrop-blur-sm transition-all duration-300 hover:bg-[rgba(255,107,107,0.2)]"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorited ? 'fill-[#ff6b6b] text-[#ff6b6b]' : 'text-gray-200'
            }`}
          />
        </button>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.9)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <Link
              href={`/vendors/${id}`}
              className="block w-full py-3 px-6 bg-[#ffd93d] text-[#0f172a] font-semibold rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg text-center"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>
        
        {/* Meta Information */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-400 text-sm">
            <span className="mr-2">🏷️</span>
            {category}
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <span className="mr-2">📍</span>
            {location}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="text-[#ffd93d] font-semibold">{price}</div>
          <Link
            href={`/vendors/${id}`}
            className="py-2 px-4 bg-gradient-to-r from-[#ff4444] to-[#ff3333] text-white rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-[rgba(15,23,42,0.9)] backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1e293b] rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{name}</h2>
              <button
                onClick={() => setShowQuickView(false)}
                className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-full transition-colors"
              >
                <span className="text-gray-400 text-xl">×</span>
              </button>
            </div>
            
            <div className="relative h-80 mb-6 rounded-2xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            
            <p className="text-gray-300 mb-6">{description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-xl">
                <div className="text-gray-400 text-sm mb-1">Category</div>
                <div className="text-white">{category}</div>
              </div>
              <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-xl">
                <div className="text-gray-400 text-sm mb-1">Location</div>
                <div className="text-white">{location}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-[#ffd93d] text-2xl font-bold">{price}</div>
              <Link
                href={`/vendors/${id}`}
                className="py-3 px-8 bg-[#ff6b6b] text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
