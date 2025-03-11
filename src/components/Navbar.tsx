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
    </nav>
  );
};

export default Navbar;