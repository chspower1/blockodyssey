import ProductList from "@components/contents/ProductList";
import OptionBar from "@components/option-bar/OptionBar";
import { useState } from "react";
import { SearchOptions } from "./type/product";
import styles from "@styles/App.module.css";

const App = () => {
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    search: "",
    category: "all",
  });
  return (
    <div className={styles.Wrapper}>
      <OptionBar setSearchOptions={setSearchOptions} />
      <ProductList searchOptions={searchOptions} />
    </div>
  );
};

export default App;
