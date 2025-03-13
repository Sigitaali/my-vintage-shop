import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  date: string;
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const getPostById = async (id: number | string): Promise<Post> => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data;
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const response = await axios.post(`${API_URL}/posts`, post);
  return response.data;
};

export const updatePost = async (id: number | string, post: Partial<Post>): Promise<Post> => {
  const response = await axios.patch(`${API_URL}/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: number | string): Promise<void> => {
  await axios.delete(`${API_URL}/posts/${id}`);
};
