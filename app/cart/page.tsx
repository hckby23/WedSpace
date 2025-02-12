"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/cart-context';

export default function CartPage() {
  const { state: { items }, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Your Cart</h1>
          <div className="bg-[#1e293b] rounded-2xl p-12 text-center">
            <div className="flex flex-col items-center gap-6">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
              <p className="text-gray-300 text-xl">Your cart is empty</p>
              <Link 
                href="/venues"
                className="mt-4 px-8 py-3 bg-[#ff6b6b] text-white rounded-full font-semibold hover:bg-[#ff5252] transition-all duration-300 hover:shadow-lg"
              >
                Browse Venues
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Your Cart</h1>
        
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex">
                {item.image && (
                  <div className="relative w-56 h-40">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-grow p-8 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">{item.name}</h2>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-[#ff6b6b] text-xl font-semibold">${item.price.toLocaleString()}</span>
                      <span className="text-gray-400 capitalize px-3 py-1 bg-[rgba(255,255,255,0.1)] rounded-full text-sm">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-gray-400 hover:text-[#ff6b6b] hover:bg-[rgba(255,107,107,0.1)] rounded-full transition-all duration-300"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#1e293b] rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <p className="text-lg text-gray-400 mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-[#ff6b6b]">
                ${items.reduce((total, item) => total + item.price, 0).toLocaleString()}
              </p>
            </div>
            <button className="px-12 py-4 bg-gradient-to-r from-[#ff6b6b] to-[#ff5252] text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
