import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createUser, User } from '../services/api';
import '../styles/NewUser.scss';

const NewUser: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newUser: Omit<User, 'id'> = { name, email, address };
      const createdUser = await createUser(newUser);
      navigate(`/users/${createdUser.id}`);
    } catch (err: unknown) {
      console.error(err);
      alert('Error creating user.');
    }
  };

  return (
    <div className="new-user-container">
      <Navbar />
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Create User</button>
      </form>
      <Link to="/users">Back to Users List</Link>
    </div>
  );
};

export default NewUser;
