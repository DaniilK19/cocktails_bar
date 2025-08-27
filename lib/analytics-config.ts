// Analytics configuration for Maison Cocktail
export const analyticsConfig = {
  google: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    verificationCode: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || ''
  },
  
  // SEO monitoring settings
  seo: {
    enableCoreWebVitals: true,
    enableScrollTracking: true,
    enableErrorTracking: true,
    trackingThresholds: {
      scrollDepth: [25, 50, 75, 90, 100],
      timeOnPage: [30, 60, 180, 300], // seconds
      clickDepth: [1, 3, 5, 10]
    }
  },

  // Events specific to cocktail bar business
  events: {
    cocktailView: 'cocktail_viewed',
    reservationClick: 'reservation_click',
    contactSubmit: 'contact_submit',
    menuDownload: 'menu_download',
    phoneCall: 'phone_call_click',
    emailClick: 'email_click',
    socialShare: 'social_share',
    locationClick: 'location_click'
  },

  // Custom parameters for enhanced tracking
  customParameters: {
    businessCategory: 'Food & Beverage',
    businessType: 'Cocktail Bar',
    location: 'Place Vendôme Paris',
    priceRange: 'Premium',
    serviceType: 'Dine-in'
  }
}

// Helper function to check if analytics should be loaded
export const shouldLoadAnalytics = (): boolean => {
  // Don't load in development unless explicitly enabled
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_DEV === 'true'
  }
  
  // Always load in production
  return process.env.NODE_ENV === 'production'
}

// Privacy-compliant analytics initialization
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined' && shouldLoadAnalytics()) {
    // Check for consent (GDPR compliance)
    const hasConsent = localStorage.getItem('analytics-consent') === 'true'
    
    if (hasConsent) {
      // Initialize Google Analytics with privacy settings
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'denied', // We don't use ads
          functionality_storage: 'granted',
          personalization_storage: 'denied',
          security_storage: 'granted'
        })
      }
    }
  }
}

// Track business-specific events
export const businessEventTrackers = {
  trackReservationIntent: (source: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', analyticsConfig.events.reservationClick, {
        event_category: 'conversion',
        event_label: source,
        custom_parameter_business_intent: 'high',
        value: 1
      })
    }
  },

  trackCocktailInterest: (cocktailName: string, action: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', analyticsConfig.events.cocktailView, {
        event_category: 'product_interaction',
        event_label: cocktailName,
        custom_parameter_action: action,
        cocktail_category: 'signature'
      })
    }
  },

  trackContactEngagement: (method: 'phone' | 'email' | 'form') => {
    const eventMap = {
      phone: analyticsConfig.events.phoneCall,
      email: analyticsConfig.events.emailClick,
      form: analyticsConfig.events.contactSubmit
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventMap[method], {
        event_category: 'engagement',
        event_label: `contact_${method}`,
        contact_method: method,
        business_priority: 'high'
      })
    }
  }
}