"use client"

import Script from 'next/script'

interface GoogleAnalyticsProps {
  measurementId: string
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
              'custom_parameter_1': 'cocktail_section_viewed',
              'custom_parameter_2': 'reservation_attempted'
            }
          });
          
          // Enhanced e-commerce for cocktail bar
          gtag('config', '${measurementId}', {
            custom_map: {
              'cocktail_viewed': 'custom_parameter_1',
              'reservation_click': 'custom_parameter_2',
              'contact_form_submit': 'custom_parameter_3'
            },
            // SEO tracking
            content_group1: 'Cocktail Bar',
            content_group2: 'Maison Cocktail',
            content_group3: 'Place Vendôme'
          });
        `}
      </Script>
    </>
  )
}

// Hook for tracking custom events
export function useAnalytics() {
  const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      window.gtag('event', eventName, {
        event_category: 'engagement',
        event_label: 'cocktail_interaction',
        ...parameters
      })
    }
  }

  const trackCocktailView = (cocktailName: string) => {
    trackEvent('cocktail_viewed', {
      cocktail_name: cocktailName,
      event_category: 'cocktails',
      event_label: 'cocktail_gallery'
    })
  }

  const trackReservationAttempt = (section: string) => {
    trackEvent('reservation_attempted', {
      source_section: section,
      event_category: 'conversion',
      event_label: 'reservation_intent'
    })
  }

  const trackContactSubmit = () => {
    trackEvent('contact_form_submit', {
      event_category: 'conversion',
      event_label: 'contact_form',
      value: 1
    })
  }

  const trackSectionView = (sectionName: string) => {
    trackEvent('section_viewed', {
      section_name: sectionName,
      event_category: 'navigation',
      event_label: 'scroll_tracking'
    })
  }

  return {
    trackEvent,
    trackCocktailView,
    trackReservationAttempt,
    trackContactSubmit,
    trackSectionView
  }
}