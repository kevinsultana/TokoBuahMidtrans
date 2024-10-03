import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of cart items
  totalQuantity: 0, // Total number of items in the cart
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        item => item.name === action.payload.name,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({...action.payload, quantity: 1});
      }

      // Update total quantity
      state.totalQuantity += 1;
    },
  },
});

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;
