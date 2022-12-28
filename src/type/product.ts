type Image = string;

export interface Product {
  id: number;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: Image[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface ResponseProducts {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
