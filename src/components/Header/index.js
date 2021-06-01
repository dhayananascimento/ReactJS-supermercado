import styles from "./styles.module.scss";
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
  return (
    <div className={styles.container}>
      <h1>Supermercado Show</h1>
      <button type="button" aria-label="Carrinho de compras">
        <FiShoppingCart />
      </button>
    </div>
  );
};

export default Header;
