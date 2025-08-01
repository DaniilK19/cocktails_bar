interface SearchConsoleProps {
  verificationCode?: string
}

export function SearchConsole({ verificationCode }: SearchConsoleProps) {
  if (!verificationCode) return null

  return (
    <meta 
      name="google-site-verification" 
      content={verificationCode}
    />
  )
}

// SEO monitoring utilities
export const seoMonitoring = {
  // Track Core Web Vitals
  measureCWV: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'LCP', {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(lastEntry.startTime),
            non_interaction: true
          })
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach((entry) => {
          if (typeof window.gtag === 'function') {
            const performanceEntry = entry as PerformanceEventTiming
            window.gtag('event', 'FID', {
              event_category: 'Web Vitals',
              event_label: 'FID',
              value: Math.round(performanceEntry.processingStart - performanceEntry.startTime),
              non_interaction: true
            })
          }
        })
      }).observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift
      let clsValue = 0
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const layoutShiftEntry = entry as LayoutShift
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value
          }
        }
        
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'CLS', {
            event_category: 'Web Vitals',
            event_label: 'CLS',
            value: Math.round(clsValue * 1000),
            non_interaction: true
          })
        }
      }).observe({ entryTypes: ['layout-shift'] })
    }
  },

  // Monitor page visibility changes
  trackPageVisibility: () => {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'page_visibility_change', {
            event_category: 'engagement',
            event_label: document.hidden ? 'hidden' : 'visible',
            non_interaction: true
          })
        }
      })
    }
  },

  // Track scroll depth for SEO insights
  trackScrollDepth: () => {
    if (typeof window !== 'undefined') {
      const thresholds = [25, 50, 75, 90, 100]
      const tracked = new Set()

      const checkScrollDepth = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        )

        thresholds.forEach((threshold) => {
          if (scrollPercent >= threshold && !tracked.has(threshold)) {
            tracked.add(threshold)
            
            if (typeof window.gtag === 'function') {
              window.gtag('event', 'scroll_depth', {
                event_category: 'engagement',
                event_label: `${threshold}%`,
                value: threshold,
                non_interaction: true
              })
            }
          }
        })
      }

      window.addEventListener('scroll', checkScrollDepth, { passive: true })
    }
  },

  // Initialize all monitoring
  init: () => {
    if (typeof window !== 'undefined') {
      // Wait for page load
      window.addEventListener('load', () => {
        seoMonitoring.measureCWV()
        seoMonitoring.trackPageVisibility()
        seoMonitoring.trackScrollDepth()
      })
    }
  }
}