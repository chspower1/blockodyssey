import Item from "./Item";
import ListHeader from "./ListHeader";
import type { Category, ResponseProducts, SearchOptions } from "@type/product";
import { getProducts } from "@api/product";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";

interface ProductListProps {
  searchOptions: SearchOptions;
}

const ProductList = ({ searchOptions: { search, category } }: ProductListProps) => {
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, maxPageArray] = useState(0);
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
      onSuccess(data) {
        console.log("fetch", data.total / postPerPage);
        maxPageArray(Math.ceil(data.total / postPerPage));
      },
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
  return (
    <>
      <div>검색된 데이터 : {data?.total}</div>
      <ListHeader />
      {data &&
        data.products.map(({ id, title, brand, description, price, rating, stock }) => (
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
      <div>
        페이지 당 행 :
        <select onChange={handleChangePostPerPage}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        {data && (
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
    </>
  );
};
export default ProductList;
