import styles from "./primaryButton.module.css";

const MainButton = ({ label, click }) => {
  return (
    <button className={styles.button} onClick={click}>
      {label}
    </button>
  );
};

export default MainButton;
