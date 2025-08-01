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
    <section ref={sectionRef} className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cocktail-orange/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cocktail-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            className="collection-title text-6xl md:text-7xl lg:text-8xl font-bold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="gradient-text">Signature</span>
            <br />
            <span className="text-foreground">Collection</span>
          </motion.h2>
          <motion.p 
            className="collection-subtitle text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Experience the artistry of mixology through our carefully curated selection
          </motion.p>
        </div>

        {/* Main Display */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Image Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cocktail-orange/20 via-cocktail-red/20 to-cocktail-purple/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-700" />
            <div className="relative bg-glass backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="aspect-square relative overflow-hidden rounded-2xl"
                >
                  <Image
                    src={activeCocktail.image}
                    alt={activeCocktail.name}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>{activeCocktail.category}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cocktail-orange to-cocktail-red" />
                  <span className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                    #{activeCocktail.id.padStart(2, '0')}
                  </span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {activeCocktail.name}
                </h3>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {activeCocktail.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="glass p-4 rounded-xl backdrop-blur-xl border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <BarChart3 className="w-5 h-5 text-cocktail-orange" />
                      <span className="text-sm font-semibold text-muted-foreground">Alcohol</span>
                    </div>
                    <span className="text-2xl font-bold">{activeCocktail.alcohol}%</span>
                  </div>
                  <div className="glass p-4 rounded-xl backdrop-blur-xl border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-cocktail-blue" />
                      <span className="text-sm font-semibold text-muted-foreground">Prep Time</span>
                    </div>
                    <span className="text-2xl font-bold">5 min</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-8 rounded-full liquid-gradient text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Recipe
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="collection-nav flex items-center justify-center gap-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-3 rounded-full glass backdrop-blur-xl border border-white/20 hover:border-white/40 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <div className="flex gap-3">
            {cocktails.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-gradient-to-r from-cocktail-orange to-cocktail-red shadow-lg' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-3 rounded-full glass backdrop-blur-xl border border-white/20 hover:border-white/40 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}