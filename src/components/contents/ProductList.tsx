import Item from "./Item";
import ListHeader from "./ListHeader";
import type { Category, ResponseProducts, ResultProducts, SearchOptions } from "@type/product";
import { getProducts, getSearchAllProducts } from "@api/product";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";
import styles from "@styles/contents/ProductList.module.css";
interface ProductListProps {
  searchOptions: SearchOptions;
}
type SearchCategory = "title" | "brand" | "description";
const ProductList = ({ searchOptions: { search, category } }: ProductListProps) => {
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, maxPageArray] = useState(0);

  const [resultProducts, setResultProducts] = useState<ResultProducts>();

  // 카테고리가 all일 경우
  const { data } = useQuery<ResponseProducts>(
    [
      `products`,
      `limit=${postPerPage}`,
      `skip=${postPerPage * currentPage}`,
      `page=${currentPage}`,
      `searchText=${search}`,
      `category=${category}`,
    ],
    () => getProducts({ limit: postPerPage, skip: postPerPage * currentPage, search }),
    {
      onSuccess({ total, products }) {
        console.log(total, products);
        setResultProducts({ total, products });
        maxPageArray(Math.ceil(total / postPerPage));
      },
      enabled: category === "all",
    }
  );

  // 카테고리가 all이 아닐 경우
  const { data: allProducts } = useQuery<ResponseProducts>(
    [search, category],
    () => getSearchAllProducts({ search }),
    {
      onSuccess({ products }) {
        console.log(products, category, search);
        if (!products) {
          setResultProducts({ total: 0, products: null });
        } else {
          const resultProducts = products.filter((product) => {
            console.log(product[category as SearchCategory]);
            return product[category as SearchCategory].toLowerCase().includes(search);
          });
          console.log("resultProduct", resultProducts);
          setResultProducts({ products: resultProducts, total: resultProducts.length });
        }
      },
      enabled: category !== "all",
    }
  );

  const handleClickPageButton = (page: number) => {
    setCurrentPage(page);
  };
  const handleChangePostPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPostPerPage(parseInt(e.currentTarget.value));
  };
  useEffect(() => {
    setCurrentPage(0);
    console.log("ProductList render");
  }, [search, category]);

  // queryKey를 가지고 있을 때 결과 상품 업데이트
  useEffect(() => {
    if (data) setResultProducts(data);
  }, [currentPage]);
  return (
    <div className={styles.Wrapper}>
      <div>상품 수 : {resultProducts?.total}</div>
      <ListHeader />
      {resultProducts &&
        resultProducts.products?.map(({ id, title, brand, description, price, rating, stock }) => (
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
            {Array.from({ length: maxPage }, (_, index) => index).map((page) => (
              <button
                key={page}
                style={currentPage === page ? { backgroundColor: "red" } : {}}
                onClick={() => handleClickPageButton(page)}
              >
                {page + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductList;
