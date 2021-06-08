import styles from "./styles.module.scss";

const QuantityButton = ({ removeQuantity, addQuantity, quantity, stock }) => {
  return (
    <div className={styles.container}>
      <button onClick={removeQuantity}>-</button>

      <input
        type="text"
        value={quantity}
        disabled
        minLength={1}
        maxLength={stock}
        aria-label="Quantidade"
      />

      <button onClick={addQuantity}>+</button>
    </div>
  );
};

export default QuantityButton;
