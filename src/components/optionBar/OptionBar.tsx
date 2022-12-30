import { Category } from "@type/product";
import { SetStateAction, useState } from "react";
import styles from "@styles/optionBar/OptionBar.module.css";
import CategorySelector from "./CategorySeletor";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import SearchIcon from "@assets/search.png";
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
  const resultProducts = useSelector((state: RootState) => state.resultProducts.value);

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
    <header className={`Flex ${styles.Wrapper}`}>
      <div>
        <span>{`상품 수 :${resultProducts.total}`}</span>
        <span>{`분류 : ${category}`}</span>
        <span>{`검색어 :${search}`}</span>
      </div>
      <form className={`Flex ${styles.SearchForm}`} onSubmit={handleSubmitSearchOptions}>
        <button type="button" onClick={handleClickResetOption}>
          전체 보기
        </button>
        <CategorySelector
          categories={SELECT_CATEGORIES}
          setCategory={setCategory}
          finalCategory={finalCategory}
        />
        <div className={`Flex ${styles.SearchBox}`}>
          <input
            className={`Flex ${styles.SearchInput}`}
            type="text"
            value={search}
            placeholder="검색어를 입력해주세요!"
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <button className={styles.SearchButton}>
            <img src={SearchIcon} alt="검색" />
          </button>
        </div>
      </form>
    </header>
  );
};
export default OptionBar;
