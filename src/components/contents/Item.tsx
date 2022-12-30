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
    <div className={styles.Wrapper}>
      <p className={styles.Id}>{id}</p>
      <p className={styles.Title}>{title}</p>
      <p className={styles.Brand}>{brand}</p>
      <p className={styles.Description}>{cutDownText(description)}</p>
      <p className={styles.Price}>{price}</p>
      <p className={styles.rating}>{rating}</p>
      <p className={styles.Stock}>{stock}</p>
    </div>
  );
};
export default Item;
