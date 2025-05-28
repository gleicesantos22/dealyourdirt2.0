import React from "react";
import Link from "next/link";

export default function Footer() {
  const logos = [
    { src: "/amex.svg", alt: "Amex" },
    { src: "/apple_pay.png", alt: "Apple Pay" },
    { src: "discover.png", alt: "Discover" },
    { src: "master_card.svg", alt: "Mastercard" },
    { src: "paypal.png", alt: "Paypal" },
    { src: "shop_pay.jpeg", alt: "Shopify" },
    { src: "visa.png", alt: "Visa" },
  ];

  return (
    <footer className="bg-white text-black px-6 py-12 md:py-16">
      {/* Top row: Footer menu + About side-by-side */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-start gap-16 md:gap-20 mb-12">
        {/* Footer menu */}
        <div className="flex flex-col space-y-3 md:space-y-4 max-w-xs">
          <h3 className="font-semibold text-lg">Footer menu</h3>
          <nav className="flex flex-col space-y-2 text-gray-600 text-base">
            <a href="#" className="hover:text-black transition">
              Search
            </a>
            <Link
              href="/privacy-policy"
              className="hover:text-black transition"
            >
              Privacy Policy
            </Link>
            <Link href="/refund-policy" className="hover:text-black transition">
              Refund Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-black transition"
            >
              Terms of Service
            </Link>
            <a href="#" className="hover:text-black transition">
              Contact Us
            </a>
          </nav>
        </div>

        {/* About */}
        <div className="max-w-md text-gray-700 text-base md:text-lg leading-relaxed">
          <h3 className="font-semibold text-lg mb-4">About</h3>
          <p className="text-gray-600 text-base">
            It’s simple. We’re here to make date night fun again.
          </p>
        </div>
      </div>

      {/* Bottom row: United States + copyright + Logos */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        {/* United States + copyright */}
        <div className="flex flex-col items-center md:items-start space-y-2 cursor-pointer select-none mb-6 md:mb-0 gap-10">
          <div className="flex items-center space-x-2">
            <img
              src="/usa_flag.png"
              alt="US Flag"
              className="w-5 h-5 rounded-full object-cover bg-amber-50"
              loading="lazy"
            />
            <span className="font-semibold">United States (USD $)</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="text-gray-600 text-base">© 2025, Deal You Dirty.</div>
        </div>

        {/* Payment Logos */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-3 max-w-lg">
          {logos.map(({ src, alt }) => (
            <div
              key={alt}
              className="w-9 h-6 flex items-center justify-center bg-white shadow-sm overflow-hidden"
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-fill"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
