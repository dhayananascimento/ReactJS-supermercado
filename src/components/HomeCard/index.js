import { useHistory } from "react-router-dom";

import ConvertCurrency from "../../utils/ConvertCurrency.js";
import styles from "./styles.module.scss";

const HomeCard = ({ data }) => {
  let history = useHistory();

  return (
    <div
      className={styles.container}
      onClick={() => {
        history.push({
          pathname: "/details",
          state: data,
        });
      }}
    >
      <img src={data.image} alt={data.description} />
      <strong>{data.description}</strong>

      {data?.offer ? (
        <div className={styles.offer}>
          <p>
            R$
            <s>{ConvertCurrency(data.price)}</s>
          </p>
          <p>
            R$ <span>{ConvertCurrency(data.offer)}</span>
          </p>
        </div>
      ) : (
        <p>
          R$ <span>{ConvertCurrency(data.price)}</span>
        </p>
      )}

      {data?.promotion && (
        <img
          className={styles.promotion}
          src={data.promotionImage}
          alt="Promoção"
        />
      )}
    </div>
  );
};

export default HomeCard;
