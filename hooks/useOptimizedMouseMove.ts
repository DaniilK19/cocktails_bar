import { useCallback, useRef, useState } from 'react'

interface MousePosition {
  x: number
  y: number
}

export function useOptimizedMouseMove(throttleMs: number = 16) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const elementRef = useRef<HTMLDivElement>(null)
  const lastUpdateTime = useRef<number>(0)
  const rafId = useRef<number | undefined>(undefined)
  
  // Cache element bounds to avoid repeated getBoundingClientRect calls
  const boundsCache = useRef<DOMRect | null>(null)
  
  const updateBounds = useCallback(() => {
    if (elementRef.current) {
      boundsCache.current = elementRef.current.getBoundingClientRect()
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now()
    
    if (now - lastUpdateTime.current < throttleMs) {
      return
    }
    
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
    }

    rafId.current = requestAnimationFrame(() => {
      if (!boundsCache.current) {
        updateBounds()
        if (!boundsCache.current) return
      }

      const rect = boundsCache.current
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      
      setMousePosition({ x, y })
      lastUpdateTime.current = now
    })
  }, [throttleMs, updateBounds])

  const handleMouseEnter = useCallback(() => {
    updateBounds()
  }, [updateBounds])

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
    }
    setMousePosition({ x: 0, y: 0 })
  }, [])

  // Transform mouse position to rotation values
  const rotateX = mousePosition.y * -7.5 // Inverted Y for natural feel
  const rotateY = mousePosition.x * 7.5

  return {
    elementRef,
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  }
}