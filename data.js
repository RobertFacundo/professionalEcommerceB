const products = [
  // FRUITS & NUTS
  {
    name: 'Almonds',
    category: 'Nuts',
    image: '/images/products/almonds.jpg',
    prices: [
      { presentation: '1/4kg', price: 3100 },
      { presentation: '1/2kg', price: 4900 },
      { presentation: '20kg wholesale', price: 136000 },
    ],
    stock: 50,
    minQuantity: 1,
    description: 'Crunchy and natural almonds, perfect for snacks or baking.',
    comments: 'Keep in a dry place.'
  },
  {
    name: 'Walnuts',
    category: 'Nuts',
    image: '/images/products/walnuts.jpg',
    prices: [
      { presentation: '1/4kg', price: 3500 },
      { presentation: '1/2kg', price: 5600 },
      { presentation: '20kg wholesale', price: 150000 },
    ],
    stock: 40,
    minQuantity: 1,
    description: 'Fresh walnuts, high in omega-3 and ideal for recipes.',
    comments: 'Store in the fridge for longer shelf life.'
  },

  // GRANOLA
  {
    name: 'Classic Granola',
    category: 'Granolas',
    image: '/images/products/classic_granola.webp',
    prices: [
      { presentation: '250g', price: 1200 },
      { presentation: '500g', price: 2200 },
      { presentation: '5kg wholesale', price: 18000 },
    ],
    stock: 70,
    minQuantity: 1,
    description: 'Oats, honey, and mixed nuts granola.',
    comments: ''
  },

  // CEREALS
  {
    name: 'Rolled Oats',
    category: 'Cereals',
    image: '/images/products/rolled_oats.webp',
    prices: [
      { presentation: '250g', price: 800 },
      { presentation: '500g', price: 1500 },
      { presentation: '10kg wholesale', price: 25000 },
    ],
    stock: 100,
    minQuantity: 1,
    description: 'High-quality rolled oats, perfect for breakfast or baking.',
    comments: ''
  },

  // SEEDS
  {
    name: 'Chia Seeds',
    category: 'Seeds',
    image: '/images/products/chia_seeds.jpg',
    prices: [
      { presentation: '1/4kg', price: 3100 },
      { presentation: '1/2kg', price: 4900 },
      { presentation: '20kg wholesale', price: 136000 },
    ],
    stock: 80,
    minQuantity: 1,
    description: 'Rich in omega-3, perfect for smoothies and yogurt.',
    comments: ''
  },

  // SPICES / CONDIMENTS
  {
    name: 'Black Pepper',
    category: 'Spices',
    image: '/images/products/black_pepper.jpg',
    prices: [
      { presentation: '100g', price: 150 },
      { presentation: '250g', price: 350 },
      { presentation: '5kg wholesale', price: 5500 },
    ],
    stock: 200,
    minQuantity: 1,
    description: 'Ground black pepper for any dish.',
    comments: ''
  }
];

export default products;