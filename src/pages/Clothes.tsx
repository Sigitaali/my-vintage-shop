import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { fetchProductsByCategory, Product } from '../services/api';
import '../styles/Category.scss';

const Clothes: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

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
              <img
                src={product.image || '/images/default-product.jpg'}
                alt={product.title}
              />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clothes;