"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface InternalLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'text'
  showArrow?: boolean
  title?: string
}

export function InternalLink({ 
  href, 
  children, 
  className = "",
  variant = 'primary',
  showArrow = false,
  title
}: InternalLinkProps) {
  const baseClasses = "inline-flex items-center gap-2 transition-all duration-300"
  
  const variantClasses = {
    primary: "aristocrat-button px-6 py-3",
    secondary: "aristocrat-link px-4 py-2",
    text: "text-aristocrat-cream hover:text-aristocrat-white"
  }

  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      title={title}
    >
      {children}
      {showArrow && (
        <motion.span
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      )}
    </motion.a>
  )
}