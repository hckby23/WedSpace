"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-config';
import VenueCard from '@/components/venue-card';

interface Venue {
  id: string;
  name: string;
  description: string;
  price_range: string;
  capacity: number;
  location: string;
  image_url: string;
  amenities: string[];
  rating: number;
  contact_phone: string;
}

export default function VenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'indirapuram', 'nearby'

  useEffect(() => {
    async function fetchVenues() {
      try {
        let query = supabase
          .from('venues')
          .select('*');
        
        if (filter === 'indirapuram') {
          query = query.ilike('location', '%Indirapuram%');
        } else if (filter === 'nearby') {
          query = query.not('location', 'ilike', '%Indirapuram%');
        }

        const { data, error } = await query;

        if (error) throw error;
        setVenues(data || []);
      } catch (error) {
        console.error('Error fetching venues:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [filter]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Wedding Venues</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-[#ff6b6b] text-white'
                : 'bg-[#1e293b] text-gray-300 hover:bg-[#ff6b6b] hover:text-white'
            }`}
          >
            All Venues
          </button>
          <button
            onClick={() => setFilter('indirapuram')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'indirapuram'
                ? 'bg-[#ff6b6b] text-white'
                : 'bg-[#1e293b] text-gray-300 hover:bg-[#ff6b6b] hover:text-white'
            }`}
          >
            Indirapuram
          </button>
          <button
            onClick={() => setFilter('nearby')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'nearby'
                ? 'bg-[#ff6b6b] text-white'
                : 'bg-[#1e293b] text-gray-300 hover:bg-[#ff6b6b] hover:text-white'
            }`}
          >
            Nearby Areas
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff6b6b]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <VenueCard
              key={venue.id}
              id={venue.id}
              name={venue.name}
              description={venue.description}
              location={venue.location}
              capacity={`${venue.capacity} guests`}
              price={venue.price_range}
              imageUrl={venue.image_url}
            />
          ))}
        </div>
      )}
    </div>
  );
}
