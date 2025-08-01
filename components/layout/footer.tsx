"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const footerSections = {
  experience: [
    { name: "Collection", href: "#collection" },
    { name: "Dégustations", href: "#tastings" },
    { name: "Événements", href: "#events" },
    { name: "Cours", href: "#courses" },
  ],
  maison: [
    { name: "Histoire", href: "#about" },
    { name: "Équipe", href: "#team" },
    { name: "Philosophie", href: "#philosophy" },
    { name: "Presse", href: "#press" },
  ],
}

export function Footer() {
  return (
    <footer className="py-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="minimal-border pt-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-light serif tracking-wider text-aristocrat-white mb-2">
                  MAISON<span className="text-aristocrat-cream font-extralight ml-2">COCKTAIL</span>
                </h3>
                <div className="aristocrat-subtext mb-8">
                  Paris — MMXXIV
                </div>
              </div>
              <p className="aristocrat-text font-extralight leading-loose mb-12 max-w-sm">
                L'excellence française au service de l'art cocktail. 
                Une expérience sensorielle unique, cultivée dans le respect de la tradition.
              </p>
            </motion.div>

            {/* Links Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="grid grid-cols-2 gap-12"
            >
              <div>
                <h4 className="aristocrat-subtext mb-8">Expérience</h4>
                <ul className="space-y-4">
                  {footerSections.experience.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="aristocrat-link text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="aristocrat-subtext mb-8">La Maison</h4>
                <ul className="space-y-4">
                  {footerSections.maison.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="aristocrat-link text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="aristocrat-subtext mb-8">Contact</h4>
              <div className="space-y-6 aristocrat-text font-extralight text-sm">
                <div>
                  <p>12 Place Vendôme</p>
                  <p>75001 Paris, France</p>
                </div>
                <div>
                  <p>+33 1 42 96 10 73</p>
                  <p>contact@maisoncocktail.fr</p>
                </div>
                <div>
                  <p className="aristocrat-subtext">
                    Mar — Sam · 18h00 — 02h00
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <p className="aristocrat-subtext text-xs">
            © MMXXIV Maison Cocktail. Tous droits réservés.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="aristocrat-subtext text-xs hover:text-aristocrat-cream transition-colors duration-300">
              Mentions Légales
            </Link>
            <Link href="#" className="aristocrat-subtext text-xs hover:text-aristocrat-cream transition-colors duration-300">
              Confidentialité
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}