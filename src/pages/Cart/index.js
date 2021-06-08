import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

import ConvertCurrency from "../../utils/ConvertCurrency.js";
import { useCart } from "../../store/providers/CartProvider";
import { useDelivery } from "../../store/providers/DeliveryProvider";

import Header from "../../components/Header";
import CartCard from "../../components/CartCard/index.js";
import Button from "../../components/Button/index.js";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const { cart, setCart } = useCart();
  const { delivery } = useDelivery();

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
    setTotal(totalPrice);
  }

  useEffect(() => {
    handleCheckout();
  }, [cart]);

  if (!cart.length) {
    return (
      <div className={styles.container}>
        <Header />

        <div className={styles.empty}>
          <h1>Carrinho não possui itens!</h1>
          <Link to="/">Continuar navegando...</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.products}>
        <Link to="/">Voltar para página inicial</Link>

        <table className={styles.productsList}>
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
                <CartCard
                  key={item.id}
                  data={item}
                  index={index}
                  removeItem={removeItem}
                  addItem={addItem}
                />
              );
            })}
          </tbody>
        </table>

        <div className={styles.checkout}>
          <div>
            <p>Frete: R$ {ConvertCurrency(delivery)}</p>
            <p>Subtotal: R$ {ConvertCurrency(total)}</p>
            <p>Total: R$ {ConvertCurrency(total + delivery)}</p>
          </div>

          <Button
            onClick={() => {
              alert("Compra finalizada!");
            }}
          >
            Finalizar compra
          </Button>
        </div>
      </div>
    </div>
  );
}
