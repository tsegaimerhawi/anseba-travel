"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import AirportInput from "@/components/AirportInput";
import FlightCard from "@/components/FlightCard";
import type { AmadeusFlightResponse } from "@/types/amadeus";

export default function FlightSearchSection() {
  const [origin, setOrigin] = useState({ code: "", label: "" });
  const [destination, setDestination] = useState({ code: "", label: "" });
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AmadeusFlightResponse | null>(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const today = new Date().toISOString().split("T")[0];

  function swap() {
    setOrigin({ ...destination });
    setDestination({ ...origin });
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!origin.code || !destination.code || !date) return;

    setLoading(true);
    setError("");
    setResults(null);
    setSearched(true);

    try {
      const res = await fetch(
        `/api/flights/search?origin=${origin.code}&destination=${destination.code}&date=${date}&adults=${adults}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(
          (data as { error?: string }).error ?? "No flights found for this route."
        );
      } else {
        const flightData = data as AmadeusFlightResponse;
        setResults(flightData);
        if (!flightData.data || flightData.data.length === 0) {
          setError("No flights available for this route and date. Try different dates.");
        } else {
          setTimeout(
            () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
            100
          );
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const canSearch = origin.code && destination.code && date;

  return (
    <>
      {/* Hero + Search */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=85"
          alt="Aircraft above the clouds"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/70" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-20 pt-28">
          {/* Branding */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <Image
                src="/logo.jpeg"
                alt="Anseba Travel and Tour Agency"
                width={96}
                height={96}
                className="rounded-full border-4 border-white/80 shadow-2xl object-cover"
              />
            </div>
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-3 drop-shadow-lg">
              Find Your Perfect Flight
            </h1>
            <p className="text-white/75 text-lg md:text-xl">
              Search available flights · Book instantly via WhatsApp
            </p>
          </div>

          {/* Search form */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-2xl p-6 md:p-7"
          >
            <div className="flex flex-wrap md:flex-nowrap gap-3 items-end">
              {/* From */}
              <AirportInput
                label="From"
                placeholder="City or airport"
                onSelect={(code, label) => setOrigin({ code, label })}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              />

              {/* Swap */}
              <button
                type="button"
                onClick={swap}
                title="Swap airports"
                className="shrink-0 w-10 h-10 self-end rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#0c3c6e] hover:text-white hover:border-transparent transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>

              {/* To */}
              <AirportInput
                label="To"
                placeholder="City or airport"
                onSelect={(code, label) => setDestination({ code, label })}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              />

              {/* Date */}
              <div className="flex-1 min-w-[145px]">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Departure
                </label>
                <input
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c3c6e]/25 focus:border-[#0c3c6e] transition-all"
                />
              </div>

              {/* Passengers */}
              <div className="w-28 shrink-0">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Passengers
                </label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c3c6e]/25 focus:border-[#0c3c6e] transition-all bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Adult" : "Adults"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSearch || loading}
                className="shrink-0 bg-[#0c3c6e] text-white px-7 py-3 rounded-xl font-semibold text-sm hover:bg-[#0a3060] active:bg-[#082a54] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 h-[46px] self-end"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Searching…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Results */}
      {searched && (
        <section
          ref={resultsRef}
          className="py-12 bg-gray-50 min-h-64 scroll-mt-16"
        >
          <div className="max-w-5xl mx-auto px-4">
            {/* Loading skeleton */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <svg className="w-10 h-10 animate-spin text-[#0c3c6e]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <div className="text-center">
                  <p className="text-[#0c3c6e] font-semibold">Searching flights…</p>
                  <p className="text-gray-400 text-sm mt-1">Checking live availability</p>
                </div>
              </div>
            )}

            {/* Error state */}
            {!loading && error && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium mb-2">{error}</p>
                <p className="text-gray-400 text-sm mb-6">
                  You can also contact us directly on WhatsApp for help finding flights.
                </p>
                <a
                  href={`https://wa.me/256707193134?text=${encodeURIComponent("Hi Anseba Travel! I need help finding a flight. Can you assist me?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Contact Us on WhatsApp
                </a>
              </div>
            )}

            {/* Results */}
            {!loading && results && results.data?.length > 0 && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#0c3c6e]">
                      {origin.label} → {destination.label}
                    </h2>
                    <p className="text-gray-500 text-sm mt-0.5">
                      {results.meta.count} flight{results.meta.count !== 1 ? "s" : ""} found
                      {" · "}
                      {adults} passenger{adults > 1 ? "s" : ""}
                      {" · "}
                      Prices in {results.data[0]?.price.currency}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full self-start sm:self-auto">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Click any card to book via WhatsApp
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.data.map((offer) => (
                    <FlightCard
                      key={offer.id}
                      offer={offer}
                      carriers={results.dictionaries?.carriers ?? {}}
                      searchParams={{
                        originLabel: origin.label,
                        destinationLabel: destination.label,
                        date,
                        adults,
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
