import { Category, Product, TargetCategory } from "@type/product";

interface SearchProductsProps {
  search: string;
  category: Category;
  products: Product[];
}
export const searchProducts = ({ search, category, products }: SearchProductsProps) => {
  const categoryArray: TargetCategory[] = ["title", "brand", "description"];
  const resultProducts: Product[] = [];

  const filterProducts = (product: Product, targetCategory: TargetCategory) =>
    product[targetCategory].toLowerCase().includes(search) && resultProducts.push(product);

  if (category === "all") {
    categoryArray.map((targetCategory: TargetCategory) =>
      products.forEach((product) => filterProducts(product, targetCategory))
    );
    return Array.from(new Set(resultProducts));
  } else {
    products.forEach((product) => products.forEach((product) => filterProducts(product, category)));
    return resultProducts;
  }
};
