import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Home.scss';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Navbar />

      <h1>Welcome to Our Vintage Shop</h1>
      <p className="home-subtitle">Find timeless pieces from different eras</p>

      <div className="categories">
        <div className="category-card">
          <Link to="/clothes">
            <img src="/images/vintage-clothes.jpg" alt="Vintage Clothes" />
            <h2>Vintage Clothes</h2>
          </Link>
        </div>

        <div className="category-card">
          <Link to="/shoes">
            <img src="/images/vintage-shoes.jpeg" alt="Vintage Shoes" />
            <h2>Vintage Shoes</h2>
          </Link>
        </div>

        <div className="category-card">
          <Link to="/accessories">
            <img src="/images/vintage-accessories.jpeg" alt="Vintage Accessories" />
            <h2>Vintage Accessories</h2>
          </Link>
        </div>

        <div className="category-card">
          <Link to="/perfume">
            <img src="/images/vintage-parfum.webp" alt="Vintage Perfume" />
            <h2>Vintage Perfume</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

