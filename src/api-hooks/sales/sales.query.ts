import * as React from "react";
import { useSelector } from "react-redux";
import { setSales } from "../../redux/reducers/salesSlice";
import { ListReducers, useAppDispatch } from "../../redux/store";

export default function useGetSales() {
  const { sales } = useSelector((state: ListReducers) => state.sale);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const localStorageValue = localStorage.getItem("sales");
    if (!!localStorage) {
      dispatch(setSales(JSON.parse(localStorageValue!)));
    }
  }, [dispatch]);

  return { sales };
}
