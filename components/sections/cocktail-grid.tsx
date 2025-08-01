"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { cocktails } from "@/data/cocktails"
import { ChevronLeft, ChevronRight, Sparkles, Clock, BarChart3 } from "lucide-react"
import Image from "next/image"

export function CocktailGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      })

      tl.from(".collection-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      })
      .from(".collection-subtitle", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      }, "-=0.8")
      .from(".collection-nav", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out"
      }, "-=0.6")

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
        <div className="text-center mb-32">
          <motion.div 
            className="aristocrat-subtext mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Collection Signature
          </motion.div>
          <motion.h2 
            className="collection-title text-5xl md:text-6xl lg:text-7xl font-light mb-12 serif tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-aristocrat-white">NOS</span>
            <br />
            <span className="text-aristocrat-cream font-extralight">CRÉATIONS</span>
          </motion.h2>
          <div className="w-16 h-px bg-aristocrat-charcoal mx-auto mb-12"></div>
          <motion.p 
            className="collection-subtitle text-lg aristocrat-text max-w-2xl mx-auto font-extralight leading-loose sans"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Chaque cocktail raconte une histoire de savoir-faire
          </motion.p>
        </div>

        {/* Main Display */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          {/* Image Section */}
          <div className="relative">
            <div className="glass-card p-12 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="aspect-square relative overflow-hidden"
                >
                  <Image
                    src={activeCocktail.image}
                    alt={activeCocktail.name}
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-aristocrat-void/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="aristocrat-subtext text-aristocrat-cream">
                      {activeCocktail.category}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
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

                <motion.div
                  whileHover={{ y: -2 }}
                  className="aristocrat-button py-4"
                >
                  Voir la Recette
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="collection-nav flex items-center justify-center gap-16">
          <motion.button
            whileHover={{ x: -2 }}
            onClick={prevSlide}
            className="aristocrat-link py-2"
          >
            <ChevronLeft className="w-5 h-5 text-aristocrat-gray" />
          </motion.button>

          <div className="flex gap-6">
            {cocktails.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 transition-all duration-700 ${
                  index === activeIndex 
                    ? 'bg-aristocrat-white' 
                    : 'bg-aristocrat-charcoal hover:bg-aristocrat-gray'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ x: 2 }}
            onClick={nextSlide}
            className="aristocrat-link py-2"
          >
            <ChevronRight className="w-5 h-5 text-aristocrat-gray" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}