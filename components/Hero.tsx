import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=85"
        alt="Beautiful travel destination"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.jpeg"
            alt="Anseba Travel and Tour Agency"
            width={120}
            height={120}
            className="rounded-full border-4 border-white/80 shadow-2xl object-cover"
          />
        </div>

        <h1 className="text-white text-5xl md:text-7xl font-bold mb-3 drop-shadow-lg">
          ANSEBA
        </h1>
        <p className="text-[#c9a94e] text-lg md:text-2xl tracking-[0.3em] font-semibold mb-6 uppercase">
          Travel &amp; Tour Agency
        </p>
        <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Your Journey, Our Priority — Let us take you to the world's most
          breathtaking destinations, crafted just for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#destinations"
            className="bg-[#c9a94e] text-white px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-[#b8983d] transition-colors shadow-lg"
          >
            Explore Destinations
          </a>
          <a
            href="#contact"
            className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-white/30 transition-colors"
          >
            Book Your Trip
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-8 h-8 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
