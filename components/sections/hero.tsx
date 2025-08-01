"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { LiquidBlob } from "@/components/ui/liquid-blob"
import { ParallaxBackground } from "@/components/ui/parallax-background"
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
      <ParallaxBackground 
        imageSrc="/images/hero.png" 
        speed={0.3} 
        opacity={0.45} 
        blur={0.2} 
      />
      
      <LiquidBlob className="w-full h-full top-0 left-0" variant="organic" />
      <LiquidBlob className="w-2/3 h-2/3 -top-32 -right-32" color="cocktail-blue" variant="geometric" />
      <LiquidBlob className="w-1/2 h-1/2 -bottom-20 -left-20" color="cocktail-purple" variant="fluid" />

      <div className="absolute inset-0 bg-gradient-to-b from-aristocrat-void/30 via-transparent to-aristocrat-void/50" />

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-16 hero-cta"
        >
          <div className="aristocrat-subtext text-center">
            Est. MMXXIV — Artisanal Spirits
          </div>
        </motion.div>

        <h1
          ref={titleRef}
          className="text-6xl md:text-7xl lg:text-8xl font-light mb-12 serif tracking-tight"
        >
          <span className="text-aristocrat-white">MAISON</span>
          <br />
          <span className="text-aristocrat-cream font-extralight">COCKTAIL</span>
        </h1>

        <div className="w-24 h-px bg-aristocrat-charcoal mx-auto mb-12"></div>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl aristocrat-text mb-20 max-w-2xl mx-auto font-extralight leading-loose sans"
        >
          L'art de la mixologie française
          <br />
          <span className="aristocrat-subtext mt-6 block">Une expérience raffinée</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-12 justify-center items-center hero-cta">
          <motion.div
            whileHover={{ y: -2 }}
            className="aristocrat-button px-8 py-4"
          >
            Découvrir la Collection
          </motion.div>
          <motion.div
            whileHover={{ y: -2 }}
            className="aristocrat-link px-8 py-4"
          >
            Réserver une Dégustation
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-5 h-5 text-aristocrat-gray" />
      </motion.div>
    </section>
  )
}