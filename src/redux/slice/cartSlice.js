import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem: (state, action) => {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((acc, el) => {
    //     return el.price + acc;
    //   }, 0);
    // },
    addItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((acc, el) => {
        return acc + el.count * el.price;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      // state.totalPrice = calcTotalPrice(state.items);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state: any) =>
  state.cart.items.find((obj: any) => obj.id === id);
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
