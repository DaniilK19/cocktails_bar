"use client"

import { useEffect, useRef, useCallback } from "react"
import { OptimizedImage } from "./optimized-image"
import { useThrottledScroll } from "@/hooks/useThrottledScroll"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

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
  const { elementRef: containerRef, isIntersecting } = useIntersectionObserver({
    threshold: 0,
    rootMargin: '50px 0px 50px 0px' // Start animation 50px before entering viewport
  })

  // Cache element dimensions to avoid repeated getBoundingClientRect calls
  const elementDimensions = useRef<{
    top: number
    height: number
    windowHeight: number
  } | null>(null)

  // Update cached dimensions when element size might change
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      elementDimensions.current = {
        top: rect.top + window.pageYOffset,
        height: rect.height,
        windowHeight: window.innerHeight
      }
    }

    updateDimensions()
    
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    window.addEventListener('resize', updateDimensions)
    
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateDimensions)
    }
  }, [containerRef])

  // Memoize transform calculation function
  const calculateTransform = useCallback((scrolled: number): string => {
    if (!elementDimensions.current) return ''

    const { top, height, windowHeight } = elementDimensions.current
    const scrollProgress = Math.max(0, Math.min(1, 
      (scrolled + windowHeight - top) / (windowHeight + height)
    ))
    
    switch (animationType) {
      case 'vertical':
        return `translateY(${-(scrolled * speed)}px)`
      case 'horizontal':
        const xPos = scrolled * speed * 0.5
        return `translateX(${xPos}px) translateY(${-(scrolled * speed * 0.3)}px)`
      case 'zoom':
        const scale = 1 + (scrollProgress * speed * 0.2)
        return `scale(${scale}) translateY(${-(scrolled * speed * 0.5)}px)`
      case 'rotate':
        const rotation = scrollProgress * speed * 30
        return `rotate(${rotation}deg) translateY(${-(scrolled * speed * 0.3)}px)`
      case 'wave':
        const wave = Math.sin(scrollProgress * Math.PI * 2) * 20 * speed
        return `translateY(${-(scrolled * speed) + wave}px) translateX(${wave * 0.5}px)`
      case 'elegant':
        const elegantY = -(scrolled * speed * 0.8)
        const elegantX = Math.sin(scrollProgress * Math.PI * 0.5) * 10 * speed
        return `translateY(${elegantY}px) translateX(${elegantX}px)`
      default:
        return `translateY(${-(scrolled * speed)}px)`
    }
  }, [speed, animationType])

  // Optimized scroll handler with throttling and RAF
  const handleScroll = useCallback((scrollY: number) => {
    // Only animate if element is visible or near viewport
    if (!isIntersecting || !parallaxRef.current) return
    
    const transform = calculateTransform(scrollY)
    parallaxRef.current.style.transform = transform
  }, [isIntersecting, calculateTransform])

  // Use throttled scroll hook (60fps throttling)
  useThrottledScroll(handleScroll, 16)

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
        style={{
          opacity,
          filter: `blur(${blur}px)`,
        }}
      >
        <OptimizedImage
          src={imageSrc}
          alt="Background"
          fill
          className="object-cover object-center"
          priority={imageSrc.includes('hero')}
          quality={85}
          sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
        />
        {!hideGradient && (
          <div className="absolute inset-0 bg-gradient-to-b from-aristocrat-void/80 via-aristocrat-void/60 to-aristocrat-void/90" />
        )}
      </div>
    </div>
  )
}