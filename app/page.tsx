"use client";

import Image from "next/image";
import SearchBar from "@/components/search-bar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Building2, Users } from "lucide-react";

interface Venue {
  id: string;
  name: string;
  location: string;
  image_url: string;
  capacity: number;
}

interface Vendor {
  id: string;
  name: string;
  category: string;
  image_url: string;
  location: string;
}

export default function Home() {
  const [featuredVenues, setFeaturedVenues] = useState<Venue[]>([]);
  const [featuredVendors, setFeaturedVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        // Fetch featured venues
        const { data: venues, error: venuesError } = await supabase
          .from('venues')
          .select('id, name, location, image_url, capacity')
          .limit(6);

        if (venuesError) {
          console.error('Error fetching venues:', venuesError);
          return;
        }

        if (venues) setFeaturedVenues(venues);

        // Fetch featured vendors
        const { data: vendors, error: vendorsError } = await supabase
          .from('vendors')
          .select('id, name, category, image_url, location')
          .limit(6);

        if (vendorsError) {
          console.error('Error fetching vendors:', vendorsError);
          return;
        }

        if (vendors) setFeaturedVendors(vendors);
      } catch (error) {
        console.error('Error fetching featured items:', error);
      }
    }

    fetchFeatured();
  }, []);

  return (
    <>
      {/* Hero Section with Scrolling Background */}
      <div className="w-full h-screen absolute top-0 left-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
          alt="Beautiful wedding venue"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,23,42,0.7)] to-[rgba(15,23,42,0.8)]" />
      </div>

      {/* Content Wrapper */}
      <div className="relative">
        {/* Hero Content */}
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 -mt-24">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-[#ff6b6b] to-[#ffd93d] text-transparent bg-clip-text leading-tight tracking-tight">
            Find your Dream Venue
          </h1>
          
          {/* Search Container with Glass Effect */}
          <div className="max-w-2xl w-full mx-auto bg-[rgba(15,23,42,0.7)] backdrop-blur-lg p-10 rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-xl">
            <SearchBar />
          </div>
        </div>

        {/* Featured Sections */}
        <div className="relative bg-[#0f172a]/95 backdrop-blur-lg">
          <div className="container mx-auto px-6 py-32">
            {/* Featured Venues */}
            <div className="mb-32 text-center">
              <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3 justify-center">
                <Building2 className="w-8 h-8 text-[#ff6b6b]" />
                Featured Venues
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {featuredVenues.map((venue) => (
                  <Link
                    href={`/venues/${venue.id}`}
                    key={venue.id}
                    className="group bg-[#1e293b] rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={venue.image_url}
                        alt={venue.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{venue.name}</h3>
                      <div className="flex items-center justify-between text-gray-400">
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {venue.capacity}
                        </span>
                        <span>{venue.location}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Vendors */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3 justify-center">
                <Users className="w-8 h-8 text-[#ffd93d]" />
                Featured Vendors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {featuredVendors.map((vendor) => (
                  <Link
                    href={`/vendors/${vendor.id}`}
                    key={vendor.id}
                    className="group bg-[#1e293b] rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={vendor.image_url}
                        alt={vendor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{vendor.name}</h3>
                      <div className="flex items-center justify-between text-gray-400">
                        <span className="text-[#ffd93d]">{vendor.category}</span>
                        <span>{vendor.location}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
