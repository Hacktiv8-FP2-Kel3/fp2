import * as React from 'react';
import Header from '../components/modules/header/header';
import Product from '../components/product/product';
import { connect } from 'react-redux';
export const HOME_PAGE_ROUTE = '/';

export function HomePage() {
  return (
    <>
      <Product />
      <Header />
    </>
  );
}

const mapStateToProps = (state: { shop: { Product: any } }) => {
  return {
    Product: state.shop.Product,
  };
};

export default connect(mapStateToProps)(Product);
