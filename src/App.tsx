import ProductList from "@components/contents/ProductList";
import OptionBar from "@components/optionBar/OptionBar";
import { useEffect, useState } from "react";
import { Category, SearchOptions } from "./type/product";
import styles from "@styles/App.module.css";
import TopBar from "@components/TopBar";
import { useSessionStorage } from "@hooks/useSessionStorage";

const App = () => {
  const [finalSearchKeyword, setFinalSearchKeyword] = useSessionStorage<string>({
    key: "searchKeyword",
    defaultValue: "",
  });
  const [finalCategory, setFinalCategory] = useSessionStorage<Category>({
    key: "category",
    defaultValue: "all",
  });
  const [isNew, setIsNew] = useState(false);
  return (
    <div className={styles.Wrapper}>
      <TopBar />
      <OptionBar
        setIsNew={setIsNew}
        finalCategory={finalCategory}
        finalSearchKeyword={finalSearchKeyword}
        setFinalSearchKeyword={setFinalSearchKeyword}
        setFinalCategory={setFinalCategory}
      />
      <ProductList
        searchOptions={{ search: finalSearchKeyword, category: finalCategory }}
        isNew={isNew}
        setIsNew={setIsNew}
      />
    </div>
  );
};

export default App;
