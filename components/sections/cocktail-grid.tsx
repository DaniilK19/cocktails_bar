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
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + cocktails.length) % cocktails.length)
    setIsAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
    setIsAutoPlay(false)
  }

  const activeCocktail = cocktails[activeIndex]

  return (
    <section ref={sectionRef} className="py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-aristocrat-void via-aristocrat-void/95 to-aristocrat-void">
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-40">
          <div className="aristocrat-subtext mb-12 text-aristocrat-cream/60">
            — Collection Signature —
          </div>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-light mb-16 serif tracking-tight">
            <span className="text-aristocrat-white">L'ART</span>
            <br />
            <span className="text-aristocrat-cream font-extralight italic">de la Mixologie</span>
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-aristocrat-charcoal to-transparent mx-auto mb-16"></div>
          <p className="text-xl aristocrat-text max-w-3xl mx-auto font-extralight leading-loose sans text-aristocrat-cream/80">
            Une sélection exclusive de créations artisanales, <br className="hidden md:block" />
            où chaque goutte raconte une histoire de raffinement
          </p>
        </div>

        {/* Artistic Display */}
        <div ref={contentRef} className="relative">
          {/* Main Cocktail Showcase */}
          <div className="grid lg:grid-cols-3 gap-16 items-start mb-32">
            {/* Left: Cocktail Portrait */}
            <div className="lg:col-span-2 relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Artistic Frame */}
                <div className="absolute inset-0 border border-aristocrat-charcoal/30 z-10 pointer-events-none"></div>
                <div className="absolute -inset-4 border border-aristocrat-charcoal/10 z-10 pointer-events-none"></div>
                
                {/* Image with Artistic Treatment */}
                <div className="relative w-full h-full overflow-hidden bg-aristocrat-void/20">
                  <Image
                    key={`image-${activeIndex}`}
                    src={activeCocktail.image}
                    alt={activeCocktail.name}
                    fill
                    className="object-cover transition-all duration-1000 ease-out hover:scale-105"
                    priority
                  />
                  {/* Artistic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-aristocrat-void/60 via-transparent to-aristocrat-void/20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-aristocrat-void/30 via-transparent to-aristocrat-void/30" />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-aristocrat-cream/40"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-aristocrat-cream/40"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-aristocrat-cream/40"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-aristocrat-cream/40"></div>
                </div>
                
                {/* Floating Category Tag */}
                <div className="absolute -top-6 -right-6 bg-aristocrat-void/90 backdrop-blur border border-aristocrat-charcoal px-6 py-3 z-20">
                  <div className="aristocrat-subtext text-aristocrat-cream text-xs tracking-wider">
                    {activeCocktail.category}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Artistic Details */}
            <div className="space-y-12 lg:pl-8">
              {/* Signature Number */}
              <div className="text-center lg:text-left">
                <div className="text-7xl font-light text-aristocrat-charcoal/40 serif leading-none mb-2">
                  {activeCocktail.id.padStart(2, '0')}
                </div>
                <div className="w-16 h-px bg-aristocrat-charcoal mx-auto lg:mx-0 mb-8"></div>
              </div>
              
              {/* Title with Artistic Typography */}
              <div className="text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-light mb-6 serif tracking-tight text-aristocrat-white leading-tight">
                  {activeCocktail.name}
                </h3>
                <div className="italic text-aristocrat-cream/60 font-light text-lg mb-8">
                  "Une symphonie de saveurs"
                </div>
              </div>
              
              {/* Elegant Description */}
              <div className="prose prose-sm text-aristocrat-cream/80 font-extralight leading-relaxed">
                <p>{activeCocktail.description}</p>
              </div>

              {/* Refined Specifications */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-aristocrat-charcoal/20 pb-3">
                  <span className="aristocrat-subtext">Degré d'alcool</span>
                  <span className="text-aristocrat-white font-light">{activeCocktail.alcohol}°</span>
                </div>
                <div className="flex justify-between items-center border-b border-aristocrat-charcoal/20 pb-3">
                  <span className="aristocrat-subtext">Temps de préparation</span>
                  <span className="text-aristocrat-white font-light">5 minutes</span>
                </div>
                <div className="flex justify-between items-center border-b border-aristocrat-charcoal/20 pb-3">
                  <span className="aristocrat-subtext">Service</span>
                  <span className="text-aristocrat-white font-light">Frais</span>
                </div>
              </div>

              {/* Aristocratic CTA */}
              <div className="pt-8">
                <div className="aristocrat-button text-center py-4 cursor-pointer border border-aristocrat-charcoal/30 hover:border-aristocrat-cream/40 transition-all duration-500">
                  Découvrir la Recette
                </div>
              </div>
            </div>
          </div>

          {/* Artistic Navigation Gallery */}
          <div className="flex items-center justify-center gap-8 mb-16">
            <button
              onClick={prevSlide}
              className="p-4 border border-aristocrat-charcoal/30 hover:border-aristocrat-cream/40 text-aristocrat-gray hover:text-aristocrat-white transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Thumbnail Gallery */}
            <div className="flex gap-4 overflow-hidden">
              {cocktails.map((cocktail, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative w-16 h-16 overflow-hidden transition-all duration-300 ${
                    index === activeIndex 
                      ? 'ring-2 ring-aristocrat-cream/60 scale-110' 
                      : 'ring-1 ring-aristocrat-charcoal/30 hover:ring-aristocrat-cream/30 opacity-60 hover:opacity-80'
                  }`}
                >
                  <Image
                    src={cocktail.image}
                    alt={cocktail.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-aristocrat-void/20"></div>
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-4 border border-aristocrat-charcoal/30 hover:border-aristocrat-cream/40 text-aristocrat-gray hover:text-aristocrat-white transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2">
            {cocktails.map((_, index) => (
              <div
                key={index}
                className={`h-0.5 transition-all duration-500 ${
                  index === activeIndex 
                    ? 'w-12 bg-aristocrat-cream' 
                    : 'w-3 bg-aristocrat-charcoal hover:bg-aristocrat-gray'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}