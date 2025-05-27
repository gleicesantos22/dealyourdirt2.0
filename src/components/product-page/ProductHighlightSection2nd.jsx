"use client";

import { Smile } from "lucide-react";
import { motion } from "framer-motion";

const ProductHighlightSection2nd = () => {
  return (
    <motion.section
      className="flex flex-col md:flex-row items-center justify-between bg-black text-white rounded-2xl my-12"
      initial={{ opacity: 0, y: 50 }} // Initial position and opacity
      animate={{ opacity: 1, y: 0 }} // Final position and opacity
      transition={{ duration: 1 }} // Duration of the animation
    >
      {/* Left Section: Image */}
      <motion.div
        className="flex-shrink-0 w-full md:w-1/2 mb-6 md:mb-0 overflow-hidden rounded-lg"
        initial={{ x: -100, opacity: 0 }} // Image starts from the left and fades in
        animate={{ x: 0, opacity: 1 }} // Image slides in from the left
        transition={{ duration: 1 }}
      >
        <img
          src="/ProductHighlightSection2nd.jpg"
          alt="Product Highlight"
          className="object-cover w-full h-full"
        />
      </motion.div>

      {/* Right Section: Text and Info */}
      <motion.div
        className="w-full p-4 md:w-1/2 md:pl-12 space-y-6 text-center"
        initial={{ x: 100, opacity: 0 }} // Text starts from the right and fades in
        animate={{ x: 0, opacity: 1 }} // Text slides in from the right
        transition={{ duration: 1, delay: 0.2 }} // Delay to make text appear after the image
      >
        {/* Icon with bold styling */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }} // Icon starts scaled down
          animate={{ scale: 1, opacity: 1 }} // Icon scales up to its normal size
          transition={{ duration: 0.6 }}
        >
          <Smile className="mx-auto text-white w-10 h-10" />
        </motion.div>

        {/* Heading with line break */}
        <motion.h2
          className="text-5xl md:text-4xl font-bold leading-tight tracking-widest"
          initial={{ opacity: 0 }} // Heading starts invisible
          animate={{ opacity: 1 }} // Heading fades in
          transition={{ duration: 1, delay: 0.4 }} // Delay to fade in after icon
        >
          Guaranteed To Get <br /> You Lucky.
        </motion.h2>

        {/* Description paragraph */}
        <motion.p
          className="text-lg mt-2 p-8"
          initial={{ opacity: 0 }} // Description starts invisible
          animate={{ opacity: 1 }} // Description fades in
          transition={{ duration: 1, delay: 0.6 }} // Delay to fade in after heading
        >
          <span className="font-bold"> The perfect way to get it going.</span>{" "}
          &amp; Just let loose, lose control, and let the cards guide you to a
          world of excitement.
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default ProductHighlightSection2nd;
