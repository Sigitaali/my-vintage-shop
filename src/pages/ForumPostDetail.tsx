import React, { useEffect, useState, FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostById, updatePost, deletePost, Post } from '../services/forumApi';
import '../styles/ForumPostDetail.scss';

const ForumPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedContent, setEditedContent] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id!);
        setPost(data);
        setEditedTitle(data.title);
        setEditedContent(data.content);
      } catch (err: unknown) {
        console.error(err);
        setError('Error fetching post details.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!post) return;
    try {
      const updated = await updatePost(post.id, { title: editedTitle, content: editedContent });
      setPost(updated);
      setIsEditing(false);
    } catch (err: unknown) {
      console.error(err);
      alert('Error updating post.');
    }
  };

  const handleDelete = async () => {
    if (!post) return;
    try {
      await deletePost(post.id);
      navigate('/forum');
    } catch (err: unknown) {
      console.error(err);
      alert('Error deleting post.');
    }
  };

  if (loading) return <div>Loading post details...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="forum-post-detail-container">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="edit-post-form">
          <label>
            Title:
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Content:
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              required
            />
          </label>
          <button type="submit">Update Post</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="post-details">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p>Posted on: {post.date}</p>
          {post.user ? (
            <div className="post-author">
              <h3>Author Information</h3>
              <p>Name: {post.user.name}</p>
              <p>Email: {post.user.email}</p>
              <p>Address: {post.user.address}</p>
            </div>
          ) : (
            <p>Author information not available.</p>
          )}
          <div className="post-actions">
            <button onClick={() => setIsEditing(true)}>Edit Post</button>
            <button onClick={handleDelete}>Delete Post</button>
          </div>
        </div>
      )}
      <Link to="/forum">Back to Forum</Link>
    </div>
  );
};

export default ForumPostDetail;
