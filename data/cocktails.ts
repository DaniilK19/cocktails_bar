export interface Cocktail {
  id: string
  name: string
  description: string
  image: string
  ingredients: string[]
  instructions: string[]
  category: string
  alcohol: number
  color: string
}

export const cocktails: Cocktail[] = [
  {
    id: "1",
    name: "Sunset Margarita",
    description: "A vibrant twist on the classic margarita with layers of tropical flavors",
    image: "/images/sunset-margarita.jpg",
    ingredients: [
      "2 oz Tequila",
      "1 oz Cointreau",
      "1 oz Fresh lime juice",
      "1/2 oz Mango puree",
      "1/2 oz Grenadine",
      "Salt for rim"
    ],
    instructions: [
      "Rim glass with salt",
      "Add tequila, Cointreau, and lime juice to shaker",
      "Fill with ice and shake vigorously",
      "Strain into glass over fresh ice",
      "Slowly pour grenadine to create sunset effect"
    ],
    category: "Tropical",
    alcohol: 20,
    color: "gradient-to-br from-cocktail-yellow via-cocktail-orange to-cocktail-red"
  },
  {
    id: "2",
    name: "Blue Ocean",
    description: "A refreshing blue cocktail that captures the essence of tropical waters",
    image: "/images/blue-ocean.jpg",
    ingredients: [
      "2 oz Vodka",
      "1 oz Blue Curacao",
      "1 oz Coconut cream",
      "1/2 oz Lime juice",
      "Pineapple wedge for garnish"
    ],
    instructions: [
      "Add all ingredients to shaker",
      "Fill with ice and shake well",
      "Strain into chilled martini glass",
      "Garnish with pineapple wedge"
    ],
    category: "Tropical",
    alcohol: 18,
    color: "gradient-to-br from-cocktail-blue to-blue-600"
  },
  {
    id: "3",
    name: "Emerald Garden",
    description: "A fresh and herbal cocktail with notes of mint and cucumber",
    image: "/images/emerald-garden.jpg",
    ingredients: [
      "2 oz Gin",
      "1 oz Elderflower liqueur",
      "3/4 oz Lime juice",
      "6 Mint leaves",
      "3 Cucumber slices",
      "Tonic water"
    ],
    instructions: [
      "Muddle mint and cucumber in shaker",
      "Add gin, elderflower liqueur, and lime juice",
      "Fill with ice and shake",
      "Strain into glass with fresh ice",
      "Top with tonic water"
    ],
    category: "Herbal",
    alcohol: 15,
    color: "gradient-to-br from-cocktail-green to-green-600"
  },
  {
    id: "4",
    name: "Purple Haze",
    description: "A mysterious and elegant cocktail with floral notes",
    image: "/images/purple-haze.jpg",
    ingredients: [
      "2 oz Vodka",
      "1 oz Crème de Violette",
      "1/2 oz Lemon juice",
      "1/4 oz Simple syrup",
      "Egg white",
      "Edible flower for garnish"
    ],
    instructions: [
      "Dry shake all ingredients without ice",
      "Add ice and shake again",
      "Double strain into coupe glass",
      "Garnish with edible flower"
    ],
    category: "Elegant",
    alcohol: 22,
    color: "gradient-to-br from-cocktail-purple to-purple-600"
  },
  {
    id: "5",
    name: "Golden Hour",
    description: "A warm and inviting cocktail perfect for sunset moments",
    image: "/images/golden-hour.jpg",
    ingredients: [
      "2 oz Bourbon",
      "3/4 oz Honey liqueur",
      "1/2 oz Lemon juice",
      "2 dashes Angostura bitters",
      "Orange peel"
    ],
    instructions: [
      "Add all ingredients to shaker",
      "Fill with ice and shake",
      "Strain over large ice cube",
      "Express orange peel over drink",
      "Garnish with orange peel"
    ],
    category: "Classic",
    alcohol: 25,
    color: "gradient-to-br from-cocktail-yellow to-yellow-600"
  },
  {
    id: "6",
    name: "Ruby Romance",
    description: "A passionate blend of berries and champagne",
    image: "/images/ruby-romance.jpg",
    ingredients: [
      "1 oz Vodka",
      "1/2 oz Chambord",
      "1/2 oz Lemon juice",
      "1/4 oz Simple syrup",
      "Champagne",
      "Fresh raspberries"
    ],
    instructions: [
      "Muddle 3 raspberries in shaker",
      "Add vodka, Chambord, lemon juice, and syrup",
      "Shake with ice",
      "Strain into flute",
      "Top with champagne",
      "Garnish with raspberry"
    ],
    category: "Sparkling",
    alcohol: 12,
    color: "gradient-to-br from-cocktail-red to-red-600"
  }
]