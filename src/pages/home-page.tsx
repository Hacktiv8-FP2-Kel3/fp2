import * as React from "react";
import Header from "../components/modules/header/header";

export const HOME_PAGE_ROUTE = "/";

export function HomePage() {
  return (
    <>
      <Header />
    </>
  );
}
<<<<<<< Updated upstream
=======


const mapStateToProps = (state: { shop: { Product: any } }) => {
  return {
    Product: state.shop.Product,
  };
};

export default connect(mapStateToProps)(Product);
>>>>>>> Stashed changes
