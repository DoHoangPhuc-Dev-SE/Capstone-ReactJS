import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://shop.cyberlearn.vn/api',
  timeout: 30000,
});

// Tự động thêm Token vào Header nếu đã đăng nhập
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);