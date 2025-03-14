import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/clothes">Clothes</Link>
      <Link to="/shoes">Shoes</Link>
      <Link to="/accessories">Accessories</Link>
      <Link to="/perfume">Perfume</Link>
      <Link to="/forum">Vintage Forum</Link>
      <Link to="/search-posts">Search Posts</Link>
      <Link to="/login" className="auth-link">Login</Link>
      <Link to="/register" className="auth-link">Register</Link>
      <Link to="/profile/1" className="auth-link">Profile</Link>
      <Link to="/cart" className="cart-link">
        <img src="/images/cart-icon.png" alt="Cart Icon" className="cart-icon" />
        Cart
      </Link>
      <Link to="/users" className="users-link">Users</Link>
    </nav>
  );
};

export default Navbar;
