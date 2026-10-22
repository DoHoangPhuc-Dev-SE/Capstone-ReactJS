import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const PRODUCT_API_URL = 'https://shop.cyberlearn.vn/api/Product';

export const getProductApi = createAsyncThunk(
  'productSlice/getProductApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(PRODUCT_API_URL);
      const products = response.data?.content;

      if (!Array.isArray(products)) {
        return rejectWithValue(
          'Dữ liệu API không đúng định dạng danh sách sản phẩm.'
        );
      }

      return products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Đã xảy ra lỗi khi gọi API.'
      );
    }
  }
);

const initialState = {
  arrProduct: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductApi.fulfilled, (state, action) => {
        state.loading = false;
        state.arrProduct = action.payload;
      })
      .addCase(getProductApi.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || 'Không rõ nguyên nhân.';
      });
  },
});

export default productSlice.reducer;
