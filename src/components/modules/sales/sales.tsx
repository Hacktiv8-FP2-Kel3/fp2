import classNames from "classnames";
import { css } from "../../../styles/style";
import Text from "../../elements/text";
import { Sales } from "../../../api-hooks/sales/sales.model";
import SalesCard from "./sales-card";

interface Props {
  sales: Sales[];
}

export default function SalesContent(props: Props) {
  const { sales } = props;
  const totalPrice =
    sales?.reduce((prev, cur) => {
      return prev + cur.price * cur.soldQuantity;
    }, 0) || 0;

  return (
    <div className={styles.flexOne()} style={{ flexDirection: "column" }}>
      <div
        className={classNames(styles.flexOne(), styles.center(), styles.mb40())}
      >
        <Text className={styles.titleText()}>Sales</Text>
      </div>
      <table className={styles.tableStyle()}>
        <th className={styles.tdStyle()}>Product</th>
        <th className={styles.tdStyle()}>Price</th>
        <th className={styles.tdStyle()}>Sold Quantity</th>
        <th className={styles.tdStyle()}>Total Price</th>
        {sales.map((sale) => (
          <SalesCard key={sale.id} sale={sale} />
        ))}
      </table>
      <div className={styles.totalContainer()}>
        <Text
          className={styles.titleText()}
        >{`Total Revenue $ ${totalPrice.toFixed(2)}`}</Text>
      </div>
    </div>
  );
}

const styles = {
  titleText: css({
    fontWeight: "bold",
    fontSize: 30,
  }),
  flexOne: css({
    display: "flex",
    flex: 1,
  }),
  center: css({
    justifyContent: "center",
  }),
  flexWrapOne: css({
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
  }),
  mb40: css({
    marginBottom: 40,
  }),
  emptyImageStyle: css({
    width: "25%",
    height: "100%",
    marginBottom: 20,
  }),
  emptyContainer: css({
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  }),
  tableStyle: css({
    border: "1px solid",
    borderCollapse: "collapse",
  }),
  tdStyle: css({
    border: "1px solid",
    padding: 10,
  }),
  totalContainer: css({
    marginTop: 20,
    display: "flex",
    justifyContent: "right",
    flexDirection: "row",
    alignItems: "center",
  }),
  buttonContainer: css({
    marginLeft: 20,
  }),
};
