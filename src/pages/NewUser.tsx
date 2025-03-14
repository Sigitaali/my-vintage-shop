import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NewUserForm from '../components/NewUserForm';
import { createUser, User } from '../services/api';
import '../styles/NewUser.scss';

const NewUser: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newUser: Omit<User, 'id'> = { name, email, address };
      const createdUser = await createUser(newUser);
      navigate(`/profile/${createdUser.id}`);
    } catch (err: unknown) {
      console.error(err);
      setError('Registration failed.');
    }
  };

  return (
    <div className="new-user-container">
      <h1>Register</h1>
      <NewUserForm
        name={name}
        email={email}
        address={address}
        onNameChange={setName}
        onEmailChange={setEmail}
        onAddressChange={setAddress}
        onSubmit={handleSubmit}
      />
      {error && <p className="error">{error}</p>}
      <p>
        Already have an account? <Link to="/login">Login Here</Link>
      </p>
    </div>
  );
};

export default NewUser;
