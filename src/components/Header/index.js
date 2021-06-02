import styles from "./styles.module.scss";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();

  return (
    <div className={styles.container}>
      <Link to="/">Supermercado Show</Link>

      <button
        type="button"
        aria-label="Carrinho de compras"
        onClick={() => {
          history.push({ pathname: "/cart" });
        }}
      >
        <FiShoppingCart />
      </button>
    </div>
  );
};

export default Header;
