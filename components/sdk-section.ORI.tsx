"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animation-variants";
import Image from "next/image";

export function SdkSection() {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopIframeRef = useRef<HTMLIFrameElement>(null);
  const mobileIframeRef = useRef<HTMLIFrameElement>(null);

  // URL video dari Google Drive dengan format embed
  // const VIDEO_URL = "https://drive.google.com/file/d/13cPkD5uvrr6knKM92Ebu7K8xtODDfhAa/preview"
  const VIDEO_URL = "https://cdn.pixabay.com/video/2025/02/12/257893.mp4";

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          if (document.fullscreenElement === null) {
            currentVideo.requestFullscreen();
          } else if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
        case "escape":
          if (isDesktop) {
            setIsPlaying(false);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, isDesktop]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      const currentIframe = isDesktop
        ? desktopIframeRef.current
        : mobileIframeRef.current;
      if (!currentIframe) return;

      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          // Toggle video play/pause
          setIsVideoPaused((prev) => !prev);
          currentIframe.contentWindow?.postMessage(
            {
              event: "command",
              func: isVideoPaused ? "playVideo" : "pauseVideo",
            },
            "*"
          );
          break;
        case "escape":
          if (isDesktop) {
            setIsPlaying(false);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, isDesktop, isVideoPaused]);

  const laptopVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: isPlaying ? 0 : isDesktop ? 25 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: isPlaying ? 0 : isDesktop ? 15 : 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 3) {
        setIsVideoReady(true);
      } else {
        video.addEventListener("canplay", () => {
          setIsVideoReady(true);
        });
      }
    }
    return () => {
      if (video) {
        video.removeEventListener("canplay", () => {
          setIsVideoReady(true);
        });
      }
    };
  }, []);

  return (
    <section
      className="py-12 sm:py-16 md:py-24 mt-20 sm:mt-24 md:mt-32 bg-black"
      id="sdk"
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Frame Container */}
        <div className="relative w-full max-w-[375px] sm:max-w-[768px] lg:max-w-[1280px] h-[400px] sm:h-[500px] lg:h-[651px] mx-auto">
          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-100px" }}
            variants={staggerContainer}
            className="relative z-10 flex flex-col items-center justify-start mb-8 sm:mb-12 lg:mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-[64px] font-bold tracking-tight text-white mb-2 sm:mb-4 font-manrope"
            >
              PESTO&apos;S SDK
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg lg:text-xl text-[#AFAFAF] text-center max-w-[300px] sm:max-w-none"
            >
              No Web App - Just Pure SDK for Maximum Customization
            </motion.p>
          </motion.div>

          {/* Laptop Screen Container */}
          <motion.div
            className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
            style={{
              perspective: isPlaying ? "none" : isDesktop ? "1000px" : "none",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-100px" }}
          >
            <motion.div
              className="absolute inset-0 bg-[#1a2e2e] rounded-xl sm:rounded-2xl overflow-hidden"
              variants={laptopVariants}
              style={{
                transformOrigin: isPlaying
                  ? "center center"
                  : isDesktop
                  ? "center bottom"
                  : "center center",
              }}
            >
              {/* Video Placeholder with Trading Chart */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative w-full h-full bg-black"
              >
                {!isPlaying ? (
                  <>
                    <Image
                      src="/chart.jpg"
                      alt="SDK visualization"
                      fill
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

                    {/* Play Button */}
                    <motion.button
                      onClick={() => setIsPlaying(true)}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                        <div className="absolute inset-0 rounded-full bg-[#95fff7]/20 blur-md" />
                        <div className="relative w-full h-full rounded-full bg-[#0f2c2c] border-2 border-[#95fff7] flex items-center justify-center">
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ml-0.5 sm:ml-1 text-[#95fff7]" />
                        </div>
                      </div>
                    </motion.button>
                  </>
                ) : (
                  <>
                    {/* Video untuk Mobile dan Tablet */}
                    <div className="block lg:hidden w-full h-full">
                      <div className="relative w-full h-full flex items-center justify-center bg-black">
                        <div className="relative w-full aspect-video max-h-[90%]">
                          {/* <iframe
                            ref={mobileIframeRef}
                            src={VIDEO_URL}
                            className="absolute inset-0 w-full h-full rounded-lg"
                            allow="autoplay"
                            allowFullScreen
                            style={{ maxHeight: "calc(100vh - 200px)" }}
                          /> */}
                          <div className="absolute inset-0 w-full h-full rounded-lg">
                            <video
                              ref={mobileVideoRef}
                              autoPlay
                              muted
                              loop
                              playsInline
                              className="w-full h-full object-cover object-center z-2"
                            >
                              <source src={VIDEO_URL} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            {!isVideoReady && (
                              <div className="absolute inset-0 flex items-center justify-center z-10">
                                <div className="w-[40px] h-[40px] border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                              </div>
                            )}
                            <div
                              className={`inset-0 transition-opacity duration-500 ease-linear ${
                                isVideoReady ? "opacity-0" : "opacity-100"
                              }`}
                              style={{ position: "absolute", zIndex: 1 }}
                            >
                              <Image
                                src="/chart.jpg"
                                alt="Fallback image"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Placeholder untuk Desktop */}
                    <div className="hidden lg:block">
                      <Image
                        src="/chart.jpg"
                        alt="SDK visualization"
                        fill
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Video Modal - Hanya untuk Desktop */}
          {isPlaying && (
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center"
              >
                <motion.div
                  className="relative w-[80%] max-w-[1280px]"
                  initial={{
                    scale: 0.5,
                    y: "calc(50vh - 50%)",
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    scale: 0.5,
                    y: "calc(50vh - 50%)",
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="fixed top-8 right-8 text-white/60 hover:text-white text-base flex items-center gap-2 group z-[45]"
                  >
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/70 hover:border-white/20 transition-all">
                      <span className="text-3xl leading-none mb-0.5">×</span>
                    </div>
                  </button>

                  {/* Video Container dengan Aspect Ratio 16:9 */}
                  <div className="relative w-full pt-[56.25%] bg-black rounded-2xl overflow-hidden">
                    {/* <iframe
                      ref={desktopIframeRef}
                      src={VIDEO_URL}
                      className="absolute top-0 left-0 w-full h-full border border-[#95fff7]/30 hover:border-[#95fff7]/50 transition-colors"
                      allow="autoplay"
                      allowFullScreen
                    /> */}

                    <div className="absolute top-0 left-0 w-full h-full border border-[#95fff7]/30 hover:border-[#95fff7]/50 transition-colors">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover object-center z-2"
                      >
                        <source src={VIDEO_URL} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      {!isVideoReady && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="w-[40px] h-[40px] border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                        </div>
                      )}
                      <div
                        className={`inset-0 transition-opacity duration-500 ease-linear ${
                          isVideoReady ? "opacity-0" : "opacity-100"
                        }`}
                        style={{ position: "absolute", zIndex: 1 }}
                      >
                        <Image
                          src="/chart.jpg"
                          alt="Fallback image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
