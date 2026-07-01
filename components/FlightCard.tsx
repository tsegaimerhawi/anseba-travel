import type { FlightOffer } from "@/types/amadeus";

const WA_NUMBER = "256707193134";

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatDateLong(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDuration(duration: string) {
  const match = duration.match(/PT(\d+H)?(\d+M)?/);
  const h = match?.[1] ? parseInt(match[1]) : 0;
  const m = match?.[2] ? parseInt(match[2]) : 0;
  const parts: string[] = [];
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  return parts.join(" ") || duration;
}

interface Props {
  offer: FlightOffer;
  carriers: Record<string, string>;
  searchParams: {
    originLabel: string;
    destinationLabel: string;
    date: string;
    adults: number;
  };
}

export default function FlightCard({ offer, carriers, searchParams }: Props) {
  const itinerary = offer.itineraries[0];
  const firstSeg = itinerary.segments[0];
  const lastSeg = itinerary.segments[itinerary.segments.length - 1];
  const stops = itinerary.segments.length - 1;

  const carrierCode = offer.validatingAirlineCodes[0] ?? firstSeg.carrierCode;
  const carrierName = carriers[carrierCode] ?? carrierCode;
  const flightNum = `${firstSeg.carrierCode}${firstSeg.number}`;

  const depTime = formatTime(firstSeg.departure.at);
  const arrTime = formatTime(lastSeg.arrival.at);
  const depDateLong = formatDateLong(firstSeg.departure.at);
  const duration = formatDuration(itinerary.duration);
  const stopsLabel =
    stops === 0 ? "Direct" : stops === 1 ? "1 Stop" : `${stops} Stops`;

  const waMessage = encodeURIComponent(
    `Hi Anseba Travel! 👋\n\n` +
      `I'm interested in booking this flight:\n` +
      `✈ ${flightNum} – ${carrierName}\n` +
      `📍 ${searchParams.originLabel} → ${searchParams.destinationLabel}\n` +
      `📅 ${depDateLong}\n` +
      `🕒 ${depTime} → ${arrTime} (${duration})\n` +
      `🛑 ${stopsLabel}\n` +
      `👥 ${searchParams.adults} passenger${searchParams.adults > 1 ? "s" : ""}\n` +
      `💰 Shown price: ${offer.price.currency} ${offer.price.grandTotal}\n\n` +
      `Please advise on the final price and payment options. Thank you!`
  );

  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Header: airline + price */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0c3c6e]/5 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={`https://images.kiwi.com/airlines/64/${carrierCode}.png`}
              alt={carrierName}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
                const fallback = img.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <span
              className="hidden text-[#0c3c6e] font-bold text-xs items-center justify-center w-full h-full"
            >
              {carrierCode}
            </span>
          </div>
          <div>
            <p className="text-gray-800 font-semibold text-sm leading-tight">{carrierName}</p>
            <p className="text-gray-400 text-xs font-mono">{flightNum}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#0c3c6e]">
            {offer.price.currency} {offer.price.grandTotal}
          </p>
          <p className="text-gray-400 text-xs">per person</p>
        </div>
      </div>

      {/* Flight timeline */}
      <div className="px-5 py-5 flex items-center gap-3">
        <div className="text-center shrink-0">
          <p className="text-2xl font-bold text-gray-800 tabular-nums">{depTime}</p>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">
            {firstSeg.departure.iataCode}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center gap-1 min-w-0 px-2">
          <p
            className={`text-xs font-semibold ${
              stops === 0 ? "text-green-600" : "text-amber-500"
            }`}
          >
            {stopsLabel}
          </p>
          <div className="w-full flex items-center gap-1">
            <div className="w-2 h-2 rounded-full border-2 border-[#0c3c6e] shrink-0" />
            <div className="flex-1 border-t-2 border-dashed border-gray-200" />
            <svg
              className="w-5 h-5 text-[#0c3c6e] shrink-0 rotate-90"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
          <p className="text-xs text-gray-400">{duration}</p>
        </div>

        <div className="text-center shrink-0">
          <p className="text-2xl font-bold text-gray-800 tabular-nums">{arrTime}</p>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">
            {lastSeg.arrival.iataCode}
          </p>
        </div>
      </div>

      {/* Footer: seats + CTA */}
      <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between gap-3">
        <p className="text-gray-400 text-xs flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {offer.numberOfBookableSeats} seats left
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm"
        >
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Book via WhatsApp
        </a>
      </div>
    </div>
  );
}
