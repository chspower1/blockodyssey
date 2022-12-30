import Item from "./Item";
import ListHeader from "./listHeader/ListHeader";
import type { Category, ResponseProducts, ResultProducts, SearchOptions } from "@type/product";
import { getProducts } from "@api/product";
import { useQuery } from "@tanstack/react-query";
import { SetStateAction, useState } from "react";
import { useEffect } from "react";
import styles from "@styles/contents/ProductList.module.css";
import { searchProducts } from "@utils/searchProducts";
import usePagination from "@hooks/usePagination";
import { useDispatch, useSelector } from "react-redux";
import { setResultProducts } from "@store/resultProductsSlice";
import { RootState } from "@store/store";
interface ProductListProps {
  searchOptions: SearchOptions;
  isNew: boolean;
  setIsNew: React.Dispatch<SetStateAction<boolean>>;
}

const ProductList = ({
  searchOptions: { search, category },
  isNew,
  setIsNew,
}: ProductListProps) => {
  // State
  const resultProducts = useSelector((state: RootState) => state.resultProducts.value);
  const dispatch = useDispatch();

  // Pagination hook
  const {
    page: { currentPage, maxPage, pageSection, postPerPage, maxLimitPage, minLimitPage },
    setPage,
    prevProductsCount,
    currentProductsCount,
    handleClickPageButton,
    handleChangePostPerPage,
    handleClickPageSection,
  } = usePagination();

  // Fetching Products Data
  const { data: products } = useQuery<ResponseProducts>(["products"], getProducts);

  // When Update SearchOptions
  useEffect(() => {
    // 새로 검색 했을 때 페이지 1로 이동
    if (isNew) {
      setPage((prev) => ({ ...prev, currentPage: 1 }));
      setIsNew(false);
    }
    // 검색 조건에 맞게 products update
    if (products) {
      const searchedProducts = searchProducts({ category, search, products: products.products! });
      dispatch(setResultProducts({ total: searchedProducts.length, products: searchedProducts }));
      setPage((prev) => ({
        ...prev,
        maxPage: searchedProducts.length ? Math.ceil(searchedProducts.length / postPerPage) : 1,
      }));
      console.log(searchedProducts);
    }
  }, [search, category, products, postPerPage, isNew]);

  return (
    <div className={styles.Wrapper}>
      <div>
        <span>{`분류 : ${category}`}</span>
        <span>{`검색어 :${search}`}</span>
        <span>{`상품 수 :${resultProducts.total}`}</span>
      </div>
      <ListHeader />
      {resultProducts?.products
        ?.slice(prevProductsCount, currentProductsCount)
        .map(({ id, title, brand, description, price, rating, stock }) => (
          <Item
            key={id + title}
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
                  <span key={page}>
                    {page === maxPage && maxLimitPage < maxPage && "..."}
                    <button
                      key={page}
                      style={currentPage === page ? { backgroundColor: "red" } : {}}
                      onClick={() => handleClickPageButton(page)}
                    >
                      {page}
                    </button>
                  </span>
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
