import { Hero } from "@/components/sections/hero"
import { CocktailGrid } from "@/components/sections/cocktail-grid"
import { About } from "@/components/sections/about"

export default function Home() {
  return (
    <main className="relative">
      <section id="home">
        <Hero />
      </section>
      <section id="cocktails">
        <CocktailGrid />
      </section>  
      <section id="about">
        <About />
      </section>
      <section id="contact" className="relative overflow-hidden">
        
        <div className="py-40 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light mb-12 serif tracking-tight">
              <span className="text-aristocrat-white">NOUS</span>
              <br />
              <span className="text-aristocrat-cream font-extralight">CONTACTER</span>
            </h2>
            <div className="w-16 h-px bg-aristocrat-charcoal mx-auto mb-16"></div>
            <div className="aristocrat-text font-extralight leading-loose max-w-2xl mx-auto">
              <p className="mb-8">12 Place Vendôme, 75001 Paris</p>
              <p className="mb-8">+33 1 42 96 10 73</p>
              <p>contact@maisoncocktail.fr</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}