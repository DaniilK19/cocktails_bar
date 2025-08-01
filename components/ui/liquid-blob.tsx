"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

interface LiquidBlobProps {
  className?: string
  color?: string
  variant?: "fluid" | "geometric" | "organic"
}

export function LiquidBlob({ className = "", color = "cocktail-orange", variant = "fluid" }: LiquidBlobProps) {
  const blobRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!blobRef.current) return

    const paths = blobRef.current.querySelectorAll("path, circle, ellipse")
    
    paths.forEach((element, index) => {
      if (element.tagName === 'path') {
        gsap.to(element, {
          duration: 6 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          attr: {
            d: element.getAttribute("data-morph") || "",
          },
        })
      } else {
        gsap.to(element, {
          duration: 8 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          attr: {
            rx: element.getAttribute("data-morph-rx") || element.getAttribute("rx"),
            ry: element.getAttribute("data-morph-ry") || element.getAttribute("ry"),
          },
        })
      }
    })
  }, [])

  const renderFluid = () => (
    <>
      <path
        d="M 150,400 Q 300,200 500,350 Q 700,150 850,400 Q 700,650 500,500 Q 300,750 150,400"
        data-morph="M 150,400 Q 350,150 500,300 Q 650,200 850,400 Q 750,600 500,550 Q 250,700 150,400"
        fill={`url(#gradient-${color})`}
        filter="url(#glow)"
        opacity="0.4"
      />
      <path
        d="M 250,300 Q 400,100 600,250 Q 750,100 850,300 Q 750,500 600,400 Q 400,600 250,300"
        data-morph="M 250,300 Q 350,50 600,200 Q 800,150 850,300 Q 700,550 600,450 Q 450,650 250,300"
        fill={`url(#gradient-${color})`}
        filter="url(#glow)"
        opacity="0.2"
      />
    </>
  )

  const renderGeometric = () => (
    <>
      <ellipse
        cx="500"
        cy="300"
        rx="200"
        ry="80"
        data-morph-rx="250"
        data-morph-ry="60"
        fill={`url(#gradient-${color})`}
        filter="url(#glow)"
        opacity="0.3"
        transform="rotate(15 500 300)"
      />
      <ellipse
        cx="600"
        cy="500"
        rx="150"
        ry="200"
        data-morph-rx="120"
        data-morph-ry="250"
        fill={`url(#gradient-${color})`}
        filter="url(#glow)"
        opacity="0.2"
        transform="rotate(-30 600 500)"
      />
      <ellipse
        cx="400"
        cy="700"
        rx="180"
        ry="90"
        data-morph-rx="220"
        data-morph-ry="70"
        fill={`url(#gradient-${color})`}
        filter="url(#glow)"
        opacity="0.25"
        transform="rotate(45 400 700)"
      />
    </>
  )

  const renderOrganic = () => (
    <>
      <path
        d="M 200,500 Q 300,200 500,400 Q 700,100 800,350 Q 900,600 650,700 Q 400,800 300,600 Q 100,400 200,500"
        data-morph="M 200,500 Q 350,150 500,350 Q 650,50 800,300 Q 950,550 650,750 Q 350,850 250,650 Q 50,450 200,500"
        fill={`url(#gradient-${color})`}
        filter="url(#glow)"
        opacity="0.3"
      />
      <path
        d="M 400,300 Q 500,150 650,250 Q 800,200 750,400 Q 700,600 550,550 Q 350,500 400,300"
        data-morph="M 400,300 Q 550,100 650,200 Q 850,150 750,350 Q 650,650 500,600 Q 300,550 400,300"
        fill={`url(#gradient-${color})`}
        filter="url(#glow)"
        opacity="0.2"
      />
    </>
  )

  return (
    <svg
      ref={blobRef}
      viewBox="0 0 1000 1000"
      className={`absolute ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id={`gradient-${color}`} cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor={`hsl(var(--${color}))`} stopOpacity="0.9" />
          <stop offset="40%" stopColor={`hsl(var(--cocktail-red))`} stopOpacity="0.7" />
          <stop offset="100%" stopColor={`hsl(var(--cocktail-purple))`} stopOpacity="0.3" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          <feColorMatrix type="saturate" values="1.5" />
        </filter>
      </defs>
      {variant === "fluid" && renderFluid()}
      {variant === "geometric" && renderGeometric()}
      {variant === "organic" && renderOrganic()}
    </svg>
  )
}