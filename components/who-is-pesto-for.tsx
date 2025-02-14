"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Minus } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { fadeInUp, slideInFromLeft, slideInFromRight, staggerContainer } from "@/lib/animation-variants"

const categories = [
  {
    title: "Institutional Traders & Whales",
    description: "Build AI-driven execution strategies with high-liquidity agents",
  },
  {
    title: "Market Makers",
    description: "Reduce slippage & optimize liquidity provision using low-liquidity agents",
  },
  {
    title: "Quant Traders & Developers",
    description: "Deploy & modify AI trading bots with customized execution logic",
  },
]

export function WhoIsPestoFor() {
  const [expandedIndex, setExpandedIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [diamondLoaded, setDiamondLoaded] = useState(false)
  const [cubeLoaded, setCubeLoaded] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    const section = document.getElementById('who-is-pesto-for')
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  const animationProps = shouldReduceMotion ? { 
    duration: 0.1,
    ease: "linear"
  } : {
    duration: 0.3,
    ease: "easeInOut"
  }

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-[#000000] py-8 sm:py-12 md:py-16 relative overflow-hidden" 
      id="who-is-pesto-for"
    >
      <div className="container mx-auto px-4 max-w-6xl relative z-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-0">
          <motion.div 
            variants={slideInFromLeft}
            className="w-full lg:w-[45%]"
          >
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col mb-3 sm:mb-4 lg:mb-6"
            >
              <motion.h2 
                variants={fadeInUp} 
                className="text-3xl sm:text-4xl lg:text-[64px] font-bold tracking-tight text-white mb-2 sm:mb-4 font-manrope text-center lg:text-left"
              >
                WHO IS <span className="text-[#95fff7]">PESTO</span> FOR?
              </motion.h2>
              {isVisible && (
                <motion.div 
                  variants={fadeInUp}
                  className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[80px] lg:h-[80px] relative mx-auto lg:mx-0"
                >
                  {!diamondLoaded && (
                    <div className="absolute inset-0 bg-[#1D1C20] animate-pulse rounded-lg" />
                  )}
                  <Image
                    src="/Diamond.png"
                    alt="Diamond icon"
                    fill
                    className={`object-contain transition-opacity duration-300 ${
                      diamondLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    sizes="(max-width: 640px) 50px, (max-width: 1024px) 60px, 80px"
                    onLoadingComplete={() => setDiamondLoaded(true)}
                    priority
                  />
                </motion.div>
              )}
            </motion.div>
            {categories.map((category, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="mb-3 sm:mb-4 lg:mb-6"
              >
                <div
                  className="flex items-center cursor-pointer px-3 sm:px-4 lg:px-0 transition-colors duration-200 hover:bg-white/5 rounded-lg py-2"
                  onClick={() => setExpandedIndex(index === expandedIndex ? -1 : index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setExpandedIndex(index === expandedIndex ? -1 : index)
                    }
                  }}
                >
                  <h3
                    className={`text-xl sm:text-2xl font-semibold ${
                      index === expandedIndex ? "text-[#95fff7]" : "text-white"
                    } flex-grow transition-colors duration-200`}
                  >
                    {category.title}
                  </h3>
                  {index === expandedIndex ? (
                    <Minus className="text-[#95fff7] w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200" />
                  ) : (
                    <ArrowUpRight className="text-[#95fff7] w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200" />
                  )}
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    maxHeight: index === expandedIndex ? "60px" : "0px",
                    opacity: index === expandedIndex ? 1 : 0,
                  }}
                  transition={animationProps}
                  className="overflow-hidden px-3 sm:px-4 lg:px-0"
                >
                  <p className="text-[#AFAFAF] mt-2 text-sm sm:text-base">{category.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          {isVisible && (
            <motion.div 
              variants={slideInFromRight}
              className="w-full lg:w-[50%] flex justify-center lg:justify-end mt-4 lg:mt-0"
            >
              <motion.div 
                className="relative w-[240px] h-[260px] sm:w-[360px] sm:h-[390px] lg:w-[480px] lg:h-[519px]"
              >
                {!cubeLoaded && (
                  <div className="absolute inset-0 bg-[#1D1C20] animate-pulse rounded-lg" />
                )}
                <Image
                  src="/cube.png"
                  alt="Shiny cube"
                  fill
                  className={`object-contain transition-opacity duration-300 ${
                    cubeLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 360px, 480px"
                  onLoadingComplete={() => setCubeLoaded(true)}
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  )
}