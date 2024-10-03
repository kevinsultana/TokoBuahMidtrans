import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  item: [],
  totalItem: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemToAdd = action.payload;
      const isExist = state.item.find(item => item.name == itemToAdd.name);

      if (isExist) {
        const increasedAmountItem = state.item.map(item =>
          item.name == itemToAdd.name
            ? {...item, amount: item.amount + 1}
            : item,
        );

        state.item = increasedAmountItem;

        state.totalItem = increasedAmountItem.reduce(
          (acc, item) => acc + item.amount,
          0,
        );

        state.totalPrice = increasedAmountItem.reduce(
          (acc, item) => acc + item.amount * item.price_per_unit,
          0,
        );
      } else {
        const newItem = [{...itemToAdd, amount: 1}, ...state.item];

        state.item = newItem;

        state.totalItem = newItem.reduce((acc, item) => acc + item.amount, 0);

        state.totalPrice = newItem.reduce(
          (acc, item) => acc + item.amount * item.price_per_unit,
          0,
        );
      }
    },
    removeFromCart(state, action) {
      const itemToSubtract = action.payload;
      const isExist = state.item.find(item => item.name == itemToSubtract.name);

      if (isExist) {
        if (itemToSubtract.amount === 1) {
          // Remove the item from the cart if its amount is 1 (i.e., it will be reduced to 0)
          state.item = state.item.filter(
            item => item.name !== itemToSubtract.name,
          );
        } else {
          // Otherwise, decrease the amount
          const decreaseAmountItem = state.item.map(item =>
            item.name == itemToSubtract.name
              ? {...item, amount: item.amount - 1}
              : item,
          );
          state.item = decreaseAmountItem;
        }

        // Update the total price and total items
        state.totalPrice = state.item.reduce(
          (acc, item) => acc + item.amount * item.price_per_unit,
          0,
        );
        state.totalItem = state.item.reduce(
          (acc, item) => acc + item.amount,
          0,
        );
      }
    },
    emptyTheCart(state) {
      state.item = [];
      state.totalItem = 0;
      state.totalPrice = 0;
    },
  },
});

export const {addToCart, removeFromCart, emptyTheCart} = cartSlice.actions;

export default cartSlice.reducer;
