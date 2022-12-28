import Item from "./Item";
import ListHeader from "./ListHeader";
import type { ResponseProducts } from "@type/product";
import { getProducts } from "@api/product";
import { useQuery } from "@tanstack/react-query";
import { PageOptions } from "src/App";
import { useState } from "react";

interface ProductListProps {
  pageOptions: PageOptions;
  setPageOptions: React.Dispatch<React.SetStateAction<PageOptions>>;
}

const ProductList = () => {
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const { data } = useQuery<ResponseProducts>(
    [
      `products`,
      `limit=${postPerPage}`,
      `skip=${postPerPage * currentPage}`,
      `page=${currentPage}`,
    ],
    () => getProducts({ limit: postPerPage, skip: postPerPage * currentPage })
  );
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
        <select onChange={(e) => setPostPerPage(parseInt(e.currentTarget.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        {data && (
          <div>
            {Array.from({ length: data?.total / postPerPage }, (_, index) => index).map(
              (page: number) => (
                <button onClick={() => setCurrentPage(page)}>{page + 1}</button>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default ProductList;
