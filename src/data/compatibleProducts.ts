export interface CompatibleProduct {
  id: string;
  name: string;
  type: 'Interior' | 'Exterior';
  description: string;
  price: string;
  features: string[];
  image?: string;
}

export const compatibleProducts: CompatibleProduct[] = [];

export const getCompatibleProducts = (colorFamily?: string): CompatibleProduct[] => {
  return compatibleProducts;
};
