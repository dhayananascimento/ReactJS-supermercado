import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import styles from "./styles.module.scss";

import { useCart } from "../../store/providers/CartProvider";
import ConvertCurrency from "../../utils/ConvertCurrency.js";

import Header from "../../components/Header";
import QuantityButton from "../../components/QuantityButton";

export default function Details({ location }) {
  let history = useHistory();

  const data = location.state;
  const [quantity, setQuantity] = useState(1);

  const { cart, setCart } = useCart();

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
    let actualQuantity = quantity;
    let oldQuantity = 0;

    let findItem = item.find((element) => element.id === data.id);

    if (findItem) {
      let findIndex = item.findIndex((element) => element.id === data.id);

      if (actualQuantity + item[findIndex].quantity > item[findIndex].stock) {
        actualQuantity = item[findIndex].stock - item[findIndex].quantity;
        alert(`Este item possui ${actualQuantity} unidades restantes.`);
        return;
      } else {
        oldQuantity = item[findIndex].quantity;
      }
      item.splice(findIndex, 1);
    }

    setCart([
      ...item,
      {
        ...data,
        quantity: actualQuantity + oldQuantity,
      },
    ]);

    history.push({ pathname: "/cart" });
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.details}>
        <div>
          <Link to="/">Voltar</Link>
          <img src={data?.image} alt={data?.description} />
        </div>

        <div className={styles.description}>
          <strong>{data?.description}</strong>

          {data?.promotion && data?.promotion.kind === "buy-x-take-y" && (
            <p>
              Leve <span>{data?.promotion?.value}</span> e pague{" "}
              <span>{data?.promotion?.base}</span>
            </p>
          )}

          {data?.offer ? (
            <p>
              De R${" "}
              <s>
                <span>{ConvertCurrency(data?.price)}</span>
              </s>{" "}
              por R$ <span>{ConvertCurrency(data?.offer)}</span>
            </p>
          ) : (
            <p>
              R$ <span>{ConvertCurrency(data?.price)}</span>
            </p>
          )}

          {data?.stock ? (
            <>
              <label>Quantidade:</label>
              <QuantityButton
                removeQuantity={removeQuantity}
                addQuantity={addQuantity}
                quantity={quantity}
                stock={data?.stock}
              />

              <button
                type="button"
                disabled={!data?.stock}
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
