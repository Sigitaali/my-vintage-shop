import axios from 'axios';

const API_URL = '/api';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  image?: string;
}

export interface Review {
  id?: string;
  productId: number;
  userId: number;
  rating: number;
  comment: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  date: string;
  items: OrderItem[];
}

export const getOrdersByUser = async (userId: number | string): Promise<Order[]> => {
  const response = await axios.get(`${API_URL}/orders?userId=${userId}`);
  return response.data;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProductById = async (id: number | string): Promise<Product> => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products?categoryId=${categoryId}`);
  return response.data;
};

export const getReviewsByProduct = async (productId: number | string): Promise<Review[]> => {
  const response = await axios.get(`${API_URL}/reviews?productId=${productId}`);
  return response.data;
};

export const postReview = async (review: Review): Promise<Review> => {
  const response = await axios.post(`${API_URL}/reviews`, review);
  return response.data;
};

export const updateReview = async (id: number | string, review: Review): Promise<Review> => {
  const response = await axios.patch(`${API_URL}/reviews/${id}`, review);
  return response.data;
};

export const deleteReview = async (id: number | string): Promise<void> => {
  await axios.delete(`${API_URL}/reviews/${id}`);
};

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUserById = async (id: number | string): Promise<User> => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

export const updateUser = async (id: number | string, user: Partial<User>): Promise<User> => {
  const response = await axios.patch(`${API_URL}/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number | string): Promise<void> => {
  await axios.delete(`${API_URL}/users/${id}`);
};

export const getPositiveReviewsByProduct = async (productId: number | string): Promise<Review[]> => {
  const reviews = await getReviewsByProduct(productId);
  return reviews.filter(review => review.rating >= 4);
};

