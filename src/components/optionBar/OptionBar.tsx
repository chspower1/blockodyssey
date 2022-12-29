import { Category, SearchOptions } from "@type/product";
import { useState } from "react";
import styles from "@styles/OptionBar.module.css";
import CategorySelector from "./CategorySeletor";
interface OptionBarProps {
  finalSearchKeyword: string;
  finalCategory: Category;
  setFinalSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  setFinalCategory: React.Dispatch<React.SetStateAction<Category>>;
}

const OptionBar = ({
  finalSearchKeyword,
  finalCategory,
  setFinalSearchKeyword,
  setFinalCategory,
}: OptionBarProps) => {
  const CATEGORIES = [
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
  const [search, setSearch] = useState(finalSearchKeyword);
  const [category, setCategory] = useState<Category>(finalCategory);

  const handleSubmitSearchOptions = (e: React.FormEvent) => {
    e.preventDefault();
    setFinalSearchKeyword(search);
    setFinalCategory(category);
  };

  return (
    <header className={styles.Wrapper}>
      <h3>상품 검색</h3>
      <form onSubmit={handleSubmitSearchOptions}>
        <div>검색</div>
        <CategorySelector
          categories={CATEGORIES}
          setCategory={setCategory}
          finalCategory={finalCategory}
        />
        <input type="text" value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
        <button>조회</button>
      </form>
    </header>
  );
};
export default OptionBar;
