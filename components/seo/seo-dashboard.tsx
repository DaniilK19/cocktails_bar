"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
// import { analyticsConfig } from '@/lib/analytics-config'

interface SEOMetrics {
  pageViews: number
  uniqueVisitors: number
  avgSessionDuration: string
  bounceRate: string
  topPages: Array<{ page: string; views: number }>
  searchQueries: Array<{ query: string; clicks: number; impressions: number }>
  coreWebVitals: {
    lcp: number
    fid: number
    cls: number
  }
}

export function SEODashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching SEO metrics
    // In real implementation, this would fetch from Google Analytics API
    const fetchMetrics = async () => {
      try {
        setIsLoading(true)
        
        // Mock data for demonstration
        const mockMetrics: SEOMetrics = {
          pageViews: 1250,
          uniqueVisitors: 890,
          avgSessionDuration: '3m 24s',
          bounceRate: '42%',
          topPages: [
            { page: '/', views: 650 },
            { page: '/#cocktails', views: 320 },
            { page: '/#about', views: 180 },
            { page: '/#contact', views: 100 }
          ],
          searchQueries: [
            { query: 'cocktail bar Paris', clicks: 45, impressions: 1200 },
            { query: 'bar Place Vendôme', clicks: 38, impressions: 950 },
            { query: 'mixologie française', clicks: 22, impressions: 680 },
            { query: 'cocktails premium Paris', clicks: 18, impressions: 540 }
          ],
          coreWebVitals: {
            lcp: 1.8, // seconds
            fid: 95, // milliseconds
            cls: 0.08 // score
          }
        }

        await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay
        setMetrics(mockMetrics)
      } catch (error) {
        console.error('Failed to fetch SEO metrics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-aristocrat-cream">Chargement des métriques SEO...</div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="text-center p-8 text-aristocrat-gray">
        Impossible de charger les métriques SEO
      </div>
    )
  }

  const getVitalStatus = (metric: string, value: number) => {
    const thresholds = {
      lcp: { good: 2.5, poor: 4.0 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 }
    }

    const threshold = thresholds[metric as keyof typeof thresholds]
    if (value <= threshold.good) return 'good'
    if (value <= threshold.poor) return 'needs-improvement'
    return 'poor'
  }

  return (
    <div className="p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-light serif mb-4">
          <span className="text-aristocrat-white">SEO</span>
          <span className="text-aristocrat-cream font-extralight ml-2">Dashboard</span>
        </h2>
        <p className="text-aristocrat-gray">Métriques de performance pour Maison Cocktail</p>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pages Vues', value: metrics.pageViews.toLocaleString(), change: '+12%' },
          { label: 'Visiteurs Uniques', value: metrics.uniqueVisitors.toLocaleString(), change: '+8%' },
          { label: 'Durée Moyenne', value: metrics.avgSessionDuration, change: '+15%' },
          { label: 'Taux de Rebond', value: metrics.bounceRate, change: '-5%' }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-aristocrat-void/30 border border-aristocrat-charcoal/20 rounded-lg p-6"
          >
            <div className="text-2xl font-light text-aristocrat-white">{metric.value}</div>
            <div className="text-sm text-aristocrat-gray">{metric.label}</div>
            <div className="text-xs text-green-400 mt-1">{metric.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Core Web Vitals */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-aristocrat-void/30 border border-aristocrat-charcoal/20 rounded-lg p-6"
      >
        <h3 className="text-xl font-light text-aristocrat-white mb-4">Core Web Vitals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'LCP', value: metrics.coreWebVitals.lcp, unit: 's', description: 'Largest Contentful Paint' },
            { name: 'FID', value: metrics.coreWebVitals.fid, unit: 'ms', description: 'First Input Delay' },
            { name: 'CLS', value: metrics.coreWebVitals.cls, unit: '', description: 'Cumulative Layout Shift' }
          ].map((vital) => {
            const status = getVitalStatus(vital.name.toLowerCase(), vital.value)
            const statusColors = {
              good: 'text-green-400',
              'needs-improvement': 'text-yellow-400',
              poor: 'text-red-400'
            }
            
            return (
              <div key={vital.name} className="text-center">
                <div className={`text-2xl font-light ${statusColors[status]}`}>
                  {vital.value}{vital.unit}
                </div>
                <div className="text-sm text-aristocrat-gray">{vital.name}</div>
                <div className="text-xs text-aristocrat-gray mt-1">{vital.description}</div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Top Search Queries */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-aristocrat-void/30 border border-aristocrat-charcoal/20 rounded-lg p-6"
      >
        <h3 className="text-xl font-light text-aristocrat-white mb-4">Requêtes de Recherche</h3>
        <div className="space-y-3">
          {metrics.searchQueries.map((query, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="text-aristocrat-cream">{query.query}</div>
              <div className="text-sm text-aristocrat-gray">
                {query.clicks} clics / {query.impressions} impressions
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <div className="text-sm text-aristocrat-gray">
          Dernière mise à jour: {new Date().toLocaleString('fr-FR')}
        </div>
        <div className="text-xs text-aristocrat-gray/60 mt-2">
          Données Google Analytics & Search Console
        </div>
      </motion.div>
    </div>
  )
}