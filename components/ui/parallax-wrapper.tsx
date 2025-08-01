"use client"

import { useRef, useEffect } from "react"
import { gsap } from "@/lib/gsap"

interface ParallaxWrapperProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxWrapper({ 
  children, 
  speed = 0.5, 
  className = "" 
}: ParallaxWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        y: () => window.innerHeight * speed,
        ease: "none",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}