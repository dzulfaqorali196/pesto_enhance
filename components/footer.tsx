"use client";

import { useState } from "react";
import { Github } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animation-variants";
import Link from "next/link";

interface FooterProps {
  showCTA?: boolean;
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}

const SocialLink = ({
  href,
  icon,
  label,
  external = false,
}: SocialLinkProps) => {
  const shouldReduceMotion = useReducedMotion();

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.a
      href={href}
      className="bg-[#1a2e2e]/50 p-2.5 sm:p-2.5 rounded-lg hover:bg-[#1a2e2e] transition-all duration-300 group"
      aria-label={label}
      variants={socialVariants}
      whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
      style={{ willChange: "transform" }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon}
    </motion.a>
  );
};

export function Footer({ showCTA = true }: FooterProps) {
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0.1 : 0.2,
        duration: shouldReduceMotion ? 0.1 : 0.5,
      },
    },
  };

  return (
    <footer className="bg-black py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {showCTA && (
        <motion.div
          className="container mx-auto px-6 sm:px-6 md:px-8 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12"
            variants={fadeInUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-4">
              <motion.div
                className="text-white px-4 sm:px-0"
                variants={fadeInUp}
              >
                START BUILDING WITH
              </motion.div>
              <motion.div
                className="text-[#95fff7] px-4 sm:px-0"
                variants={fadeInUp}
              >
                PESTO SDK TODAY
              </motion.div>
            </h2>
            <motion.p
              className="text-gray-400 text-sm sm:text-base max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-8 px-4 sm:px-0"
              variants={fadeInUp}
            >
              AI-Powered Trading Agents on Solana with On-Chain AI SDK for
              Institutional-Grade Trade Optimization
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-6 sm:px-0"
              variants={fadeInUp}
            >
              <Link
                href="https://github.com/elitezchen/pestoai_sdk"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 px-4 py-2 w-full sm:w-[200px] md:w-[232px] h-[48px] sm:h-[52px] md:h-[56px] bg-[#1a2e2e] text-[#95fff7] hover:bg-[#95fff7] hover:text-black transition-colors text-sm sm:text-base"
                style={{ willChange: "transform, background-color" }}
              >
                Get SDK on Github
              </Link>
              <Link
                href="https://docs.pestoai.fun/"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background px-4 py-2 w-full sm:w-[200px] md:w-[232px] h-[48px] sm:h-[52px] md:h-[56px] text-[#95fff7] border-[#95fff7] hover:bg-[#95fff7] hover:text-black transition-colors text-sm sm:text-base"
                style={{ willChange: "transform, background-color" }}
              >
                Read Documentation
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className="absolute bottom-0 left-0 right-0"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: shouldReduceMotion ? 0.1 : 0.8,
          ease: "easeOut",
        }}
      >
        {!bgImageLoaded && (
          <div className="w-full h-[150px] sm:h-[175px] md:h-[200px] lg:h-[250px] bg-black/50 animate-pulse" />
        )}
        <Image
          src="/footer.jpg"
          alt="Footer grid"
          width={1920}
          height={200}
          className={`object-contain object-center transition-opacity duration-500 ${
            bgImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadingComplete={() => setBgImageLoaded(true)}
          priority
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="container mx-auto px-6 sm:px-6 md:px-8">
          <motion.div
            className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 sm:gap-0 py-6 sm:py-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={staggerContainer}
          >
            <motion.div
              className="text-gray-400 text-xs sm:text-sm text-center sm:text-left"
              variants={fadeInUp}
            >
              Powered by <span className="text-[#95fff7]">Solana</span> | 2025
              Pesto AI
            </motion.div>
            <motion.div
              className="flex items-center gap-4 sm:gap-4"
              variants={staggerContainer}
            >
              <SocialLink
                href="#"
                icon={
                  <svg
                    className="w-5 h-5 sm:w-5 sm:h-5 text-[#95fff7] transition-all duration-300 group-hover:filter group-hover:drop-shadow-[0_0_8px_#95fff7]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.05-.308-.346-.11l-6.4 4.02-2.76-.918c-.598-.187-.608-.598.126-.885l10.78-4.156c.503-.18.943.126.786.885z" />
                  </svg>
                }
                label="Telegram"
              />
              <SocialLink
                href="#"
                icon={
                  <svg
                    className="w-5 h-5 sm:w-5 sm:h-5 text-[#95fff7] transition-all duration-300 group-hover:filter group-hover:drop-shadow-[0_0_8px_#95fff7]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                }
                label="X (Twitter)"
              />
              <SocialLink
                href="https://github.com/elitezchen/pestoai_sdk"
                icon={
                  <Github className="w-5 h-5 sm:w-5 sm:h-5 text-[#95fff7] transition-all duration-300 group-hover:filter group-hover:drop-shadow-[0_0_8px_#95fff7]" />
                }
                label="Github"
                external
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
