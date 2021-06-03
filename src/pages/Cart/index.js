import { ListContext } from "../../store/providers/ListProvider";
import { useContext, useEffect, useState } from "react";
import ConvertCurrency from "../../utils/ConvertCurrency.js";

import Header from "../../components/Header";
import styles from "./styles.module.scss";

export default function Cart() {
  const [cart, setCart] = useContext(ListContext);
  const [products, setProducts] = useState([]);

  function removeItem(indexItem) {
    let quantity = cart[indexItem].quantity;
    let data = [...cart];

    if (quantity > 1) {
      data.map((item, index) => {
        if (index === indexItem) item.quantity = quantity - 1;
        return true;
      });
    } else {
      data.splice(indexItem, 1);
    }

    setCart(data);
  }

  function addItem(indexItem) {
    let quantity = cart[indexItem].quantity;
    let data = [...cart];

    data.map((item, index) => {
      if (index === indexItem) {
        if (item.quantity < item.stock) {
          item.quantity = quantity + 1;
        } else {
          alert(
            `Este item possui apenas ${item.stock} unidades disponíveis em stock!`
          );
        }
      }
      return true;
    });

    setCart(data);
  }

  function handleCheckout() {
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
            {products.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.description} />
                  </td>
                  <td>{item.description}</td>
                  <td>
                    <div>
                      <button
                        onClick={() => {
                          removeItem(index);
                        }}
                      >
                        -
                      </button>
                      <input type="text" value={item?.quantity} disabled />
                      <button
                        onClick={() => {
                          addItem(index);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
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
