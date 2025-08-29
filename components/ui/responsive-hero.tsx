"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { seoContent } from "@/data/seo-content"
import { useAnalytics } from "@/components/analytics/google-analytics"
import { ParallaxBackgroundStable } from "@/components/ui/parallax-background-stable"

export function ResponsiveHero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const { trackReservationAttempt, trackSectionView } = useAnalytics()
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Simple animations for mobile, complex for desktop
  const animationConfig = {
    title: {
      initial: { y: isMobile ? 20 : 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { 
        duration: shouldReduceMotion ? 0.01 : (isMobile ? 0.5 : 1.5),
        ease: isMobile ? "easeOut" : "easeInOut"
      }
    },
    subtitle: {
      initial: { y: isMobile ? 10 : 50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { 
        duration: shouldReduceMotion ? 0.01 : (isMobile ? 0.5 : 1.5),
        delay: shouldReduceMotion ? 0 : (isMobile ? 0.1 : 0.3)
      }
    },
    cta: {
      initial: { y: isMobile ? 10 : 30, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { 
        duration: shouldReduceMotion ? 0.01 : (isMobile ? 0.5 : 1),
        delay: shouldReduceMotion ? 0 : (isMobile ? 0.2 : 0.6)
      }
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ minHeight: isMobile ? '100svh' : '100vh' }} // Safe viewport height for mobile
    >
      <ParallaxBackgroundStable 
        imageSrc="/images/optimized/hero.webp"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-aristocrat-void/30 via-transparent to-aristocrat-void/50" />

      <div className="relative z-10 text-center responsive-container max-w-6xl mx-auto">
        <div className="mb-8 md:mb-16 hero-tagline">
          <p className="aristocrat-subtext text-center text-xs md:text-sm">
            <time dateTime="1924">Est. MCMXXIV</time> — {seoContent.hero.tagline}
          </p>
        </div>

        <motion.h1
          ref={titleRef}
          {...animationConfig.title}
          className="responsive-hero-title font-light serif tracking-tight"
        >
          <span className="text-aristocrat-white">MAISON</span>
          <br />
          <span className="text-aristocrat-cream font-extralight">COCKTAIL</span>
        </motion.h1>

        <hr className="w-16 md:w-24 h-px bg-aristocrat-charcoal mx-auto mb-8 md:mb-12 border-0" aria-hidden="true" />

        <motion.p
          ref={subtitleRef}
          {...animationConfig.subtitle}
          className="responsive-hero-subtitle aristocrat-text max-w-2xl mx-auto font-extralight leading-relaxed sans"
        >
          L&apos;art de la mixologie française
          <br />
          <span className="aristocrat-subtext mt-4 md:mt-6 block">{seoContent.hero.subTagline}</span>
        </motion.p>

        <motion.nav 
          {...animationConfig.cta}
          className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center hero-cta" 
          aria-label="Actions principales"
        >
          <motion.a
            href="#cocktails"
            whileHover={!isMobile ? { y: -2 } : {}}
            whileTap={{ scale: 0.98 }}
            className="responsive-button aristocrat-button w-full sm:w-auto"
            aria-label="Voir notre collection de cocktails"
            title="Découvrir notre collection exclusive de cocktails artisanaux"
            onClick={() => trackSectionView('cocktails_from_hero')}
          >
            {isMobile ? "Découvrir" : seoContent.hero.cta.primary}
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={!isMobile ? { y: -2 } : {}}
            whileTap={{ scale: 0.98 }}
            className="responsive-button aristocrat-link w-full sm:w-auto"
            aria-label="Réserver une dégustation de cocktails"
            title="Réserver une expérience de dégustation personnalisée"
            onClick={() => trackReservationAttempt('hero')}
          >
            {isMobile ? "Réserver" : seoContent.hero.cta.secondary}
          </motion.a>
        </motion.nav>
      </div>

      <motion.a
        href="#cocktails"
        animate={!shouldReduceMotion ? { y: [0, 8, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2"
        aria-label="Défiler vers la collection de cocktails"
        title="Défiler pour découvrir notre collection"
      >
        <ChevronDown className="w-5 h-5 text-aristocrat-gray" />
      </motion.a>
    </section>
  )
}