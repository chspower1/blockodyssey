interface ItemProps {
  number: number;
  title: string;
  brand: string;
  description: string;
  price: number;
  score: number;
  stock: number;
}
const Item = ({ number, title, brand, description, price, score, stock }: ItemProps) => {
  return (
    <div>
      <p></p>
    </div>
  );
};
export default Item;
