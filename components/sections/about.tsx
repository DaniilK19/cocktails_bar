"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
// Lazy load GSAP to reduce initial bundle size
const loadGSAP = () => import("@/lib/gsap").then(mod => mod.gsap)
import { ChevronRight, Clock, Award, Sparkles, Crown } from "lucide-react"
import { seoContent } from "@/data/seo-content"
import { InternalLink } from "@/components/ui/internal-link"

const principles = [
  { 
    number: "01", 
    title: seoContent.about.values.heritage.title, 
    description: "Héritage des maîtres mixologues",
    icon: Clock,
    details: seoContent.about.values.heritage.description,
    stats: "100 ans d'excellence"
  },
  { 
    number: "02", 
    title: seoContent.about.values.innovation.title, 
    description: "Créativité contemporaine",
    icon: Sparkles,
    details: seoContent.about.values.innovation.description,
    stats: "50+ créations exclusives"
  },
  { 
    number: "03", 
    title: seoContent.about.values.craftsmanship.title, 
    description: "Perfection dans chaque détail",
    icon: Award,
    details: seoContent.about.values.craftsmanship.description,
    stats: "Spiritueux d'exception"
  },
  { 
    number: "04", 
    title: seoContent.about.values.experience.title, 
    description: "L'élégance française",
    icon: Crown,
    details: seoContent.about.values.experience.description,
    stats: "Place Vendôme Paris"
  },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Load GSAP dynamically
    loadGSAP().then((gsap) => {
      const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, 
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )

      gsap.fromTo(contentRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )

      const principleItems = sectionRef.current?.querySelectorAll(".principle-item")
      principleItems?.forEach((item, index) => {
        gsap.fromTo(item,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      })
    }, sectionRef)

      return () => ctx.revert()
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Static Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: 0.25,
            filter: 'blur(1.2px)',
            backgroundImage: 'url(/images/optimized/our_history.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
          role="img"
          aria-label="Maison Cocktail - Notre histoire et héritage"
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <article>
            <motion.p
              className="aristocrat-subtext mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Notre Histoire
            </motion.p>

            <motion.h2
              ref={titleRef}
              className="text-5xl md:text-6xl font-light mb-12 serif tracking-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-aristocrat-white">{seoContent.about.title.split(' ').slice(0, 2).join(' ')}</span>
              <br />
              <span className="text-aristocrat-cream font-extralight">{seoContent.about.title.split(' ').slice(2).join(' ')}</span>
            </motion.h2>

            <hr className="w-16 h-px bg-aristocrat-charcoal mb-12 border-0" aria-hidden="true" />

            <motion.div
              ref={contentRef}
              className="space-y-8 aristocrat-text leading-loose font-extralight sans"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p>
                {seoContent.about.intro}
              </p>
              <p>
                Chaque création naît d&apos;une recherche minutieuse, d&apos;une sélection 
                rigoureuse des meilleurs ingrédients et d&apos;un savoir-faire transmis 
                de génération en génération.
              </p>
              <p>
                Notre atelier parisien cultive l&apos;excellence, créant des expériences 
                sensorielles uniques pour une clientèle exigeante à la recherche 
                de l&apos;authenticité et du raffinement.
              </p>
              
              {/* Internal linking CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-12 flex flex-col sm:flex-row gap-6"
              >
                <InternalLink 
                  href="#cocktails" 
                  variant="primary"
                  showArrow
                  title="Découvrir notre collection exclusive de cocktails premium"
                >
                  Découvrir nos Créations Signature
                </InternalLink>
                <InternalLink 
                  href="#contact" 
                  variant="secondary"
                  title="Réserver une dégustation privée de cocktails artisanaux"
                >
                  Réserver une Dégustation Privée
                </InternalLink>
              </motion.div>
            </motion.div>
          </article>

          <aside className="space-y-8" aria-label="Nos principes fondateurs">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              const isActive = activeIndex === index
              const isHovered = hoveredIndex === index
              
              return (
                <motion.div
                  key={index}
                  className="principle-item group cursor-pointer"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Interactive Card */}
                  <div className={`relative border transition-all duration-500 p-6 overflow-hidden ${
                    isActive 
                      ? 'border-aristocrat-cream/60 bg-aristocrat-obsidian/30' 
                      : isHovered 
                      ? 'border-aristocrat-cream/30 bg-aristocrat-obsidian/20'
                      : 'border-aristocrat-charcoal/20 hover:border-aristocrat-charcoal/40'
                  }`}>
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-6">
                        {/* Number */}
                        <div className={`text-3xl font-light serif transition-colors duration-300 ${
                          isActive || isHovered 
                            ? 'text-aristocrat-cream' 
                            : 'text-aristocrat-cream/80'
                        }`}>
                          {principle.number}
                        </div>
                        
                        {/* Icon */}
                        <div className={`p-2 transition-all duration-300 ${
                          isActive || isHovered 
                            ? 'text-aristocrat-cream' 
                            : 'text-aristocrat-gray'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        {/* Title */}
                        <div>
                          <h3 className={`text-xl lg:text-2xl font-light serif mb-1 transition-colors duration-300 ${
                            isActive || isHovered 
                              ? 'text-aristocrat-white' 
                              : 'text-aristocrat-cream/80'
                          }`}>
                            {principle.title}
                          </h3>
                          <p className="aristocrat-text font-extralight sans text-sm">
                            {principle.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Expand Arrow */}
                      <motion.div
                        animate={{ rotate: isActive ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`transition-colors duration-300 ${
                          isActive || isHovered 
                            ? 'text-aristocrat-cream' 
                            : 'text-aristocrat-gray'
                        }`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                    
                    {/* Expandable Content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 border-t border-aristocrat-charcoal/20">
                            {/* Detailed Description */}
                            <p className="text-aristocrat-cream/80 font-extralight leading-relaxed mb-6 text-sm lg:text-base">
                              {principle.details}
                            </p>
                            
                            {/* Stats */}
                            <div className="flex items-center justify-between">
                              <div className="aristocrat-subtext text-xs">
                                {principle.stats}
                              </div>
                              
                              <button 
                                className="aristocrat-button text-xs py-2 px-4 cursor-pointer border border-aristocrat-charcoal/30 hover:border-aristocrat-cream/40 transition-all duration-300"
                                title={`En savoir plus sur ${principle.title.toLowerCase()}`}
                                aria-label={`En savoir plus sur notre principe: ${principle.title}`}
                              >
                                En savoir plus
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Subtle Background Pattern */}
                    <div className={`absolute inset-0 opacity-5 pointer-events-none transition-opacity duration-500 ${
                      isActive ? 'opacity-10' : ''
                    }`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-aristocrat-cream/10 to-transparent"></div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
            
            {/* Interactive Hint */}
            <motion.div 
              className="text-center pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="aristocrat-subtext text-xs text-aristocrat-gray/60">
                Cliquez sur chaque principe pour découvrir notre histoire
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  )
}