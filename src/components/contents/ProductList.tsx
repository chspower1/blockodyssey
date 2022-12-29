import Item from "./Item";
import ListHeader from "./ListHeader";
import type { Category, ResponseProducts, ResultProducts, SearchOptions } from "@type/product";
import { getProducts } from "@api/product";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";
import styles from "@styles/contents/ProductList.module.css";
import { searchProducts } from "@utils/searchProducts";
interface ProductListProps {
  searchOptions: SearchOptions;
}
const ProductList = ({ searchOptions: { search, category } }: ProductListProps) => {
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [resultProducts, setResultProducts] = useState<ResultProducts>();

  const { data: products } = useQuery<ResponseProducts>(["products"], getProducts);

  const handleClickPageButton = (page: number) => {
    setCurrentPage(page);
  };
  const handleChangePostPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPostPerPage(parseInt(e.currentTarget.value));
  };
  useEffect(() => {
    setCurrentPage(0);
    if (products) {
      const searchedProducts = searchProducts({ category, search, products: products.products! });
      setResultProducts({ total: searchedProducts.length, products: searchedProducts });
      setMaxPage(Math.ceil(searchedProducts.length / postPerPage));
      console.log(searchedProducts);
    }
  }, [search, category, products]);

  return (
    <div className={styles.Wrapper}>
      <div>상품 수 : {resultProducts?.total}</div>
      <ListHeader />
      {resultProducts?.products
        ?.slice(postPerPage * (currentPage - 1), postPerPage * currentPage)
        .map(({ id, title, brand, description, price, rating, stock }) => (
          <Item
            key={id}
            brand={brand}
            id={id}
            title={title}
            description={description}
            price={price}
            score={rating}
            stock={stock}
          />
        ))}
      <div>
        페이지 당 행 :
        <select onChange={handleChangePostPerPage}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        {resultProducts && (
          <div>
            {Array.from(
              { length: Math.ceil(resultProducts.total / postPerPage) },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                style={currentPage === page ? { backgroundColor: "red" } : {}}
                onClick={() => handleClickPageButton(page)}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductList;
