"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X, Plus } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const faqs = [
  {
    question: "What is this SDK used for?",
    answer:
      "This SDK is designed to optimize order execution for institutional traders and whales. It provides AI-driven execution strategies, multi-signature & MPC wallet support, ultra-low latency, and MEV protection to ensure secure and efficient trading.",
  },
  {
    question: "How do I integrate the SDK into my project?",
    answer:
      "Integration is straightforward. You can install the SDK via npm or yarn, and then import the necessary modules into your project. Detailed documentation and code examples are provided to guide you through the process.",
  },
  {
    question: "Can I customize the trading agents?",
    answer:
      "Yes, the SDK allows for extensive customization of trading agents. You can modify existing agents or create new ones to suit your specific trading strategies and requirements.",
  },
  {
    question: "Does the SDK support real-time market adaptation?",
    answer:
      "Absolutely. Our SDK incorporates advanced AI algorithms that continuously analyze market conditions and adapt trading strategies in real-time to optimize performance and minimize risks.",
  },
  {
    question: "How can I monitor agent performance and improve strategies?",
    answer:
      "The SDK includes comprehensive monitoring tools and analytics dashboards. These allow you to track agent performance, analyze trading patterns, and gain insights to refine and improve your strategies over time.",
  },
];

export function FaqSection() {
  const [openItem, setOpenItem] = useState<string>("item-0");
  const [isVisible, setIsVisible] = useState(false);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    const section = document.getElementById('faq');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0.05 : 0.1,
        delayChildren: shouldReduceMotion ? 0.1 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const contentVariants = {
    collapsed: { 
      opacity: 0, 
      y: -10,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.3,
        ease: [0.4, 0, 0.2, 1],
      }
    },
    expanded: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.3,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  };

  return (
    <section className="relative py-24 bg-black/90 overflow-hidden" id="faq">
      {/* Top blend gradient */}
      <div className="absolute inset-x-0 top-0 h-[300px] bg-gradient-to-b from-black via-black to-transparent z-[5]" />

      {/* Bottom blend gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-black via-black to-transparent z-[5]" />

      {/* Background Image with Loading State */}
      {isVisible && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1200px] z-[1]">
          {!bgImageLoaded && (
            <div className="absolute inset-0 bg-black/50 animate-pulse" />
          )}
          <Image
            src="/background-blur.png"
            alt="Background blur"
            fill
            className={`object-cover transition-opacity duration-500 ${
              bgImageLoaded ? 'opacity-70 blur-[3px]' : 'opacity-0'
            }`}
            onLoadingComplete={() => setBgImageLoaded(true)}
            priority
          />
        </div>
      )}

      {/* Subtle gradient overlay with smoother transition */}
      <div className="absolute inset-0 z-[2]">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#ff3366]/5 via-[#9933ff]/5 to-[#00ccff]/5" />
        <div className="absolute inset-0 backdrop-blur-[150px]" />
      </div>

      {/* Enhanced dark vignette with smoother gradient */}
      <div className="absolute inset-0 z-[3]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_40%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Additional ambient glow */}
      <div className="absolute inset-0 z-[4]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#95fff7]/5 via-transparent to-[#95fff7]/5" />
      </div>

      {/* Content */}
      {isVisible && (
        <div className="relative z-[10]">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h2
                className="text-3xl text-center sm:text-4xl lg:text-[64px] font-bold tracking-tight text-white mb-2 sm:mb-4 font-manrope"
                variants={itemVariants}
              >
                GOT QUESTIONS?
              </motion.h2>
              <motion.h3
                className="text-2xl text-center sm:text-3xl md:text-4xl font-bold text-[#95fff7] mb-4 sm:mb-6"
                variants={itemVariants}
              >
                WE&apos;VE GOT ANSWERS
              </motion.h3>
              <motion.p
                className="text-center text-gray-300/80 mb-8 sm:mb-10 md:mb-12 max-w-[90%] sm:max-w-xl md:max-w-2xl mx-auto text-sm sm:text-base"
                variants={itemVariants}
              >
                Explore our FAQ to learn more about integrating, customizing, and
                optimizing your trading experience with our SDK
              </motion.p>

              <Accordion
                type="single"
                collapsible
                value={openItem}
                onValueChange={setOpenItem}
              >
                {faqs.map((faq, index) => (
                  <motion.div
                    key={`item-${index}`}
                    variants={itemVariants}
                    custom={index}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className={`
                        mb-3 sm:mb-4 rounded-lg sm:rounded-xl overflow-hidden backdrop-blur-sm border 
                        transition-all duration-150 ease-in-out
                        ${
                          openItem === `item-${index}`
                            ? "bg-[#ffffff15] border-[#ffffff25]"
                            : "bg-[#ffffff0d] border-[#ffffff1a] hover:bg-[#ffffff12]"
                        }
                      `}
                    >
                      <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 text-left hover:no-underline group accordion-trigger">
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={`
                              text-base sm:text-lg transition-colors duration-150 ease-in-out pr-4
                              ${
                                openItem === `item-${index}`
                                  ? "text-[#95fff7]"
                                  : "text-white"
                              }
                            `}
                          >
                            {faq.question}
                          </span>
                          <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                            <div className="relative w-4 h-4 sm:w-5 sm:h-5">
                              <X
                                className={`
                                  absolute text-[#95fff7] w-4 h-4 sm:w-5 sm:h-5
                                  transition-all duration-150 ease-in-out
                                  ${
                                    openItem === `item-${index}`
                                      ? "opacity-100 transform rotate-0 scale-100"
                                      : "opacity-0 transform rotate-90 scale-75"
                                  }
                                `}
                              />
                              <Plus
                                className={`
                                  absolute text-[#95fff7] w-4 h-4 sm:w-5 sm:h-5
                                  transition-all duration-150 ease-in-out
                                  ${
                                    openItem === `item-${index}`
                                      ? "opacity-0 transform -rotate-90 scale-75"
                                      : "opacity-100 transform rotate-0 scale-100"
                                  }
                                `}
                              />
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="overflow-hidden">
                        <motion.div
                          initial="collapsed"
                          animate={openItem === `item-${index}` ? "expanded" : "collapsed"}
                          variants={contentVariants}
                          className="px-4 sm:px-6"
                        >
                          <div className="py-2 sm:py-3">
                            <p className="text-xs sm:text-sm leading-relaxed text-gray-300/80">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
