import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchProductsByCategory, Product } from '../services/api';
import '../styles/Category.scss';

const Perfume: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchProductsByCategory(3)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch vintage perfumes.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading vintage perfumes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="category-container">
        <h1>Vintage Perfumes</h1>
        <div className="product-list">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <div className="product-card">
                <img
                  src={product.image || '/images/default-product.jpg'}
                  alt={product.title}
                />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Perfume;
