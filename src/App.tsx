import { getProducts } from "@api/product";
import ProductList from "@components/contents/ProductList";
import OptionBar from "@components/option-bar/OptionBar";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Category, ResponseProducts, SearchOptions } from "./type/product";

const App = () => {
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    search: "",
    category: "all",
  });
  return (
    <>
      <OptionBar setSearchOptions={setSearchOptions} />
      <ProductList searchOptions={searchOptions} />
    </>
  );
};

export default App;
