import ProductList from "@components/contents/ProductList";
import OptionBar from "@components/optionBar/OptionBar";
import { useEffect, useState } from "react";
import { Category, SearchOptions } from "./type/product";
import styles from "@styles/App.module.css";
import TopBar from "@components/TopBar";
import { useSessionStorage } from "@hooks/useSessionStorage";

const App = () => {
  const [search, setSearch] = useSessionStorage<string>({
    key: "search",
    defaultValue: "",
  });
  const [category, setCategory] = useSessionStorage<Category>({
    key: "category",
    defaultValue: "all",
  });
  const [isNew, setIsNew] = useState(false);
  return (
    <div className={styles.Wrapper}>
      <TopBar />
      <OptionBar
        setIsNew={setIsNew}
        category={category}
        search={search}
        setSearch={setSearch}
        setCategory={setCategory}
      />
      <ProductList searchOptions={{ search, category }} isNew={isNew} setIsNew={setIsNew} />
    </div>
  );
};

export default App;
