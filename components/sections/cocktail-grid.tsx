"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "@/lib/gsap"
import { cocktails } from "@/data/cocktails"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

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
    <section ref={sectionRef} className="py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-aristocrat-void via-aristocrat-void/98 to-aristocrat-void">
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Gallery Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <div className="aristocrat-subtext mb-6 lg:mb-8 text-aristocrat-cream/60 text-sm lg:text-base">
            — Galerie d'Art Liquide —
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 lg:mb-12 serif tracking-tight">
            <span className="text-aristocrat-white">COLLECTION</span>
            <br />
            <span className="text-aristocrat-cream font-extralight italic">Privée</span>
          </h2>
          <div className="w-24 lg:w-32 h-px bg-gradient-to-r from-transparent via-aristocrat-charcoal to-transparent mx-auto"></div>
        </div>

        {/* Art Gallery Display */}
        <div ref={contentRef} className="relative">
          {/* Main Artwork Showcase */}
          <div className="max-w-5xl mx-auto mb-20 lg:mb-32">
            
            {/* Masterpiece Frame */}
            <div className="relative">
              
              {/* Gallery Frame */}
              <div className="relative aspect-[5/4] overflow-hidden bg-aristocrat-void/10">
                {/* Museum-style Frame */}
                <div className="absolute inset-0 border-8 border-aristocrat-charcoal/20 z-10 pointer-events-none"></div>
                <div className="absolute -inset-4 border-2 border-aristocrat-charcoal/10 z-10 pointer-events-none"></div>
                <div className="absolute -inset-8 border border-aristocrat-charcoal/5 z-10 pointer-events-none"></div>
                
                {/* The Artwork */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    key={`artwork-${activeIndex}`}
                    src={activeCocktail.image}
                    alt={activeCocktail.name}
                    fill
                    className="object-cover transition-all duration-1500 ease-out"
                    priority
                    quality={95}
                  />
                  
                  {/* Subtle Gallery Lighting */}
                  <div className="absolute inset-0 bg-gradient-to-t from-aristocrat-void/20 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-aristocrat-void/10 via-transparent to-transparent" />
                  
                  {/* Title on Image */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-aristocrat-void/80 via-aristocrat-void/40 to-transparent pt-16 pb-8 px-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="aristocrat-subtext text-xs text-aristocrat-cream/60 mb-2">
                          Collection Privée • N° {activeCocktail.id.padStart(2, '0')}
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-light serif text-aristocrat-white leading-tight tracking-wide" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}>
                          {activeCocktail.name}
                        </h3>
                        <div className="text-sm text-aristocrat-cream/70 font-light italic mt-1">
                          {activeCocktail.category}
                        </div>
                      </div>
                      <div className="text-6xl lg:text-7xl font-extralight text-aristocrat-cream/20 serif leading-none" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.6)'}}>
                        {activeCocktail.id.padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Navigation */}
          <div className="flex flex-col items-center gap-8">
            
            {/* Gallery Thumbnails */}
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
              {cocktails.map((cocktail, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`group relative overflow-hidden transition-all duration-500 ${
                    index === activeIndex 
                      ? 'w-20 h-20 lg:w-24 lg:h-24 ring-2 ring-aristocrat-cream/60 scale-110' 
                      : 'w-16 h-16 lg:w-20 lg:h-20 ring-1 ring-aristocrat-charcoal/20 hover:ring-aristocrat-cream/40 opacity-70 hover:opacity-90 hover:scale-105'
                  }`}
                >
                  {/* Gallery Frame for Thumbnail */}
                  <div className="absolute inset-0 border-2 border-aristocrat-charcoal/30 z-10 pointer-events-none group-hover:border-aristocrat-cream/40 transition-colors duration-300"></div>
                  
                  <Image
                    src={cocktail.image}
                    alt={cocktail.name}
                    fill
                    className="object-cover"
                    quality={80}
                  />
                  
                  {/* Artwork Number */}
                  <div className="absolute bottom-1 right-1 bg-aristocrat-void/80 px-1 py-0.5 text-xs text-aristocrat-cream/80">
                    {cocktail.id.padStart(2, '0')}
                  </div>
                  
                  {/* Subtle Gallery Lighting */}
                  <div className="absolute inset-0 bg-gradient-to-t from-aristocrat-void/30 via-transparent to-transparent" />
                </button>
              ))}
            </div>
            
            {/* Gallery Controls */}
            <div className="flex items-center gap-8">
              <button
                onClick={prevSlide}
                className="p-3 border border-aristocrat-charcoal/20 hover:border-aristocrat-cream/40 text-aristocrat-gray hover:text-aristocrat-white transition-all duration-300 rounded"
                title="Œuvre précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <div className="aristocrat-subtext text-xs mb-1">
                  Œuvre {activeIndex + 1} sur {cocktails.length}
                </div>
                <div className="text-aristocrat-white font-light text-sm">
                  {activeCocktail.name}
                </div>
              </div>
              
              <button
                onClick={nextSlide}
                className="p-3 border border-aristocrat-charcoal/20 hover:border-aristocrat-cream/40 text-aristocrat-gray hover:text-aristocrat-white transition-all duration-300 rounded"
                title="Œuvre suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Exhibition Info */}
            <div className="text-center pt-8 border-t border-aristocrat-charcoal/20 max-w-2xl">
              <div className="aristocrat-subtext text-xs mb-2">
                Collection Privée — Maison Cocktail
              </div>
              <p className="text-sm text-aristocrat-cream/60 font-extralight leading-relaxed">
                Chaque création est une œuvre d'art liquide, fruit d'un savoir-faire artisanal<br className="hidden lg:block" />
                et d'une recherche esthétique perpétuelle
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}