import {createSlice} from '@reduxjs/toolkit';
import {FruitData} from '../data'; // Import FruitData correctly

const fruitSlice = createSlice({
  name: 'fruits',
  initialState: {
    allFruits: FruitData, // Store all the fruits data
    selectedCategory: 'All', // Default category is 'All'
    fruitsToDisplay: FruitData.flatMap(item => item.types), // Show all fruits by default
  },
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
      if (action.payload === 'All') {
        state.fruitsToDisplay = state.allFruits.flatMap(item => item.types);
      } else {
        const selectedCategoryData = state.allFruits.find(
          item => item.category === action.payload,
        );
        state.fruitsToDisplay = selectedCategoryData?.types || [];
      }
    },
  },
});

export const {selectCategory} = fruitSlice.actions;
export default fruitSlice.reducer;
