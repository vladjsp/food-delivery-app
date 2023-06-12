import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.amount++;
      } else {
        state.cartItems.push({ ...action.payload, amount: 1 });
      }
      state.totalPrice =
        Math.round(state.cartItems.reduce((sum, obj) => sum + obj.price * obj.amount, 0) * 100) /
        100;
    },

    plusItem(state, action) {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.amount++;
      }

      state.totalPrice =
        Math.round(state.cartItems.reduce((sum, obj) => sum + obj.price * obj.amount, 0) * 100) /
        100;
    },
    minusItem(state, action) {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload);
      if (findItem && findItem.amount >= 2) {
        findItem.amount--;
      }

      state.totalPrice =
        Math.round(state.cartItems.reduce((sum, obj) => sum + obj.price * obj.amount, 0) * 100) /
        100;
    },
    removeItem(state, action) {
      state.cartItems = state.cartItems.filter((obj) => obj.id !== action.payload);

      state.totalPrice =
        Math.round(state.cartItems.reduce((sum, obj) => sum + obj.price * obj.amount, 0) * 100) /
        100;
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, plusItem, minusItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
