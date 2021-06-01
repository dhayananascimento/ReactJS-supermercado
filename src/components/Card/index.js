import ConvertCurrency from "../../utils/ConvertCurrency.js";
import styles from "./styles.module.scss";

const Card = ({ data }) => {
  return (
    <div className={styles.container}>
      <img src={data.image} alt={data.description} />
      <strong>{data.description}</strong>

      {data?.offer ? (
        <div className={styles.offer}>
          <s>
            R$ <span>{ConvertCurrency(data.price)}</span>
          </s>
          <p>
            R$ <span>{ConvertCurrency(data?.offer)}</span>
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

export default Card;
