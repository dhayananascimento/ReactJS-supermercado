import styles from "./styles.module.scss";

import ConvertCurrency from "../../utils/ConvertCurrency.js";
import QuantityButton from "../QuantityButton";

const CartCard = ({ data, index, removeItem, addItem }) => {
  return (
    <tr className={styles.container}>
      <td>
        <img src={data.image} alt={data.description} />
      </td>

      <td>{data.description}</td>

      <td>
        <QuantityButton
          removeQuantity={() => {
            removeItem(index);
          }}
          addQuantity={() => {
            addItem(index);
          }}
          quantity={data?.quantity}
          stock={data?.stock}
        />
      </td>

      <td>R$ {ConvertCurrency(data.total)}</td>
    </tr>
  );
};

export default CartCard;
