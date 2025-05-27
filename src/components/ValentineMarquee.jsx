"use client";

import React from "react";

export default function ValentineMarquee() {
  return (
    <div className="flex items-center overflow-hidden whitespace-nowrap bg-black h-24">
      <div className="inline-block animate-marquee text-white font-bold text-2xl py-2 px-6">
        <span className="mr-8">
          🎁 Last Chance for the Valentines Day Sale 🎁
        </span>
        <span className="mr-8">
          🎁 Last Chance for the Valentines Day Sale 🎁
        </span>
        <span> 🎁 Last Chance for the Valentines Day Sale 🎁</span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 7s linear infinite;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
