import { ListContext } from "../../store/providers/ListProvider";
import { useContext, useEffect, useState } from "react";
import ConvertCurrency from "../../utils/ConvertCurrency.js";

import Header from "../../components/Header";
import styles from "./styles.module.scss";

export default function Cart() {
  const [cart, setCart] = useContext(ListContext);
  const [products, setProducts] = useState([]);

  function handleCheckout() {
    console.log(cart);
    let totalPrice = 0;

    let newCart = cart.map((item) => {
      let total = 0;

      if (item.offer) {
        if (item.promotion) {
          total =
            Math.floor(item.quantity / item.promotion.value) *
            item.promotion.base *
            item.offer;
          total += (item.quantity % item.promotion.value) * item.offer;
        } else {
          total = item.quantity * item.offer;
        }
      } else if (item.promotion) {
        total =
          Math.floor(item.quantity / item.promotion.value) *
          item.promotion.base *
          item.price;
        total += (item.quantity % item.promotion.value) * item.price;
      } else {
        total = item.quantity * item.price;
      }

      totalPrice += total;

      return {
        ...item,
        total,
      };
    });

    setProducts(newCart);
  }

  useEffect(() => {
    handleCheckout();
  }, [cart]);

  return (
    <div className={styles.container}>
      <Header />

      <div>
        <table className={styles.products}>
          <thead>
            <tr>
              <th></th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Total produto</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => {
              return (
                <tr>
                  <td>
                    <img src={item.image} alt={item.description} />
                  </td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>R$ {ConvertCurrency(item.total)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
