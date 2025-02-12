"use client";

import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchInput = e.currentTarget.querySelector('input[type="search"]') as HTMLInputElement;
    if (searchInput.value.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.value.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-lg w-full mx-auto">
      <input
        type="search"
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
  );
}