export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://maisoncocktail.fr/#organization",
        "name": "Maison Cocktail",
        "url": "https://maisoncocktail.fr",
        "logo": {
          "@type": "ImageObject",
          "url": "https://maisoncocktail.fr/images/optimized/hero.webp",
          "width": 1200,
          "height": 630
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+33-1-42-96-10-73",
          "contactType": "customer service",
          "availableLanguage": "French"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "12 Place Vendôme",
          "addressLocality": "Paris",
          "postalCode": "75001",
          "addressCountry": "FR"
        },
        "sameAs": [
          "https://twitter.com/MaisonCocktail",
          "https://instagram.com/maisoncocktail"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://maisoncocktail.fr/#website",
        "url": "https://maisoncocktail.fr",
        "name": "Maison Cocktail",
        "description": "Art de la mixologie française - Collection exclusive de cocktails artisanaux",
        "publisher": {
          "@id": "https://maisoncocktail.fr/#organization"
        },
        "inLanguage": "fr-FR"
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://maisoncocktail.fr/#localbusiness",
        "name": "Maison Cocktail",
        "image": "https://maisoncocktail.fr/images/optimized/hero.webp",
        "url": "https://maisoncocktail.fr",
        "telephone": "+33-1-42-96-10-73",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "12 Place Vendôme",
          "addressLocality": "Paris",
          "postalCode": "75001",
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 48.8667,
          "longitude": 2.3333
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday", 
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "18:00",
            "closes": "02:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Saturday",
              "Sunday"
            ],
            "opens": "17:00", 
            "closes": "03:00"
          }
        ],
        "servesCuisine": "Cocktails",
        "priceRange": "€€€",
        "acceptsReservations": true
      },
      {
        "@type": "WebPage",
        "@id": "https://maisoncocktail.fr/#webpage",
        "url": "https://maisoncocktail.fr",
        "name": "Maison Cocktail | Art de la Mixologie Française | Paris",
        "isPartOf": {
          "@id": "https://maisoncocktail.fr/#website"
        },
        "about": {
          "@id": "https://maisoncocktail.fr/#organization"
        },
        "description": "Découvrez l'art de la mixologie française avec notre collection exclusive de cocktails artisanaux. Une expérience raffinée depuis 1924.",
        "inLanguage": "fr-FR"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}