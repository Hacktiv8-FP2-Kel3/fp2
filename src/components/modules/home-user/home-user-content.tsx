import classNames from "classnames";
import * as React from "react";
import useGetItems, { useGetCarts } from "../../../api-hooks/item/item.query";
import { css } from "../../../styles/style";
import Text from "../../elements/text";
import { CardProduct } from "../product/card-product";
import Loader from "react-spinners/PulseLoader";
interface Props {}

export default function HomeUserContent(props: Props) {
  const { items, isLoading } = useGetItems();

  return (
    <div className={styles.flexOne()} style={{ flexDirection: "column" }}>
      <div
        className={classNames(styles.flexOne(), styles.center(), styles.mb40())}
      >
        <Text className={styles.titleText()}>Products</Text>
      </div>
      {isLoading ? (
        <div className={styles.loaderContainer()}>
          <Loader size={20} color={"#03174C"} />
        </div>
      ) : (
        <div className={classNames(styles.flexWrapOne())}>
          {items.map((item, idx) => (
            <React.Fragment key={item.id}>
              {item.stock > 0 && (
                <div
                  className={styles.cardSpace()}
                  style={{ paddingRight: idx % 4 !== 3 ? 20 : 0 }}
                >
                  <CardProduct item={item} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
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
  cardSpace: css({
    width: "25%",
    marginBottom: 50,
  }),
  loaderContainer: css({
    flex: 1,
    marginTop: "30vh",
    display: "flex",
    justifyContent: "center",
  }),
};
