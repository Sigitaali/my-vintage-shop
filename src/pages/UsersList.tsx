import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, User } from '../services/api';
import '../styles/UsersList.scss'; 

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        setUsers(userList);
        setFilteredUsers(userList);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery) ||
        user.address.toLowerCase().includes(lowerQuery)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  return (
    <div className="users-list-container">

      <h1>Users</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search users by name, email or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="create-user-container">
        <Link to="/register" className="create-user-link">
          Create User
        </Link>
      </div>

      <ul className="users-list">
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <Link to={`/profile/${user.id}`}>
              {user.name} ({user.email})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
