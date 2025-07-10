import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";

import { Routes, Route } from "react-router";
import './App.css';
import { PageNotFound } from "./pages/PageNotFound";

import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('/api/cart-items?expand=product') //isme jo last me '?expand=product' add kiye hai usko query parameter kahte hai.
    //query parameter k help se hamlog apne request me additional info add kar sakte hai.
    
      .then((response) => {
        setCart(response.data);
      });
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
