import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, User } from '../services/api';
import '../styles/Users.scss';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err: unknown) {
        console.error(err);
        setError('Error fetching users.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="users-container">
      <h1>Users</h1>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
      <Link className="new-user-link" to="/users/new">
        Create New User
      </Link>
    </div>
  );
};

export default Users;
