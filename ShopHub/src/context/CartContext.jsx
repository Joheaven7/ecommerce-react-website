/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";
import { getProductById } from "../data/products";

export const CartContext = createContext(null);

export default function CartProvider({children}) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(productId){
     const existing = cartItems.find((item) => item.id === productId);
     const product = getProductById(productId);

     if (existing) {
      const currentQuantity = existing.quantity;
      const updatedCartItems = cartItems.map((item) => 
        item.id === productId 
          ? {...item, quantity: currentQuantity + 1} 
          : item
      );
      setCartItems(updatedCartItems);
     } else {
       // Store product details directly in cart items
       setCartItems([...cartItems, {
         id: productId, 
         quantity: 1,
         name: product.name,
         price: product.price,
         image: product.image
       }]);
     }
  }

  // FIXED: This now returns items with product details merged
  function getCartItemsWithProducts() {
    return cartItems.map(item => {
      const product = getProductById(item.id);
      return {
        ...item,
        ...product,  // Merge all product details
        quantity: item.quantity // Keep the quantity from cart
      };
    }).filter(item => item.name); // Filter out items where product not found
  }

  // Add updateQuantity function for checkout
  function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId 
          ? {...item, quantity: newQuantity}
          : item
      ));
    }
  }

  // NEW: Add removeFromCart function
  function removeFromCart(productId) {
    setCartItems(cartItems.filter(item => item.id !== productId));
  }

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      getCartItemsWithProducts,
      updateQuantity,
      removeFromCart  // Added removeFromCart to the provider value
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}