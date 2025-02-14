"use client"

import { motion } from "framer-motion"
import type React from "react" // Import React
import Image from "next/image"

const navVariants = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const navItemVariants = {
  hidden: {
    y: -10,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export function Navigation() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <motion.nav
      className="relative bg-black/80 backdrop-blur-sm border-b border-[#2D3748]/50"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 sm:h-20 md:h-24">
          <motion.div
            className="flex items-center space-x-4 sm:space-x-8 md:space-x-12 lg:space-x-16"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            <motion.a
              href="#features"
              onClick={(e) => scrollToSection(e, "features")}
              className="text-[#7BA194] hover:text-[#95fff7] transition-colors text-sm sm:text-base md:text-lg"
              variants={navItemVariants}
            >
              Features
            </motion.a>
            <motion.a
              href="#agents"
              onClick={(e) => scrollToSection(e, "agents")}
              className="text-[#7BA194] hover:text-[#95fff7] transition-colors text-sm sm:text-base md:text-lg"
              variants={navItemVariants}
            >
              Agents
            </motion.a>

            <motion.div
              className="mx-2 sm:mx-4 md:mx-6 lg:mx-8"
              variants={navItemVariants}
            >
              <Image 
                src="/pesto-logo-ai.png"
                alt="Pesto Logo"
                width={160}
                height={50}
                className="w-[120px] sm:w-[140px] md:w-[180px] h-auto mix-blend-plus-lighter transition-all duration-300 hover:scale-110 hover:brightness-125 brightness-[1.2] contrast-[1.1]"
                priority
                style={{ 
                  backgroundColor: 'transparent'
                }}
              />
            </motion.div>

            <motion.a
              href="#sdk"
              onClick={(e) => scrollToSection(e, "sdk")}
              className="text-[#7BA194] hover:text-[#95fff7] transition-colors text-sm sm:text-base md:text-lg"
              variants={navItemVariants}
            >
              SDK
            </motion.a>
            <motion.a
              href="#faq"
              onClick={(e) => scrollToSection(e, "faq")}
              className="text-[#7BA194] hover:text-[#95fff7] transition-colors text-sm sm:text-base md:text-lg"
              variants={navItemVariants}
            >
              FAQ
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Glow Effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#95fff7]/20 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.nav>
  )
}