import useGetSales from "../api-hooks/sales/sales.query";

export const SALES_PAGE_ROUTE = "/sales";
export default function SalesPage() {
  const { sales } = useGetSales();

  return <></>;
}
