import "@style/Item.css";
interface ItemProps {
  id: number;
  title: string;
  brand: string;
  description: string;
  price: number;
  score: number;
  stock: number;
}

const Item = ({ id, title, brand, description, price, score, stock }: ItemProps) => {
  return (
    <div className="ItemWrapper">
      <p>{id}</p>
      <p>{title}</p>
      <p>{brand}</p>
      <p>{description}</p>
      <p>{price}</p>
      <p>{score}</p>
      <p>{stock}</p>
    </div>
  );
};
export default Item;
