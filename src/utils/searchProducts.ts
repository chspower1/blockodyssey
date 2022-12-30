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

  const SortToId = (products: Product[]) =>
    products.sort((product, product2) => product.id - product2.id);

  const DedupeArray = (products: Product[]) => Array.from(new Set(products));

  if (category === "all") {
    categoryArray.map((targetCategory: TargetCategory) =>
      products.forEach((product) => filterProducts(product, targetCategory))
    );
    return SortToId(DedupeArray(resultProducts));
  } else {
    products.forEach((product) => filterProducts(product, category));
    return resultProducts;
  }
};
