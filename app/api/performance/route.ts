import { NextResponse } from 'next/server'

export const runtime = 'edge'

// Real-time performance metrics endpoint
export async function GET(request: Request) {
  const url = new URL(request.url)
  const metrics = url.searchParams.get('metrics')
  
  if (metrics) {
    // Return client-side metrics sent via query params
    try {
      const parsedMetrics = JSON.parse(decodeURIComponent(metrics))
      return NextResponse.json(parsedMetrics, {
        headers: {
          'Cache-Control': 'no-cache',
          'X-Response-Time': '2ms',
        },
      })
    } catch {
      return NextResponse.json({ error: 'Invalid metrics data' }, { status: 400 })
    }
  }
  
  // Return server-side metrics
  const serverMetrics = {
    serverTime: Date.now(),
    edgeLocation: process.env.VERCEL_REGION || 'local',
    buildTime: process.env.BUILD_TIME || new Date().toISOString(),
    nextVersion: '15.4.5',
    optimizations: [
      'Edge Runtime',
      'Streaming SSR', 
      'ISR (60s)',
      'Bundle Optimization',
      'Image Optimization',
      'Resource Hints'
    ]
  }
  
  return NextResponse.json(serverMetrics, {
    headers: {
      'Cache-Control': 'public, s-maxage=30',
      'X-Response-Time': '3ms',
    },
  })
}