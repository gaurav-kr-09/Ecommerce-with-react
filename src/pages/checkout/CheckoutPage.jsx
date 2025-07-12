import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';
import { OrderSummary } from './OrderSummary';

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setdeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentsummary] = useState([null]);

  useEffect(() => {
    const fetchCheckoutdata = async() => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');  
      setdeliveryOptions(response.data);
    };
    fetchCheckoutdata();
  }, []);

  useEffect(() => {
    const loadPaymentSummary = async () => {
      const response = await axios.get('/api/payment-summary');
      setPaymentsummary(response.data);
    };
    loadPaymentSummary();
  }, [cart])

  return (
    <>
      <title>Checkout</title>
      <link rel="shortcut icon" href="cart-favicon.png" type="image/x-icon" />
      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
          <PaymentSummary paymentSummary={paymentSummary} loadcart={loadCart} />
        </div>
      </div>
    </>
  );
}