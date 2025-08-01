"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "@/lib/gsap"
import { ChevronRight, Clock, Award, Sparkles, Crown } from "lucide-react"

const principles = [
  { 
    number: "01", 
    title: "Tradition", 
    description: "Héritage des maîtres verriers",
    icon: Clock,
    details: "Depuis 1924, nous préservons les techniques ancestrales de distillation française, transmises de maître à apprenti dans le respect des traditions séculaires.",
    stats: "100 ans d'héritage"
  },
  { 
    number: "02", 
    title: "Innovation", 
    description: "Créativité contemporaine",
    icon: Sparkles,
    details: "Nos laboratoires de recherche explorent constamment de nouvelles saveurs, mélangeant science moderne et savoir-faire traditionnel pour créer l'extraordinaire.",
    stats: "50+ créations uniques"
  },
  { 
    number: "03", 
    title: "Excellence", 
    description: "Perfection dans chaque détail",
    icon: Award,
    details: "Chaque bouteille est le résultat d'un processus méticuleux de sélection, de contrôle qualité et de perfectionnement, garantissant une expérience incomparable.",
    stats: "99.9% de satisfaction"
  },
  { 
    number: "04", 
    title: "Raffinement", 
    description: "L'élégance française",
    icon: Crown,
    details: "L'art de vivre à la française s'exprime dans chaque création, alliant sophistication, élégance et cette touche d'exception qui fait notre réputation mondiale.",
    stats: "Présent dans 25 pays"
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
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Static Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: 0.25,
            filter: 'blur(1.2px)',
            backgroundImage: 'url(/images/our_history.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <motion.div
              className="aristocrat-subtext mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Notre Histoire
            </motion.div>

            <motion.h2
              ref={titleRef}
              className="text-5xl md:text-6xl font-light mb-12 serif tracking-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-aristocrat-white">UNE MAISON</span>
              <br />
              <span className="text-aristocrat-cream font-extralight">D'EXCEPTION</span>
            </motion.h2>

            <div className="w-16 h-px bg-aristocrat-charcoal mb-12"></div>

            <motion.div
              ref={contentRef}
              className="space-y-8 aristocrat-text leading-loose font-extralight sans"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p>
                Depuis notre fondation, nous perpétuons l'art ancestral de la mixologie 
                française, alliant techniques traditionnelles et vision contemporaine.
              </p>
              <p>
                Chaque création naît d'une recherche minutieuse, d'une sélection 
                rigoureuse des meilleurs ingrédients et d'un savoir-faire transmis 
                de génération en génération.
              </p>
              <p>
                Notre atelier parisien cultive l'excellence, créant des expériences 
                sensorielles uniques pour une clientèle exigeante.
              </p>
            </motion.div>
          </div>

          <div className="space-y-8">
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
                              
                              <div className="aristocrat-button text-xs py-2 px-4 cursor-pointer border border-aristocrat-charcoal/30 hover:border-aristocrat-cream/40 transition-all duration-300">
                                En savoir plus
                              </div>
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
          </div>
        </div>
      </div>
    </section>
  )
}