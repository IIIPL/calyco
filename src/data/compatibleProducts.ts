export interface CompatibleProduct {
  id: string;
  name: string;
  type: 'Interior' | 'Exterior';
  description: string;
  price: string;
  features: string[];
  image?: string;
}

export const compatibleProducts: CompatibleProduct[] = [
  {
    id: 'Nova',
    name: 'Nova Interior Emulsion',
    type: 'Interior',
    description: 'Premium interior emulsion with superior coverage and washability',
    price: '₹1200-1400/litre',
    features: ['Low VOC', 'Washable', 'Anti-bacterial', 'Low Odour'],
    image: '/Assets/Nova/NoBg.png'
  },
  {
    id: 'SilkTouch',
    name: 'SilkTouch Premium Finish',
    type: 'Interior',
    description: 'Silky smooth finish with excellent durability and stain resistance',
    price: '₹1400-1600/litre',
    features: ['Silk Finish', 'Stain Resistant', 'Low VOC', 'Easy Clean'],
    image: '/Assets/SilkTouch/NoBg.png'
  },
  {
    id: 'LustroLite',
    name: 'LustroLite Low Sheen',
    type: 'Interior',
    description: 'Low sheen finish perfect for walls and ceilings',
    price: '₹1300-1500/litre',
    features: ['Low Sheen', 'Hides Imperfections', 'Low VOC', 'Quick Dry'],
    image: '/Assets/LustroLite/NoBg.png'
  },
  {
    id: 'PureTone',
    name: 'PureTone Matte',
    type: 'Interior',
    description: 'Pure matte finish with excellent color consistency',
    price: '₹1100-1300/litre',
    features: ['Matte Finish', 'Color Consistent', 'Low VOC', 'Eco-Friendly'],
    image: '/Assets/PureTone/NoBg.png'
  },
  {
    id: 'ExteriorLatex',
    name: 'Exterior Latex Paint',
    type: 'Exterior',
    description: 'High-performance exterior latex with UV blockers and weatherproof seal',
    price: '?1500-1700/litre',
    features: ['UV Resistant', 'Weatherproof', 'Low VOC', 'Mildew Guard'],
    image: '/Assets/Nova/NoBg.png'
  },
  {
    id: 'CalmXterior',
    name: 'CalmXterior Weather Shield',
    type: 'Exterior',
    description: 'Weather-resistant exterior paint with UV protection',
    price: '₹1600-1800/litre',
    features: ['Weather Resistant', 'UV Protection', 'Low VOC', 'Long Lasting'],
    image: '/Assets/CalmXterior/NoBg.png'
  }
];

export const getCompatibleProducts = (colorFamily?: string): CompatibleProduct[] => {
  if (!colorFamily) return compatibleProducts;
  
  // Filter based on color family compatibility
  const interiorFamilies = ['Neutrals', 'Greys', 'Pastels', 'Bold', 'Blues', 'Greens', 'Reds & Oranges'];
  const exteriorFamilies = ['Earthy', 'Browns', 'Greens', 'Blues'];
  
  if (interiorFamilies.includes(colorFamily)) {
    return compatibleProducts.filter(product => product.type === 'Interior');
  } else if (exteriorFamilies.includes(colorFamily)) {
    return compatibleProducts.filter(product => product.type === 'Exterior');
  }
  
  return compatibleProducts;
};
