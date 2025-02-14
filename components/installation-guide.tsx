"use client";

import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animation-variants";

const steps = [
  {
    number: 1,
    title: "Download & Install SDK",
    description:
      "Start by installing the SDK in your environment. Open your terminal or package manager and use the provided repository link to download the SDK",
    code: `// using pip from PyPI

pip install -U pypestoai

// or from source

git clone https://github.com/elitezchen/pestoai_sdk.git pypestoai
cd pypestoai
python3 setup.py install
`,
  },
  {
    number: 2,
    title: "Configure the Settings",
    description:
      "Add your credentials, such as API keys and endpoint URLs, to\nthe configuration file. This ensures the SDK connects\nseamlessly to the trading platform",
    code: `// 🔑 with a demo api key:

from pypestoai import PestoAPI
pto = PestoAPI(demo_api_key='YOUR_DEMO_API_KEY')

// 🔑 with a production api key:

from pypestoai import PestoAPI
pto = PestoAPI(api_key='YOUR_PRODUCTION_API_KEY')
`,
  },
  {
    number: 3,
    title: "Test and validate connection",
    description:
      "Run the provided sample code or execute a test script to verify the SDK installation. Check for successful execution and connectivity",
    code: `import http.client

conn = http.client.HTTPSConnection("api.pestoai.fun")
payload = ''
headers = {
  'Accept': 'application/json',
  'x-demo-api-key': '<x-demo-api-key>'
}
conn.request("GET", "/v2/ping", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))`,
  },
  {
    number: 4,
    title: "Start Building",
    description:
      "Explore the SDK features to craft your trading strategies. Dive into the documentation to learn how to customize agents for your needs",
    code: `import http.client

conn = http.client.HTTPSConnection("api.pestoai.fun")
payload = ''
headers = {
  'Accept': 'application/json',
  'x-demo-api-key': '<x-demo-api-key>'
}
conn.request("GET", "/v2/exchanges/list", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))`,
  },
];

export function InstallationGuide() {
  const [isVisible, setIsVisible] = useState(false);
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

    const section = document.getElementById('installation-guide');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0.1 : 0.2,
      },
    },
  };

  const numberVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5 
    },
    visible: { 
      opacity: 0.4, 
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  };

  return (
    <section
      className="bg-black py-8 sm:py-12 md:py-16 pb-0"
      id="installation-guide"
    >
      <div className="container mx-auto px-1 sm:px-6 md:px-8 lg:px-24 max-w-[1440px] min-h-screen flex flex-col items-center">
        {isVisible && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="w-full h-0.5 sm:h-1 bg-[#95fff7] mb-8 sm:mb-12"
            />

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="w-full"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl text-center sm:text-4xl lg:text-[64px] font-bold tracking-tight text-white mb-2 sm:mb-4 font-manrope"
              >
                INSTALLATION GUIDE
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-base sm:text-lg md:text-xl text-[#AFAFAF] text-center max-w-[90%] sm:max-w-2xl md:max-w-3xl mx-auto mb-8 sm:mb-12"
              >
                From installation to configuration, we ensure a smooth integration
                process so you can focus on building and optimizing your trading
                strategies
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={cardVariants}
                  className={`bg-[#1D1C20] rounded-3xl p-3 sm:p-6 md:p-8 relative ${
                    index === 3 ? "md:col-start-2 md:row-start-2" : ""
                  }`}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="flex flex-col h-full">
                    <h3 className="text-[24px] font-semibold text-white mb-3 sm:mb-4 pr-20 sm:pr-24 lg:pr-32 font-ppneue">
                      {step.title}
                    </h3>
                    <p
                      className={`text-[14px] text-[#AFAFAF] leading-relaxed pr-20 sm:pr-24 lg:pr-32 font-lato ${
                        index === 3 ? "mb-4 sm:mb-6" : "mb-6 sm:mb-8"
                      }`}
                    >
                      {step.description.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                    <div
                      className={`flex-grow relative ${
                        index === 3
                          ? "min-h-[320px] sm:min-h-[320px] md:min-h-[360px] mt-0"
                          : "min-h-[320px] sm:min-h-[320px] md:min-h-[360px]"
                      }`}
                    >
                      <div className="absolute inset-0">
                        <CodeBlock code={step.code} />
                      </div>
                    </div>
                  </div>
                  <motion.div
                    variants={numberVariants}
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 text-[80px] sm:text-5xl md:text-6xl lg:text-8xl font-black text-[#3A4B4E] !opacity-40 z-10 select-none pointer-events-none"
                  >
                    #{step.number}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="w-full h-0.5 sm:h-1 bg-[#95fff7] mt-8 sm:mt-12"
            />
          </>
        )}
      </div>
    </section>
  );
}
