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
  const [pageSection, setPageSection] = useState(1);
  const [resultProducts, setResultProducts] = useState<ResultProducts>();
  const prevProductsCount = postPerPage * (currentPage - 1);
  const currentProductsCount = postPerPage * currentPage;
  const maxPage = resultProducts ? Math.ceil(resultProducts.total / postPerPage) : 1;

  const { data: products } = useQuery<ResponseProducts>(["products"], getProducts);

  const handleClickPageButton = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangePostPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPostPerPage(parseInt(e.currentTarget.value));
  };

  const handleClickPageSection = ({ isNext }: { isNext: boolean }) => {
    if (isNext && pageSection * 5 <= maxPage) {
      setPageSection((prev) => prev + 1);
    } else if (!isNext && pageSection !== 1) {
      setPageSection((prev) => prev - 1);
    }
  };

  // 검색조건,키워드 변경시
  useEffect(() => {
    setCurrentPage(1);
    if (products) {
      const searchedProducts = searchProducts({ category, search, products: products.products! });
      setResultProducts({ total: searchedProducts.length, products: searchedProducts });
      console.log(searchedProducts);
    }
  }, [search, category, products]);

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
        <select onChange={handleChangePostPerPage}>
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
                ((page <= 5 * pageSection && page > 5 * (pageSection - 1)) || page === maxPage) && (
                  <>
                    {page === maxPage && "..."}
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
              disabled={pageSection * 5 >= maxPage}
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
