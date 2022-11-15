import * as React from "react";
import useGetItems from "../../../api-hooks/item/item.query";
import Stock from "../stock/stock";
interface Props {}

export default function HomeAdminContent(props: Props) {
  const { items, isLoading } = useGetItems();

  return (
    <>
      <Stock stocks={items} />
    </>
  );
}
