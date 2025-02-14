import Image from "next/image"
import { Card } from "@/components/ui/card"

export default function HighPerformanceCard() {
  return (
    <div className="p-1 bg-black rounded-2xl flex items-center justify-center">
      <Card className="relative overflow-hidden bg-[#95FFF7]/5 border-[#95FFF7] border-2 w-[320px] sm:w-[600px] md:w-[746px] h-[197px] sm:h-[370px] md:h-[460px] rounded-xl shadow-[0_0_15px_#95FFF7,0_0_30px_#95FFF7,inset_0_0_15px_#95FFF7]">
        {/* Top notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] sm:w-[200px] md:w-[300px]">
          <Image
            src="/Carousel/notch.png"
            alt="Card Notch"
            width={300}
            height={16}
            className="w-full"
          />
        </div>

        <div className="relative h-full">
          {/* Left Icon */}
          <div
            className="absolute left-[20px] top-[30px] md:left-[53.86px] md:top-[80.79px]"
          >
            <Image
              src="/Carousel/left-high-icon.png"
              alt="High Performance Icon"
              width={149}
              height={149}
              className="text-[#95FFF7] w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] md:w-[149px] md:h-[149px]"
            />
          </div>

          {/* Right Icon */}
          <div className="absolute right-0 bottom-0">
            <Image
              src="/Carousel/right-high-icon.png"
              alt="High Performance Icon"
              width={223}
              height={223}
              className="text-[#95FFF7] opacity-50 w-[89px] h-[89px] sm:w-[134px] sm:h-[134px] md:w-[223px] md:h-[223px]"
            />
          </div>

          {/* Content */}
          <div className="absolute w-[220px] sm:w-[380px] md:w-[482px] h-[142px] space-y-1 sm:space-y-2 md:space-y-3 left-[23px] sm:left-[40px] md:left-[53.86px] top-[108px] sm:top-[180px] md:top-[250px]">
            <h2 className="text-[14px] sm:text-[26px] md:text-[32px] font-medium text-[#95FFF7] leading-tight">High Performance</h2>
            <p className="text-[#95FFF7]/80 text-[9px] sm:text-[17px] md:text-[21px] leading-relaxed max-w-xl">
              Execute trades at lightning speed with an infrastructure optimized for low latency and high performance
            </p>
          </div>
        </div>

        {/* Linear gradient overlay at darker opacity */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#95FFF7]/5 to-transparent pointer-events-none" />
      </Card>
    </div>
  )
}