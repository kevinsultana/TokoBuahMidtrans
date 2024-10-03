import {configureStore} from '@reduxjs/toolkit';
import fruitReducer from './fruitSlice';

// Create and configure the Redux store
export const store = configureStore({
  reducer: {
    fruits: fruitReducer,
  },
});
