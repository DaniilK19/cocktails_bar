"use client"

import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Fil d'Ariane" 
      className={`flex items-center space-x-2 text-sm ${className}`}
    >
      <ol className="flex items-center space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => (
          <li 
            key={item.href}
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && (
              <ChevronRight className="w-3 h-3 text-aristocrat-gray mx-2" aria-hidden="true" />
            )}
            {item.current ? (
              <span 
                className="text-aristocrat-cream font-medium"
                aria-current="page"
                itemProp="name"
              >
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-aristocrat-gray hover:text-aristocrat-cream transition-colors duration-200"
                itemProp="item"
                title={`Aller à ${item.label}`}
              >
                <span itemProp="name">{item.label}</span>
              </a>
            )}
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  )
}