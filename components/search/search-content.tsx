"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-config";
import Image from "next/image";
import Link from "next/link";
import { Building2, IndianRupee, Users, MapPin, Filter } from "lucide-react";

interface SearchResult {
  id: string;
  name: string;
  type: "venue" | "vendor";
  location: string;
  image_url: string;
  capacity?: number;
  price_range: string;
  category?: string;
}

export function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filters, setFilters] = useState({
    type: "all",
    priceRange: "all",
    location: "all",
  });

  useEffect(() => {
    async function performSearch() {
      try {
        // Search venues
        const { data: venues, error: venuesError } = await supabase
          .from("venues")
          .select("id, name, location, image_url, capacity, price_range")
          .or(`name.ilike.%${query}%,location.ilike.%${query}%`);

        if (venuesError) {
          console.error('Venues error:', venuesError);
          return;
        }

        // Search vendors
        const { data: vendors, error: vendorsError } = await supabase
          .from("vendors")
          .select("id, name, location, image_url, category, price_range")
          .or(`name.ilike.%${query}%,location.ilike.%${query}%,category.ilike.%${query}%`);

        if (vendorsError) {
          console.error('Vendors error:', vendorsError);
          return;
        }

        // Combine and format results
        const formattedResults: SearchResult[] = [
          ...(venues?.map(venue => ({
            ...venue,
            type: "venue" as const,
          })) || []),
          ...(vendors?.map(vendor => ({
            ...vendor,
            type: "vendor" as const,
          })) || []),
        ];

        // Apply filters
        let filteredResults = formattedResults;
        
        // Type filter
        if (filters.type !== "all") {
          filteredResults = filteredResults.filter(
            result => result.type === filters.type
          );
        }
        
        // Price filter
        if (filters.priceRange !== "all") {
          const priceLimit = parseInt(filters.priceRange.replace(/[^0-9]/g, ""));
          filteredResults = filteredResults.filter(result => {
            const price = parseInt(result.price_range.split("-")[0].replace(/[^0-9]/g, ""));
            return price <= priceLimit;
          });
        }
        
        // Location filter
        if (filters.location !== "all") {
          filteredResults = filteredResults.filter(
            result => result.location.includes(filters.location)
          );
        }

        setResults(filteredResults);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
    }

    performSearch();
  }, [query, filters]);

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center">
      {/* Search Header */}
      <div className="bg-[#1e293b] py-8 w-full">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Search Results for &quot;{query}&quot;
          </h1>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto mb-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const searchInput = e.currentTarget.querySelector('input[type="search"]') as HTMLInputElement;
                if (searchInput.value.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(searchInput.value.trim())}`;
                }
              }}
              className="relative"
            >
              <input
                type="search"
                defaultValue={query}
                placeholder="Search venues, locations, or services..."
                className="w-full px-6 py-4 bg-[rgba(15,23,42,0.5)] text-white rounded-full 
                border border-[rgba(255,255,255,0.1)] 
                focus:outline-none focus:border-[#ffd93d] focus:ring-2 
                focus:ring-[#ffd93d] focus:ring-opacity-20 
                transition-colors duration-300 
                placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
          
          {/* Filters */}
          <div className="flex justify-center gap-4 items-center flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#ff6b6b]" />
              <span className="text-white">Filters:</span>
            </div>
            
            {/* Type Filter */}
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="bg-[#0f172a] text-white px-4 py-2 rounded-lg border border-gray-600 hover:border-[#ffd93d] focus:outline-none focus:ring-2 focus:ring-[#ffd93d] transition"
            >
              <option value="all">All Types</option>
              <option value="venue">Venues</option>
              <option value="vendor">Vendors</option>
            </select>

            {/* Price Range Filter */}
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
              className="bg-[#0f172a] text-white px-4 py-2 rounded-lg border border-gray-600 hover:border-[#ffd93d] focus:outline-none focus:ring-2 focus:ring-[#ffd93d] transition"
            >
              <option value="all">All Prices</option>
              <option value="50000">Under ₹50,000</option>
              <option value="100000">Under ₹1,00,000</option>
              <option value="200000">Under ₹2,00,000</option>
              <option value="500000">Under ₹5,00,000</option>
            </select>

            {/* Location Filter */}
            <select
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="bg-[#0f172a] text-white px-4 py-2 rounded-lg border border-gray-600 hover:border-[#ffd93d] focus:outline-none focus:ring-2 focus:ring-[#ffd93d] transition"
            >
              <option value="all">All Locations</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <Link
              key={result.id}
              href={`/${result.type}s/${result.id}`}
              className="bg-[#1e293b] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={result.image_url || '/placeholder.jpg'}
                  alt={result.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{result.name}</h3>
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{result.location}</span>
                </div>
                {result.type === "venue" && result.capacity && (
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Users className="w-4 h-4" />
                    <span>Capacity: {result.capacity}</span>
                  </div>
                )}
                {result.type === "vendor" && result.category && (
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Building2 className="w-4 h-4" />
                    <span>{result.category}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-[#ffd93d]">
                  <IndianRupee className="w-4 h-4" />
                  <span>{result.price_range}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
