import styles from "@styles/contents/Item.module.css";
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
const Item = ({ id, title, brand, description, price, rating, stock }: ItemProps) => {
  return (
    <div className={`${styles.Wrapper}`}>
      <p className={`Flex ${styles.Id}`}>{id}</p>
      <p className={`Flex ${styles.Title}`}>{title}</p>
      <p className={`Flex ${styles.Brand}`}>{brand}</p>
      <p className={`Flex ${styles.Description}`}>{cutDownText(description)}</p>
      <p className={`Flex ${styles.Price}`}>{price}</p>
      <p className={`Flex ${styles.Rating}`}>{rating}</p>
      <p className={`Flex ${styles.Stock}`}>{stock}</p>
    </div>
  );
};
export default Item;
