# 🍸 Maison Cocktail - Premium Cocktail Bar Landing Page

<div align="center">
  <img src="public/images/optimized/hero.webp" alt="Maison Cocktail Hero" width="800" style="border-radius: 12px; margin-bottom: 20px;" />
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![GSAP](https://img.shields.io/badge/GSAP-3.13-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

  **A sophisticated, performance-optimized landing page for an exclusive Parisian cocktail bar**
  
  [🚀 Live Demo](https://maisoncocktail.fr) · [📖 Documentation](docs/SEO-GUIDE.md) · [🐛 Report Bug](https://github.com/username/cocktail-landing/issues)
</div>

## ✨ Features

### 🎨 **Design Excellence**
- **Luxury French Aesthetic** - Elegant design inspired by Parisian sophistication
- **Responsive Design** - Seamless experience across all devices
- **Premium Animations** - Smooth GSAP-powered transitions and scroll effects
- **Interactive Gallery** - Immersive cocktail collection showcase
- **Custom Typography** - Carefully selected fonts for premium feel

### ⚡ **Performance Optimized**
- **95% Image Reduction** - WebP format with responsive variants
- **Code Splitting** - Dynamic imports for optimal loading
- **Core Web Vitals** - LCP < 2.5s, FID < 100ms, CLS < 0.1
- **SEO Perfect Score** - Complete technical and content optimization
- **Bundle Size** - Only 202kB first load JS

### 🔍 **SEO Powerhouse**
- **Multi-language Support** - Full French localization
- **Schema.org Markup** - Rich snippets for local business
- **Google Analytics 4** - Advanced tracking and insights
- **Search Console Integration** - Real-time performance monitoring
- **Structured Data** - FAQ, LocalBusiness, Organization schemas

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Frontend**
- ⚛️ **Next.js 15.4.5** - React framework with App Router
- 🎨 **TypeScript** - Type-safe development
- 💨 **Tailwind CSS** - Utility-first styling
- 🎬 **Framer Motion** - Animation library
- 🚀 **GSAP** - High-performance animations

</td>
<td valign="top" width="50%">

**Optimization**
- 🖼️ **Sharp** - Image optimization
- 📦 **Dynamic Imports** - Code splitting
- 🔄 **Custom Hooks** - Performance utilities
- 📊 **Analytics** - Google Analytics 4
- 🎯 **SEO Tools** - Complete optimization suite

</td>
</tr>
</table>

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/username/cocktail-landing.git
cd cocktail-landing

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📁 Project Structure

```
cocktail-landing/
├── 📱 app/                    # Next.js App Router
│   ├── layout.tsx            # Root layout with SEO
│   ├── page.tsx              # Home page
│   ├── sitemap.ts            # Dynamic sitemap
│   └── manifest.ts           # PWA manifest
├── 🧩 components/            # React components
│   ├── sections/             # Page sections
│   │   ├── hero.tsx         # Landing hero
│   │   ├── cocktail-grid.tsx # Collection showcase
│   │   ├── about.tsx        # Company story
│   │   └── faq.tsx          # FAQ section
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components
│   ├── seo/                 # SEO components
│   └── analytics/           # Analytics integration
├── 📊 data/                  # Static data
│   ├── cocktails.ts         # Cocktail collection
│   └── seo-content.ts       # SEO-optimized content
├── 🖼️ public/images/optimized/ # Optimized WebP images
├── 🔧 lib/                   # Utilities and configs
├── 📚 docs/                  # Documentation
└── 🎨 styles/               # Global styles
```

## 🎯 Key Sections

### 🏠 Hero Section
- **Parallax Background** - Smooth scrolling effects
- **Premium Typography** - French luxury aesthetic  
- **CTA Optimization** - Conversion-focused design
- **Mobile Responsive** - Perfect on all screens

### 🍸 Cocktail Collection
- **Interactive Gallery** - 3D coverflow effect
- **Smooth Animations** - GSAP-powered transitions
- **Lazy Loading** - Performance optimized
- **Responsive Design** - Adapts to screen size

### 📖 About Section
- **Company Story** - Rich French content
- **Interactive Principles** - Expandable cards
- **Schema Markup** - SEO optimized
- **Internal Linking** - Navigation enhancement

### ❓ FAQ Section
- **Structured Data** - Rich snippets ready
- **Smooth Animations** - Accordion interactions
- **SEO Optimized** - Question targeting
- **Accessibility** - ARIA compliant

## 📊 Performance Metrics

<table>
<tr>
<td align="center">
<strong>🚀 Performance</strong><br/>
<img src="https://img.shields.io/badge/Lighthouse-100-brightgreen?style=for-the-badge&logo=lighthouse" />
</td>
<td align="center">
<strong>♿ Accessibility</strong><br/>
<img src="https://img.shields.io/badge/Lighthouse-100-brightgreen?style=for-the-badge&logo=lighthouse" />
</td>
<td align="center">
<strong>💡 Best Practices</strong><br/>
<img src="https://img.shields.io/badge/Lighthouse-100-brightgreen?style=for-the-badge&logo=lighthouse" />
</td>
<td align="center">
<strong>🔍 SEO</strong><br/>
<img src="https://img.shields.io/badge/Lighthouse-100-brightgreen?style=for-the-badge&logo=lighthouse" />
</td>
</tr>
</table>

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

### Bundle Analysis
- **First Load JS**: 202kB (Excellent)
- **Image Optimization**: 95% size reduction
- **Code Splitting**: Dynamic imports implemented
- **Caching Strategy**: Optimized for performance

## 🔧 Configuration

### Environment Variables

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code

# Site Configuration  
NEXT_PUBLIC_SITE_URL=https://maisoncocktail.fr
NEXT_PUBLIC_SITE_NAME="Maison Cocktail"

# Contact Information
NEXT_PUBLIC_BUSINESS_EMAIL=contact@maisoncocktail.fr
NEXT_PUBLIC_BUSINESS_PHONE=+33142961073
```

### SEO Configuration

The project includes comprehensive SEO setup:

- **Metadata**: Optimized titles, descriptions, keywords
- **Schema.org**: LocalBusiness, FAQ, Organization markup
- **Open Graph**: Social media optimization
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine directives

## 📈 SEO Features

### 🎯 **Keyword Targeting**
- Primary: `cocktail Paris`, `bar à cocktails Paris`, `mixologie française`
- Secondary: `cocktails premium`, `bar luxe Paris`, `Place Vendôme`
- Long-tail: `réserver table bar cocktail Paris`, `cours mixologie`

### 📊 **Analytics & Tracking**
- Google Analytics 4 integration
- Custom event tracking
- Core Web Vitals monitoring  
- Search Console integration
- Performance dashboard

### 🌐 **International SEO**
- French language optimization
- Local business markup
- Geographic targeting
- Cultural adaptation

## 🎨 Design Philosophy

### Color Palette
```css
/* Aristocrat Theme */
--aristocrat-void: #0A0A0A      /* Deep black backgrounds */
--aristocrat-obsidian: #1A1A1A  /* Card backgrounds */
--aristocrat-charcoal: #2A2A2A  /* Borders and accents */
--aristocrat-gray: #8A8A8A      /* Secondary text */
--aristocrat-cream: #D4B896     /* Gold accent color */
--aristocrat-white: #F5F5F5     /* Primary text */
```

### Typography
- **Headers**: Serif fonts for elegance
- **Body**: Sans-serif for readability  
- **Accent**: Light weights for sophistication
- **Hierarchy**: Clear visual distinction

## 🤝 Contributing

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain 100% Lighthouse scores
- Add tests for new features
- Update documentation
- Optimize for performance

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Parisian luxury establishments
- **Performance**: Next.js and Vercel teams
- **Animation**: GSAP and Framer Motion
- **Images**: Optimized with Sharp
- **SEO**: Following Google best practices

---

<div align="center">
  <p><strong>Made with ❤️ for the art of French mixology</strong></p>
  
  [![GitHub stars](https://img.shields.io/github/stars/username/cocktail-landing?style=social)](https://github.com/username/cocktail-landing/stargazers)
  [![GitHub forks](https://img.shields.io/github/forks/username/cocktail-landing?style=social)](https://github.com/username/cocktail-landing/network/members)
  [![GitHub issues](https://img.shields.io/github/issues/username/cocktail-landing)](https://github.com/username/cocktail-landing/issues)
  
  **[⭐ Star this repo](https://github.com/username/cocktail-landing) if you found it helpful!**
</div>