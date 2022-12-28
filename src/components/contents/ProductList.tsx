import Item from "./Item";
import ListHeader from "./ListHeader";
import type { Product } from "@type/product";
interface ProductListProps {
  products: Product[];
}
const ProductList = ({ products }: ProductListProps) => {
  return (
    <>
      <ListHeader />
      {products.map(({ id, title, brand, description, price, rating, stock }) => (
        <Item
          brand={brand}
          id={id}
          title={title}
          description={description}
          price={price}
          score={rating}
          stock={stock}
        />
      ))}
    </>
  );
};
export default ProductList;
