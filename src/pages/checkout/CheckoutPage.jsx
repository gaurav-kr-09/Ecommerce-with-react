import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';
import { OrderSummary } from './OrderSummary';

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setdeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentsummary] = useState([null]);

  useEffect(() => {
    const fetchCheckoutdata = async() => {

      let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');  
      setdeliveryOptions(response.data);
  
      response = await axios.get('/api/payment-summary');
      setPaymentsummary(response.data);
    };

    fetchCheckoutdata();
  }, []);

  return (
    <>
      <title>Checkout</title>
      <link rel="shortcut icon" href="cart-favicon.png" type="image/x-icon" />
      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}