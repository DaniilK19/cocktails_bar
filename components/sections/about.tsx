"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "@/lib/gsap"
import { ParallaxWrapper } from "@/components/ui/parallax-wrapper"
import { LiquidBlob } from "@/components/ui/liquid-blob"
import { Award, Users, Clock, Star } from "lucide-react"

const stats = [
  { icon: Award, value: "200+", label: "Unique Recipes" },
  { icon: Users, value: "50k+", label: "Happy Customers" },
  { icon: Clock, value: "10+", label: "Years Experience" },
  { icon: Star, value: "4.9", label: "Average Rating" },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const content = contentRef.current?.children
      if (!content) return

      gsap.from(content, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
      })

      const statItems = sectionRef.current?.querySelectorAll(".stat-item")
      statItems?.forEach((item, index) => {
        gsap.from(item, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 overflow-hidden"
    >
      <ParallaxWrapper speed={0.3} className="absolute inset-0">
        <LiquidBlob className="w-96 h-96 -top-48 -left-48" color="cocktail-purple" />
      </ParallaxWrapper>
      <ParallaxWrapper speed={0.5} className="absolute inset-0">
        <LiquidBlob className="w-80 h-80 -bottom-32 -right-32" color="cocktail-green" />
      </ParallaxWrapper>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ParallaxWrapper speed={0.2}>
            <div ref={contentRef}>
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                <span className="gradient-text">Crafting</span>{" "}
                <span className="text-foreground">Experiences</span>
              </motion.h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Welcome to Mixology, where passion meets precision in every pour. 
                Our journey began with a simple belief: that cocktails are more than 
                just drinks – they&apos;re stories in a glass, moments to be savored, 
                and memories waiting to be made.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                With over a decade of experience and a commitment to innovation, 
                we&apos;ve curated a collection that celebrates both timeless classics 
                and bold new creations. Each recipe is crafted with care, using 
                only the finest ingredients and techniques.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full liquid-gradient text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Our Story
              </motion.button>
            </div>
          </ParallaxWrapper>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="stat-item"
              >
                <div className="glass p-8 rounded-2xl text-center transform transition-all duration-300 hover:shadow-2xl">
                  <ParallaxWrapper speed={0.1 * (index + 1)}>
                    <div className="inline-flex p-4 rounded-full liquid-gradient mb-4">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </ParallaxWrapper>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}