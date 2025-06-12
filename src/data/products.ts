
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'tshirts' | 'pants' | 'shoes' | 'socks';
  series: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sizes?: string[];
}

export const products: Product[] = [
  // T-Shirts
  {
    id: 't1',
    name: 'Classic Cotton Tee',
    brand: 'Trendy Corner',
    category: 'tshirts',
    series: 'Essentials',
    price: 1299,
    originalPrice: 1599,
    image: '/lovable-uploads/black-tshirt.webp',
    description: 'Premium quality cotton t-shirt with comfortable fit and stylish design.',
    features: [
      '100% Cotton fabric',
      'Pre-shrunk material',
      'Comfortable fit',
      'Machine washable',
      'Available in multiple colors'
    ],
    specs: {
      'Material': '100% Cotton',
      'Fit': 'Regular',
      'Sleeve': 'Short sleeve',
      'Neck': 'Round neck',
      'Care': 'Machine wash'
    },
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 't2',
    name: 'Premium Graphic Tee',
    brand: 'Urban Style',
    category: 'tshirts',
    series: 'Graphics',
    price: 1899,
    image: '/lovable-uploads/483be91a-5a75-41c2-be14-91e8e87c67b0.png',
    description: 'Trendy graphic t-shirt with modern design and superior comfort.',
    features: [
      'Premium cotton blend',
      'Unique graphic design',
      'Fade-resistant print',
      'Comfortable wearing',
      'Stylish appearance'
    ],
    specs: {
      'Material': 'Cotton blend',
      'Fit': 'Slim fit',
      'Sleeve': 'Short sleeve',
      'Neck': 'Crew neck',
      'Print': 'Screen print'
    },
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 't3',
    name: 'Basic White Tee',
    brand: 'Comfort Plus',
    category: 'tshirts',
    series: 'Basics',
    price: 999,
    originalPrice: 1299,
    image: '/lovable-uploads/28f6d970-80db-46c9-be9c-89b71667f4c5.png',
    description: 'Essential white t-shirt for everyday wear with maximum comfort.',
    features: [
      'Soft cotton fabric',
      'Breathable material',
      'Classic white color',
      'Versatile styling',
      'Durable construction'
    ],
    specs: {
      'Material': '100% Cotton',
      'Fit': 'Regular',
      'Color': 'White',
      'Neck': 'Round neck',
      'Weight': 'Medium weight'
    },
    rating: 4.3,
    reviewCount: 124,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  
  // Pants
  {
    id: 'p1',
    name: 'Cargo Tactical Pants',
    brand: 'Outdoor Pro',
    category: 'pants',
    series: 'Tactical',
    price: 3499,
    image: '/lovable-uploads/a1bd61ca-8e9b-4cec-8725-5d6c987226fe.png',
    description: 'Durable tactical cargo pants with multiple pockets and comfortable fit.',
    features: [
      'Multiple cargo pockets',
      'Water-resistant fabric',
      'Reinforced knees',
      'Adjustable waist',
      'Tactical design'
    ],
    specs: {
      'Material': 'Ripstop fabric',
      'Fit': 'Regular',
      'Pockets': '8 pockets',
      'Waist': 'Adjustable',
      'Length': 'Full length'
    },
    rating: 4.6,
    reviewCount: 189,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'p2',
    name: 'Casual Chino Pants',
    brand: 'Style Master',
    category: 'pants',
    series: 'Casual',
    price: 2799,
    originalPrice: 3299,
    image: '/lovable-uploads/a03b4c9d-814e-4573-b7bb-91d2a1799d16.png',
    description: 'Comfortable chino pants perfect for casual and semi-formal occasions.',
    features: [
      'Cotton twill fabric',
      'Slim fit design',
      'Belt loop waist',
      'Side pockets',
      'Versatile styling'
    ],
    specs: {
      'Material': 'Cotton twill',
      'Fit': 'Slim fit',
      'Closure': 'Button and zip',
      'Pockets': '4 pockets',
      'Style': 'Chino'
    },
    rating: 4.4,
    reviewCount: 167,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'p3',
    name: 'Comfortable Joggers',
    brand: 'Trendy Corner',
    category: 'pants',
    series: 'Comfort',
    price: 1999,
    image: '/lovable-uploads/3d78adda-b2d5-43dc-bdd3-82c28ee7d74c.png',
    description: 'Soft and comfortable joggers for lounging and casual wear.',
    features: [
      'Soft cotton blend',
      'Elastic waistband',
      'Drawstring closure',
      'Tapered legs',
      'Comfortable fit'
    ],
    specs: {
      'Material': 'Cotton blend',
      'Fit': 'Relaxed',
      'Waist': 'Elastic with drawstring',
      'Leg': 'Tapered',
      'Occasion': 'Casual'
    },
    rating: 4.2,
    reviewCount: 134,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  
  // Shoes
  {
    id: 's1',
    name: 'Classic Sneakers',
    brand: 'SportMax',
    category: 'shoes',
    series: 'Classic',
    price: 4999,
    image: '/lovable-uploads/618d7ca1-a6ee-49c6-ab27-3e7631f81e40.png',
    description: 'Comfortable classic sneakers perfect for daily wear and sports activities.',
    features: [
      'Cushioned sole',
      'Breathable upper',
      'Lace-up closure',
      'Rubber outsole',
      'Classic design'
    ],
    specs: {
      'Upper': 'Synthetic leather',
      'Sole': 'Rubber',
      'Closure': 'Lace-up',
      'Cushioning': 'EVA midsole',
      'Use': 'Casual/Sports'
    },
    rating: 4.8,
    reviewCount: 245,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 's2',
    name: 'Running Shoes',
    brand: 'AthleticPro',
    category: 'shoes',
    series: 'Performance',
    price: 5499,
    originalPrice: 6299,
    image: '/lovable-uploads/a89ccc94-955e-4e78-99c7-706cd8bf9425.png',
    description: 'High-performance running shoes with advanced cushioning technology.',
    features: [
      'Advanced cushioning',
      'Lightweight design',
      'Breathable mesh',
      'Non-slip sole',
      'Performance oriented'
    ],
    specs: {
      'Upper': 'Mesh fabric',
      'Sole': 'EVA with rubber',
      'Weight': 'Lightweight',
      'Cushioning': 'Air cushion',
      'Purpose': 'Running'
    },
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 's3',
    name: 'Casual Sports Shoes',
    brand: 'ComfortFit',
    category: 'shoes',
    series: 'Sports',
    price: 3799,
    image: 'https://i.postimg.cc/zyZZhkSy/shoes-3.jpg',
    description: 'Versatile sports shoes suitable for various activities and casual wear.',
    features: [
      'Versatile design',
      'Comfortable padding',
      'Durable construction',
      'Flexible sole',
      'All-day comfort'
    ],
    specs: {
      'Upper': 'Synthetic',
      'Sole': 'Rubber',
      'Padding': 'Memory foam',
      'Flexibility': 'High',
      'Style': 'Athletic casual'
    },
    rating: 4.5,
    reviewCount: 198,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  
  // Socks
  {
    id: 'k1',
    name: 'Premium Cotton Socks',
    brand: 'Trendy Corner',
    category: 'socks',
    series: 'Premium',
    price: 599,
    originalPrice: 799,
    image: '/lovable-uploads/ada32374-3176-4ba6-97c7-bb7550d700f5.png',
    description: 'High-quality cotton socks with superior comfort and durability.',
    features: [
      'Premium cotton blend',
      'Moisture wicking',
      'Reinforced heel and toe',
      'Comfortable fit',
      'Long-lasting'
    ],
    specs: {
      'Material': 'Cotton blend',
      'Length': 'Crew length',
      'Cushioning': 'Medium',
      'Moisture': 'Wicking',
      'Durability': 'Reinforced'
    },
    rating: 4.4,
    reviewCount: 89,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'k2',
    name: 'Athletic Sports Socks',
    brand: 'SportMax',
    category: 'socks',
    series: 'Athletic',
    price: 899,
    image: '/lovable-uploads/7e9680fc-116b-4980-984d-e7f1cc2efa6f.png',
    description: 'Performance athletic socks designed for sports and active lifestyle.',
    features: [
      'Athletic design',
      'Extra cushioning',
      'Arch support',
      'Quick-dry fabric',
      'Anti-odor treatment'
    ],
    specs: {
      'Material': 'Synthetic blend',
      'Support': 'Arch support',
      'Cushioning': 'Extra',
      'Technology': 'Quick-dry',
      'Treatment': 'Anti-odor'
    },
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'k3',
    name: 'Casual Cotton Socks Pack',
    brand: 'ComfortFit',
    category: 'socks',
    series: 'Casual',
    price: 1299,
    image: '/lovable-uploads/ada32374-3176-4ba6-97c7-bb7550d700f5.png',
    description: 'Pack of comfortable cotton socks perfect for everyday wear.',
    features: [
      'Pack of 6 pairs',
      'Soft cotton fabric',
      'Classic design',
      'Comfortable elastic',
      'Value pack'
    ],
    specs: {
      'Quantity': '6 pairs',
      'Material': '100% Cotton',
      'Length': 'Ankle length',
      'Elastic': 'Comfortable',
      'Design': 'Classic'
    },
    rating: 4.3,
    reviewCount: 112,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  }
];

export const getProductsByCategory = (category: 'tshirts' | 'pants' | 'shoes' | 'socks') => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.originalPrice);
};
