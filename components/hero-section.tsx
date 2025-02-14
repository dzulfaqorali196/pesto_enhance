"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  slideInFromLeft,
} from "@/lib/animation-variants";
import Link from "next/link";
// const Spline = lazy(() => import("@splinetool/react-spline"));
const SplineHero = lazy(() => import("./spline-hero"));

export function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div className="object-cover w-full h-full">
          <div className="w-full h-screen relative">
            <div className="absolute inset-0 -translate-x-1/2 scale-[2.2] sm:-translate-x-1/3 sm:scale-[1.8] md:-translate-x-1/4 md:scale-[1.5] lg:translate-x-0 lg:scale-100 transform-gpu">
              <Suspense fallback={<div className="w-full h-full bg-black" />}>
                {/* <Spline scene="https://prod.spline.design/TxT5cYsEi29rt8np/scene.splinecode" /> */}
                <SplineHero />
              </Suspense>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative container mx-auto px-3 sm:px-6 lg:px-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="pt-24 sm:pt-32 md:pt-40 lg:pt-48"
        >
          <div className="max-w-[280px] sm:max-w-xl mx-auto lg:mx-0">
            <motion.h1
              variants={slideInFromLeft}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold tracking-tight text-white leading-[1.2] sm:leading-[1.1] md:leading-[0.9] mb-4 sm:mb-6"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              WELCOME TO PESTO
            </motion.h1>

            <motion.p
              variants={slideInFromLeft}
              className="text-xs sm:text-lg lg:text-xl text-[#AFAFAF] mb-4 sm:mb-6 lg:mb-8 leading-relaxed"
            >
              AI-Powered Trading Agents on Solana with On-Chain AI SDK for
              Institutional-Grade Trade Optimization
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
            >
              <Link
                href="https://github.com/elitezchen/pestoai_sdk"
                target="_blank"
                className="w-full sm:w-auto bg-[#95fff7] text-black px-3 sm:px-6 py-2 text-[10px] sm:text-sm font-medium rounded-md relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border border-transparent hover:bg-transparent hover:border-[#2D3748] hover:text-[#95fff7] hover:shadow-[0_0_20px_rgba(149,255,247,0.2)] peer/sdk peer-hover/docs:bg-transparent peer-hover/docs:border-[#2D3748] peer-hover/docs:text-[#95fff7]"
              >
                <span className="relative z-10">GET SDK</span>
              </Link>
              <Link
                href="https://docs.pestoai.fun/"
                target="_blank"
                className="w-full sm:w-auto border border-[#2D3748] text-[#95fff7] px-3 sm:px-6 py-2 text-[10px] sm:text-sm font-medium rounded-md relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-[#95fff7] hover:text-black hover:border-transparent hover:shadow-[0_0_20px_rgba(149,255,247,0.5)] peer/docs peer-hover/sdk:bg-[#95fff7] peer-hover/sdk:text-black peer-hover/sdk:border-transparent"
              >
                <span className="relative z-10">DOCS</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 2,
        }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-2 border-[#95fff7] rounded-full animate-pulse" />
      </motion.div>
    </div>
  );
}
