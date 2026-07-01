import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0c3c6e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.jpeg"
                alt="Anseba Travel and Tour Agency"
                width={56}
                height={56}
                className="rounded-full object-cover border-2 border-white/30"
              />
              <div>
                <span className="text-white font-bold text-lg leading-tight block">
                  ANSEBA
                </span>
                <span className="text-[#c9a94e] text-xs tracking-widest font-medium">
                  TRAVEL & TOUR AGENCY
                </span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Your Journey, Our Priority. Specializing in bespoke travel
              experiences that connect you with the world's most remarkable
              destinations.
            </p>
            <p className="text-[#c9a94e] font-semibold italic text-sm">
              "Your Journey, Our Priority"
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Destinations", href: "#destinations" },
                { label: "Why Choose Us", href: "#why-us" },
                { label: "Contact Us", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#c9a94e] transition-colors text-sm"
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-white/70 text-sm">
              <li className="flex items-start gap-3">
                <svg
                  className="w-4 h-4 mt-0.5 text-[#c9a94e] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@ansebatravels.com</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-4 h-4 mt-0.5 text-[#c9a94e] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+1 (800) ANSEBA-1</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-4 h-4 mt-0.5 text-[#c9a94e] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Worldwide Offices</span>
              </li>
            </ul>

            <div className="mt-6">
              <a
                href="mailto:info@ansebatravels.com"
                className="inline-block bg-[#c9a94e] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#b8983d] transition-colors"
              >
                Send a Message
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50 text-sm">
          <p>
            © {new Date().getFullYear()} Anseba Travel and Tour Agency. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
