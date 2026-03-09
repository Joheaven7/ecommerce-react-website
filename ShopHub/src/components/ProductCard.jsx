import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'


const ProductCard = ({product}) => {
  const {addToCart, cartItems} = useCart();
  const productInCart = cartItems.find((item) => item.id === product.id);
  const productQuantityLabel = productInCart 
  ? `${productInCart.quantity}`
  : "";
  return (
    <div className='product-card' key={product.id}>
      <img src={product.image} alt="Product Picture" className='product-card-image' />
      <div className="product-card-content">
        <h3 className='product-card-name'>{product.name}</h3>
        <p className='product-card-name'>${product.price}</p>
        <div className='product-card-actions'>
          <Link className='btn btn-secondary' to={`/product/${product.id}`}>View Deitals</Link>
          <button className='btn btn-primary' 
            onClick={() => addToCart(product.id)}>
            Add to Cart {productQuantityLabel}
          </button>
        </div>
     </div>
    </div>
  )
}

export default ProductCard