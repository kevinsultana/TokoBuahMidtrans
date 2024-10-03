import {configureStore} from '@reduxjs/toolkit';
import fruitReducer from './fruitSlice';
import cartReducer from './cartSlice';

// Create and configure the Redux store
export const store = configureStore({
  reducer: {
    fruits: fruitReducer,
    cart: cartReducer,
  },
});
