// Global type definitions
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'consent',
      targetId: string,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }

  interface LayoutShift extends PerformanceEntry {
    value: number
    hadRecentInput: boolean
  }

  interface PerformanceEventTiming extends PerformanceEntry {
    processingStart: number
  }
}

export {}