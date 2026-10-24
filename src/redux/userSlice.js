import { createSlice } from '@reduxjs/toolkit';

const userLogin = JSON.parse(localStorage.getItem('userLogin')) || null;

const initialState = {
  userProfile: userLogin,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.userProfile = action.payload;

      localStorage.setItem('userLogin', JSON.stringify(action.payload));
      if (action.payload?.accessToken) {
        localStorage.setItem('accessToken', action.payload.accessToken);
      }
    },
    logout: (state) => {
      state.userProfile = null;
      localStorage.removeItem('userLogin');
      localStorage.removeItem('accessToken');
    }
  },
});

export const { setUserLogin, logout } = userSlice.actions;
export default userSlice.reducer;