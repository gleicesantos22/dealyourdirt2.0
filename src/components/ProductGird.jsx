"use client";

import React from "react";
import Link from "next/link";
import products from "../data/products.json"; // Adjust path accordingly
import { useCurrency } from "./CurrencyContext"; // Import currency context hook

function HoverImage({ defaultSrc, hoverSrc, alt }) {
  return (
    <div className="relative w-full h-64 overflow-hidden">
      <img src={defaultSrc} alt={alt} className="w-full h-full object-cover" />
      <img
        src={hoverSrc}
        alt={`${alt} hover`}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
}

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const totalStars = 5;

  return (
    <div className="flex items-center justify-center space-x-1 text-pink-600">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.92-.755 1.688-1.54 1.118L10 13.347l-3.388 2.456c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L3.607 9.393c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.966z" />
        </svg>
      ))}
      {halfStar && (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfGrad)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.92-.755 1.688-1.54 1.118L10 13.347l-3.388 2.456c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L3.607 9.393c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.966z"
          />
        </svg>
      )}
      {[...Array(totalStars - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.92-.755 1.688-1.54 1.118L10 13.347l-3.388 2.456c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L3.607 9.393c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.966z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductGrid() {
  const { currency } = useCurrency(); // get currency from context
  const USD_TO_EURO_RATE = 0.92;

  const formatPrice = (amount) => {
    if (currency === "EURO") {
      return `€${(amount * USD_TO_EURO_RATE).toFixed(2)}`;
    }
    return `$${amount.toFixed(2)}`;
  };

  return (
    <section className="px-6 md:px-20 py-12 bg-gradient-to-b from-[#611A5F] to-[#4950A9] min-h-screen relative">
      <div className="max-w-7xl mx-auto">
        <p className="text-white font-semibold text-md mb-5 flex items-center gap-2">
          Instant Delivery to Your Email{" "}
          <img src="/email_icon.png" alt="Email" className="w-4 h-3" />
        </p>
        <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-12 text-center sm:text-left">
          Get Dirty Tonight.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-full max-w-xs mx-auto"
            >
              <div className="relative bg-gradient-to-b from-pink-500 to-purple-700 cursor-pointer">
                <span className="absolute top-3 left-3 bg-red-500 text-xs px-2 py-1 rounded-full font-semibold text-white z-10">
                  {product.tagline}
                </span>
                <HoverImage
                  defaultSrc={product.images[0]}
                  hoverSrc={product.images[1]}
                  alt={product.title}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = product.checkoutUrl;
                  }}
                  className="absolute bottom-4 right-4 bg-black text-white rounded-full px-4 py-2 text-sm hover:opacity-70 transition font-semibold"
                >
                  Buy Now
                </button>
              </div>

              <div className="p-4 flex flex-col flex-grow items-center justify-center text-center">
                <StarRating rating={product.rating} />
                <h3 className="font-semibold text-lg mt-2">{product.title}</h3>
                <div>
                  <span className="text-pink-600 font-semibold text-lg">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through ml-2">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
