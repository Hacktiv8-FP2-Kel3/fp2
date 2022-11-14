import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../components/modules/header/header";
import ProductDetail from "../components/modules/product/product-detail";
import { ListReducers } from "../redux/store";

export const PRODUCT_PAGE_ROUTE = "/product/:id";

export default function ProductPage() {
  const { id } = useParams();
  const { items } = useSelector((state: ListReducers) => state.item);
  const data = items.find((item) => item.id.toString() === id);
  return (
    <>
      <Header />
      <ProductDetail item={data!} />
    </>
  );
}
