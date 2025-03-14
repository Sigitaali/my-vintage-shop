import React from 'react';
import { Link } from 'react-router-dom';

const BootstrapCard: React.FC = () => {
  return (
    <div className="card" style={{ width: '10rem', margin: '1rem auto', height: '14rem' }}>
      <img 
        src="/images/levander.jpg" 
        className="card-img-top" 
        alt="Sample" 
        style={{ height: '80px', objectFit: 'cover' }} 
      />
      <div className="card-body" style={{ padding: '0.5rem' }}>
        <h5 className="card-title" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          Welcome to Our Vintage Shop
        </h5>
        <p className="card-text" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>
          Find timeless pieces from different eras
        </p>
        <Link to="/clothes" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}>
          Enjoy
        </Link>
      </div>
    </div>
  );
};

export default BootstrapCard;

