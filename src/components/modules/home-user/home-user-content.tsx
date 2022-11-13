import classNames from "classnames";
import * as React from "react";
import { css } from "../../../styles/style";
import Text from "../../elements/text";
interface Props {}

export default function HomeUserContent(props: Props) {
  return (
    <div className={styles.flexOne()}>
      <div className={classNames(styles.flexOne(), styles.center())}>
        <Text className={styles.titleText()}>Products</Text>
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
};
