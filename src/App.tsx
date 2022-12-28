import { getProducts } from "@api/product";
import ProductList from "@components/contents/ProductList";
import OptionBar from "@components/option-bar/OptionBar";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ResponseProducts } from "./type/product";
type Category = "all" | "title" | "brand" | "description";
export interface PageOptions {
  limit: number;
  skip: number;
  searchText: string;
  category: Category;
}
const App = () => {
  return (
    <div>
      <OptionBar />

      <ProductList />
    </div>
  );
};

export default App;
