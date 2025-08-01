# 📈 SEO Guide - Maison Cocktail

Guide complet pour la configuration et le monitoring SEO du site web Maison Cocktail.

## 🚀 Configuration Initiale

### 1. Variables d'Environnement

Copiez `.env.example` vers `.env.local` et configurez:

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=votre-code-verification

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://maisoncocktail.fr
```

### 2. Google Analytics 4

1. Créer un compte GA4 sur [analytics.google.com](https://analytics.google.com)
2. Créer une propriété pour `maisoncocktail.fr`
3. Copier le Measurement ID dans `.env.local`

### 3. Google Search Console

1. Aller sur [search.google.com/search-console](https://search.google.com/search-console)
2. Ajouter la propriété `https://maisoncocktail.fr`
3. Vérifier avec le code HTML dans `.env.local`

## 📊 Métriques Trackées

### Events Principaux
- `cocktail_viewed` - Vue d'un cocktail
- `reservation_click` - Clic sur réservation
- `contact_submit` - Soumission du formulaire
- `section_viewed` - Navigation entre sections

### Core Web Vitals
- **LCP**: Largest Contentful Paint < 2.5s
- **FID**: First Input Delay < 100ms
- **CLS**: Cumulative Layout Shift < 0.1

## 🎯 Mots-Clés Ciblés

### Primaires
- `cocktail Paris`
- `bar à cocktails Paris`
- `mixologie française`
- `cocktails Place Vendôme`

### Secondaires
- `bar cocktail luxe Paris`
- `meilleur bar cocktail Paris`
- `cocktails artisanaux Paris`
- `dégustation cocktails premium`

### Long-tail
- `réserver table bar cocktail Place Vendôme`
- `cours mixologie professionnelle Paris`
- `privatisation bar cocktail Paris centre`

## 🔧 Optimisations Techniques

### Performance
- Images WebP optimisées (95% réduction)
- Code splitting pour composants lourds
- Preload des ressources critiques
- Lazy loading GSAP

### SEO On-Page
- Métadonnées complètes (title, description, keywords)
- Schema.org (LocalBusiness, FAQ, Organization)
- Open Graph & Twitter Cards
- Sitemap.xml automatique

### Structure
- HTML sémantique (article, section, nav)
- Breadcrumbs avec Schema.org
- Internal linking optimisé
- Alt texts descriptifs

## 📈 Monitoring

### Dashboard SEO
Accès via `/seo-dashboard` (en développement):
- Métriques de trafic
- Core Web Vitals
- Requêtes de recherche
- Pages populaires

### Alerts Automatiques
- Baisse de performance > 20%
- Erreurs Core Web Vitals
- Problèmes d'indexation
- Perte de positions

## 🎨 Contenu SEO

### Structure des Pages
```
1. Hero Section
   - H1: "MAISON COCKTAIL"
   - Sous-titre optimisé SEO
   - CTA avec tracking

2. Collection Section
   - H2: "Collection Signature"
   - Grid de cocktails avec alt texts
   - Schema.org Product

3. About Section
   - H2: "L'Art du Cocktail Réinventé"
   - Contenu riche en mots-clés
   - Internal linking

4. FAQ Section
   - Schema.org FAQ
   - Questions SEO-optimisées
   - Réponses détaillées

5. Contact Section
   - Schema.org LocalBusiness
   - Informations de contact complètes
   - Horaires d'ouverture
```

### Guidelines Contenu
- Densité de mots-clés: 1-2%
- Longueur minimale: 300 mots par section
- Langue: Français (lang="fr")
- Tone: Premium, raffiné, expertise

## 🛠️ Maintenance

### Hebdomadaire
- [ ] Vérifier métriques GA4
- [ ] Contrôler Core Web Vitals
- [ ] Analyser requêtes Search Console

### Mensuelle
- [ ] Audit des backlinks
- [ ] Vérification indexation
- [ ] Optimisation contenu
- [ ] A/B test des CTA

### Trimestrielle
- [ ] Analyse concurrentielle
- [ ] Mise à jour mots-clés
- [ ] Audit technique complet
- [ ] Rapport de performance

## 🎯 Objectifs 2024

### Trafic
- +50% visiteurs organiques
- +30% temps sur site
- -20% taux de rebond

### Positionnement
- Top 3 pour "cocktail bar Paris"
- Top 5 pour "mixologie française"
- Top 10 pour 20+ mots-clés

### Conversions
- +40% clics sur réservation
- +25% appels téléphoniques
- +60% formulaires de contact

## 📞 Support

Pour toute question SEO, contacter:
- **Email**: seo@maisoncocktail.fr
- **Documentation**: `/docs/`
- **Dashboard**: `/seo-dashboard`