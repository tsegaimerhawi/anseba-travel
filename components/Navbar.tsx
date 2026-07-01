"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="Anseba Travel and Tour Agency"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div className="hidden sm:block">
              <span className="text-[#0c3c6e] font-bold text-lg leading-tight block">
                ANSEBA
              </span>
              <span className="text-[#c9a94e] text-xs tracking-widest font-medium">
                TRAVEL & TOUR
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#results"
              className="text-gray-700 hover:text-[#0c3c6e] font-medium transition-colors"
            >
              Search Flights
            </a>
            <a
              href="#why-us"
              className="text-gray-700 hover:text-[#0c3c6e] font-medium transition-colors"
            >
              Why Us
            </a>
            <a
              href={`https://wa.me/256707193134?text=${encodeURIComponent("Hi Anseba Travel! I'd like help booking a flight.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
            <div className="w-6 h-0.5 bg-current transition-all" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <a
            href="#results"
            className="block text-gray-700 font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            Search Flights
          </a>
          <a
            href="#why-us"
            className="block text-gray-700 font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            Why Us
          </a>
          <a
            href={`https://wa.me/256707193134?text=${encodeURIComponent("Hi Anseba Travel! I'd like help booking a flight.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-2 rounded-full text-sm font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            WhatsApp Us
          </a>
        </div>
      )}
    </nav>
  );
}
