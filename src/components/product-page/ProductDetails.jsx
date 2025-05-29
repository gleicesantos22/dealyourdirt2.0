"use client";

import React, { useState } from "react";
import { useCurrency } from "../CurrencyContext"; // Import your currency context hook

// Star Icon Component
const StarIcon = () => (
  <svg
    className="w-5 h-5 text-yellow-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.92-.755 1.688-1.54 1.118L10 13.347l-3.388 2.456c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L3.607 9.393c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.966z" />
  </svg>
);

// Gallery with 8 Thumbnail Images (Below the Main Image)
const GalleryWithThumbnails = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-xl">
        <img
          src={images[selectedIndex]}
          alt={`Product image ${selectedIndex + 1}`}
          className="object-cover w-full h-full rounded-lg transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* Thumbnails - smaller images */}
      <div className="mt-4 flex justify-center gap-2">
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => handleThumbnailClick(idx)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
              idx === selectedIndex ? "border-pink-600" : "border-transparent"
            }`}
          >
            <img
              src={src}
              alt={`Thumbnail ${idx + 1}`}
              className="object-cover w-full h-full rounded-lg transition-all duration-300 transform hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// Accordion for additional product info
const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4 mt-8">
      {items.map(({ title, content }, index) => (
        <div key={index} className="border-b border-gray-300 py-4">
          <button
            onClick={() => toggle(index)}
            className="flex justify-between w-full items-center font-semibold text-lg text-gray-900"
            aria-expanded={openIndex === index}
          >
            <span>{title}</span>
            <span>{openIndex === index ? "▲" : "▼"}</span>
          </button>
          {openIndex === index && (
            <div className="mt-3 text-gray-900">
              {content.map((paragraph, i) => (
                <p key={i} className="mb-2">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Main ProductDetails Component
export default function ProductDetails({ product }) {
  const { currency } = useCurrency(); // Get currency from context
  const USD_TO_EURO_RATE = 0.92;

  // Helper to format price with currency
  const formatPrice = (amount) => {
    if (currency === "EURO") {
      return `€${(amount * USD_TO_EURO_RATE).toFixed(2)}`;
    }
    return `$${amount.toFixed(2)}`;
  };

  // Redirect to checkout URL instead of adding to cart
  const handleAddToCart = () => {
    if (product.checkoutUrl) {
      window.location.href = product.checkoutUrl;
    } else {
      alert("Checkout URL not available.");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row p-6 space-y-8 md:space-x-8 md:space-y-0 max-w-7xl mx-auto">
        {/* Gallery with Thumbnails */}
        <div className="w-full md:w-1/2">
          <GalleryWithThumbnails images={product.images} />
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2 flex flex-col space-y-6">
          {/* Title and Rating */}
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, idx) => (
                <StarIcon key={idx} />
              ))}
            </div>
            <span className="text-pink-600 font-semibold">
              {product.rating}
            </span>
            <span className="text-gray-600">
              ({product.ratingCount ?? 0} happy couples)
            </span>
          </div>

          {/* Price and Save */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-extrabold text-red-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="line-through text-gray-400">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs bg-red-500 text-white rounded-full px-2 py-1">
                  Save {product.savePercent ?? product.discountPercent ?? 0}%
                </span>
              </>
            )}
          </div>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <ul className="text-gray-700 space-y-2 mb-6">
              {product.highlights.map(({ emoji, text }, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span>{emoji}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Add to cart (redirect to checkout) */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-red-600 text-white rounded-full py-4 font-semibold hover:bg-red-700 transition"
          >
            Add to cart
          </button>

          {/* Accordion */}
          <Accordion items={product.accordionItems} />
        </div>
      </div>

      {/* Responsive Sticky Add to Cart - Bottom Right */}
      <div
        className="
          fixed bottom-5 right-5 bg-white rounded-lg shadow-lg p-4 flex items-center gap-4 z-50
          w-full max-w-md
          sm:max-w-md
          md:w-[500px]
        "
        style={{ maxWidth: "calc(100% - 1.25rem)" }} // For padding on mobile edges
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex flex-col flex-grow min-w-0">
          <h3 className="font-semibold text-lg truncate">{product.title}</h3>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-red-600 font-extrabold text-xl">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="line-through text-gray-400 text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-red-600 text-white rounded-full px-6 py-3 font-semibold hover:bg-red-700 transition whitespace-nowrap"
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
