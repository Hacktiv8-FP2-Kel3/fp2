import { Cart, Item } from "../../../api-hooks/item/item.model";
import { css } from "../../../styles/style";
import * as React from "react";
import NumberInput from "../../elements/number-input";
import { useSelector } from "react-redux";
import { ListReducers, useAppDispatch } from "../../../redux/store";
import Text from "../../elements/text";
import Button from "../../elements/button";
import {
  addCarts,
  adjQtyCarts,
  removeCarts,
} from "../../../redux/reducers/cartSlice";
import { toast } from "react-toastify";
import useGetItems from "../../../api-hooks/item/item.query";

interface Props {
  cart: Cart;
  items: Item[];
}

export default function CartCard(props: Props) {
  const { cart, items } = props;
  const data = items.find((item) => item.id === cart.id);
  const totalPrice = cart.quantity * cart.price;
  const dispatch = useAppDispatch();

  const onHandleClickAdd = React.useCallback(() => {
    if (data?.stock! < cart.quantity + 1) {
      toast.error("Stok tidak mencukupi");
    } else {
      dispatch(addCarts(data));
    }
  }, [cart.quantity, data, dispatch]);

  const onHandleClickSubtract = React.useCallback(() => {
    if (cart.quantity - 1 === 0) {
      dispatch(removeCarts(cart));
    } else {
      dispatch(
        adjQtyCarts({
          ...data,
          quantity: -1,
        })
      );
    }
  }, [cart, data, dispatch]);

  return (
    <tr>
      <td className={styles.tdStyle()}>
        <img src={cart.image} className={styles.imageStyle()} alt="product" />
      </td>
      <td className={styles.tdStyle()}>{cart.title}</td>
      <td className={styles.tdStyle()}>{`$ ${cart.price}`}</td>
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
            <Text>{cart.quantity}</Text>
          </div>
          <Button buttonType={"danger"} onClick={onHandleClickAdd}>
            +
          </Button>
          {data?.stock! < cart.quantity && (
            <div className={styles.errorMessage()}>
              <Text>{`Stok tidak mencukupi`}</Text>
            </div>
          )}
        </div>
      </td>
      <td className={styles.tdStyle()}>{`$ ${totalPrice.toFixed(2)}`}</td>
    </tr>
  );
}
const styles = {
  tdStyle: css({
    border: "1px solid",
    padding: 10,
    textAlign: "center",
  }),
  imageStyle: css({
    height: 200,
    width: "80%",
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
};
