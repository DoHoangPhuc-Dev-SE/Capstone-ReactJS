import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const navigate = useNavigate();
  const { cart } = useSelector(state => state.cartReducer);

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header style={{ backgroundColor: '#000', color: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif' }}>
      {/* Top bar trên cùng */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
        <span 
          style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '20px', letterSpacing: '1px', color: '#FACC15' }}
          onClick={() => navigate('/')}
        >
          CYBERLEARN
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px', fontWeight: '500' }}>
          <NavLink to="/search" style={{ color: '#fff', textDecoration: 'none' }}>🔍 Search</NavLink>
          <NavLink to="/carts" style={{ color: '#fff', textDecoration: 'none' }}>🛒 ({totalQuantity})</NavLink>
          <NavLink to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</NavLink>
          <NavLink to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</NavLink>
        </div>
      </div>

      {/* Menu Navigation chính */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center' }}>
        <nav style={{ display: 'flex', gap: '32px', fontSize: '15px', fontWeight: '500' }}>
          <NavLink to="/" style={{ color: '#FACC15', textDecoration: 'none', borderBottom: '2px solid #FACC15', paddingBottom: '4px' }}>Home</NavLink>
          <NavLink to="/men" style={{ color: '#fff', textDecoration: 'none' }}>Men</NavLink>
          <NavLink to="/woman" style={{ color: '#fff', textDecoration: 'none' }}>Woman</NavLink>
          <NavLink to="/kid" style={{ color: '#fff', textDecoration: 'none' }}>Kid</NavLink>
          <NavLink to="/sport" style={{ color: '#fff', textDecoration: 'none' }}>Sport</NavLink>
        </nav>
      </div>
    </header>
  );
}