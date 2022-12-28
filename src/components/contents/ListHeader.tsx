import styles from "@styles/contents/Item.module.css";
const ListHeader = () => {
  return (
    <div className={styles.Wrapper}>
      <p className={styles.Id}>상품번호</p>
      <p className={styles.Title}>상품명</p>
      <p className={styles.Brand}>브랜드</p>
      <p className={styles.Description}>상품내용</p>
      <p className={styles.Price}>가격</p>
      <p className={styles.Score}>평점</p>
      <p className={styles.Stock}>재고</p>
    </div>
  );
};
export default ListHeader;
