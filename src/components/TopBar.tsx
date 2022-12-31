import styles from "@styles/TopBar.module.css";
const TopBar = () => {
  return (
    <div className={`Flex ${styles.Wrapper}`}>
      <img src="/logo.png" alt="블랙오디세이" />
      <h1 className={`${styles.My}`}>
        프론트엔드 지원자 <span>조호성</span>
      </h1>
    </div>
  );
};
export default TopBar;
