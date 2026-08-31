export interface Product {
  id: string;
  name: string;
  handle: string;
  price: number;
  compareAtPrice: number;
  images: string[];
  category: string;
  material: string;
  sizes: string[];
  colors: string[];
  description: string;
  features: string[];
  care: string;
  inStock: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Collection {
  slug: string;
  name: string;
  description: string;
  image: string;
  count: number;
}
