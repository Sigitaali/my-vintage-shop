import axios from 'axios';
import { User } from './api';

const API_URL = 'http://localhost:3000';

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  date: string;
  user?: User;
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${API_URL}/posts?_expand=user`);
  return response.data;
};

export const getPostById = async (id: number | string): Promise<Post> => {
  const response = await axios.get(`${API_URL}/posts/${id}?_expand=user`);
  return response.data;
};

export const createPost = async (post: Omit<Post, 'id' | 'user'>): Promise<Post> => {
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

export const searchPosts = async (query: string): Promise<Post[]> => {
    const response = await axios.get(`${API_URL}/posts?q=${query}&_expand=user`);
    return response.data;
  };
  