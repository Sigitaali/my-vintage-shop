import React, { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserById, updateUser } from '../services/api';
import '../styles/EditUser.scss';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserById(id!);
        setName(user.name);
        setEmail(user.email);
        setAddress(user.address);
      } catch (err: unknown) {
        console.error(err);
        setError('Error fetching user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(id!, { name, email, address });
      navigate(`/users/${id}`);
    } catch (err: unknown) {
      console.error(err);
      alert('Error updating user.');
    }
  };

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-user-container">
      <h1>Edit User</h1>
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
        <button type="submit">Update User</button>
      </form>
      <Link to={`/users/${id}`}>Back to User Details</Link>
    </div>
  );
};

export default EditUser;
