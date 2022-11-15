import { css } from "../../../styles/style";
import Text from "../../elements/text";
import { Sales } from "../../../api-hooks/sales/sales.model";

interface Props {
  sale: Sales;
}

export default function SalesCard(props: Props) {
  const { sale } = props;

  return (
    <tr>
      <td className={styles.tdStyle()}>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <div style={{ width: 200, height: 200 }}>
            <img
              src={sale.image}
              className={styles.imageStyle()}
              alt="product"
            />
          </div>
          <div
            style={{
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div>
              <div
                className={styles.titleText()}
                style={{ marginTop: 20, marginLeft: 20 }}
              >
                {sale.title}
              </div>
              <div className={styles.descriptionText()}>{sale.description}</div>
            </div>
            <div className={styles.tagStyle()}>
              <Text className={styles.tagTextStyle()}>{sale.category}</Text>
            </div>
          </div>
        </div>
      </td>
      <td className={styles.tdStyle()} style={{ textAlign: "center" }}>
        <Text>{sale.price}</Text>
      </td>
      <td className={styles.tdStyle()} style={{ textAlign: "center" }}>
        <Text>{sale.soldQuantity}</Text>
      </td>
      <td className={styles.tdStyle()} style={{ textAlign: "center" }}>
        {` $ ${(sale.soldQuantity * sale.price).toFixed(2)}`}
      </td>
    </tr>
  );
}
const styles = {
  tdStyle: css({
    border: "1px solid",
    padding: 10,
    // textAlign: "center",
  }),
  imageStyle: css({
    height: 200,
    width: 200,
    borderRadius: 8,
    borderWidth: "1px solid black",
  }),
  buttonStyle: css({
    backgroundColor: "transparent",
    borderRadius: 8,
    border: "1px solid black",
  }),
  textPadding: css({
    paddingLeft: 16,
    paddingRight: 16,
    border: "1px solid black",
    borderRadius: 4,
    marginRight: 4,
    alignItems: "center",
    display: "flex",
    marginLeft: 4,
  }),
  errorMessage: css({
    display: "flex",
    alignItems: "center",
    marginLeft: 10,
    color: "red",
  }),
  titleText: css({
    fontWeight: "bold",
    fontSize: 24,
  }),
  descriptionText: css({
    marginTop: 12,
    marginLeft: 20,
    color: "$gray1",
  }),
  tagStyle: css({
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
  }),
  tagTextStyle: css({
    textTransform: "capitalize",
    color: "$white0",
    backgroundColor: "$gray1",
    width: 140,
    padding: 8,
    borderRadius: 8,
  }),
};
