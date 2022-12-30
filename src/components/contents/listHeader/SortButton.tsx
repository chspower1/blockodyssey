import { setResultProducts } from "@store/resultProductsSlice";
import { RootState } from "@store/store";
import { ProductColumn } from "@type/product";
import { sortProducts } from "@utils/sortProduct";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
interface SortButtonProps {
  column: ProductColumn;
}
const SortButton = ({ column }: SortButtonProps) => {
  const resultProducts = useSelector((state: RootState) => state.resultProducts.value);
  const dispatch = useDispatch();
  const [isUpper, setIsUpper] = useState(true);

  const handleClickSortButton = () => {
    const sortedProducts = sortProducts({ products: resultProducts.products!, column, isUpper });
    dispatch(setResultProducts({ total: resultProducts.total, products: sortedProducts }));
    setIsUpper((prev) => !prev);
  };
  return (
    <button type="button" onClick={handleClickSortButton}>
      {isUpper ? "⬆️" : "⬇️"}
    </button>
  );
};
export default SortButton;
