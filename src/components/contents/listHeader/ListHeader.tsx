import styles from "@styles/contents/Item.module.css";
import { ProductColumn, ResultProducts } from "@type/product";
import { SetStateAction } from "react";
import SortButton from "./SortButton";
interface ListHeaderProps {
  setResultProducts: React.Dispatch<SetStateAction<ResultProducts | undefined>>;
}
const PRODUCT_COLUMN = [
  {
    korean: "상품번호",
    value: "id",
    className: "Id",
  },
  {
    korean: "상품명",
    value: "title",
    className: "Title",
  },
  {
    korean: "브랜드",
    value: "brand",
    className: "Brand",
  },
  {
    korean: "상품내용",
    value: "description",
    className: "Description",
  },
  {
    korean: "가격",
    value: "price",
    className: "Price",
  },
  {
    korean: "평점",
    value: "score",
    className: "Score",
  },
  {
    korean: "재고",
    value: "stock",
    className: "Stock",
  },
];
const ListHeader = () => {
  return (
    <div className={styles.Wrapper}>
      {PRODUCT_COLUMN.map(({ korean, value, className }) => (
        <p className={styles[className]}>
          {korean}
          <SortButton column={value as ProductColumn} />
        </p>
      ))}
      <p className={styles.Id}>
        상품번호
        <SortButton column="id" />
      </p>
    </div>
  );
};
export default ListHeader;
