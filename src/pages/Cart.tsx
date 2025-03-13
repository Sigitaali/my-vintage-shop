import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import '../styles/Cart.scss';

const Cart: React.FC = () => {
  const { state, dispatch } = useContext(CartContext);

  return (
    <div className="cart-container">
      <Navbar />
      <h1>Your Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {state.items.map((item) => (
            <li key={item.productId}>
              <span>Product ID: {item.productId}</span> - 
              <span> Quantity: {item.quantity}</span>
              <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.productId })}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => dispatch({ type: 'CLEAR_CART' })}
        className="clear-cart"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
