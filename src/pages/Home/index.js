import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./styles.module.scss";

import Header from "../../components/Header";
import Card from "../../components/Card";

import { useDelivery } from "../../store/providers/DeliveryProvider";

const images = {
  PROMOTION:
    "https://merconnect.s3.amazonaws.com/uploads/offer_badges/070f34284e7603b06b885e0addf49cac8436c176.png",
};

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setDelivery } = useDelivery();

  async function requestData() {
    try {
      const response = await axios.get(
        "https://run.mocky.io/v3/c7c87764-f0ae-4723-906d-39d16728525a"
      );
      setData(response.data.items);
      setDelivery(response.data.delivery_tax);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    requestData();
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className={styles.container}>
        <Header />

        <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
          Carregando...
        </h1>
      </div>
    );
  else
    return (
      <div className={styles.container}>
        <Header />

        <div className={styles.dataWrapper}>
          {data.map((item) => {
            return (
              <Card
                key={item.id}
                data={{ ...item, promotionImage: images.PROMOTION }}
              />
            );
          })}
        </div>
      </div>
    );
}
