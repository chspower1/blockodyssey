import Item from "./Item";
import ListHeader from "./ListHeader";
import type { Category, ResponseProducts, ResultProducts, SearchOptions } from "@type/product";
import { getProducts } from "@api/product";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";
import styles from "@styles/contents/ProductList.module.css";
import { searchProducts } from "@utils/searchProducts";
import usePagination from "@hooks/usePagination";
interface ProductListProps {
  searchOptions: SearchOptions;
}
const ProductList = ({ searchOptions: { search, category } }: ProductListProps) => {
  const [resultProducts, setResultProducts] = useState<ResultProducts>();
  const {
    page: { currentPage, maxPage, pageSection, postPerPage, maxLimitPage, minLimitPage },
    setPage,
    prevProductsCount,
    currentProductsCount,
    handleClickPageButton,
    handleChangePostPerPage,
    handleClickPageSection,
  } = usePagination();

  const { data: products } = useQuery<ResponseProducts>(["products"], getProducts);

  // 검색조건,키워드 변경시
  useEffect(() => {
    setPage((prev) => ({ ...prev, currentPage: 1 }));
    if (products) {
      const searchedProducts = searchProducts({ category, search, products: products.products! });
      setResultProducts({ total: searchedProducts.length, products: searchedProducts });
      setPage((prev) => ({
        ...prev,
        maxPage: searchedProducts.length ? Math.ceil(searchedProducts.length / postPerPage) : 1,
      }));
      console.log(searchedProducts);
    }
  }, [search, category, products, postPerPage]);

  return (
    <div className={styles.Wrapper}>
      <div>상품 수 : {resultProducts?.total}</div>
      <ListHeader />
      {resultProducts?.products
        ?.slice(prevProductsCount, currentProductsCount)
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
        <select onChange={(e) => handleChangePostPerPage(parseInt(e.currentTarget.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        {resultProducts && (
          <div>
            <button
              onClick={() => handleClickPageSection({ isNext: false })}
              disabled={pageSection === 1}
            >
              ⬅️
            </button>
            {Array.from({ length: maxPage }, (_, index) => index + 1).map(
              (page) =>
                ((page <= maxLimitPage && page >= minLimitPage) || page === maxPage) && (
                  <>
                    {page === maxPage && maxLimitPage < maxPage && "..."}
                    <button
                      key={page}
                      style={currentPage === page ? { backgroundColor: "red" } : {}}
                      onClick={() => handleClickPageButton(page)}
                    >
                      {page}
                    </button>
                  </>
                )
            )}
            <button
              onClick={() => handleClickPageSection({ isNext: true })}
              disabled={maxLimitPage >= maxPage}
            >
              ➡️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductList;
