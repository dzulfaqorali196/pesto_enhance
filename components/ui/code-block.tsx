"use client"

import { useState } from "react"
import { Copy } from "lucide-react"

interface CodeBlockProps {
  code: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative bg-black rounded-lg overflow-hidden shadow-[0_0_15px_rgba(149,255,247,0.1)] transform-gpu">
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-[#2A2A2A] to-[#1C1C1C] border-b border-[#2A2A2A] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[#95fff7]/5 before:to-transparent transform-gpu hover:translate-y-[1px] transition-transform">
        <div className="text-xs text-[#AFAFAF] font-medium">python</div>
        <button
          onClick={copyToClipboard}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          className={`
            relative text-[#AFAFAF] hover:text-[#95fff7] transition-all duration-150 text-xs 
            flex items-center gap-1.5 px-2 py-1 rounded
            before:absolute before:inset-0 before:bg-[#2A2A2A] before:opacity-0 before:transition-opacity
            before:rounded before:border before:border-[#95fff7]/20
            hover:before:opacity-100 hover:shadow-[0_0_10px_rgba(149,255,247,0.3)]
            active:before:opacity-100 active:shadow-[0_0_5px_rgba(149,255,247,0.2)]
            ${
              isPressed
                ? "transform scale-95 translate-y-[1px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
                : "transform scale-100 translate-y-0 shadow-none"
            }
          `}
        >
          <span className="relative z-10 flex items-center gap-1.5">
            {copied ? (
              "Copied!"
            ) : (
              <>
                <Copy size={14} />
                Copy code
              </>
            )}
          </span>
        </button>
      </div>
      <div className="p-4 bg-gradient-to-b from-black to-[#1C1C1C]/80">
        <pre className="text-white text-sm overflow-x-auto whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}