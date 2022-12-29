import { Category, SearchOptions } from "@type/product";
import { useState } from "react";
import styles from "@styles/OptionBar.module.css";
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
        <select name="select" onChange={(e) => setCategory(e.currentTarget.value as Category)}>
          <option value="all" selected={finalCategory === "all"}>
            전체
          </option>
          <option value="title" selected={finalCategory === "title"}>
            상품명
          </option>
          <option value="brand" selected={finalCategory === "brand"}>
            브랜드
          </option>
          <option value="description" selected={finalCategory === "description"}>
            상품내용
          </option>
        </select>
        <input type="text" value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
        <button>조회</button>
      </form>
    </header>
  );
};
export default OptionBar;
