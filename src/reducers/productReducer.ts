export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    categoryId: number;
    image?: string;
  }
  
  export interface ProductState {
    products: Product[];
    filteredProducts: Product[];
  }
  
  export type ProductAction =
    | { type: 'SET_PRODUCTS'; payload: Product[] }
    | { type: 'FILTER_BY_CATEGORY'; payload: number };
  
  export const productReducer = (
    state: ProductState,
    action: ProductAction
  ): ProductState => {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return {
          products: action.payload,
          filteredProducts: action.payload,
        };
      case 'FILTER_BY_CATEGORY':
        return {
          ...state,
          filteredProducts: state.products.filter(
            (p) => p.categoryId === action.payload
          ),
        };
      default:
        return state;
    }
  };