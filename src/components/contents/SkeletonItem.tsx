import { PRODUCT_COLUMN } from "@constant/productColumn";
import styles from "@styles/contents/Item.module.css";
const SkeletonItem = () => {
  return (
    <div className={styles.Wrapper}>
      {PRODUCT_COLUMN.map(({ className }) => (
        <p className={`Flex ${styles[className]}`}>
          <span className={styles.Skeleton} />
        </p>
      ))}
    </div>
  );
};
export default SkeletonItem;
