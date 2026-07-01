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
              href="#destinations"
              className="text-gray-700 hover:text-[#0c3c6e] font-medium transition-colors"
            >
              Destinations
            </a>
            <a
              href="#why-us"
              className="text-gray-700 hover:text-[#0c3c6e] font-medium transition-colors"
            >
              Why Us
            </a>
            <a
              href="#contact"
              className="bg-[#0c3c6e] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#0a3060] transition-colors"
            >
              Contact Us
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
            href="#destinations"
            className="block text-gray-700 font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            Destinations
          </a>
          <a
            href="#why-us"
            className="block text-gray-700 font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            Why Us
          </a>
          <a
            href="#contact"
            className="block bg-[#0c3c6e] text-white px-5 py-2 rounded-full text-sm font-semibold text-center"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
}
