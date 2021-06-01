import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/Header";
import Card from "../../components/Card";
import styles from "./styles.module.scss";

const images = {
  PROMOTION:
    "https://merconnect.s3.amazonaws.com/uploads/offer_badges/070f34284e7603b06b885e0addf49cac8436c176.png",
};

export default function Home() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  async function requestData() {
    try {
      const response = await axios.get(
        "https://run.mocky.io/v3/c7c87764-f0ae-4723-906d-39d16728525a"
      );
      console.log(response);
      setData(response.data);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    requestData();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className={styles.dataWrapper}>
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className={styles.dataWrapper}>
        {data?.items.map((item) => {
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
