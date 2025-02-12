"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MainNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/venues', label: 'Venues' },
    { href: '/vendors', label: 'Vendors' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="flex items-center gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-lg font-medium transition-colors hover:text-white ${
            pathname === item.href ? 'text-white' : 'text-gray-400'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
