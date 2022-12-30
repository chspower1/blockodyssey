import { useEffect, useState } from "react";
import { useSessionStorage } from "./useSessionStorage";
const usePagination = () => {
  // State
  const [sessionCurrentPage, setSessionCurrentPage] = useSessionStorage<number>({
    key: "currentPage",
    defaultValue: 1,
  });
  const [sessionPostPerPage, setSessionPostPerPage] = useSessionStorage<number>({
    key: "postPerPage",
    defaultValue: 10,
  });
  const [page, setPage] = useState({
    postPerPage: sessionPostPerPage,
    currentPage: sessionCurrentPage,
    pageSection: Math.ceil(sessionCurrentPage / 5),
    maxPage: 1,
    maxLimitPage: Math.ceil(sessionCurrentPage / 5) * 5,
    minLimitPage: Math.ceil(sessionCurrentPage / 5) * 5 - 4,
  });
  const prevProductsCount = sessionPostPerPage * (page.currentPage - 1);
  const currentProductsCount = sessionPostPerPage * page.currentPage;

  // handler
  const handleClickPageButton = (page: number) => {
    setPage((prev) => ({ ...prev, currentPage: page }));
  };

  const handleChangePostPerPage = (postPerPage: number) => {
    setPage((prev) => ({ ...prev, postPerPage }));
  };

  const handleClickPageSection = (type: "next" | "prev" | "end" | "start") => {
    if (type === "next" && page.maxLimitPage <= page.maxPage) {
      setPage((prev) => ({
        ...prev,
        pageSection: prev.pageSection + 1,
        currentPage: (prev.pageSection + 1) * 5 - 4,
      }));
    } else if (type === "prev" && page.pageSection !== 1) {
      setPage((prev) => ({
        ...prev,
        pageSection: prev.pageSection - 1,
        currentPage: (prev.pageSection - 1) * 5,
      }));
    } else if (type === "end") {
      setPage((prev) => ({
        ...prev,
        pageSection: Math.ceil(page.maxPage / 5),
        currentPage: page.maxPage,
      }));
    } else if (type === "start") {
      setPage((prev) => ({
        ...prev,
        pageSection: 1,
        currentPage: 1,
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
  }, [page.currentPage, setSessionCurrentPage]);
  useEffect(() => {
    setSessionPostPerPage(page.postPerPage);
  }, [page.postPerPage, setSessionPostPerPage]);
  useEffect(() => {
    console.log("현재페이지 변경");
    if (page.currentPage > page.maxLimitPage) {
      setPage((prev) => ({ ...prev, currentPage: page.maxLimitPage }));
    }
  }, [page.maxPage]);
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
