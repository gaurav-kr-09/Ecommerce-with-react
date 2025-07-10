import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './productsGrid';

import './HomePage.css';

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  // useEffect(async () => {
  //   const response = axios.get('/api/products');
  //   setProducts(response.data);
  // }, []); //useeffect me inner function should not return a promise. it can only return nothing or a cleanup function.

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };

    getHomeData();
  }, []);

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="shortcut icon" href="home-favicon.png" type="image/x-icon" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}