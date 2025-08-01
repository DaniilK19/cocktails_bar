import { Hero } from "@/components/sections/hero"
import { CocktailGrid } from "@/components/sections/cocktail-grid"
import { About } from "@/components/sections/about"

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <CocktailGrid />
      <About />
    </main>
  )
}