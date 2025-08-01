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
    <section ref={sectionRef} className="py-40 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-32">
          <div className="aristocrat-subtext mb-8">
            Collection Signature
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-12 serif tracking-tight">
            <span className="text-aristocrat-white">NOS</span>
            <br />
            <span className="text-aristocrat-cream font-extralight">CRÉATIONS</span>
          </h2>
          <div className="w-16 h-px bg-aristocrat-charcoal mx-auto mb-12"></div>
          <p className="text-lg aristocrat-text max-w-2xl mx-auto font-extralight leading-loose sans">
            Chaque cocktail raconte une histoire de savoir-faire
          </p>
        </div>

        {/* Main Display */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          {/* Image Section */}
          <div className="relative">
            <div className="glass-card p-12 overflow-hidden">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  key={`image-${activeIndex}`}
                  src={activeCocktail.image}
                  alt={activeCocktail.name}
                  fill
                  className="object-cover transition-opacity duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aristocrat-void/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="aristocrat-subtext text-aristocrat-cream">
                    {activeCocktail.category}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-12">
            <div className="aristocrat-subtext mb-12">
              No. {activeCocktail.id.padStart(2, '0')}
            </div>
            
            <h3 className="text-4xl md:text-5xl font-light mb-8 serif tracking-tight text-aristocrat-white">
              {activeCocktail.name}
            </h3>
            
            <div className="w-12 h-px bg-aristocrat-charcoal mb-8"></div>
            
            <p className="text-lg aristocrat-text mb-16 leading-loose font-extralight sans">
              {activeCocktail.description}
            </p>

            <div className="grid grid-cols-2 gap-8 mb-16">
              <div className="minimal-border pt-6">
                <div className="aristocrat-subtext mb-3">Degré</div>
                <span className="text-2xl font-light text-aristocrat-white serif">{activeCocktail.alcohol}°</span>
              </div>
              <div className="minimal-border pt-6">
                <div className="aristocrat-subtext mb-3">Temps</div>
                <span className="text-2xl font-light text-aristocrat-white serif">5 min</span>
              </div>
            </div>

            <div className="aristocrat-button py-4 cursor-pointer">
              Voir la Recette
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-16">
          <button
            onClick={prevSlide}
            className="p-2 text-aristocrat-gray hover:text-aristocrat-white transition-colors duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-6">
            {cocktails.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 transition-colors duration-300 ${
                  index === activeIndex 
                    ? 'bg-aristocrat-white' 
                    : 'bg-aristocrat-charcoal hover:bg-aristocrat-gray'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 text-aristocrat-gray hover:text-aristocrat-white transition-colors duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}