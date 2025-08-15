# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Maison Cocktail**, a premium cocktail bar landing page built with Next.js 15.4.5, featuring luxury French design, performance optimization, and comprehensive SEO. The site showcases an exclusive Parisian cocktail bar with a sophisticated dark theme ("aristocrat" color scheme) and advanced animations.

## Development Commands

### Essential Commands
```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Production server
npm start

# Linting
npm run lint
```

### Environment Setup
- Node.js 18+ required
- Copy `.env.example` to `.env.local` and configure analytics
- Development server runs on `http://localhost:3000`

## Architecture & Key Concepts

### Data-Driven Content System
- **Static Data**: Cocktails defined in `data/cocktails.ts` with TypeScript interfaces
- **SEO Content**: Centralized SEO-optimized content in `data/seo-content.ts` including French keywords, meta descriptions, and structured snippets
- **Analytics Config**: Business-specific tracking configuration in `lib/analytics-config.ts`

### Component Architecture
```
components/
├── sections/        # Main page sections (hero, about, cocktail-grid, faq)
├── ui/             # Reusable components (cocktail-card, optimized-image)
├── layout/         # Header and footer
├── seo/            # SEO components (structured-data, search-console)
├── analytics/      # Google Analytics integration
└── providers/      # Theme and Lenis (smooth scroll) providers
```

### Image Optimization Strategy
- All images stored in `public/images/optimized/` as WebP format
- Responsive variants: `-sm.webp`, `-md.webp`, `-lg.webp`
- Next.js Image component configured for optimal Core Web Vitals
- 95% size reduction achieved through Sharp optimization

### Animation Libraries
- **GSAP**: High-performance scroll animations and complex transitions
- **Framer Motion**: Component-level animations and interactions
- **Lenis**: Smooth scrolling provider wrapping the entire app
- Custom CSS animations in Tailwind config for cocktail-specific effects

### SEO & Performance Focus
- **French Localization**: All content optimized for French market (`lang="fr"`)
- **Structured Data**: LocalBusiness, FAQ, and Organization schemas
- **Core Web Vitals**: Optimized for LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Google Analytics 4**: Business-specific event tracking for reservations and cocktail interactions

### Theme System
- **Dark-first Design**: Uses "aristocrat" color palette (void, obsidian, charcoal, cream)
- **Custom Colors**: Cocktail-specific gradients defined in Tailwind config
- **next-themes**: Theme switching with system preference detection

## Key Files for Development

### Core Configuration
- `next.config.ts`: Image optimization and package import settings
- `tailwind.config.ts`: Custom aristocrat colors and cocktail gradients
- `app/layout.tsx`: Root layout with SEO metadata and providers

### Business Logic
- `data/cocktails.ts`: Cocktail collection with ingredients and instructions
- `data/seo-content.ts`: French SEO content and keyword targeting
- `lib/analytics-config.ts`: Business event tracking configuration

### Custom Hooks
- `hooks/useIntersectionObserver.ts`: For scroll-triggered animations
- `hooks/useSmoothScroll.ts`: Smooth scrolling to sections
- `hooks/useOptimizedMouseMove.ts`: Performance-optimized mouse tracking

## Analytics & Business Tracking

The site tracks specific business metrics:
- Cocktail views and interactions
- Reservation click intents
- Contact method engagements (phone, email, form)
- Scroll depth and time on page
- GDPR-compliant consent management

## Development Guidelines

### Performance Requirements
- Maintain 100/100 Lighthouse scores across all metrics
- Keep First Load JS under 250kB
- Use dynamic imports for heavy libraries
- Optimize images through Sharp before adding to `/public/images/optimized/`

### Content Updates
- Cocktail data: Update `data/cocktails.ts` with proper TypeScript interfaces
- SEO content: Modify `data/seo-content.ts` for keyword and meta changes
- Images: Add responsive WebP variants following naming convention

### Styling Conventions
- Use Tailwind's aristocrat color palette for brand consistency
- Apply cocktail gradient colors for product elements
- Implement smooth animations using GSAP for complex effects
- Use Framer Motion for component-level interactions

## French Business Context

This is a luxury cocktail bar targeting the Parisian market with emphasis on:
- Premium mixology and French craftsmanship
- Place Vendôme location (luxury district)
- Heritage since 1924
- Exclusive reservations and private events
- High-end customer experience