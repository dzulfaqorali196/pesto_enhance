"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animation-variants";
import dynamic from "next/dynamic";

// Lazy load components with loading fallback
const AITradeCard = dynamic(() => import("./card-carousel/ai-trade-card"), {
  loading: () => (
    <div className="w-full h-full bg-black/50 animate-pulse rounded-xl" />
  ),
  ssr: false,
});
const PreBuiltAgentsCard = dynamic(
  () => import("./card-carousel/pre-built-agents-card"),
  {
    loading: () => (
      <div className="w-full h-full bg-black/50 animate-pulse rounded-xl" />
    ),
    ssr: false,
  }
);
const CexDexCard = dynamic(() => import("./card-carousel/cex-dex-card"), {
  loading: () => (
    <div className="w-full h-full bg-black/50 animate-pulse rounded-xl" />
  ),
  ssr: false,
});
const CustomizableSdkCard = dynamic(
  () => import("./card-carousel/customizable-sdk-card"),
  {
    loading: () => (
      <div className="w-full h-full bg-black/50 animate-pulse rounded-xl" />
    ),
    ssr: false,
  }
);
const HighPerformanceCard = dynamic(
  () => import("./card-carousel/high-performance-card"),
  {
    loading: () => (
      <div className="w-full h-full bg-black/50 animate-pulse rounded-xl" />
    ),
    ssr: false,
  }
);

const carouselCards = [
  {
    id: 1,
    component: AITradeCard,
    leftIcon: "/Carousel/left-ai-trade-icon.png",
    rightIcon: "/Carousel/right-ai-trade-icon.png",
  },
  {
    id: 2,
    component: PreBuiltAgentsCard,
    leftIcon: "/Carousel/left-prebuilt-icon.png",
    rightIcon: "/Carousel/right-prebuilt-icon.png",
  },
  {
    id: 3,
    component: CexDexCard,
    leftIcon: "/Carousel/left-cex-icon.png",
    rightIcon: "/Carousel/right-cex-icon.png",
  },
  {
    id: 4,
    component: CustomizableSdkCard,
    leftIcon: "/Carousel/left-sdk-icon.png",
    rightIcon: "/Carousel/right-sdk-icon.png",
  },
  {
    id: 5,
    component: HighPerformanceCard,
    leftIcon: "/Carousel/left-high-icon.png",
    rightIcon: "/Carousel/right-high-icon.png",
  },
];

export default function FeaturesCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    // Debounce resize event
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    const section = document.getElementById("features");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedIndex((prev) =>
      prev === 0 ? carouselCards.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 700);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedIndex((prev) =>
      prev === carouselCards.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 700);
  };

  // Memoize touch handlers
  const touchHandlers = useMemo(
    () => ({
      handleTouchStart: (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
      },
      handleTouchMove: (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
      },
      handleTouchEnd: () => {
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
      },
    }),
    [touchStart, touchEnd]
  );

  // Memoize transform calculation
  const getTransform = useMemo(
    () => (isLeft: boolean, isRight: boolean) => {
      if (windowWidth >= 1024) {
        if (isLeft)
          return "translateX(-85%) translateY(-24px) rotateY(25deg) scale(0.85)";
        if (isRight)
          return "translateX(85%) translateY(-24px) rotateY(-25deg) scale(0.85)";
        return "translateX(0) translateY(-24px) rotateY(0deg) scale(1)";
      }

      if (windowWidth >= 768) {
        if (isLeft)
          return "translateX(-95%) translateY(-16px) rotateY(0deg) scale(1)";
        if (isRight)
          return "translateX(95%) translateY(-16px) rotateY(0deg) scale(1)";
        return "translateX(0) translateY(-16px) rotateY(0deg) scale(1)";
      }

      if (isLeft)
        return "translateX(-150%) translateY(-12px) rotateY(0deg) scale(1)";
      if (isRight)
        return "translateX(150%) translateY(-12px) rotateY(0deg) scale(1)";
      return "translateX(0) translateY(-12px) rotateY(0deg) scale(0.9)";
    },
    [windowWidth]
  );

  const animationProps = shouldReduceMotion
    ? {
        duration: 0.1,
        ease: "linear",
      }
    : {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      };

  return (
    <section
      className="bg-black mb-40 sm:mb-48 md:mb-56 pt-6 sm:pt-0"
      id="features"
    >
      <div className="container mx-auto px-2 sm:px-6 md:px-8 lg:px-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mt-0 sm:mt-6 md:mt-8 max-w-[300px] sm:max-w-none mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-3xl md:text-4xl lg:text-[64px] font-bold tracking-tight text-white leading-[1.2] sm:leading-[1.1] md:leading-[0.9] mb-2 sm:mb-6 md:mb-8 font-manrope"
          >
            WHY YOU SHOULD USE
            <br className="hidden sm:block" />{" "}
            <span className="text-[#95fff7]">PESTO SDK</span>?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-base lg:text-xl text-[#AFAFAF] text-center max-w-[280px] sm:max-w-none mx-auto mb-1 sm:mb-0"
          >
            Build Smarter, More Efficient Trading Strategies
          </motion.p>
        </motion.div>

        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={animationProps}
            className="relative flex justify-center items-center h-[280px] sm:h-[500px] md:h-[600px] lg:h-[750px] perspective-[2000px] -mt-20 -mb-16 sm:-mt-48 md:-mt-56 lg:-mt-64"
            onTouchStart={touchHandlers.handleTouchStart}
            onTouchMove={touchHandlers.handleTouchMove}
            onTouchEnd={touchHandlers.handleTouchEnd}
            onContextMenu={(e) => {
              e.preventDefault();
              handlePrevious();
            }}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("button")) return;
              handleNext();
            }}
          >
            <div className="relative w-[746px]">
              {carouselCards.map((card, index) => {
                const offset =
                  (index - selectedIndex + carouselCards.length) %
                  carouselCards.length;
                const isSelected = offset === 0;
                const isLeft =
                  offset === -1 || offset === carouselCards.length - 1;
                const isRight =
                  offset === 1 || offset === -(carouselCards.length - 1);

                if (!isSelected && !isLeft && !isRight) return null;

                const CardComponent = card.component;
                const transform = getTransform(isLeft, isRight);

                return (
                  <div
                    key={card.id}
                    className={`absolute top-0 left-0 w-full ${
                      isSelected ? "z-30 opacity-100" : "z-10 opacity-100"
                    } ${
                      ((windowWidth >= 768 && windowWidth < 1024) ||
                        windowWidth <= 425) &&
                      !isSelected
                        ? "overflow-hidden max-w-[50%] pointer-events-none"
                        : ""
                    }`}
                    style={{
                      transform,
                      transformStyle: "preserve-3d",
                      transition: `all ${animationProps.duration}s ${animationProps.ease}`,
                      clipPath:
                        ((windowWidth >= 768 && windowWidth < 1024) ||
                          windowWidth <= 425) &&
                        !isSelected
                          ? isLeft
                            ? "inset(0 100% 0 0)"
                            : "inset(0 0 0 100%)"
                          : "none",
                      visibility:
                        windowWidth <= 425 && !isSelected
                          ? "hidden"
                          : "visible",
                      opacity: windowWidth >= 1024 && !isSelected ? "0.7" : "1",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div
                      className={`transition-all duration-700 ease-in-out ${
                        !isSelected && windowWidth >= 1024
                          ? "brightness-75 saturate-75 hover:brightness-90 hover:saturate-90"
                          : ""
                      }`}
                    >
                      <CardComponent />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={handlePrevious}
              aria-label="Previous slide"
              title="View previous slide"
              className="absolute left-1/2 top-[85%] sm:top-[76%] md:top-[85%] lg:top-[76%] -translate-y-1/2 -translate-x-[calc(50%+145px)] sm:-translate-x-[calc(50%+400px)] md:-translate-x-[calc(50%+335px)] lg:-translate-x-[calc(50%+400px)] w-8 sm:w-12 md:w-16 lg:w-20 h-8 sm:h-12 md:h-16 lg:h-20 rounded-full bg-black border-2 sm:border-[3px] border-[#95FFF7]/40 flex items-center justify-center z-30 shadow-[0_0_20px_rgba(149,255,247,0.25)] sm:shadow-[0_0_25px_rgba(149,255,247,0.3)] lg:shadow-[0_0_30px_rgba(149,255,247,0.3)] hover:border-[#95FFF7]/60 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-4 sm:w-7 md:w-9 lg:w-10 h-4 sm:h-7 md:h-9 lg:h-10 text-[#95FFF7] group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              title="View next slide"
              className="absolute left-1/2 top-[85%] sm:top-[76%] md:top-[85%] lg:top-[76%] -translate-y-1/2 translate-x-[calc(50%+110px)] sm:translate-x-[calc(50%+320px)] md:translate-x-[calc(50%+275px)] lg:translate-x-[calc(50%+320px)] w-8 sm:w-12 md:w-16 lg:w-20 h-8 sm:h-12 md:h-16 lg:h-20 rounded-full bg-black border-2 sm:border-[3px] border-[#95FFF7]/40 flex items-center justify-center z-30 shadow-[0_0_20px_rgba(149,255,247,0.25)] sm:shadow-[0_0_25px_rgba(149,255,247,0.3)] lg:shadow-[0_0_30px_rgba(149,255,247,0.3)] hover:border-[#95FFF7]/60 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isAnimating}
            >
              <ChevronRight className="w-4 sm:w-7 md:w-9 lg:w-10 h-4 sm:h-7 md:h-9 lg:h-10 text-[#95FFF7] group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
