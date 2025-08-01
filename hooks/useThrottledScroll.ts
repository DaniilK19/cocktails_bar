import { useCallback, useRef, useEffect } from 'react'

export function useThrottledScroll(
  callback: (scrollY: number) => void,
  throttleMs: number = 16 // ~60fps
) {
  const rafId = useRef<number | undefined>(undefined)
  const lastCallTime = useRef<number>(0)

  const throttledCallback = useCallback(
    (scrollY: number) => {
      const now = Date.now()
      
      if (now - lastCallTime.current >= throttleMs) {
        lastCallTime.current = now
        callback(scrollY)
      }
    },
    [callback, throttleMs]
  )

  const handleScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
    }

    rafId.current = requestAnimationFrame(() => {
      throttledCallback(window.pageYOffset)
    })
  }, [throttledCallback])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [handleScroll])

  return handleScroll
}