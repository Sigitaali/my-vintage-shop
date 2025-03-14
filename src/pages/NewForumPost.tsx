import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NewForumPostForm from '../components/NewForumPostForm';
import { createPost, Post } from '../services/forumApi';
import { getUsers, createUser, User } from '../services/api';
import '../styles/NewForumPost.scss';

const NewForumPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [useExistingUser, setUseExistingUser] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(1);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserAddress, setNewUserAddress] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    if (useExistingUser) {
      const fetchUsers = async () => {
        try {
          const userList = await getUsers();
          setUsers(userList);
          if (userList.length > 0) {
            setSelectedUserId(userList[0].id);
          }
        } catch (err: unknown) {
          console.error(err);
        }
      };
      fetchUsers();
    }
  }, [useExistingUser]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let userId: number;
      if (useExistingUser) {
        userId = selectedUserId;
      } else {
        const newUser: Omit<User, 'id'> = {
          name: newUserName,
          email: newUserEmail,
          address: newUserAddress
        };
        const createdUser = await createUser(newUser);
        userId = createdUser.id;
      }
      
      const newPost: Omit<Post, 'id' | 'user'> = {
        title,
        content,
        userId,
        date: new Date().toISOString().split('T')[0]
      };
      
      const created = await createPost(newPost);
      navigate(`/forum/${created.id}`);
    } catch (err: unknown) {
      console.error(err);
      alert('Error creating post.');
    }
  };

  return (
    <div className="new-forum-post-container">
      <Navbar />
      <h1>Create New Post</h1>
      <div className="user-selection">
        <label>
          <input
            type="radio"
            checked={useExistingUser}
            onChange={() => setUseExistingUser(true)}
          />
          Use Existing User
        </label>
        <label>
          <input
            type="radio"
            checked={!useExistingUser}
            onChange={() => setUseExistingUser(false)}
          />
          Create New User
        </label>
      </div>
      <NewForumPostForm
        title={title}
        content={content}
        useExistingUser={useExistingUser}
        selectedUserId={selectedUserId}
        users={users}
        newUserName={newUserName}
        newUserEmail={newUserEmail}
        newUserAddress={newUserAddress}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onUserChange={setSelectedUserId}
        onNewUserNameChange={setNewUserName}
        onNewUserEmailChange={setNewUserEmail}
        onNewUserAddressChange={setNewUserAddress}
        onSubmit={handleSubmit}
      />
      <Link to="/forum">Back to Forum</Link>
    </div>
  );
};

export default NewForumPost;
