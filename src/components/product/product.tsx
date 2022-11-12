import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import {
  loadCurrentItem,
  addToCart,
} from '../../redux/shopping/shopping-actions';
import { css } from '@stitches/react';

const Product = ({}) => {
  const [data, setData] = useState<any[]>([]);
  const img = {
    width: 400,
  };

  
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://fakestoreapi.com/products?',
    }).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <>
      {data.map((product) => (
        <div key={product.id}>
          <div>
            <img style={img} src={product.image} />
          </div>
          <div>{product.title}</div>
        </div>
      ))}
    </>
  );
};

export default Product;
