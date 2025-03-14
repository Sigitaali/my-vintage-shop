export interface CartItem {
    productId: number;
    quantity: number;
    title: string;
    price: number;
  }
  
  export interface CartState {
    items: CartItem[];
  }
  
  export type CartAction =
    | { type: 'ADD_ITEM'; payload: { productId: number; quantity?: number; title: string; price: number } }
    | { type: 'REMOVE_ITEM'; payload: { productId: number } }
    | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
    | { type: 'CLEAR_CART' };
  
    export const cartReducer = (state: CartState, action: CartAction): CartState => {
        switch (action.type) {
          case 'ADD_ITEM': {
            const { productId, quantity = 1, title, price } = action.payload;
            const existingItem = state.items.find(item => item.productId === productId);
            if (existingItem) {
              return {
                ...state,
                items: state.items.map(item =>
                  item.productId === productId
                    ? { productId, quantity: item.quantity + quantity, title, price }
                    : item
                ),
              };
            } else {
              return {
                ...state,
                items: [...state.items, { productId, quantity, title, price }],
              };
            }
          }
          case 'REMOVE_ITEM': {
            return {
              ...state,
              items: state.items.filter(item => item.productId !== action.payload.productId),
            };
          }
          case 'UPDATE_QUANTITY': {
            const { productId, quantity } = action.payload;
            return {
              ...state,
              items: state.items.map(item =>
                item.productId === productId ? { ...item, quantity } : item
              ),
            };
          }
          case 'CLEAR_CART':
            return { items: [] };
          default:
            return state;
        }
      };