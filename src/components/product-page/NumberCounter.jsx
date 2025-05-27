"use client";

import React, { useEffect, useRef, useState } from "react";
import { CountUp } from "countup.js";
import { useInView } from "react-intersection-observer"; // Import for visibility detection

const NumberCounter = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef(null);

  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once when the element comes into view
    threshold: 0.1,    // Trigger when 10% of the element is visible
  });

  useEffect(() => {
    if (inView && !hasStarted) {
      const options = {
        startVal: 0,
        endVal: 100000, // Counting to 1,000,000
        duration: 4, // 5 seconds duration
        separator: ",",
        suffix: "+",
      };

      const counter = new CountUp(counterRef.current, options.endVal, options);
      counter.start();
      setHasStarted(true); // Ensure the counter only starts once
    }
  }, [inView, hasStarted]); // Trigger when the component comes into view

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center space-y-4 mt-10"
    >
      <div
        ref={counterRef}
        className="text-6xl md:text-9xl font-extrabold text-black"
      >
        {/* The counter will be inserted here */}
      </div>
      <p className="text-lg md:text-4xl text-gray-700">Happy Customers!</p>
    </div>
  );
};

export default NumberCounter;
