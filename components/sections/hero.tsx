"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { LiquidBlob } from "@/components/ui/liquid-blob"
import { ChevronDown, Sparkles } from "lucide-react"

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      })

      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
        ease: "power4.out",
      })

      gsap.from(".hero-cta", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "power4.out",
        stagger: 0.2,
      })

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(heroRef.current, {
            y: progress * 100,
            opacity: 1 - progress * 0.5,
            ease: "none",
            duration: 0,
          })
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <LiquidBlob className="w-full h-full top-0 left-0" variant="organic" />
      <LiquidBlob className="w-2/3 h-2/3 -top-32 -right-32" color="cocktail-blue" variant="geometric" />
      <LiquidBlob className="w-1/2 h-1/2 -bottom-20 -left-20" color="cocktail-purple" variant="fluid" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl bg-gradient-to-r from-white/20 via-white/10 to-white/5 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(251,146,60,0.3)] hover:border-white/50 transition-all duration-300 mb-8 hero-cta group"
        >
          <div className="p-1 rounded-full bg-gradient-to-r from-cocktail-yellow to-cocktail-orange">
            <Sparkles className="w-3 h-3 text-white group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="text-sm font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Premium Cocktail Experience</span>
        </motion.div>

        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
        >
          <span className="gradient-text">Mixology</span>
          <br />
          <span className="text-foreground">Redefined</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-3xl mx-auto"
        >
          Discover the art of crafting extraordinary cocktails with our curated collection
          of premium recipes and techniques
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center hero-cta">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full liquid-gradient text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            Explore Collection
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full glass font-semibold text-lg hover:bg-white/20 transition-colors"
          >
            Watch Tutorial
          </motion.button>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-muted-foreground" />
      </motion.div>
    </section>
  )
}