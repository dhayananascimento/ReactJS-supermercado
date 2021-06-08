import styles from "./styles.module.scss";

const Button = ({ onClick, children }) => {
  return (
    <button type="button" className={styles.container} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
