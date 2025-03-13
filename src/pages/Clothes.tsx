import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchProductsByCategory, Product } from '../services/api';
import { CartContext } from '../context/CartContext';
import { addToCart } from '../utils/cartUtils';
import '../styles/Category.scss';

const Clothes: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    fetchProductsByCategory(1)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch vintage clothing.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading vintage clothing...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="category-container">
        <h1>Vintage Clothing</h1>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image || '/images/default-product.jpg'}
                  alt={product.title}
                />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </Link>
              <button onClick={(e) => addToCart(dispatch, product, e)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Clothes;