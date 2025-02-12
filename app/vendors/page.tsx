"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-config';
import VendorCard from '@/components/vendor-card';

interface Vendor {
  id: string;
  name: string;
  category: string;
  description: string;
  price_range: string;
  rating: number;
  location: string;
  image_url: string;
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function fetchVendors() {
      try {
        let query = supabase.from('vendors').select('*');
        
        if (selectedCategory !== 'all') {
          query = query.eq('category', selectedCategory);
        }

        const { data, error } = await query;

        if (error) throw error;
        setVendors(data || []);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVendors();
  }, [selectedCategory]);

  const categories = [
    'all',
    'photographer',
    'caterer',
    'decorator',
    'makeup_artist',
    'dj',
    'transportation'
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff6b6b]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Wedding Vendors</h1>
        <div className="flex gap-4 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-[#ff6b6b] text-white'
                  : 'bg-[#1e293b] text-gray-300 hover:bg-[#ff6b6b] hover:text-white'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            id={vendor.id}
            name={vendor.name}
            description={vendor.description}
            location={vendor.location}
            category={vendor.category}
            price={vendor.price_range}
            imageUrl={vendor.image_url}
          />
        ))}
      </div>
    </div>
  );
}
