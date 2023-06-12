import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProductsList', async (product) => {
  const res = await axios.get(`https://api.jsonbin.io/v3/b/${product}?meta=false`, {
    headers: {
      //need to hide keys to env file
      'X-Master-Key': '$2b$10$QIgUlYzIAIY8IbQVhjvj/u8aAWgo6ArkAcQyy27S6Ce5nMLcfUVka',
      'X-Access-Key': '$2b$10$U.35FIAyPdOyE3uQXg5GAeAv33BJMo0bBgVhVmwKYUlstNl2I0KSi',
    },
  });
  const data = await res.data;
  const fetchedProductsList = data[Object.keys(data)[0]];

  return fetchedProductsList;
});

const initialState = {
  product: 'fried-chicken',
  productList: [],
  requestStatus: 'loading',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.requestStatus = 'loading';
      state.productList = [];
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.productList = action.payload;
      state.requestStatus = 'success';
    },
    [fetchProducts.rejected]: (state) => {
      state.requestStatus = 'error';
      state.productList = [];
    },
  },
});

export const { setProduct } = productsSlice.actions;

export default productsSlice.reducer;
