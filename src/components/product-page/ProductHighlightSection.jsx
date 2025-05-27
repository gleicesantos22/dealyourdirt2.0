"use client";

import { CircleCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const ProductHighlightSection = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Check if the component is in view
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setIsInView(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check if the component is in view initially

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.section
      className="flex flex-col md:flex-row items-center justify-between bg-black text-white rounded-2xl my-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }} // Trigger animation when in view
      transition={{ duration: 1.2 }}
      ref={sectionRef} // Attach the ref here
    >
      {/* Left Section: Image */}
      <motion.div
        className="flex-shrink-0 w-full md:w-1/2 mb-6 md:mb-0 overflow-hidden rounded-lg"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: isInView ? 0 : -100, opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/ProductHighlightSection.jpg"
          alt="Product Highlight"
          className="object-cover w-full h-full"
        />
      </motion.div>

      {/* Right Section: Text and Info */}
      <motion.div
        className="w-full p-4 md:w-1/2 md:pl-12 space-y-6 text-center"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: isInView ? 0 : 100, opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Icon with bold styling */}
        <motion.div
          className="mx-auto text-white w-10 h-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <CircleCheck />
        </motion.div>

        {/* Heading with line break */}
        <motion.h2
          className="text-5xl md:text-4xl font-bold leading-tight tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Leading To The <br /> "Finish Line."
        </motion.h2>

        {/* Description paragraph */}
        <motion.p
          className="text-lg mt-2 p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="font-bold">140 extremely flirty</span> &amp; dirty
          challenges, vetted by relationship therapists designed to guide you
          both to a new level of intimacy.
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default ProductHighlightSection;
