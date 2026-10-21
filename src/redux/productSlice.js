import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProductApi = createAsyncThunk(
  'productSlice/getProductApi',
  async () => {
    const res = await axios.get('https://shop.cyberlearn.vn/api/Product');
    return res.data.content;
  }
);

const initialState = {
  arrProduct: [],
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductApi.fulfilled, (state, action) => {
      state.arrProduct = action.payload;
    });
  },
});

export default productSlice.reducer;