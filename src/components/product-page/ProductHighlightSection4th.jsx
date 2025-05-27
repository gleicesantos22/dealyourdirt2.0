"use client";

import { Heart } from "lucide-react";

const ProductHighlightSection4th = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-black text-white rounded-2xl my-12">
      {/* Left Section: Image */}
      <div className="flex-shrink-0 w-full md:w-1/2 mb-6 md:mb-0 overflow-hidden rounded-lg">
        <img
          src="/ProductHighlightSection4th.jpg"
          alt="Product Highlight"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Section: Text and Info */}
      <div className="w-full p-4 md:w-1/2 md:pl-12 space-y-6 text-center">
        {/* Icon with bold styling */}
        <Heart className="mx-auto text-white w-10 h-10" />

        {/* Heading with line break */}
        <h2 className="text-5xl md:text-4xl font-bold leading-tight tracking-widest">
          Nights You'll Never <br /> Forget.
        </h2>

        {/* Description paragraph */}
        <p className="text-lg mt-2 p-8">
          <span className=" font-bold">Create unforgettable memories,</span>{" "}
          &amp; with heartfelt & spicy challenges and moments that'll last a
          lifetime.
        </p>
      </div>
    </section>
  );
};

export default ProductHighlightSection4th;
