import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { OrderGrid } from './OrderGrid';
import './Orderspage.css';

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    }
    fetchOrderData();      
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="shortcut icon" href="orders-favicon.png" type="image/x-icon" />
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrderGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  )
}