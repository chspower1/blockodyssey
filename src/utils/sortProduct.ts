import { Product, ProductColumn } from "@type/product";

interface SortProductsProps {
  products: Product[];
  column: ProductColumn;
  isUpper: boolean;
}

export const sortProducts = ({ products, column, isUpper }: SortProductsProps) => {
  const sortedProducts = [...products];
  return sortedProducts.sort((a, b) =>
    a[column] > b[column] ? (isUpper ? 1 : -1) : isUpper ? -1 : 1
  );
};
