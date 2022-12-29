import { useEffect, useState } from "react";

const usePagination = () => {
  const [page, setPage] = useState({
    postPerPage: 10,
    currentPage: 1,
    pageSection: 1,
    maxPage: 1,
  });
  const maxLimitPage = page.pageSection * 5;
  const minLimitPage = maxLimitPage - 4;
  const prevProductsCount = page.postPerPage * (page.currentPage - 1);
  const currentProductsCount = page.postPerPage * page.currentPage;
  // 현재페이지 이동 시
  const handleClickPageButton = (page: number) => {
    setPage((prev) => ({ ...prev, currentPage: page }));
  };

  // 페이지 당 행 갯수 수정시
  const handleChangePostPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    if (e.currentTarget.value) {
      setPage((prev) => ({ ...prev, postPerPage: parseInt(e.currentTarget.value) }));
    }
  };

  // 페이지섹션 이동 버튼 클릭시
  const handleClickPageSection = ({ isNext }: { isNext: boolean }) => {
    if (isNext && maxLimitPage <= page.maxPage) {
      setPage((prev) => ({ ...prev, pageSection: prev.pageSection + 1 }));
    } else if (!isNext && page.pageSection !== 1) {
      setPage((prev) => ({ ...prev, pageSection: prev.pageSection - 1 }));
    }
  };

  //
  useEffect(() => {
    if (page.currentPage > maxLimitPage) {
      setPage((prev) => ({ ...prev, currentPage: maxLimitPage }));
    } else if (page.currentPage < maxLimitPage) {
      setPage((prev) => ({ ...prev, currentPage: minLimitPage }));
    }
  }, [page.pageSection]);

  return {
    page,
    setPage,
    prevProductsCount,
    currentProductsCount,
    handleClickPageButton,
    handleChangePostPerPage,
    handleClickPageSection,
    maxLimitPage,
    minLimitPage,
  };
};
export default usePagination;
