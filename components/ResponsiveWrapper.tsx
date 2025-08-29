"use client"

import { useEffect, useState } from "react"

interface ResponsiveWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ResponsiveWrapper({ children, fallback = null }: ResponsiveWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // During SSR, render a simplified version without responsive classes
  if (!isMounted) {
    return <>{fallback || children}</>
  }

  return <>{children}</>
}