import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { fetchProductsByCategory, Product } from '../services/api';
import '../styles/Category.scss';

const Accessories: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchProductsByCategory(2)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch vintage accessories.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading vintage accessories...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="category-container">
        <h1>Vintage Accessories</h1>
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

export default Accessories;