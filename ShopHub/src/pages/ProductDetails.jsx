import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Pass the id parameter to the function
    const foundProduct = getProductById(id);
    
    if (!foundProduct) {
      navigate('/');
    } else {
      setProduct(foundProduct);
      setLoading(false);
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="progress-loading">
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <p>Fetching product details...</p>
      </div>
    );
  }

  return (
    <div className='page'>
      <div className='container'>
        <div className="product-detail">
          <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-content">
            <h1 className='product-detail-name'>{product.name}</h1>
            <p className='product-detail-price'>${product.price}</p>
            <p className='product-detail-description'>{product.description}</p>
            <button className='btn btn-primary'>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;