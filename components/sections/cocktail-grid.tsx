"use client"

import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { gsap } from "@/lib/gsap"
import { cocktails } from "@/data/cocktails"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CocktailItem } from "@/components/ui/cocktail-item"

export function CocktailGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true
          }
        }
      )

      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            once: true
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!isAutoPlay) return
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cocktails.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlay])


  const activeCocktail = cocktails[activeIndex]

  // Memoize expensive transform calculations
  const transformsData = useMemo(() => {
    return cocktails.map((_, index) => {
      const offset = index - activeIndex
      const isActive = index === activeIndex
      const absOffset = Math.abs(offset)
      
      // Hide items that are too far away
      if (absOffset > 2) {
        return { visible: false }
      }
      
      return {
        visible: true,
        offset,
        isActive,
        absOffset,
        translateX: offset * 180,
        rotateY: offset * -45,
        scale: isActive ? 1 : 0.7 - (absOffset * 0.1),
        zIndex: isActive ? 20 : 20 - absOffset,
        opacity: isActive ? 1 : 0.6 - (absOffset * 0.2),
      }
    })
  }, [activeIndex])

  // Memoize navigation handlers to prevent unnecessary re-renders
  const handleNextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cocktails.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 5000)
  }, [])

  const handlePrevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + cocktails.length) % cocktails.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 5000)
  }, [])

  const handleGoToSlide = useCallback((index: number) => {
    setActiveIndex(index)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 5000)
  }, [])

  return (
    <section ref={sectionRef} className="py-40 px-4 sm:px-6 lg:px-8 relative overflow-visible bg-gradient-to-b from-aristocrat-void via-aristocrat-void/98 to-aristocrat-void" style={{perspective: '1000px'}}>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Gallery Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <div className="aristocrat-subtext mb-6 lg:mb-8 text-aristocrat-cream/60 text-sm lg:text-base">
            — Galerie d&apos;Art Liquide —
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 lg:mb-12 serif tracking-tight">
            <span className="text-aristocrat-white">COLLECTION</span>
            <br />
            <span className="text-aristocrat-cream font-extralight italic">Privée</span>
          </h2>
          <div className="w-24 lg:w-32 h-px bg-gradient-to-r from-transparent via-aristocrat-charcoal to-transparent mx-auto"></div>
        </div>

        {/* Coverflow Gallery Display */}
        <div ref={contentRef} className="relative">
          {/* Coverflow Container */}
          <div className="max-w-7xl mx-auto mb-20 lg:mb-32">
            
            {/* Coverflow Showcase */}
            <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden">
              
              {/* Coverflow Items */}
              <div className="relative w-full h-full flex items-center justify-center">
                {cocktails.map((cocktail, index) => {
                  const transformData = transformsData[index]
                  
                  // Hide items that are too far away
                  if (!transformData.visible) return null
                  
                  const { 
                    isActive = false, 
                    translateX = 0, 
                    rotateY = 0, 
                    scale = 1, 
                    zIndex = 0, 
                    opacity = 1 
                  } = transformData
                  
                  return (
                    <CocktailItem
                      key={index}
                      cocktail={cocktail}
                      isActive={isActive}
                      translateX={translateX}
                      rotateY={rotateY}
                      scale={scale}
                      zIndex={zIndex}
                      opacity={opacity}
                      onClick={() => handleGoToSlide(index)}
                    />
                  )
                })}
              </div>
            </div>
            
            {/* Current Item Details */}
            <div className="text-center mt-12 lg:mt-16">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  key={`details-${activeIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="aristocrat-subtext mb-4">
                    Collection Privée • Œuvre {activeIndex + 1} sur {cocktails.length}
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-light serif text-aristocrat-white mb-4">
                    {activeCocktail.name}
                  </h2>
                  <p className="text-aristocrat-cream/80 font-extralight leading-relaxed">
                    {activeCocktail.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Coverflow Navigation */}
          <div className="flex flex-col items-center gap-8 mt-16">
            
            {/* Navigation Controls */}
            <div className="flex items-center gap-12">
              <button
                onClick={handlePrevSlide}
                className="p-4 border border-aristocrat-charcoal/20 hover:border-aristocrat-cream/40 text-aristocrat-gray hover:text-aristocrat-white transition-all duration-300 rounded-full"
                title="Précédent"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              {/* Progress Dots */}
              <div className="flex items-center gap-3">
                {cocktails.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleGoToSlide(index)}
                    className={`transition-all duration-300 ${
                      index === activeIndex 
                        ? 'w-3 h-3 bg-aristocrat-cream rounded-full' 
                        : 'w-2 h-2 bg-aristocrat-charcoal hover:bg-aristocrat-gray rounded-full'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={handleNextSlide}
                className="p-4 border border-aristocrat-charcoal/20 hover:border-aristocrat-cream/40 text-aristocrat-gray hover:text-aristocrat-white transition-all duration-300 rounded-full"
                title="Suivant"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            {/* Exhibition Info */}
            <div className="text-center pt-8 border-t border-aristocrat-charcoal/20 max-w-3xl">
              <div className="aristocrat-subtext text-xs mb-3">
                Collection Privée — Maison Cocktail — Paris
              </div>
              <p className="text-sm text-aristocrat-cream/60 font-extralight leading-relaxed">
                Parcourez notre collection exclusive d&apos;art liquide, où chaque création<br className="hidden lg:block" />
                représente l&apos;essence même du raffinement français
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}