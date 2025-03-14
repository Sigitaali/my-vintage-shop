import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getUserById, deleteUser, User } from '../services/api';
import '../styles/DeleteUser.scss';

const DeleteUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserById(id!);
        setUser(data);
      } catch (err: unknown) {
        console.error(err);
        setError('Error fetching user details.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteUser(id!);
      navigate('/users');
    } catch (err: unknown) {
      console.error(err);
      alert('Error deleting user.');
    }
  };

  if (loading) return <div>Loading user details...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <div className="delete-user-container">
      <Navbar />
      <h1>Delete User</h1>
      <p>Are you sure you want to delete {user.name}?</p>
      <button onClick={handleDelete}>Yes, Delete User</button>
      <Link to={`/users/${user.id}`}>Cancel</Link>
    </div>
  );
};

export default DeleteUser;
