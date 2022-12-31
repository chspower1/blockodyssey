import ProductList from "@components/contents/ProductList";
import OptionBar from "@components/optionBar/OptionBar";
import { useState } from "react";
import TopBar from "@components/TopBar";
import { useSessionStorage } from "@hooks/useSessionStorage";
// type
import type { Category } from "./type/product";
// css
import styles from "@styles/App.module.css";

const App = () => {
  // state
  const [search, setSearch] = useSessionStorage<string>({
    key: "search",
    defaultValue: "",
  });
  const [category, setCategory] = useSessionStorage<Category>({
    key: "category",
    defaultValue: "all",
  });
  const [isNew, setIsNew] = useState(false);

  // jsx
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
