"use client";

import React, { useRef, useState } from "react";

function PlayButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 transition rounded-lg z-10"
      aria-label="Play video"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  );
}

export default function PeopleLoveVideos() {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  const [playing1, setPlaying1] = useState(false);
  const [playing2, setPlaying2] = useState(false);

  const handlePlay1 = async () => {
    try {
      await video1Ref.current.play();
      setPlaying1(true);
    } catch (err) {
      console.error("Failed to play video1:", err);
    }
  };

  const handlePlay2 = async () => {
    try {
      await video2Ref.current.play();
      setPlaying2(true);
    } catch (err) {
      console.error("Failed to play video2:", err);
    }
  };

  return (
    <section className="relative z-0">
      {/* Wave shape */}
      <div className="w-full h-8">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#e6204e]"
        >
          <path d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z" />
        </svg>
      </div>

      {/* Red background container */}
      <div className="bg-[#e6204e] pt-20 pb-12 px-6 md:px-20 max-w-7xl mx-auto min-h-[450px]">
        <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-10 text-center z-10 relative">
          People Love Gettin' Dirty
        </h2>

        <div className="flex flex-row gap-6">
          {/* Left half: two videos side-by-side */}
          <div className="md:w-1/2 flex gap-6">
            {/* Video 1 */}
            <div className="relative flex-1 rounded-lg overflow-hidden h-[400px] bg-black">
              {!playing1 && (
                <img
                  src="/thumbnail.jpg"
                  alt="Thumbnail 1"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              )}
              {!playing1 && <PlayButton onClick={handlePlay1} />}
              <video
                ref={video1Ref}
                src="/video1.mp4"
                muted
                loop
                className="w-full h-full object-cover rounded-lg"
                playsInline
                controls={false}
                preload="metadata"
              />
            </div>

            {/* Video 2 */}
            <div className="relative flex-1 rounded-lg overflow-hidden h-[400px] bg-black">
              {!playing2 && (
                <img
                  src="/thumbnail.png"
                  alt="Thumbnail 2"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              )}
              {!playing2 && <PlayButton onClick={handlePlay2} />}
              <video
                ref={video2Ref}
                src="/video2.mp4"
                muted
                loop
                className="w-full h-full object-cover rounded-lg"
                playsInline
                controls={false}
                preload="metadata"
              />
            </div>
          </div>

          {/* Right half: empty */}
          <div className="md:w-1/2"></div>
        </div>
      </div>
    </section>
  );
}
