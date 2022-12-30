import { setResultProducts } from "@store/resultProductsSlice";
import { RootState } from "@store/store";
import { ProductColumn } from "@type/product";
import { sortProducts } from "@utils/sortProduct";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@styles/contents/listHeader/SortButton.module.css";
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
    <button
      className="Absolute"
      style={{ right: -25 }}
      type="button"
      onClick={handleClickSortButton}
    >
      {isUpper ? (
        <svg
          width="20"
          height="20"
          viewBox="-5 0 20 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.SortIcon}
        >
          <path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill="#0D0E10" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="-5 0 20 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.SortIcon}
        >
          <path d="M5 8L9.33013 0.5H0.669873L5 8Z" fill="#0D0E10" />
        </svg>
      )}
    </button>
  );
};
export default SortButton;
