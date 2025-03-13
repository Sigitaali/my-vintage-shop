import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';
import '../styles/CartLink.scss';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/clothes">Clothes</Link>
      <Link to="/shoes">Shoes</Link>
      <Link to="/accessories">Accessories</Link>
      <Link to="/perfume">Perfume</Link>
      <Link to="/forum">Vintage Forum</Link>
      <Link className="cart-link" to="/cart">
        <img src="/images/cart-icon.png" alt="Cart Icon" className="cart-icon" />
        Cart
      </Link>
    </nav>
  );
};

export default Navbar;