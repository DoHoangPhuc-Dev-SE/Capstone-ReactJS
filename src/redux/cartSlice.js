import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemCart = action.payload;
      const index = state.cart.findIndex(
        item => item.id === itemCart.id && item.size === itemCart.size
      );

      if (index !== -1) {
        state.cart[index].quantity += itemCart.quantity;
      } else {
        state.cart.push(itemCart);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    increaseQuantity: (state, action) => {
      const { id, size } = action.payload;
      const item = state.cart.find(item => item.id === id && item.size === size);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    decreaseQuantity: (state, action) => {
      const { id, size } = action.payload;
      const item = state.cart.find(item => item.id === id && item.size === size);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    deleteItemCart: (state, action) => {
      const { id, size } = action.payload;
      state.cart = state.cart.filter(item => !(item.id === id && item.size === size));
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem('cart');
    }
  },
});

export const { 
  addToCart, 
  increaseQuantity, 
  decreaseQuantity, 
  deleteItemCart, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;