import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUserLogin } from '../../redux/userSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://shop.cyberlearn.vn/api/Users/signin', values)
      .then((res) => {
        const dataUser = res.data.content;
        dispatch(setUserLogin(dataUser)); // Lưu vào Redux & LocalStorage
        alert('Đăng nhập thành công!');
        navigate('/'); // Chuyển về trang chủ
      })
      .catch((err) => {
        console.log(err);
        setError(err.response?.data?.message || 'Email hoặc mật khẩu không chính xác!');
      });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '30px', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '24px' }}>Login</h2>

      {error && <div style={{ padding: '10px', backgroundColor: '#FEE2E2', color: '#DC2626', marginBottom: '16px', borderRadius: '4px' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px' }}>Email</label>
          <input type="email" name="email" value={values.email} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px' }} placeholder="Nhập email..." />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px' }}>Password</label>
          <input type="password" name="password" value={values.password} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px' }} placeholder="Nhập password..." />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#2563EB', cursor: 'pointer', fontSize: '14px' }} onClick={() => navigate('/register')}>
            Register now?
          </span>
        </div>

        <button type="submit" style={{ backgroundColor: '#2563EB', color: '#fff', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          LOGIN
        </button>
      </form>
    </div>
  );
}