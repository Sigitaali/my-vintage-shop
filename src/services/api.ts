import axios from 'axios';

const API_URL = 'http://localhost:3000';


export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  image?: string;
}

export interface Review {
  id?: number;
  productId: number;
  userId: number;
  rating: number;
  comment: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const fetchProductsByCategory = async (
  categoryId: number
): Promise<Product[]> => {
  const response = await axios.get(
    `${API_URL}/products?categoryId=${categoryId}`
  );
  return response.data;
};

export const getProductById = async (id: number | string): Promise<Product> => {
  const response = await axios.get(`${API_URL}/products/${id}`);
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

export const updateReview = async (reviewId: number | string, review: Review): Promise<Review> => {
  const response = await axios.put(`${API_URL}/reviews/${reviewId}`, review);
  return response.data;
};

export const deleteReview = async (reviewId: number | string): Promise<void> => {
  await axios.delete(`${API_URL}/reviews/${reviewId}`);
};


