"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "@/lib/gsap"

const principles = [
  { number: "01", title: "Tradition", description: "Héritage des maîtres verriers" },
  { number: "02", title: "Innovation", description: "Créativité contemporaine" },
  { number: "03", title: "Excellence", description: "Perfection dans chaque détail" },
  { number: "04", title: "Raffinement", description: "L'élégance française" },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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
      className="py-40 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
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

          <div className="space-y-12">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                className="principle-item minimal-border pt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-8">
                  <div className="aristocrat-subtext w-12">
                    {principle.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light text-aristocrat-white serif mb-3">
                      {principle.title}
                    </h3>
                    <p className="aristocrat-text font-extralight sans">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}