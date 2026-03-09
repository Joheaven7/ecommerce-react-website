import React from 'react'
import { Link } from 'react-router-dom'


const ProductCard = ({product}) => {
  return (
    <div className='product-card' key={product.id}>
      <img src={product.image} alt="Product Picture" className='product-card-image' />
      <div className="product-card-content">
        <h3 className='product-card-name'>{product.name}</h3>
        <p className='product-card-name'>${product.price}</p>
        <div className='product-card-actions'>
          <Link className='btn btn-secondary' to={`/product/${product.id}`}>View Deitals</Link>
          <button className='btn btn-primary'>Add to Cart</button>
        </div>
     </div>
    </div>
  )
}

export default ProductCard