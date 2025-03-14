import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createUser, User } from '../services/api';
import '../styles/Register.scss';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newUser: Omit<User, 'id'> = { name, email, address };
      const createdUser = await createUser(newUser);
      navigate(`/profile/${createdUser.id}`);
    } catch (err) {
      console.error(err);
      setError('Registration failed.');
    }
  };

  return (
    <div className="register-container">
      <Navbar />
      <h1>Register</h1>
      <form onSubmit={handleRegister} className="register-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login Here</Link>
      </p>
    </div>
  );
};

export default Register;
