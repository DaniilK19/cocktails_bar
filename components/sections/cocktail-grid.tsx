"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { CocktailCard } from "@/components/ui/cocktail-card"
import { cocktails } from "@/data/cocktails"

export function CocktailGrid() {
  const gridRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          })
        },
      })

      const cards = gridRef.current?.querySelectorAll(".cocktail-card")
      cards?.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          onEnter: () => {
            gsap.from(card, {
              y: 80,
              opacity: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power4.out",
            })
          },
        })
      })
    }, gridRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={gridRef} className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">Signature</span>{" "}
            <span className="text-foreground">Collection</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our curated selection of handcrafted cocktails, each designed to deliver
            an unforgettable taste experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cocktails.map((cocktail, index) => (
            <div key={cocktail.id} className="cocktail-card">
              <CocktailCard cocktail={cocktail} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}