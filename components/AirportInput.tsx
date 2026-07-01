"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { AmadeusLocation } from "@/types/amadeus";

interface Props {
  label: string;
  placeholder: string;
  onSelect: (code: string, displayLabel: string) => void;
  icon: React.ReactNode;
}

export default function AirportInput({
  label,
  placeholder,
  onSelect,
  icon,
}: Props) {
  const [query, setQuery] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const [suggestions, setSuggestions] = useState<AmadeusLocation[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/airports?q=${encodeURIComponent(q)}`);
      const data = (await res.json()) as AmadeusLocation[];
      const list = Array.isArray(data) ? data : [];
      setSuggestions(list);
      setIsOpen(list.length > 0);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, search]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(loc: AmadeusLocation) {
    const selected = `${loc.address.cityName} (${loc.iataCode})`;
    setDisplayValue(selected);
    setQuery("");
    setIsOpen(false);
    setSuggestions([]);
    onSelect(loc.iataCode, selected);
  }

  const inputValue = displayValue || query;

  return (
    <div ref={containerRef} className="relative flex-1 min-w-0">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0c3c6e] pointer-events-none">
          {icon}
        </span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setDisplayValue("");
            setQuery(e.target.value);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full pl-9 pr-8 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0c3c6e]/25 focus:border-[#0c3c6e] transition-all"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="w-4 h-4 animate-spin text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </span>
        )}
        {displayValue && !loading && (
          <button
            type="button"
            onClick={() => {
              setDisplayValue("");
              setQuery("");
              onSelect("", "");
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          {suggestions.map((loc) => (
            <button
              key={`${loc.iataCode}-${loc.subType}`}
              type="button"
              onClick={() => handleSelect(loc)}
              className="w-full px-4 py-3 text-left hover:bg-[#0c3c6e]/5 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0"
            >
              <span className="bg-[#0c3c6e]/10 text-[#0c3c6e] font-bold text-xs px-2 py-1 rounded w-12 text-center shrink-0">
                {loc.iataCode}
              </span>
              <div className="min-w-0">
                <p className="text-gray-800 text-sm font-medium truncate">
                  {loc.address.cityName}
                  <span className="text-gray-400 font-normal"> · {loc.name}</span>
                </p>
                <p className="text-gray-400 text-xs">{loc.address.countryName}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
