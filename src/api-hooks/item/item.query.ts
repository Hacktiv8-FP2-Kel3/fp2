import * as React from "react";
import { useSelector } from "react-redux";
import { setCarts } from "../../redux/reducers/cartSlice";
import { getProducts, setItems } from "../../redux/reducers/itemSlice";
import { ListReducers, useAppDispatch } from "../../redux/store";

export default function useGetItems() {
  const { items, isLoading } = useSelector((state: ListReducers) => state.item);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const localStorageValue = localStorage.getItem("items");
    if (!!localStorageValue) {
      dispatch(setItems(JSON.parse(localStorageValue!)));
    } else {
      dispatch(getProducts());
    }
  }, [dispatch]);

  return { items, isLoading };
}

export function useGetCarts() {
  const { carts } = useSelector((state: ListReducers) => state.cart);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const localStorageValue = localStorage.getItem("carts");
    if (!!localStorageValue) {
      dispatch(setCarts(JSON.parse(localStorageValue!)));
    }
  }, [dispatch]);

  return { carts };
}
