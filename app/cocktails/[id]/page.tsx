import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { cocktails } from '@/data/cocktails'
import { OptimizedImage } from '@/components/ui/optimized-image'

interface PageProps {
  params: Promise<{ id: string }>
}

// Generate static params for all cocktails
export async function generateStaticParams() {
  return cocktails.map((cocktail) => ({
    id: cocktail.id,
  }))
}

// ISR - Revalidate every 60 seconds
export const revalidate = 60

// Dynamic metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const cocktail = cocktails.find(c => c.id === id)
  
  if (!cocktail) {
    return {
      title: 'Cocktail non trouvé',
    }
  }

  return {
    title: `${cocktail.name} | Maison Cocktail`,
    description: cocktail.description,
    openGraph: {
      title: `${cocktail.name} | Maison Cocktail`,
      description: cocktail.description,
      images: [cocktail.image],
    },
  }
}

export default async function CocktailPage({ params }: PageProps) {
  const { id } = await params
  const cocktail = cocktails.find(c => c.id === id)
  
  if (!cocktail) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-aristocrat-void to-aristocrat-obsidian">
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <OptimizedImage
                src={cocktail.image}
                alt={cocktail.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aristocrat-void/60 to-transparent" />
            </div>
            
            {/* Content */}
            <div className="space-y-8">
              <div>
                <p className="aristocrat-subtext mb-4">{cocktail.category}</p>
                <h1 className="text-5xl lg:text-6xl font-light serif text-aristocrat-white mb-4">
                  {cocktail.name}
                </h1>
                <p className="text-lg text-aristocrat-cream/80 font-light">
                  {cocktail.description}
                </p>
              </div>
              
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-sm text-aristocrat-gray mb-1">Teneur en alcool</p>
                  <p className="text-2xl font-light text-aristocrat-cream">{cocktail.alcohol}%</p>
                </div>
                <div className="h-12 w-px bg-aristocrat-charcoal/30" />
                <div>
                  <p className="text-sm text-aristocrat-gray mb-1">Couleur</p>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${cocktail.color}`} />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-light serif text-aristocrat-white mb-4">
                  Ingrédients
                </h2>
                <ul className="space-y-2">
                  {cocktail.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-aristocrat-cream rounded-full" />
                      <span className="text-aristocrat-cream/80">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-light serif text-aristocrat-white mb-4">
                  Préparation
                </h2>
                <ol className="space-y-3">
                  {cocktail.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-aristocrat-cream/60 font-light">{index + 1}.</span>
                      <span className="text-aristocrat-cream/80">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
              
              <div className="pt-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 aristocrat-button px-8 py-4"
                >
                  ← Retour à la collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}