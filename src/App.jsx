import { HomePage } from "./pages/Home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/Tracking/TrackingPage";

import { Routes, Route } from "react-router";
import './App.css';
import { PageNotFound } from "./pages/PageError/PageNotFound";

import axios from "axios";
import { useState, useEffect } from "react";

window.axios = axios;

function App() {
  const [cart, setCart] = useState([]);


  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product')
    setCart(response.data);
  };


  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} loadCart={loadCart} />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<PageNotFound cart={cart} />} />
    </Routes>
  )
}

export default App
