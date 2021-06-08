import styles from "./styles.module.scss";
import ConvertCurrency from "../../utils/ConvertCurrency.js";

const CartCard = ({ data, index, removeItem, addItem }) => {
  return (
    <tr className={styles.container}>
      <td>
        <img src={data.image} alt={data.description} />
      </td>

      <td>{data.description}</td>

      <td>
        <div className={styles.quantity}>
          <button
            onClick={() => {
              removeItem(index);
            }}
          >
            -
          </button>
          <input type="text" value={data?.quantity} disabled />
          <button
            onClick={() => {
              addItem(index);
            }}
          >
            +
          </button>
        </div>
      </td>

      <td>R$ {ConvertCurrency(data.total)}</td>
    </tr>
  );
};

export default CartCard;
