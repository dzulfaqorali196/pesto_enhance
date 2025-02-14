"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animation-variants"

const capabilities = [
  [
    { 
      icon: "/icons/robot-icon.png", 
      text: "AI-optimized order execution",
      width: 267
    },
    { 
      icon: "/icons/wallet-icon.png", 
      text: "Multi-signature & MPC wallet support",
      width: 311
    },
    { 
      icon: "/icons/search-icon.png", 
      text: "On-chain transparency & verifiable transactions",
      width: 355
    }
  ],
  [
    { 
      icon: "/icons/shield-icon.png",
      text: "MEV protection to prevent front-running",
      width: 330
    },
    { 
      icon: "/icons/clock-icon.png", 
      text: "Ultra-low latency (0.1s order processing)",
      width: 338
    },
    { 
      icon: "/icons/chart-icon.png",
      text: "99% execution efficiency",
      width: 257
    }
  ],
  [
    { 
      icon: "/icons/search-icon.png",
      text: "On-chain transparency & verifiable transactions",
      width: 355
    },
    { 
      icon: "/icons/robot-icon.png",
      text: "AI-optimized order execution",
      width: 267
    },
    { 
      icon: "/icons/wallet-icon.png", 
      text: "Multi-signature & MPC wallet support",
      width: 311
    }
  ]
]

export function CapabilitiesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    )

    const section = document.getElementById('capabilities')
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0.1 : 0.2
      }
    }
  }

  return (
    <section className="bg-black py-8 sm:py-12 md:py-16" id="capabilities">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl text-center sm:text-4xl lg:text-[64px] font-bold tracking-tight text-white mb-2 sm:mb-4 font-manrope"
          >
            THE <span className="text-[#95fff7]">CAPABILITIES</span> OF OUR SDK
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-[#AFAFAF] text-center mb-6 sm:mb-8 md:mb-10"
          >
            Build Smarter, More Efficient Trading Strategies
          </motion.p>
        </motion.div>

        {isVisible && (
          <div className="relative">
            {/* Left fade */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 md:w-48 bg-gradient-to-r from-black to-transparent z-10" 
            />
            
            {/* Right fade */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 md:w-48 bg-gradient-to-l from-black to-transparent z-10" 
            />
            
            {/* Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-col gap-4 sm:gap-6 md:gap-8 overflow-hidden"
            >
              {capabilities.map((row, rowIndex) => (
                <motion.div 
                  key={rowIndex} 
                  variants={cardVariants}
                  className={`flex gap-4 sm:gap-6 md:gap-8 ${
                    rowIndex % 2 === 0 
                      ? "animate-slide-right" 
                      : "animate-slide-left"
                  }`}
                >
                  {[...row, ...row].map((capability, index) => (
                    <motion.div
                      key={`${rowIndex}-${index}`}
                      whileHover={{ 
                        scale: shouldReduceMotion ? 1 : 1.02,
                        transition: { duration: 0.2 }
                      }}
                      className={`
                        h-[70px] sm:h-[84px] md:h-[98px] 
                        rounded-xl relative overflow-hidden group transition-all duration-300 flex-shrink-0
                        w-[${Math.floor(capability.width * 0.7)}px]
                        sm:w-[${Math.floor(capability.width * 0.85)}px]
                        md:w-[${capability.width}px]
                      `}
                      style={{
                        background: 'linear-gradient(135deg, rgba(26, 46, 46, 0.5) 0%, rgba(22, 39, 38, 0.8) 100%)',
                        boxShadow: `
                          0 8px 32px rgba(149, 255, 247, 0.1),
                          inset 0 0 32px rgba(149, 255, 247, 0.05)
                        `,
                        willChange: 'transform'
                      }}
                    >
                      {/* Glow overlay */}
                      <motion.div 
                        initial={false}
                        animate={{ opacity: 0 }}
                        whileHover={{ opacity: shouldReduceMotion ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                        style={{
                          background: 'radial-gradient(circle at center, rgba(149, 255, 247, 0.15) 0%, transparent 70%)',
                        }}
                      />
                      
                      {/* Glass effect */}
                      <div className="absolute inset-0 bg-[#95FFF7]/5 backdrop-blur-sm" />
                      
                      {/* Border glow */}
                      <div 
                        className="absolute inset-0 rounded-xl border border-[#95FFF7]/20 group-hover:border-[#95FFF7]/40 transition-colors duration-300"
                        style={{
                          boxShadow: 'inset 0 0 15px rgba(149, 255, 247, 0.1)',
                        }}
                      />
                      
                      <div className="relative z-10 flex items-center w-full h-full px-2 sm:px-3 md:px-4">
                        <motion.div 
                          whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
                          transition={{ duration: 0.2 }}
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0 bg-[#1a2e2e]/50 rounded-full mr-2 sm:mr-2.5 md:mr-3 group-hover:bg-[#1a2e2e]/70 transition-colors duration-300"
                        >
                          <Image 
                            src={capability.icon}
                            alt=""
                            width={48}
                            height={48}
                            className="text-[#95fff7] p-1.5 sm:p-2 md:p-2.5 group-hover:brightness-110 transition-all duration-300"
                            loading="lazy"
                          />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-xs sm:text-sm md:text-[15px] leading-tight group-hover:text-[#95fff7] transition-colors duration-300">
                            {capability.text}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}