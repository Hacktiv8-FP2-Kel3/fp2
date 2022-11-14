import classNames from "classnames";
import * as React from "react";
import useGetItems from "../../../api-hooks/item/item.query";
import { css } from "../../../styles/style";
import Text from "../../elements/text";
import { CardProduct } from "../product/card-product";
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
      <div className={classNames(styles.flexWrapOne())}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={styles.cardSpace()}
            style={{ paddingRight: idx % 4 !== 3 ? 20 : 0 }}
          >
            <CardProduct item={item} />
          </div>
        ))}
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
  cardSpace: css({
    width: "25%",
    marginBottom: 50,
  }),
};
