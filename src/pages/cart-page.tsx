import * as React from "react";
import Cart from "../components/modules/cart/cart";
import Header from "../components/modules/header/header";

export const CART_PAGE_ROUTE = "/cart";

export function CartPage() {
  return (
    <>
      <Header />
      <Cart />
    </>
  );
}
