import { Product } from "@type/product";

interface SortProductsProps {
  products: Product[];
  option: SortOption;
}
type SortOption = "title" | "id" | "brand" | "description" | "price" | "rating" | "stock";

export const sortProducts = ({ products, option }: SortProductsProps) => {
  return products.sort((a, b) => (a[option] > b[option] ? 1 : -1));
};
