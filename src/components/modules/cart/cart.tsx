import * as React from "react";
import { useGetCarts } from "../../../api-hooks/item/item.query";

export default function Cart() {
  const { carts } = useGetCarts();
  console.log(carts);
  return <></>;
}
