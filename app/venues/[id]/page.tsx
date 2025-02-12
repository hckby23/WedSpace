"use client";

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPin, Users, Phone, Calendar, ShoppingCart } from 'lucide-react';
import { supabase } from '@/lib/supabase-config';
import { useAddToCart } from '@/hooks/use-add-to-cart';

interface Venue {
  id: string;
  name: string;
  description: string;
  price_range: string;
  capacity: number;
  location: string;
  image_url: string;
  amenities: string[];
  contact_phone: string;
}

export default function VenueDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useAddToCart();

  useEffect(() => {
    async function fetchVenue() {
      try {
        const { data, error } = await supabase
          .from('venues')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setVenue(data);
      } catch (error) {
        console.error('Error fetching venue:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  const handleAddToCart = () => {
    if (!venue) return;
    
    setAddingToCart(true);
    const priceNumber = parseInt(venue.price_range.replace(/[^0-9]/g, ''));
    
    addToCart({
      id: venue.id,
      name: venue.name,
      type: 'venue',
      price: priceNumber,
      image: venue.image_url,
    });
    
    setAddingToCart(false);
    router.push('/cart');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff6b6b]"></div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#1e293b] rounded-lg p-8 text-center">
          <p className="text-gray-300 text-lg">Venue not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e293b] rounded-lg overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-[400px]">
        <Image
          src={venue.image_url}
          alt={venue.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">{venue.name}</h1>
            <div className="flex items-center text-gray-400 mt-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{venue.location}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-gray-400">Capacity: {venue.capacity}</span>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">About this Venue</h2>
          <p className="text-gray-300">{venue.description}</p>
        </div>

        {/* Amenities Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {venue.amenities.map((amenity, index) => (
              <span
                key={index}
                className="bg-[#0f172a] text-gray-300 px-4 py-2 rounded-lg text-sm"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-[#0f172a] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center text-gray-300">
              <Phone className="w-4 h-4 mr-3" />
              <span>{venue.contact_phone}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Calendar className="w-4 h-4 mr-3" />
              <span>Available for bookings</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className={`flex-1 py-4 px-8 bg-[#ff6b6b] text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                addingToCart ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
