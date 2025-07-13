import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isquanityUpdated, setIsQuantityUpdated] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateQuantity = async () => {
    if (isquanityUpdated) {
      if (quantity <= 0) {
        deleteCartItem();
      } else {
        await axios.put(`/api/cart-items/${cartItem.productId}`,{
          quantity: Number(quantity),
        })
      };
      await loadCart();
      setIsQuantityUpdated(false);
    } else {
      setIsQuantityUpdated(true);
    }
  }

  const updateQuantityInput = (event) => {
    setQuantity(event.target.value);
  }

  function handleKeyboard(event) {
    const pressedKey = event.key;
    if(pressedKey === 'Enter'){
      updateQuantity();
    }else if (pressedKey === 'Escape'){
      setQuantity(cartItem.quantity);
      setIsQuantityUpdated(false);
    }
  }

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isquanityUpdated ? 
            <input type="number" min={0} 
            className="quantity-input"
            value={quantity} 
            onChange={updateQuantityInput} 
            onKeyDown={handleKeyboard} /> :
              <span className="quantity-label">
                {cartItem.quantity}</span>
            }
          </span>
          <span className="update-quantity-link link-primary" onClick={updateQuantity}>
            {isquanityUpdated ? 'Save' : 'Update'}
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  )
}