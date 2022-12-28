import styles from "@styles/TopBar.module.css";
const TopBar = () => {
  return (
    <div className={styles.Wrapper}>
      <img src="/logo.png" alt="블랙오디세이" />
      상품검색
    </div>
  );
};
export default TopBar;
