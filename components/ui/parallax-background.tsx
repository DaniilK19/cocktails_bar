"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface ParallaxBackgroundProps {
  imageSrc: string
  speed?: number
  opacity?: number
  blur?: number
  className?: string
  hideGradient?: boolean
  animationType?: 'vertical' | 'horizontal' | 'zoom' | 'rotate' | 'wave' | 'elegant'
}

export function ParallaxBackground({ 
  imageSrc, 
  speed = 0.3, 
  opacity = 0.1, 
  blur = 2,
  className = "",
  hideGradient = false,
  animationType = 'vertical'
}: ParallaxBackgroundProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      
      const scrolled = window.pageYOffset
      const parallax = parallaxRef.current
      const rect = parallax.getBoundingClientRect()
      const elementTop = rect.top + scrolled
      const elementHeight = rect.height
      const windowHeight = window.innerHeight
      
      // Calculate scroll progress for this element
      const scrollProgress = Math.max(0, Math.min(1, 
        (scrolled + windowHeight - elementTop) / (windowHeight + elementHeight)
      ))
      
      let transform = ''
      
      switch (animationType) {
        case 'vertical':
          const yPos = -(scrolled * speed)
          transform = `translateY(${yPos}px)`
          break
        case 'horizontal':
          const xPos = scrolled * speed * 0.5
          transform = `translateX(${xPos}px) translateY(${-(scrolled * speed * 0.3)}px)`
          break
        case 'zoom':
          const scale = 1 + (scrollProgress * speed * 0.2)
          transform = `scale(${scale}) translateY(${-(scrolled * speed * 0.5)}px)`
          break
        case 'rotate':
          const rotation = scrollProgress * speed * 30
          transform = `rotate(${rotation}deg) translateY(${-(scrolled * speed * 0.3)}px)`
          break
        case 'wave':
          const wave = Math.sin(scrollProgress * Math.PI * 2) * 20 * speed
          transform = `translateY(${-(scrolled * speed) + wave}px) translateX(${wave * 0.5}px)`
          break
        case 'elegant':
          // Elegant floating effect with subtle movement only
          const elegantY = -(scrolled * speed * 0.8)
          const elegantX = Math.sin(scrollProgress * Math.PI * 0.5) * 10 * speed
          transform = `translateY(${elegantY}px) translateX(${elegantX}px)`
          break
        default:
          const defaultY = -(scrolled * speed)
          transform = `translateY(${defaultY}px)`
      }
      
      parallax.style.transform = transform
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed, animationType])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
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
          quality={85}
          sizes="100vw"
        />
        {!hideGradient && (
          <div className="absolute inset-0 bg-gradient-to-b from-aristocrat-void/80 via-aristocrat-void/60 to-aristocrat-void/90" />
        )}
      </div>
    </div>
  )
}