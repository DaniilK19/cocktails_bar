"use client"

import { OptimizedImage } from "./optimized-image"

interface ParallaxBackgroundStableProps {
  imageSrc: string
  className?: string
  hideGradient?: boolean
}

export function ParallaxBackgroundStable({ 
  imageSrc, 
  className = "",
  hideGradient = false,
}: ParallaxBackgroundStableProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
        style={{
          opacity: 0.45,
          filter: 'blur(0.2px)',
          willChange: 'auto',
          backfaceVisibility: 'visible',
        }}
      >
        <OptimizedImage
          src={imageSrc}
          alt={imageSrc.includes('hero') ? "Maison Cocktail - Bar à cocktails artisanaux Paris" : "Maison Cocktail - Ambiance élégante"}
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