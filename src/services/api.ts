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
