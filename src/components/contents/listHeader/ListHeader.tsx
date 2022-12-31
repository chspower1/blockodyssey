import { ProductColumn } from "@type/product";
import SortButton from "./SortButton";
import styles from "@styles/contents/listHeader/ListHeader.module.css";

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
    value: "rating",
    className: "Rating",
  },
  {
    korean: "재고",
    value: "stock",
    className: "Stock",
  },
];
const ListHeader = () => {
  return (
    <div className={`Flex ${styles.Wrapper}`} style={{ position: "sticky", top: "0px" }}>
      {PRODUCT_COLUMN.map(({ korean, value, className }) => (
        <p key={value} className={`Flex ${styles[className]}`}>
          <div className="Relative Flex">
            {korean}
            <SortButton column={value as ProductColumn} />
          </div>
        </p>
      ))}
    </div>
  );
};
export default ListHeader;
