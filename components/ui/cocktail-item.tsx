"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { OptimizedImage } from "./optimized-image"
import { Cocktail } from "@/data/cocktails"

interface CocktailItemProps {
  cocktail: Cocktail
  isActive: boolean
  translateX: number
  rotateY: number
  scale: number
  zIndex: number
  opacity: number
  onClick: () => void
}

export const CocktailItem = memo(function CocktailItem({
  cocktail,
  isActive,
  translateX,
  rotateY,
  scale,
  zIndex,
  opacity,
  onClick
}: CocktailItemProps) {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        zIndex,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        x: translateX,
        rotateY,
        scale,
        opacity,
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={onClick}
    >
      {/* Artwork Frame */}
      <div className="relative w-[320px] h-[400px] lg:w-[380px] lg:h-[480px]">
        {/* Gallery Frame */}
        <div className="absolute inset-0 border-4 border-aristocrat-charcoal/30 z-10 pointer-events-none"></div>
        <div className="absolute -inset-2 border border-aristocrat-charcoal/20 z-10 pointer-events-none"></div>
        
        {/* The Artwork */}
        <div className="relative w-full h-full overflow-hidden bg-aristocrat-void/10">
          <OptimizedImage
            src={cocktail.image}
            alt={cocktail.name}
            fill
            className="object-cover"
            quality={90}
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 480px"
          />
          
          {/* Reflection Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-aristocrat-void/30" />
          
          {/* Active Item Overlay */}
          {isActive && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-aristocrat-void/90 via-aristocrat-void/50 to-transparent pt-12 pb-6 px-6">
              <div className="text-center">
                <div className="aristocrat-subtext text-xs text-aristocrat-cream/70 mb-2">
                  N° {cocktail.id.padStart(2, '0')}
                </div>
                <h3 
                  className="text-xl lg:text-2xl font-light serif text-aristocrat-white leading-tight" 
                  style={{textShadow: '1px 1px 4px rgba(0,0,0,0.8)'}}
                >
                  {cocktail.name}
                </h3>
                <div className="text-xs text-aristocrat-cream/60 font-light italic mt-1">
                  {cocktail.category}
                </div>
              </div>
            </div>
          )}
          
          {/* Non-active Item Number */}
          {!isActive && (
            <div className="absolute top-4 right-4 text-2xl font-light text-aristocrat-cream/40 serif">
              {cocktail.id.padStart(2, '0')}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
})