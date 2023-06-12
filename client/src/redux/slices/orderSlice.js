import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postOrder = createAsyncThunk('order/postOrderList', async (obj) => {
  const result = await axios.post(`https://642be6fad7081590f92ca383.mockapi.io/eliftech`, obj);
});

const initialState = {
  orderData: {},
  requestStatus: 'loading',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: {
    [postOrder.pending]: (state) => {
      state.requestStatus = 'loading';
      state.orderData = [];
    },
    [postOrder.fulfilled]: (state, action) => {
      state.orderData = action.payload;
      state.requestStatus = 'success';
    },
    [postOrder.rejected]: (state) => {
      state.requestStatus = 'error';
      state.orderData = [];
    },
  },
});

export const { setProduct } = orderSlice.actions;

export default orderSlice.reducer;
