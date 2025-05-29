"use client";

import React, { useRef, useState } from "react";

function PlayButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="Play video"
      className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-black bg-opacity-50 rounded-full p-5 border-0 cursor-pointer text-white text-4xl leading-none"
      style={{ lineHeight: 0 }}
    >
      ▶
    </button>
  );
}

export default function PeopleLoveVideos() {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  const [playing1, setPlaying1] = useState(false);
  const [playing2, setPlaying2] = useState(false);

  const togglePlay = async (videoRef, playingState, setPlayingState) => {
    if (!videoRef.current) return;

    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
        setPlayingState(true);
      } else {
        videoRef.current.pause();
        setPlayingState(false);
      }
    } catch (err) {
      console.error("Play error:", err);
    }
  };

  return (
    <section className="relative z-0 max-w-[1280px] mx-auto p-8">
      {/* Wave SVG on top */}
      <div className="w-full h-8 mb-[-4px]">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#e6204e]"
        >
          <path d="M0 44c107 0 213-36 320-36s214 36 320 36 213-36 320-36 214 36 320 36 160-24 160-34v90H0z" />
        </svg>
      </div>

      {/* Red background container */}
      <div className="bg-[#e6204e] pt-20 pb-12 px-6 md:px-20 rounded-lg">
        <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-10 text-center z-10 relative">
          People Love Gettin' Dirty
        </h2>

        {/* Side-by-side videos container forced by inline styles */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {/* Video 1 */}
          <div
            style={{
              position: "relative",
              flexShrink: 0,
              flexBasis: "600px",
              maxWidth: "100%",
              height: "340px",
              borderRadius: "0.75rem",
              overflow: "hidden",
              backgroundColor: "black",
            }}
          >
            {!playing1 && (
              <img
                src="/thumbnail1.png"
                alt="Thumbnail 1"
                className="absolute inset-0 w-full h-full object-cover cursor-pointer z-20"
                onClick={() => togglePlay(video1Ref, playing1, setPlaying1)}
              />
            )}
            {!playing1 && (
              <PlayButton onClick={() => togglePlay(video1Ref, playing1, setPlaying1)} />
            )}
            <video
              ref={video1Ref}
              src="/video1.mp4"
              muted
              loop
              playsInline
              controls={playing1}
              className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${
                playing1 ? "block z-30" : "hidden z-0 pointer-events-none"
              }`}
              onEnded={() => setPlaying1(false)}
            />
          </div>

          {/* Video 2 */}
          <div
            style={{
              position: "relative",
              flexShrink: 0,
              flexBasis: "600px",
              maxWidth: "100%",
              height: "340px",
              borderRadius: "0.75rem",
              overflow: "hidden",
              backgroundColor: "black",
            }}
          >
            {!playing2 && (
              <img
                src="/thumbnail2.png"
                alt="Thumbnail 2"
                className="absolute inset-0 w-full h-full object-cover cursor-pointer z-20"
                onClick={() => togglePlay(video2Ref, playing2, setPlaying2)}
              />
            )}
            {!playing2 && (
              <PlayButton onClick={() => togglePlay(video2Ref, playing2, setPlaying2)} />
            )}
            <video
              ref={video2Ref}
              src="/video2.mp4"
              muted
              loop
              playsInline
              controls={playing2}
              className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${
                playing2 ? "block z-30" : "hidden z-0 pointer-events-none"
              }`}
              onEnded={() => setPlaying2(false)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
