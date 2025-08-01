"use client"

import { useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Cocktail } from "@/data/cocktails"
import { Wine, Droplet } from "lucide-react"
import { cn } from "@/lib/utils"

interface CocktailCardProps {
  cocktail: Cocktail
  index?: number
}

export function CocktailCard({ cocktail, index = 0 }: CocktailCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group cursor-pointer"
    >
      <div className="relative h-[450px] rounded-2xl overflow-hidden glass p-6 transform-gpu transition-all duration-300 hover:shadow-2xl">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={cn("absolute inset-0 bg-gradient-to-br", cocktail.color)} />
        </div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full glass">
              <Wine className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Droplet className="w-4 h-4" />
              <span>{cocktail.alcohol}%</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-2 gradient-text">{cocktail.name}</h3>
          <p className="text-muted-foreground mb-4 flex-grow">{cocktail.description}</p>

          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Ingredients
              </h4>
              <div className="flex flex-wrap gap-2">
                {cocktail.ingredients.slice(0, 3).map((ingredient, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="px-3 py-1 rounded-full glass text-xs"
                  >
                    {ingredient.split(" ").slice(-1)[0]}
                  </motion.span>
                ))}
                {cocktail.ingredients.length > 3 && (
                  <span className="px-3 py-1 rounded-full glass text-xs">
                    +{cocktail.ingredients.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-full liquid-gradient text-white font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              View Recipe
            </motion.button>
          </div>
        </div>

        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: `radial-gradient(circle, hsl(var(--${cocktail.color.split("-")[1]})) 0%, transparent 70%)`,
          }}
        />
      </div>
    </motion.div>
  )
}