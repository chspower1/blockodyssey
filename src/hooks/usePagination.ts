import { Product } from "@type/product";
import { useEffect, useState } from "react";
import { useSessionStorage } from "./useSessionStorage";

const usePagination = () => {
  const [sessionCurrentPage, setSessionCurrentPage] = useSessionStorage<number>({
    key: "currentPage",
    defaultValue: 1,
  });
  const [page, setPage] = useState({
    postPerPage: 10,
    currentPage: sessionCurrentPage,
    pageSection: 1,
    maxPage: 1,
    maxLimitPage: 5,
    minLimitPage: 1,
  });

  const prevProductsCount = page.postPerPage * (page.currentPage - 1);
  const currentProductsCount = page.postPerPage * page.currentPage;

  // 현재페이지 이동 시
  const handleClickPageButton = (page: number) => {
    setPage((prev) => ({ ...prev, currentPage: page }));
  };

  // 페이지 당 행 갯수 수정시
  const handleChangePostPerPage = (postPerPage: number) => {
    setPage((prev) => ({ ...prev, postPerPage }));

    console.log(page);
  };

  // 페이지섹션 이동 버튼 클릭시
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

  // useEffect(() => {
  //   if (page.currentPage > page.maxLimitPage) {
  //     setPage((prev) => ({ ...prev, currentPage: page.maxLimitPage }));
  //   } else if (page.currentPage < page.maxLimitPage) {
  //     setPage((prev) => ({ ...prev, currentPage: page.minLimitPage }));
  //   }
  // }, [page.pageSection]);

  useEffect(() => {
    console.log("currentSession 변경");
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
