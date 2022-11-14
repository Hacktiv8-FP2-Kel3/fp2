import * as React from "react";
import Cart from "../components/modules/cart/cart";
import Header from "../components/modules/header/header";
import { styled } from "../styles/style";

export const CART_PAGE_ROUTE = "/cart";

export function CartPage() {
  return (
    <>
      <Header />
      <Content>
        <Cart />
      </Content>
    </>
  );
}

const Content = styled("div", {
  padding: 20,
  display: "flex",
});
