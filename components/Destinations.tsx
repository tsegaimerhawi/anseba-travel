import Image from "next/image";

const destinations = [
  {
    name: "Maldives",
    country: "Indian Ocean",
    description:
      "Crystal-clear turquoise lagoons, overwater bungalows, and pristine white-sand beaches await in this tropical paradise.",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    tag: "Most Popular",
    tagColor: "bg-[#c9a94e]",
  },
  {
    name: "Santorini",
    country: "Greece",
    description:
      "Iconic blue-domed churches, dramatic caldera views, and golden sunsets make this Aegean island truly unforgettable.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    tag: "Romantic",
    tagColor: "bg-rose-500",
  },
  {
    name: "Serengeti",
    country: "Tanzania",
    description:
      "Witness the Great Migration across endless golden savannah — a raw, awe-inspiring African wildlife experience.",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    tag: "Adventure",
    tagColor: "bg-green-600",
  },
  {
    name: "Machu Picchu",
    country: "Peru",
    description:
      "Ancient Incan citadel nestled among towering Andean peaks — a marvel of engineering and history in the clouds.",
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80",
    tag: "Heritage",
    tagColor: "bg-amber-600",
  },
  {
    name: "Tokyo",
    country: "Japan",
    description:
      "Where ancient temples meet neon-lit skylines — a dazzling fusion of tradition, innovation, and extraordinary food.",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    tag: "Culture",
    tagColor: "bg-purple-600",
  },
  {
    name: "Amalfi Coast",
    country: "Italy",
    description:
      "Cliffside villages draped in bougainvillea, dramatic Mediterranean vistas, and world-class cuisine at every turn.",
    image:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&q=80",
    tag: "Scenic",
    tagColor: "bg-sky-600",
  },
  {
    name: "Bali",
    country: "Indonesia",
    description:
      "Lush rice terraces, ancient temples, and vibrant culture blend seamlessly with stunning beaches and warm hospitality.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    tag: "Tropical",
    tagColor: "bg-teal-600",
  },
  {
    name: "Patagonia",
    country: "Argentina & Chile",
    description:
      "Dramatic glaciers, jagged granite towers, and untouched wilderness at the very edge of the world.",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    tag: "Wilderness",
    tagColor: "bg-slate-600",
  },
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#c9a94e] font-semibold tracking-widest uppercase text-sm mb-3">
            Around the World
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0c3c6e] mb-4">
            Amazing Destinations
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From sun-kissed tropical islands to ancient wonders and wild
            frontiers — every journey starts with a dream.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span
                  className={`absolute top-3 left-3 ${dest.tagColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                >
                  {dest.tag}
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-[#0c3c6e] font-bold text-lg leading-tight">
                      {dest.name}
                    </h3>
                    <p className="text-[#c9a94e] text-sm font-medium flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {dest.country}
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {dest.description}
                </p>
                <button className="mt-4 w-full text-center text-[#0c3c6e] border border-[#0c3c6e] rounded-full py-2 text-sm font-semibold hover:bg-[#0c3c6e] hover:text-white transition-colors">
                  Explore →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
