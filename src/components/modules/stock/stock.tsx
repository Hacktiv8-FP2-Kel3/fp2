import classNames from "classnames";
import { Item } from "../../../api-hooks/item/item.model";
import { css } from "../../../styles/style";
import Text from "../../elements/text";
import StockCard from "./stock-card";

interface Props {
  stocks: Item[];
}

export default function Stock(props: Props) {
  const { stocks } = props;

  return (
    <div className={styles.flexOne()} style={{ flexDirection: "column" }}>
      <div
        className={classNames(styles.flexOne(), styles.center(), styles.mb40())}
      >
        <Text className={styles.titleText()}>Stocks</Text>
      </div>

      <table className={styles.tableStyle()}>
        <th className={styles.tdStyle()}>Product</th>
        <th className={styles.tdStyle()}>Stock</th>
        <th className={styles.tdStyle()}>Action</th>

        {stocks.map((stock) => (
          <StockCard key={stock.id} stock={stock} />
        ))}
      </table>
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
