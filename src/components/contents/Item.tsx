import { PRODUCT_COLUMN } from "@constant/productColumn";
import styles from "@styles/contents/Item.module.css";
import { ProductColumn } from "@type/product";
interface ItemProps {
  id: number;
  title: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
}

const cutDownText = (description: string) => {
  if (description.length > 40) {
    return description.slice(0, 40) + "...";
  }
  return description;
};
const Item = (props: ItemProps) => {
  return (
    <div className={`${styles.Wrapper}`}>
      {PRODUCT_COLUMN.map(({ value, className }) => (
        <p key={value} className={`Flex ${styles[className]}`}>
          {value === "description" ? cutDownText(props[value]) : props[value as ProductColumn]}
        </p>
      ))}
    </div>
  );
};
export default Item;
