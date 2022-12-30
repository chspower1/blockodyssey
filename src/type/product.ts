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

export type TargetCategory = "title" | "brand" | "description";
export type Category = "all" | TargetCategory;
export interface PageOptions {
  limit: number;
  skip: number;
  searchText: string;
  category: Category;
}
export interface SearchOptions {
  search: string;
  category: Category;
}
export interface ResultProducts {
  total: number;
  products: Product[] | null;
}
export type ProductColumn = "title" | "id" | "brand" | "description" | "price" | "rating" | "stock";
