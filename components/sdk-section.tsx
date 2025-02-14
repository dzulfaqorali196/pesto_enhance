"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, X, Loader2 } from "lucide-react"; // Loader2 for spinning animation
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animation-variants";
import Image from "next/image";

export function SdkSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" && window.innerWidth >= 1024
  );
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const VIDEO_URL = "https://cdn.pixabay.com/video/2025/02/12/257893.mp4";

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fix: Memoize handleClose with useCallback to prevent infinite re-renders
  const handleClose = useCallback(() => {
    const currentVideo = isDesktop ? videoRef.current : mobileVideoRef.current;
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }
    setIsPlaying(false);
    setIsLoading(false);
  }, [isDesktop]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      const currentVideo = isDesktop
        ? videoRef.current
        : mobileVideoRef.current;
      if (!currentVideo) return;

      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          if (currentVideo.paused) {
            currentVideo.play();
          } else {
            currentVideo.pause();
          }
          break;
        case "f":
          e.preventDefault();
          if (document.fullscreenElement) {
            document.exitFullscreen?.();
          } else {
            currentVideo.requestFullscreen?.();
          }
          break;
        case "escape":
          handleClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, isDesktop, handleClose]);

  return (
    <section className="py-12 sm:py-16 md:py-24 mt-20 bg-black" id="sdk">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white"
          >
            PESTO&apos;S SDK
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-400 max-w-lg mx-auto"
          >
            No Web App - Just Pure SDK for Maximum Customization
          </motion.p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto h-[600px] aspec-video rounded-lg overflow-hidden shadow-lg bg-gray-900">
          {!isPlaying ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/chart.jpg"
                alt="SDK visualization"
                layout="fill"
                className="object-cover opacity-80"
              />
              <motion.button
                onClick={() => setIsPlaying(true)}
                className="absolute flex items-center justify-center bg-black bg-opacity-50 p-4 rounded-full border border-gray-200 hover:scale-110 transition"
              >
                <Play className="w-10 h-10 text-white" />
              </motion.button>
            </div>
          ) : (
            <div className="relative w-full h-full">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 bg-black bg-opacity-70 p-2 rounded-full text-white hover:bg-opacity-100 transition z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Loading Spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
              )}

              {/* Video */}
              <video
                ref={isDesktop ? videoRef : mobileVideoRef}
                autoPlay
                muted={false}
                loop
                playsInline
                className="w-full h-full object-cover z-0"
                onWaiting={() => setIsLoading(true)} // Show loading spinner
                onCanPlay={() => setIsLoading(false)} // Hide loading spinner
              >
                <source src={VIDEO_URL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
