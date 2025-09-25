"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force video to load and play on iOS
    const playVideo = async () => {
      try {
        video.load();
        await video.play();
      } catch (error) {
        console.log("Autoplay prevented:", error);
        const playOnInteraction = async () => {
          try {
            await video.play();
            document.removeEventListener("touchstart", playOnInteraction);
            document.removeEventListener("click", playOnInteraction);
          } catch (e) {
            console.log("Play on interaction failed:", e);
          }
        };
        document.addEventListener("touchstart", playOnInteraction, { once: true });
        document.addEventListener("click", playOnInteraction, { once: true });
      }
    };

    playVideo();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/background.webm" type="video/webm" />
        <source src="/background-compressed.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 px-4">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold text-center drop-shadow-2xl">
          Constloop
        </h1>
      </div>
    </div>
  );
}
