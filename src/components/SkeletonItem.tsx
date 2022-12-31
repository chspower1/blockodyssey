import styles from "@styles/contents/Item.module.css";
const SkeletonItem = ({ index }: { index: number }) => {
  return (
    <div className={styles.Wrapper}>
      <p className={`Flex ${styles.Id}`}>
        <div className={styles.Skeleton} />
      </p>
      <p className={`Flex ${styles.Title}`}>
        <div className={styles.Skeleton} />
      </p>
      <p className={`Flex ${styles.Brand}`}>
        <div className={styles.Skeleton} />
      </p>
      <p className={`Flex ${styles.Description}`}>
        <div className={styles.Skeleton} />
      </p>
      <p className={`Flex ${styles.Price}`}>
        <div className={styles.Skeleton} />
      </p>
      <p className={`Flex ${styles.Rating}`}>
        <div className={styles.Skeleton} />
      </p>
      <p className={`Flex ${styles.Stock}`}>
        <div className={styles.Skeleton} />
      </p>
    </div>
  );
};
export default SkeletonItem;
