"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface ParallaxBackgroundProps {
  imageSrc: string
  speed?: number
  opacity?: number
  blur?: number
  className?: string
}

export function ParallaxBackground({ 
  imageSrc, 
  speed = 0.3, 
  opacity = 0.1, 
  blur = 2,
  className = "" 
}: ParallaxBackgroundProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      
      const scrolled = window.pageYOffset
      const parallax = parallaxRef.current
      const yPos = -(scrolled * speed)
      
      parallax.style.transform = `translateY(${yPos}px)`
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          opacity,
          filter: `blur(${blur}px)`,
        }}
      >
        <Image
          src={imageSrc}
          alt="Background"
          fill
          className="object-cover object-center"
          priority={false}
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-aristocrat-void/80 via-aristocrat-void/60 to-aristocrat-void/90" />
      </div>
    </div>
  )
}