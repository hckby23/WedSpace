"use client";

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPin, Phone, Calendar, ShoppingCart } from 'lucide-react';
import { supabase } from '@/lib/supabase-config';
import { useAddToCart } from '@/hooks/use-add-to-cart';

interface Vendor {
  id: string;
  name: string;
  category: string;
  description: string;
  price_range: string;
  location: string;
  image_url: string;
  contact_phone: string;
  services?: string[];
}

export default function VendorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useAddToCart();

  useEffect(() => {
    async function fetchVendor() {
      try {
        const { data, error } = await supabase
          .from('vendors')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setVendor(data);
      } catch (error) {
        console.error('Error fetching vendor:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVendor();
  }, [id]);

  const handleAddToCart = () => {
    if (!vendor) return;
    
    setAddingToCart(true);
    const priceNumber = parseInt(vendor.price_range.replace(/[^0-9]/g, ''));
    
    addToCart({
      id: vendor.id,
      name: vendor.name,
      type: 'vendor',
      price: priceNumber,
      image: vendor.image_url,
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

  if (!vendor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#1e293b] rounded-lg p-8 text-center">
          <p className="text-gray-300 text-lg">Vendor not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e293b] rounded-lg overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-[400px]">
        <Image
          src={vendor.image_url}
          alt={vendor.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">{vendor.name}</h1>
            <div className="flex items-center text-gray-400 mt-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{vendor.location}</span>
            </div>
          </div>
          <div className="text-[#ff6b6b] font-semibold">
            {vendor.category}
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">About this Vendor</h2>
          <p className="text-gray-300">{vendor.description}</p>
        </div>

        {/* Services Section */}
        {vendor.services && vendor.services.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">Services Offered</h2>
            <div className="flex flex-wrap gap-2">
              {vendor.services.map((service, index) => (
                <span
                  key={index}
                  className="bg-[#0f172a] text-gray-300 px-4 py-2 rounded-lg text-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-[#0f172a] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center text-gray-300">
              <Phone className="w-4 h-4 mr-3" />
              <span>{vendor.contact_phone}</span>
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
