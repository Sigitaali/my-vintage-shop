import { Dispatch } from 'react';
import { CartAction } from '../reducers/cartReducer';
import { Product } from '../services/api';

export const addToCart = (
  dispatch: Dispatch<CartAction>,
  product: Product,
  event: React.MouseEvent<HTMLButtonElement>
) => {
  event.preventDefault();
  dispatch({ type: 'ADD_ITEM', payload: { productId: product.id, quantity: 1 } });
  alert('Product added to cart!');
};
