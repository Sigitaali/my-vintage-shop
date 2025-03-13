import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createPost, Post } from '../services/forumApi';
import '../styles/NewForumPost.scss';

const NewForumPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newPost: Omit<Post, 'id'> = {
        title,
        content,
        userId: 1, 
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
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Post</button>
      </form>
      <Link to="/forum">Back to Forum</Link>
    </div>
  );
};

export default NewForumPost;
