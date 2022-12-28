import { Category, SearchOptions } from "@type/product";
import { useState } from "react";
import styles from "@styles/OptionBar.module.css";
interface OptionBarProps {
  setSearchOptions: React.Dispatch<React.SetStateAction<SearchOptions>>;
}
const OptionBar = ({ setSearchOptions }: OptionBarProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("all");

  const handleSubmitSearchOptions = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOptions({ category, search });
  };

  return (
    <header className={styles.Wrapper}>
      <h3>상품 검색</h3>
      <form onSubmit={handleSubmitSearchOptions}>
        <div>검색</div>
        <select name="select" onChange={(e) => setCategory(e.currentTarget.value as Category)}>
          <option value="all">전체</option>
          <option value="title">상품명</option>
          <option value="brand">브랜드</option>
          <option value="description">상품내용</option>
        </select>
        <input type="text" value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
        <button>조회</button>
      </form>
    </header>
  );
};
export default OptionBar;
