import { useEffect } from 'react'

export function useSmoothScroll() {
  useEffect(() => {
    // Simple CSS-based smooth scrolling
    if (typeof window !== 'undefined') {
      // Enable smooth scrolling for the entire page
      document.documentElement.style.scrollBehavior = 'smooth'
      
      // Optional: Add CSS scroll-behavior to body as well
      document.body.style.scrollBehavior = 'smooth'
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.documentElement.style.scrollBehavior = 'auto'
        document.body.style.scrollBehavior = 'auto'
      }
    }
  }, [])
}