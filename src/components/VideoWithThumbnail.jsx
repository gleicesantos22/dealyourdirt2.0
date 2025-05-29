"use client";

import React, { useRef, useState } from "react";

export default function VideoWithThumbnail() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = async () => {
    if (!videoRef.current) return;

    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    } catch (err) {
      console.error("Play error:", err);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "600px",
        height: "340px",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      {/* Thumbnail */}
      {!playing && (
        <img
          src="/thumbnail1.png"
          alt="Video thumbnail"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            cursor: "pointer",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
          onClick={togglePlay}
        />
      )}

      {/* Play button */}
      {!playing && (
        <button
          onClick={togglePlay}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
            backgroundColor: "rgba(0,0,0,0.5)",
            border: "none",
            borderRadius: "50%",
            padding: "20px",
            cursor: "pointer",
          }}
          aria-label="Play video"
        >
          ▶
        </button>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        src="/video1.mp4"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "12px",
          display: playing ? "block" : "none",
        }}
        controls
        muted
        playsInline
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
