import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { cocktails } from '@/data/cocktails'

// Skeleton loader for streaming
function CocktailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[450px] bg-aristocrat-charcoal/20 rounded-2xl" />
    </div>
  )
}

// Split cocktails into chunks for progressive loading
const CocktailCard = dynamic(
  () => import('@/components/ui/cocktail-card').then(mod => ({ default: mod.CocktailCard })),
  {
    loading: () => <CocktailSkeleton />,
    ssr: true
  }
)

// Stream first 3 cocktails immediately
function FirstBatch() {
  return (
    <>
      {cocktails.slice(0, 3).map((cocktail, index) => (
        <CocktailCard key={cocktail.id} cocktail={cocktail} index={index} />
      ))}
    </>
  )
}

// Stream remaining cocktails
async function RemainingBatch() {
  // Simulate data fetching delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return (
    <>
      {cocktails.slice(3).map((cocktail, index) => (
        <CocktailCard key={cocktail.id} cocktail={cocktail} index={index + 3} />
      ))}
    </>
  )
}

export function CocktailGridStreaming() {
  return (
    <section className="py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-aristocrat-void to-aristocrat-obsidian">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-light mb-6 serif tracking-tight">
          <span className="text-aristocrat-white">NOTRE</span>
          <br />
          <span className="text-aristocrat-cream font-extralight">COLLECTION</span>
        </h2>
        <div className="w-16 h-px bg-aristocrat-charcoal mx-auto mb-8"></div>
        <p className="aristocrat-text font-extralight leading-loose max-w-2xl mx-auto">
          Chaque cocktail est une œuvre d&apos;art liquide, créée avec passion et précision 
          par nos mixologues experts
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Immediate render - no suspension */}
        <FirstBatch />
        
        {/* Progressive enhancement with Suspense */}
        <Suspense fallback={
          <>
            <CocktailSkeleton />
            <CocktailSkeleton />
            <CocktailSkeleton />
            <CocktailSkeleton />
          </>
        }>
          <RemainingBatch />
        </Suspense>
      </div>
    </section>
  )
}