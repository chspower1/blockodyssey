import { Category } from "@type/product";
import styles from "@styles/optionBar/OptionBar.module.css";
import CategorySelector from "./CategorySeletor";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import SearchIcon from "@assets/search.png";
interface OptionBarProps {
  search: string;
  category: Category;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
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
const OptionBar = ({ search, category, setSearch, setCategory, setIsNew }: OptionBarProps) => {
  // State
  const resultProducts = useSelector((state: RootState) => state.resultProducts.value);

  // handler
  const handleClickResetOption = () => {
    setSearch("");
    setCategory("all");
  };
  return (
    <header className={`Flex ${styles.Wrapper}`}>
      <span className={`${styles.CountMessage}`}>
        <span>상품 수</span>
        {` : ${resultProducts.total}`}
      </span>

      <form className={`Flex ${styles.SearchForm}`}>
        <button className={`${styles.ResetBytton}`} type="button" onClick={handleClickResetOption}>
          전체 보기
        </button>
        <CategorySelector
          categories={SELECT_CATEGORIES}
          setCategory={setCategory}
          category={category}
          setIsNew={setIsNew}
        />
        <div className={`Flex ${styles.SearchBox}`}>
          <input
            className={`Flex ${styles.SearchInput}`}
            type="text"
            value={search}
            placeholder="검색어를 입력해주세요!"
            onChange={(e) => {
              setIsNew(true);
              setSearch(e.currentTarget.value);
            }}
          />
          <button type="button" className={styles.SearchButton}>
            <img src={SearchIcon} alt="검색" />
          </button>
        </div>
      </form>
    </header>
  );
};
export default OptionBar;
