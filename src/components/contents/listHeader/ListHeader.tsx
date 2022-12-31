import SortButton from "./SortButton";
import styles from "@styles/contents/listHeader/ListHeader.module.css";
import type { ProductColumn } from "@type/product";
import { PRODUCT_COLUMN } from "@constant/productColumn";

const ListHeader = () => {
  return (
    <div className={`Flex ${styles.Wrapper}`} style={{ position: "sticky", top: "0px" }}>
      {PRODUCT_COLUMN.map(({ korean, value, className }) => (
        <p key={value} className={`Flex ${styles[className]}`}>
          <span className="Relative Flex">
            {korean}
            <SortButton column={value as ProductColumn} />
          </span>
        </p>
      ))}
    </div>
  );
};
export default ListHeader;
