import { Item } from "../../../api-hooks/item/item.model";
import { css } from "../../../styles/style";
import * as React from "react";
import { useAppDispatch } from "../../../redux/store";
import Text from "../../elements/text";
import Button from "../../elements/button";
import { adjustItemStock } from "../../../redux/reducers/itemSlice";
import { toast } from "react-toastify";

interface Props {
  stock: Item;
}

export default function StockCard(props: Props) {
  const { stock } = props;
  const [number, setNumber] = React.useState<number>(stock.stock);
  const dispatch = useAppDispatch();

  const onHandleClickAdd = React.useCallback(() => {
    setNumber(number + 1);
  }, [number]);

  const onHandleClickSubtract = React.useCallback(() => {
    setNumber(number - 1);
  }, [number]);

  const onClickUpdate = React.useCallback(() => {
    dispatch(
      adjustItemStock({
        ...stock,
        stock: number,
      })
    );
    toast.success("Adjust Stock Success");
  }, [dispatch, number, stock]);

  return (
    <tr>
      <td className={styles.tdStyle()}>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <div style={{ width: 200, height: 200 }}>
            <img
              src={stock.image}
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
                {stock.title}
              </div>
              <div className={styles.descriptionText()}>
                {stock.description}
              </div>
            </div>
            <div className={styles.tagStyle()}>
              <Text className={styles.tagTextStyle()}>{stock.category}</Text>
            </div>
          </div>
        </div>
      </td>
      <td className={styles.tdStyle()}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button buttonType={"danger"} onClick={onHandleClickSubtract}>
            -
          </Button>
          <div className={styles.textPadding()}>
            <Text>{number}</Text>
          </div>
          <Button buttonType={"danger"} onClick={onHandleClickAdd}>
            +
          </Button>
        </div>
      </td>
      <td className={styles.tdStyle()}>
        <Button buttonType={"primary"} onClick={onClickUpdate}>
          Update
        </Button>
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
