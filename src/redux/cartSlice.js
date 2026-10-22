import { createSlice } from '@reduxjs/toolkit';

// Lấy giỏ hàng từ localStorage nếu có để giữ lại dữ liệu khi F5
const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    // Action thêm sản phẩm vào giỏ hàng
    addToCart: (state, action) => {
      const itemCart = action.payload; // { id, name, price, image, size, quantity }
      
      // Kiểm tra xem sản phẩm cùng id và cùng size đã có trong giỏ hàng chưa
      const index = state.cart.findIndex(
        item => item.id === itemCart.id && item.size === itemCart.size
      );

      if (index !== -1) {
        // Nếu đã có thì cộng dồn số lượng
        state.cart[index].quantity += itemCart.quantity;
      } else {
        // Nếu chưa có thì thêm mới vào mảng
        state.cart.push(itemCart);
      }

      // Lưu vào localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;