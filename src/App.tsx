import ProductList from "@components/contents/ProductList";
import OptionBar from "@components/OptionBar";
import { useState } from "react";
import { SearchOptions } from "./type/product";
import styles from "@styles/App.module.css";
import TopBar from "@components/TopBar";

const App = () => {
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    search: "",
    category: "all",
  });
  return (
    <div className={styles.Wrapper}>
      <TopBar />
      <OptionBar setSearchOptions={setSearchOptions} />
      <ProductList searchOptions={searchOptions} />
    </div>
  );
};

export default App;
