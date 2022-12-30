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
      const newTotal = searchedProducts.length;
      const newMaxPage = newTotal ? Math.ceil(newTotal / postPerPage) : 1;
      dispatch(setResultProducts({ total: newTotal, products: searchedProducts }));
      setPage((prev) => ({
        ...prev,
        maxPage: newMaxPage,
      }));
    }
  }, [search, category, products, postPerPage]);
  useEffect(() => {
    if (currentPage > maxPage) {
      setPage((prev) => ({ ...prev, currentPage: maxPage }));
      if (maxLimitPage > maxPage) {
        const newPageSection = Math.ceil(maxPage / 5);
        setPage((prev) => ({
          ...prev,
          pageSection: newPageSection,
          maxLimitPage: newPageSection * 5,
          minLimitPage: newPageSection * 5 - 4,
        }));
      }
    }
  }, [maxPage]);
  return (
    <div className={`Flex ${styles.Wrapper}`}>
      <div className={`${styles.List}`}>
        <ListHeader />
        {resultProducts.products?.length !== 0 ? (
          resultProducts.products
            ?.slice(prevProductsCount, currentProductsCount)
            .map(({ id, title, brand, description, price, rating, stock }) => (
              <Item
                key={id + title}
                brand={brand}
                id={id}
                title={title}
                description={description}
                price={price}
                rating={rating}
                stock={stock}
              />
            ))
        ) : (
          <div className={`Flex ${styles.EmptyMessage}`}>검색결과가 없습니다.</div>
        )}
      </div>
      <div className={`Flex Relative ${styles.BottomBox}`}>
        {resultProducts && (
          <div className={`Flex Relative ${styles.PageButtonBox}`}>
            <div className={`Absolute ${styles.PostPerPageSelectBox}`}>
              <select
                className={styles.PostPerPageSelect}
                onChange={(e) => handleChangePostPerPage(parseInt(e.currentTarget.value))}
                defaultValue={postPerPage}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              개씩 보기!
            </div>
            <button
              className={`Absolute ${styles.Button} ${styles.StartPageButton} ${
                pageSection !== 1 && styles.PageButton
              }`}
              onClick={() => handleClickPageSection("start")}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              className={`Absolute ${styles.Button} ${styles.PreviusButton} ${
                pageSection !== 1 && styles.PageButton
              }`}
              onClick={() => handleClickPageSection("prev")}
              disabled={pageSection === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {Array.from({ length: maxPage }, (_, index) => index + 1).map(
              (page) =>
                page <= maxLimitPage &&
                page >= minLimitPage && (
                  //  || page === maxPage
                  <span key={page}>
                    {/* {page === maxPage && maxLimitPage < maxPage && "..."} */}
                    <button
                      key={page}
                      className={`${styles.Button} ${styles.PageButton} ${
                        page === currentPage && styles.Active
                      }`}
                      onClick={() => handleClickPageButton(page)}
                    >
                      {page}
                    </button>
                  </span>
                )
            )}
            <button
              className={`Absolute ${styles.Button} ${styles.NextButton} ${
                maxLimitPage < maxPage && styles.PageButton
              }`}
              onClick={() => handleClickPageSection("next")}
              disabled={maxLimitPage >= maxPage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button
              className={`Absolute ${styles.Button} ${styles.EndPageButton} ${
                maxLimitPage < maxPage && styles.PageButton
              }`}
              onClick={() => handleClickPageSection("end")}
              disabled={maxLimitPage >= maxPage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductList;
