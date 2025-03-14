import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, Post } from '../services/forumApi';
import '../styles/Forum.scss';

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err: unknown) {
        console.error(err);
        setError('Error fetching forum posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading forum posts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="forum-container">
      <h1>Vintage Forum</h1>
      <Link className="new-post-link" to="/forum/new">
        Create New Post
      </Link>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/forum/${post.id}`}>
              <h2>{post.title}</h2>
              <p>Posted on: {post.date}</p>
              {post.user && <p>Author: {post.user.name}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forum;
