import useGetSales from "../api-hooks/sales/sales.query";
import Header from "../components/modules/header/header";
import SalesContent from "../components/modules/sales/sales";
import { styled } from "../styles/style";

export const SALES_PAGE_ROUTE = "/sales";
export default function SalesPage() {
  const { sales } = useGetSales();

  return (
    <>
      <Header />
      <Content>
        <SalesContent sales={sales} />
      </Content>
    </>
  );
}

const Content = styled("div", {
  padding: 20,
  display: "flex",
});
