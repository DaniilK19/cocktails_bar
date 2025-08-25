import { NextResponse } from 'next/server'
import { cocktails } from '@/data/cocktails'

export const runtime = 'edge' // Enable Edge Runtime for faster response

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const category = searchParams.get('category')
  
  // Add cache headers for Edge caching
  const headers = {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    'CDN-Cache-Control': 'max-age=900',
    'Vercel-CDN-Cache-Control': 'max-age=3600',
  }
  
  try {
    let result = cocktails
    
    if (id) {
      const cocktail = cocktails.find(c => c.id === id)
      if (!cocktail) {
        return NextResponse.json(
          { error: 'Cocktail not found' },
          { status: 404, headers }
        )
      }
      return NextResponse.json(cocktail, { headers })
    }
    
    if (category) {
      result = cocktails.filter(c => 
        c.category.toLowerCase() === category.toLowerCase()
      )
    }
    
    return NextResponse.json(result, { headers })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers }
    )
  }
}