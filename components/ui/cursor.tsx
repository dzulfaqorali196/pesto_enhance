"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const previousPositions = useRef<Array<{ x: number; y: number }>>([])
  const maxTrailLength = 10 // Jumlah posisi yang disimpan untuk trail effect

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if hovering over video element or its parent with hide-custom-cursor class
      const shouldHideCursor = target.classList.contains('hide-custom-cursor') ||
                             target.closest('.hide-custom-cursor') !== null;
      
      if (shouldHideCursor) {
        setIsVisible(false);
        return;
      }

      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)
      
      // Update trail positions
      previousPositions.current = [
        newPosition,
        ...previousPositions.current.slice(0, maxTrailLength - 1)
      ]
      
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible])

  // Fungsi untuk mendapatkan posisi dengan delay
  const getDelayedPosition = (delay: number) => {
    const index = Math.min(
      Math.floor(delay * previousPositions.current.length),
      previousPositions.current.length - 1
    )
    return previousPositions.current[index] || mousePosition
  }

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        .hide-custom-cursor, 
        .hide-custom-cursor * {
          cursor: auto !important;
        }
      `}</style>
      {/* Dot kecil - Leader */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#95fff7] rounded-full pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "tween",
          duration: 0,
        }}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Lingkaran utama - First Follower */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-[#95fff7] rounded-full pointer-events-none z-[100]"
        animate={{
          x: getDelayedPosition(0.2).x - 16,
          y: getDelayedPosition(0.2).y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 25,
          mass: 0.5,
        }}
        style={{
          opacity: isVisible ? 0.8 : 0,
        }}
      />

      {/* Lingkaran blur neon - Last Follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[90]"
        animate={{
          x: getDelayedPosition(0.4).x - 32,
          y: getDelayedPosition(0.4).y - 32,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.8,
        }}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Layer blur pertama - lebih tegas */}
        <div className="w-16 h-16 rounded-full bg-[#95fff7] opacity-25 blur-md" />
        
        {/* Layer blur kedua - efek outer glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#95fff7] opacity-15 blur-xl" />
        
        {/* Layer blur ketiga - pulse effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#95fff7] opacity-10 blur-2xl animate-pulse" />
      </motion.div>
    </>
  )
} 