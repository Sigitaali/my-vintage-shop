import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { searchPosts, Post } from '../services/forumApi';
import '../styles/GlobalSearch.scss';

const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await searchPosts(query);
      setPosts(result);
    } catch (err) {
      console.error(err);
      setError('Error searching posts.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="global-search-container">
      <h1>Global Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search posts by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
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
      <Link to="/forum">Back to Forum</Link>
    </div>
  );
};

export default GlobalSearch;
