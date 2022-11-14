import classNames from "classnames";
import * as React from "react";
import useGetItems, { useGetCarts } from "../../../api-hooks/item/item.query";
import { css } from "../../../styles/style";
import Text from "../../elements/text";
import EmptyView from "../../../assets/empty-view.jpeg";
import CartCard from "./cart-card";
import Button from "../../elements/button";
import { useAppDispatch } from "../../../redux/store";
import salesSlice, { adjustSoldItem } from "../../../redux/reducers/salesSlice";
import { removeAllCarts, removeCarts } from "../../../redux/reducers/cartSlice";
import { useNavigate } from "react-router-dom";
import { substractItems } from "../../../redux/reducers/itemSlice";
import { toast } from "react-toastify";

export default function Cart() {
  const { carts } = useGetCarts();
  const { items } = useGetItems();
  const navigate = useNavigate();
  const totalPrice = carts.reduce((prev, cur) => {
    return prev + cur.price * cur.quantity;
  }, 0);

  let isNotValid = false;
  carts.forEach((cart) => {
    const item = items.find((item) => item.id === cart.id);
    if (item?.stock! < cart.quantity) {
      isNotValid = true;
    }
  });

  const dispatch = useAppDispatch();
  const onHandleClickCheckout = React.useCallback(() => {
    dispatch(adjustSoldItem(carts));
    dispatch(substractItems(carts));
    dispatch(removeAllCarts());
    toast.success("Berhasil melakukan pembelian");
    navigate("/");
  }, [carts, dispatch, navigate]);

  return (
    <div className={styles.flexOne()} style={{ flexDirection: "column" }}>
      <div
        className={classNames(styles.flexOne(), styles.center(), styles.mb40())}
      >
        <Text className={styles.titleText()}>My Carts</Text>
      </div>
      {carts?.length > 0 ? (
        <>
          <table className={styles.tableStyle()}>
            <th className={styles.tdStyle()}>Product Image</th>
            <th className={styles.tdStyle()}>Product Name</th>
            <th className={styles.tdStyle()}>Price</th>
            <th className={styles.tdStyle()}>Quantity</th>
            <th className={styles.tdStyle()}>Total Price</th>
            {carts.map((cart) => (
              <CartCard key={cart.id} cart={cart} items={items} />
            ))}
          </table>
          <div className={styles.totalContainer()}>
            <Text className={styles.titleText()}>{`Total $ ${totalPrice.toFixed(
              2
            )}`}</Text>
            <Button
              className={styles.buttonContainer()}
              disabled={isNotValid}
              onClick={onHandleClickCheckout}
            >{`Checkout`}</Button>
          </div>
        </>
      ) : (
        <div className={styles.emptyContainer()}>
          <img
            src={EmptyView}
            alt="empty"
            className={styles.emptyImageStyle()}
          />
          {"Anda belum memilih item"}
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
