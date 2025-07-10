import { HomePage } from "./pages/Home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";

import { Routes, Route } from "react-router";
import './App.css';
import { PageNotFound } from "./pages/PageNotFound";

import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchAppdata = async () => {
      const response = await axios.get('/api/cart-items?expand=product')
      setCart(response.data);
    };

    fetchAppdata();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
