import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

import { ListContext } from "../../store/providers/ListProvider.js";
import ConvertCurrency from "../../utils/ConvertCurrency.js";
import Header from "../../components/Header";

export default function Details({ location }) {
  let history = useHistory();

  const data = location.state;
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useContext(ListContext);

  function removeQuantity() {
    let value = quantity;

    if (value > 1) {
      value--;
      setQuantity(value);
    } else {
      alert("Quantidade mínima de 1 item!");
    }
  }

  function addQuantity() {
    let value = quantity;

    if (value < data.stock) {
      value++;
      setQuantity(value);
    } else {
      alert(
        `Este item possui apenas ${data.stock} unidades disponíveis em stock!`
      );
    }
  }

  function addItemToCart() {
    let item = cart;

    let oldQuantity = 0;
    let findItem = item.find((element) => element.id === data.id);

    if (findItem) {
      let findIndex = item.findIndex((element) => element.id === data.id);
      oldQuantity = item[findIndex].quantity;
      item.splice(findIndex, 1);
    }

    setCart([
      ...item,
      {
        ...data,
        quantity: quantity + oldQuantity,
      },
    ]);

    history.push({ pathname: "/" });
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.details}>
        <div>
          <Link to="/">Voltar</Link>
          <img src={data.image} alt={data.description} />
        </div>

        <div className={styles.description}>
          <strong>{data.description}</strong>

          {data?.promotion && data?.promotion.kind === "buy-x-take-y" && (
            <p>
              Leve <span>4</span> e pague <span>3</span>
            </p>
          )}

          {data?.offer ? (
            <p>
              De R${" "}
              <s>
                <span>{ConvertCurrency(data.price)}</span>
              </s>{" "}
              por R$ <span>{ConvertCurrency(data?.offer)}</span>
            </p>
          ) : (
            <p>
              R$ <span>{ConvertCurrency(data.price)}</span>
            </p>
          )}

          {data.stock ? (
            <>
              <label htmlFor="quantity">Quantidade:</label>
              <div className={styles.quantity}>
                <button onClick={removeQuantity}>-</button>
                <input
                  id="quantity"
                  type="text"
                  value={quantity}
                  disabled
                  minLength={1}
                  maxLength={data.stock}
                />
                <button onClick={addQuantity}>+</button>
              </div>

              <button
                type="button"
                disabled={!data.stock}
                className={styles.buy}
                onClick={addItemToCart}
              >
                Adicionar ao carrinho
              </button>
            </>
          ) : (
            <p className={styles.unavailable}>
              Infelizmente, este produto não está disponível no momento.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
