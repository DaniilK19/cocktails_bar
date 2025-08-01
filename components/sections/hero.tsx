"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
// Lazy load GSAP to reduce initial bundle size
const loadGSAP = () => import("@/lib/gsap").then(mod => ({ gsap: mod.gsap, ScrollTrigger: mod.ScrollTrigger }))
import { ParallaxBackground } from "@/components/ui/parallax-background"
import { ChevronDown } from "lucide-react"

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    // Load GSAP dynamically
    loadGSAP().then(({ gsap, ScrollTrigger }) => {
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

        // More performant ScrollTrigger with direct transforms
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1, // Add smoothing for better performance
          animation: gsap.to(heroRef.current, {
            y: 100,
            opacity: 0.5,
            ease: "none",
          }),
          invalidateOnRefresh: true, // Recalculate on resize
        })
      }, heroRef)

      return () => ctx.revert()
    })
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParallaxBackground 
        imageSrc="/images/optimized/hero.webp" 
        speed={0.3} 
        opacity={0.45} 
        blur={0.2} 
      />
      

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
          L&apos;art de la mixologie française
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