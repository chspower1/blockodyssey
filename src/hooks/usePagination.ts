import { Product } from "@type/product";
import { useEffect, useState } from "react";
import { useSessionStorage } from "./useSessionStorage";

const usePagination = () => {
  // State
  const [sessionCurrentPage, setSessionCurrentPage] = useSessionStorage<number>({
    key: "currentPage",
    defaultValue: 1,
  });
  const [page, setPage] = useState({
    postPerPage: 10,
    currentPage: sessionCurrentPage,
    pageSection: Math.ceil(sessionCurrentPage / 5),
    maxPage: 1,
    maxLimitPage: Math.ceil(sessionCurrentPage / 5) * 5,
    minLimitPage: Math.ceil(sessionCurrentPage / 5) * 5 - 4,
  });
  const prevProductsCount = page.postPerPage * (page.currentPage - 1);
  const currentProductsCount = page.postPerPage * page.currentPage;

  // handler
  const handleClickPageButton = (page: number) => {
    setPage((prev) => ({ ...prev, currentPage: page }));
  };

  const handleChangePostPerPage = (postPerPage: number) => {
    setPage((prev) => ({ ...prev, postPerPage }));

    console.log(page);
  };

  const handleClickPageSection = ({ isNext }: { isNext: boolean }) => {
    if (isNext && page.maxLimitPage <= page.maxPage) {
      setPage((prev) => ({
        ...prev,
        pageSection: prev.pageSection + 1,
        currentPage: (prev.pageSection + 1) * 5 - 4,
      }));
    } else if (!isNext && page.pageSection !== 1) {
      setPage((prev) => ({
        ...prev,
        pageSection: prev.pageSection - 1,
        currentPage: (prev.pageSection - 1) * 5,
      }));
    }
    setPage((prev) => ({
      ...prev,
      maxLimitPage: prev.pageSection * 5,
      minLimitPage: prev.pageSection * 5 - 4,
    }));
  };

  // When update currentPage
  useEffect(() => {
    setSessionCurrentPage(page.currentPage);
  }, [page.currentPage]);

  return {
    page,
    setPage,
    prevProductsCount,
    currentProductsCount,
    handleClickPageButton,
    handleChangePostPerPage,
    handleClickPageSection,
  };
};
export default usePagination;
