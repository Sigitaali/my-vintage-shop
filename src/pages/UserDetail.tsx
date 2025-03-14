import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserById, User } from '../services/api';
import '../styles/UserDetail.scss';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

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

  if (loading) return <div>Loading user details...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <div className="user-detail-container">
      <h1>{user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <div className="user-actions">
        <Link to={`/users/${user.id}/orders`}>View Orders</Link>
        <Link to={`/users/${user.id}/edit`}>Edit User</Link>
        <Link to={`/users/${user.id}/delete`}>Delete User</Link>
      </div>
      <Link to="/users">Back to Users List</Link>
    </div>
  );
};

export default UserDetail;
