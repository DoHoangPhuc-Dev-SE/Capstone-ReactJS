import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    gender: true, 
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: name === 'gender' ? value === 'true' : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password !== values.passwordConfirm) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    const payload = {
      email: values.email,
      password: values.password,
      name: values.name,
      phone: values.phone,
      gender: values.gender,
    };

    axios.post('https://shop.cyberlearn.vn/api/Users/signup', payload)
      .then((res) => {
        alert('Đăng ký tài khoản thành công!');
        navigate('/login'); // Đăng ký xong chuyển hướng sang trang Login
      })
      .catch((err) => {
        console.log(err);
        setError(err.response?.data?.message || 'Đăng ký thất bại, vui lòng kiểm tra lại thông tin.');
      });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '24px' }}>Register</h2>
      
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

        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px' }}>Password confirm</label>
          <input type="password" name="passwordConfirm" value={values.passwordConfirm} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px' }} placeholder="Xác nhận lại password..." />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px' }}>Name</label>
          <input type="text" name="name" value={values.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px' }} placeholder="Nhập họ tên..." />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px' }}>Phone</label>
          <input type="text" name="phone" value={values.phone} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px' }} placeholder="Nhập số điện thoại..." />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px' }}>Gender</label>
          <div style={{ display: 'flex', gap: '20px' }}>
            <label><input type="radio" name="gender" value="true" checked={values.gender === true} onChange={handleChange} /> Nam</label>
            <label><input type="radio" name="gender" value="false" checked={values.gender === false} onChange={handleChange} /> Nữ</label>
          </div>
        </div>

        <button type="submit" style={{ backgroundColor: '#7C3AED', color: '#fff', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
          SUBMIT
        </button>
      </form>
    </div>
  );
}