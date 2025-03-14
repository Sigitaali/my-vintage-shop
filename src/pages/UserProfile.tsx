import React, { useEffect, useState, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getUserById, updateUser, User } from '../services/api';
import '../styles/UserProfile.scss';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id!);
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setAddress(data.address);
      } catch (err) {
        console.error(err);
        setError('Error fetching user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(id!, { name, email, address });
      setUser(updatedUser);
      setEditMode(false);
    } catch (err) {
      console.error(err);
      setError('Error updating user profile.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile-container">
      <Navbar />
      <h1>User Profile</h1>
      {editMode ? (
        <form onSubmit={handleUpdate} className="profile-form">
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
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
      <Link to="/users">Back to Users List</Link>
      <Link to={`/users/${user.id}/orders`}>View Orders</Link>
    </div>
  );
};

export default UserProfile;
