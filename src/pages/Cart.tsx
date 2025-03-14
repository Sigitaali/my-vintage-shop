import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/Cart.scss';

const Cart: React.FC = () => {
  const { state, dispatch } = useContext(CartContext);

  const totalSum = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePay = () => {
    alert(`Proceeding to payment. Total amount: $${totalSum.toFixed(2)}`);
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {state.items.map((item) => (
              <li key={item.productId}>
                <span>{item.title} (${item.price})</span> - 
                <span> Quantity: {item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch({ type: 'REMOVE_ITEM', payload: { productId: item.productId } })
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h2>Total: ${totalSum.toFixed(2)}</h2>
          </div>
          <button className="pay-button" onClick={handlePay}>
            Pay Now
          </button>
        </div>
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
