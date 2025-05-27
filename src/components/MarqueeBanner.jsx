"use client";

import React from "react";

export default function Marquee() {
  return (
    <div className="flex items-center overflow-hidden whitespace-nowrap bg-gradient-to-r from-red-600 via-orange-500 to-red-600 h-14">
      {/* Duplicate the text to make seamless loop */}
      <div className="inline-block animate-marquee text-white font-bold text-md py-1 px-4">
        <span className="text-black">🔥 50% OFF SITEWIDE — </span>
        <strong>Applied automatically at cart</strong> 🔥 &nbsp;&nbsp; •
        &nbsp;&nbsp; Best-Selling Games. Half the Price. Full Fun. &nbsp;&nbsp;
        • &nbsp;&nbsp; 🔥{" "}
        <span className="text-black">🔥 50% OFF SITEWIDE —</span>
        <strong>Applied automatically at cart</strong> 🔥 &nbsp;&nbsp; •
        &nbsp;&nbsp;
        {/* Repeat exactly again */}
        <span className="text-black">🔥 50% OFF SITEWIDE — </span> 
        <strong>Applied automatically at cart</strong> 🔥 &nbsp;&nbsp; •
        &nbsp;&nbsp; Best-Selling Games. Half the Price. Full Fun. &nbsp;&nbsp;
        • &nbsp;&nbsp; 🔥 50% OFF SITEWIDE —
        <strong>Applied automatically at cart</strong> 🔥 &nbsp;&nbsp; •
        &nbsp;&nbsp;
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%); /* Half because text repeated twice */
          }
        }
        .animate-marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 50s linear infinite;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
