import { Category } from "@type/product";
import { SetStateAction, useState } from "react";
import styles from "@styles/OptionBar.module.css";
import CategorySelector from "./CategorySeletor";
interface OptionBarProps {
  setIsNew: React.Dispatch<SetStateAction<boolean>>;
  finalSearchKeyword: string;
  finalCategory: Category;
  setFinalSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  setFinalCategory: React.Dispatch<React.SetStateAction<Category>>;
}
const SELECT_CATEGORIES = [
  {
    korean: "전체",
    value: "all",
  },
  {
    korean: "상품명",
    value: "title",
  },
  {
    korean: "브랜드",
    value: "brand",
  },
  {
    korean: "상품내용",
    value: "description",
  },
];
const OptionBar = ({
  finalSearchKeyword,
  finalCategory,
  setFinalSearchKeyword,
  setFinalCategory,
  setIsNew,
}: OptionBarProps) => {
  // State
  const [search, setSearch] = useState(finalSearchKeyword);
  const [category, setCategory] = useState<Category>(finalCategory);
  const [errorMessage, setErrorMessage] = useState<string>();

  // handler
  const handleSubmitSearchOptions = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) {
      setErrorMessage("검색어를 입력해주세요.");
    } else {
      setIsNew(true);
      setFinalSearchKeyword(search);
      setFinalCategory(category);
    }
  };

  const handleClickResetOption = () => {
    setIsNew(true);
    setFinalSearchKeyword("");
    setFinalCategory("all");
  };
  return (
    <header className={styles.Wrapper}>
      <h3>상품 검색</h3>
      <form onSubmit={handleSubmitSearchOptions}>
        <div>검색</div>
        <button type="button" onClick={handleClickResetOption}>
          전체 보기
        </button>
        <CategorySelector
          categories={SELECT_CATEGORIES}
          setCategory={setCategory}
          finalCategory={finalCategory}
        />
        <input type="text" value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
        <div>{errorMessage && errorMessage}</div>
        <button>조회</button>
      </form>
    </header>
  );
};
export default OptionBar;
