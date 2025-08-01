"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

interface LiquidBlobProps {
  className?: string
  color?: string
}

export function LiquidBlob({ className = "", color = "cocktail-orange" }: LiquidBlobProps) {
  const blobRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!blobRef.current) return

    const paths = blobRef.current.querySelectorAll("path")
    
    paths.forEach((path, index) => {
      gsap.to(path, {
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        attr: {
          d: path.getAttribute("data-morph") || "",
        },
      })
    })
  }, [])

  return (
    <svg
      ref={blobRef}
      viewBox="0 0 1000 1000"
      className={`absolute ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="liquid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`hsl(var(--${color}))`} stopOpacity="0.8" />
          <stop offset="50%" stopColor={`hsl(var(--cocktail-red))`} stopOpacity="0.9" />
          <stop offset="100%" stopColor={`hsl(var(--cocktail-yellow))`} stopOpacity="0.8" />
        </linearGradient>
        <filter id="liquid-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter>
      </defs>
      <path
        d="M 100,500 Q 250,100 500,300 T 900,500 Q 750,900 500,700 T 100,500"
        data-morph="M 100,500 Q 350,200 500,400 T 900,500 Q 650,800 500,600 T 100,500"
        fill="url(#liquid-gradient)"
        filter="url(#liquid-blur)"
        opacity="0.6"
      />
      <path
        d="M 200,400 Q 400,200 600,400 T 800,600 Q 600,800 400,600 T 200,400"
        data-morph="M 200,400 Q 300,100 600,300 T 800,600 Q 700,900 400,700 T 200,400"
        fill="url(#liquid-gradient)"
        filter="url(#liquid-blur)"
        opacity="0.4"
      />
    </svg>
  )
}