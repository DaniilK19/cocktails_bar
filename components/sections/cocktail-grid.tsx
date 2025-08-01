"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "@/lib/gsap"
import { cocktails } from "@/data/cocktails"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { OptimizedImage } from "@/components/ui/optimized-image"

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

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % cocktails.length)
    // Restart autoplay after manual navigation
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 5000)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + cocktails.length) % cocktails.length)
    // Restart autoplay after manual navigation
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 5000)
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
    // Restart autoplay after manual selection
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 5000)
  }

  const activeCocktail = cocktails[activeIndex]

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
                  const offset = index - activeIndex
                  const isActive = index === activeIndex
                  const absOffset = Math.abs(offset)
                  
                  // Hide items that are too far away
                  if (absOffset > 2) return null
                  
                  // Calculate transforms
                  const translateX = offset * 180
                  const rotateY = offset * -45
                  const scale = isActive ? 1 : 0.7 - (absOffset * 0.1)
                  const zIndex = isActive ? 20 : 20 - absOffset
                  const opacity = isActive ? 1 : 0.6 - (absOffset * 0.2)
                  
                  return (
                    <motion.div
                      key={index}
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
                      onClick={() => goToSlide(index)}
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
                onClick={prevSlide}
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
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 ${
                      index === activeIndex 
                        ? 'w-3 h-3 bg-aristocrat-cream rounded-full' 
                        : 'w-2 h-2 bg-aristocrat-charcoal hover:bg-aristocrat-gray rounded-full'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
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