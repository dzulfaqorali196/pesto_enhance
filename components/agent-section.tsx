"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animation-variants";
import { Spinner } from "@/components/ui/spinner";

// Lazy load Spline component
const Spline = lazy(() => import("@splinetool/react-spline"));

const agents = [
  {
    id: 1,
    name: "Titan",
    image: "/agent/TITAN.png",
    spline: "uWtUPmEIhWF4Rx3H",
    description: [
      "Our most versatile agent,",
      "designed to adapt to any market condition",
      "and capitalize on emerging opportunities.",
    ].join(" "),
    features: [
      "Optimized for highly volatile",
      "Low-market-cap assets",
      "Leveraging momentum and social sentiment",
    ],
  },
  {
    id: 2,
    name: "Apollo",
    image: "/agent/APOLLO.png",
    spline: "M-K9pd0e08TgVLnO",
    description: [
      "Specialized in high-risk,",
      "high-reward meme coin trading",
      "with advanced sentiment analysis.",
    ].join(" "),
    features: [
      "Optimized for highly volatile",
      "Low-market-cap assets",
      "Leveraging momentum and social sentiment",
    ],
  },
  {
    id: 3,
    name: "Shade",
    image: "/agent/SHADE.png",
    spline: "HF18Pt9jtGphfsbk",
    description: [
      "Expert in navigating low liquidity markets",
      "while minimizing slippage",
      "and maximizing returns.",
    ].join(" "),
    features: [
      "Optimized for highly volatile",
      "Low-market-cap assets",
      "Leveraging momentum and social sentiment",
    ],
  },
];

export function AgentSection() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const [loadingStates, setLoadingStates] = useState(
    agents.reduce((acc, agent) => {
      acc[agent.id] = true;
      return acc;
    }, {} as Record<number, boolean>)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const section = document.getElementById('agents');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handleSplineLoad = (id: number) => {
    setLoadingStates((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedIndex((prev) => (prev === 0 ? agents.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedIndex((prev) => (prev === agents.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      handleNext();
    } else {
      handlePrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section
      className="py-6 sm:py-8 md:py-12 mt-20 sm:mt-24 md:mt-32 mb-20 sm:mb-24 md:mb-32 bg-black overflow-hidden"
      id="agents"
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-1 sm:mb-2 md:mb-3"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 font-manrope"
          >
            MEET <span className="text-[#95fff7]">OUR AGENTS</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-[#AFAFAF] text-base sm:text-lg md:text-xl"
          >
            Explore our pre-built agents available in the Pesto SDK
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative flex justify-center items-center h-[520px] sm:h-[650px] md:h-[750px] perspective-[2000px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onContextMenu={(e) => {
            e.preventDefault();
            handlePrevious();
          }}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("button")) return;
            handleNext();
          }}
        >
          <div className="relative w-[300px] sm:w-[400px] md:w-[473px] h-[420px] sm:h-[500px] md:h-[600px]">
            {agents.map((agent, index) => {
              const offset =
                (index - selectedIndex + agents.length) % agents.length;
              const isSelected = offset === 0;
              const isLeft = offset === -1 || offset === agents.length - 1;
              const isRight = offset === 1 || offset === -(agents.length - 1);

              return (
                <div
                  key={agent.id}
                  className={`absolute top-0 left-0 w-full transition-all duration-500 ease-out ${
                    isSelected
                      ? "z-20 opacity-100 scale-100 h-[480px] sm:h-[650px] md:h-[728px]"
                      : "opacity-70 scale-[0.85] h-[380px] sm:h-[500px] md:h-[540px]"
                  } ${
                    isLeft
                      ? "-translate-x-[calc(100%+16px)] sm:-translate-x-[calc(100%+24px)] md:-translate-x-[calc(100%+32px)] -translate-y-4 sm:-translate-y-8 md:-translate-y-12"
                      : ""
                  } ${
                    isRight
                      ? "translate-x-[calc(100%+16px)] sm:translate-x-[calc(100%+24px)] md:translate-x-[calc(100%+32px)] -translate-y-4 sm:-translate-y-8 md:-translate-y-12"
                      : ""
                  } ${!isSelected && !isLeft && !isRight ? "opacity-0" : ""}`}
                  style={{
                    transform: `${
                      isLeft
                        ? "translateX(-100%) translateY(-24px) rotateY(25deg) scale(0.85)"
                        : isRight
                        ? "translateX(100%) translateY(-24px) rotateY(-25deg) scale(0.85)"
                        : "translateX(0) rotateY(0deg) scale(1)"
                    }`,
                    transformStyle: "preserve-3d",
                    width: isSelected ? "100%" : "100%",
                  }}
                >
                  <div
                    className={`relative bg-gradient-to-t from-[#1E3937] via-[#1A2E2E] to-[#162726] rounded-t-none rounded-b-2xl h-full border overflow-hidden transition-all duration-500 group hover:scale-[1.02] hover:-translate-y-2 ${
                      isSelected
                        ? "border-[#95FFF7]/30 shadow-[0_0_30px_rgba(149,255,247,0.15)] hover:shadow-[0_0_40px_rgba(149,255,247,0.25)]"
                        : "border-[#95FFF7]/5 hover:border-[#95FFF7]/20"
                    }`}
                  >
                    <div className="absolute -top-8 inset-x-0 px-4 transition-transform duration-500 group-hover:scale-[1.02]">
                      <Image
                        src="/card-notch.png"
                        alt=""
                        width={473}
                        height={38}
                        className="w-full"
                        priority
                      />
                    </div>

                    <div
                      className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 ${
                        isSelected
                          ? "from-[#95FFF7]/20 via-[#95FFF7]/5 to-transparent opacity-100 group-hover:from-[#95FFF7]/30"
                          : "from-[#95FFF7]/5 to-transparent opacity-50 group-hover:opacity-70"
                      }`}
                    />

                    <div className="relative p-3 sm:p-5 md:p-6 pt-4 sm:pt-8 md:pt-10 flex flex-col h-full">
                      <h3
                        className={`text-base sm:text-lg md:text-2xl font-medium mb-2 sm:mb-3 md:mb-4 text-center tracking-wide flex-shrink-0 transition-all duration-500 group-hover:scale-105 ${
                          isSelected
                            ? "text-[#95fff7] group-hover:text-[#7de6de]"
                            : "text-[#AFAFAF] group-hover:text-[#95fff7]"
                        }`}
                      >
                        {agent.name}
                      </h3>

                      <div className="relative aspect-square mb-2 sm:mb-3 md:mb-4 flex-shrink-0 rounded-xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.03]">
                        {isSelected ? (
                          <>
                            {loadingStates[agent.id] && (
                              <div className="flex justify-center items-center h-full w-full">
                                <Spinner className="h-[50px] w-[50px] animate-spin" />
                              </div>
                            )}
                            {isVisible && (
                              <Suspense fallback={
                                <div className="flex justify-center items-center h-full w-full">
                                  <Spinner className="h-[50px] w-[50px] animate-spin" />
                                </div>
                              }>
                                <div className="w-full h-full flex items-center justify-center overflow-visible">
                                  <div className="transform-gpu origin-center">
                                    <Spline
                                      scene={`https://prod.spline.design/${agent.spline}/scene.splinecode`}
                                      onLoad={() => handleSplineLoad(agent.id)}
                                    />
                                  </div>
                                </div>
                              </Suspense>
                            )}
                          </>
                        ) : (
                          <Image
                            src={agent.image}
                            alt={agent.name}
                            fill
                            className={`object-cover transition-all duration-500 ${
                              !isSelected &&
                              "brightness-75 saturate-75 group-hover:brightness-90 group-hover:saturate-90"
                            }`}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <p
                        className={`text-[#AFAFAF] text-xs sm:text-sm md:text-base font-bold leading-relaxed mb-1.5 sm:mb-3 md:mb-4 transition-all duration-500 group-hover:text-white ${
                          isSelected ? "opacity-100" : "opacity-0 absolute"
                        }`}
                      >
                        {agent.description}
                      </p>

                      <ul
                        className={`space-y-1 sm:space-y-2 md:space-y-2.5 text-[#AFAFAF] pl-2 sm:pl-3 transition-all duration-500 ${
                          isSelected ? "flex-grow" : "absolute opacity-0"
                        }`}
                      >
                        {agent.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 transition-transform duration-300 hover:translate-x-1"
                          >
                            <span className="mt-[0.3rem] w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#95fff7] rounded-full shrink-0 group-hover:bg-[#7de6de]" />
                            <span className="text-xs sm:text-sm md:text-base tracking-wide font-medium group-hover:text-white">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handlePrevious}
            aria-label="Previous agent"
            title="View previous agent"
            className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[calc(50%+150px)] sm:-translate-x-[calc(50%+200px)] md:-translate-x-[calc(50%+250px)] w-12 sm:w-16 md:w-20 h-[40px] sm:h-[50px] md:h-[60px] rounded-full bg-[#95FFF7] flex items-center justify-center text-black z-30 shadow-[0_0_30px_rgba(149,255,247,0.4)] hover:bg-[#95FFF7]/90 transition-all group"
          >
            <ChevronLeft className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next agent"
            title="View next agent"
            className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-[calc(50%+100px)] sm:translate-x-[calc(50%+130px)] md:translate-x-[calc(50%+165px)] w-12 sm:w-16 md:w-20 h-[40px] sm:h-[50px] md:h-[60px] rounded-full bg-[#95FFF7] flex items-center justify-center text-black z-30 shadow-[0_0_30px_rgba(149,255,247,0.4)] hover:bg-[#95FFF7]/90 transition-all group"
          >
            <ChevronRight className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 group-hover:scale-110 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
