import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { getCartItemsWithProducts, updateQuantity, removeFromCart } = useCart(); // Added removeFromCart
  const cartItems = getCartItemsWithProducts();
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const handleQuantityChange = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    updateQuantity(itemId, newQuantity);
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId); // Call removeFromCart function
  };

  if (cartItems.length === 0) {
    return (
      <div className='page'>
        <div className="container">
          <h1 className="page-title">Checkout</h1>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  function placeOrder(){
    alert("Successful Order!")
  }

  return (
    <div className='page'>
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className='checkout-section-title'>Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className='checkout-item-image'
                />
                <div className="checkout-item-details">
                  <h3 className="checkout-item-name">{item.name}</h3>
                  <p className="checkout-item-price">${item.price} each</p>
                </div>  
                <div className="checkout-item-controls">
                  <div className="quantity-controls">
                    <button 
                      className='quantity-btn'
                      onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                    >-</button>
                    <span className='quantity-value'>{item.quantity}</span>
                    <button 
                      className='quantity-btn'
                      onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                    >+</button>
                  </div>
                  <div className="checkout-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="btn btn-secondary btn-small"
                    onClick={() => handleRemove(item.id)} // Added onClick handler
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="checkout-summary">
            <h2 className='checkout-section-title'>Order Total</h2>
            <div className="checkout-total">
              <span className="checkout-total-label">Subtotal:</span>
              <span className="checkout-total-value">${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="checkout-total">
              <span className="checkout-total-label">Shipping:</span>
              <span className="checkout-total-value">Free</span>
            </div>
            <div className="checkout-total">
              <span className="checkout-total-label">Total:</span>
              <span className="checkout-total-value checkout-total-final">${calculateTotal().toFixed(2)}</span>
            </div>
            <button className="btn btn-primary btn-large btn-block" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;