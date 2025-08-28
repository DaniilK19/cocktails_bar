"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
// Lazy load GSAP to reduce initial bundle size
const loadGSAP = () => import("@/lib/gsap").then(mod => ({ gsap: mod.gsap, ScrollTrigger: mod.ScrollTrigger }))
import { ParallaxBackgroundStable } from "@/components/ui/parallax-background-stable"
import { ClientOnly } from "@/components/ui/client-only"
import dynamic from "next/dynamic"

const ParallaxBackground = dynamic(
  () => import("@/components/ui/parallax-background").then(mod => mod.ParallaxBackground),
  { 
    ssr: false,
    loading: () => <ParallaxBackgroundStable imageSrc="/images/optimized/hero.webp" />
  }
)
import { ChevronDown } from "lucide-react"
import { seoContent } from "@/data/seo-content"
import { useAnalytics } from "@/components/analytics/google-analytics"

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const { trackReservationAttempt, trackSectionView } = useAnalytics()

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

        // Separate animation for the tagline to avoid conflicts
        gsap.from(".hero-tagline", {
          y: 20,
          opacity: 0,
          duration: 1.2,
          delay: 0.1,
          ease: "power4.out",
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
      <ClientOnly fallback={<ParallaxBackgroundStable imageSrc="/images/optimized/hero.webp" />}>
        <ParallaxBackground 
          imageSrc="/images/optimized/hero.webp" 
          speed={0.3} 
          opacity={0.45} 
          blur={0.2} 
        />
      </ClientOnly>
      

      <div className="absolute inset-0 bg-gradient-to-b from-aristocrat-void/30 via-transparent to-aristocrat-void/50" />

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-16 hero-tagline">
          <p className="aristocrat-subtext text-center">
            <time dateTime="1924">Est. MCMXXIV</time> — {seoContent.hero.tagline}
          </p>
        </div>

        <h1
          ref={titleRef}
          className="text-6xl md:text-7xl lg:text-8xl font-light mb-12 serif tracking-tight"
        >
          <span className="text-aristocrat-white">MAISON</span>
          <br />
          <span className="text-aristocrat-cream font-extralight">COCKTAIL</span>
        </h1>

        <hr className="w-24 h-px bg-aristocrat-charcoal mx-auto mb-12 border-0" aria-hidden="true" />

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl aristocrat-text mb-20 max-w-2xl mx-auto font-extralight leading-loose sans"
        >
          L&apos;art de la mixologie française
          <br />
          <span className="aristocrat-subtext mt-6 block">{seoContent.hero.subTagline}</span>
        </p>

        <nav className="flex flex-col sm:flex-row gap-12 justify-center items-center hero-cta" aria-label="Actions principales">
          <motion.a
            href="#cocktails"
            whileHover={{ y: -2 }}
            className="aristocrat-button px-8 py-4"
            aria-label="Voir notre collection de cocktails"
            title="Découvrir notre collection exclusive de cocktails artisanaux"
            onClick={() => trackSectionView('cocktails_from_hero')}
          >
            {seoContent.hero.cta.primary}
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            className="aristocrat-link px-8 py-4"
            aria-label="Réserver une dégustation de cocktails"
            title="Réserver une expérience de dégustation personnalisée"
            onClick={() => trackReservationAttempt('hero')}
          >
            {seoContent.hero.cta.secondary}
          </motion.a>
        </nav>
      </div>

      <motion.a
        href="#cocktails"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        aria-label="Défiler vers la collection de cocktails"
        title="Défiler pour découvrir notre collection"
      >
        <ChevronDown className="w-5 h-5 text-aristocrat-gray" />
      </motion.a>
    </section>
  )
}