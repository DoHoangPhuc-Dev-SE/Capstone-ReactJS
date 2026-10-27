import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  increaseQuantity, 
  decreaseQuantity, 
  deleteItemCart, 
  clearCart 
} from '../../redux/cartSlice';

export default function Carts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy state an toàn tuyệt đối để không bị lỗi undefined
  const cartState = useSelector(state => state.cartReducer || { cart: [] });
  const cart = cartState?.cart || [];

  const userState = useSelector(state => state.userReducer || state.userSlice || { userProfile: null });
  const userProfile = userState?.userProfile;

  //Bảo mật: Chưa đăng nhập thì đá về /login
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token && !userProfile) {
      alert('Vui lòng đăng nhập để xem giỏ hàng!');
      navigate('/login');
    }
  }, [userProfile, navigate]);

  // Tính tổng tiền toàn bộ giỏ hàng
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Xử lý nút Đặt hàng (Submit Order)
  const handleOrder = () => {
    if (cart.length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
      return;
    }

    const user = JSON.parse(localStorage.getItem('userLogin'));
    const email = user?.email || userProfile?.email || '';

    const orderDetail = cart.map(item => ({
      productId: String(item.id),
      quantity: item.quantity
    }));

    const payload = {
      orderDetail: orderDetail,
      email: email
    };

    const token = localStorage.getItem('accessToken');

    axios.post('https://shop.cyberlearn.vn/api/Users/order', payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      alert('Đặt hàng thành công!');
      dispatch(clearCart());
      navigate('/profile');
    })
    .catch(err => {
      console.log('Lỗi đặt hàng:', err);
      alert(err.response?.data?.message || 'Đặt hàng thất bại, vui lòng thử lại.');
    });
  };

  return (
    <main className="container mx-auto px-4 py-8" style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', textTransform: 'uppercase' }}>
        Carts
      </h2>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#6B7280', fontSize: '16px' }}>
          Giỏ hàng của bạn đang trống. <span style={{ color: '#2563EB', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/')}>Mua sắm ngay</span>
        </div>
      ) : (
        <>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#F3F4F6', borderBottom: '2px solid #E5E7EB' }}>
                  <th style={{ padding: '12px' }}>id</th>
                  <th style={{ padding: '12px' }}>img</th>
                  <th style={{ padding: '12px' }}>name</th>
                  <th style={{ padding: '12px' }}>price</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>quantity</th>
                  <th style={{ padding: '12px' }}>total</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={`${item.id}-${item.size}`} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{index + 1}</td>
                    <td style={{ padding: '12px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '70px', height: '50px', objectFit: 'contain' }} />
                    </td>
                    <td style={{ padding: '12px' }}>
                      {item.name} <br />
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>(Size: {item.size})</span>
                    </td>
                    <td style={{ padding: '12px', color: '#DC2626', fontWeight: 'bold' }}>{item.price} $</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #D1D5DB', borderRadius: '4px', overflow: 'hidden' }}>
                        <button 
                          onClick={() => dispatch(decreaseQuantity({ id: item.id, size: item.size }))}
                          style={{ padding: '4px 10px', backgroundColor: '#F3F4F6', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          -
                        </button>
                        <span style={{ padding: '4px 14px', fontWeight: 'bold' }}>{item.quantity}</span>
                        <button 
                          onClick={() => dispatch(increaseQuantity({ id: item.id, size: item.size }))}
                          style={{ padding: '4px 10px', backgroundColor: '#F3F4F6', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.price * item.quantity} $</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button 
                        onClick={() => dispatch(deleteItemCart({ id: item.id, size: item.size }))}
                        style={{ backgroundColor: '#EF4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Tổng thanh toán: <span style={{ color: '#DC2626' }}>{totalAmount} $</span>
            </div>
            <button 
              onClick={handleOrder}
              style={{ backgroundColor: '#7C3AED', color: '#fff', padding: '12px 32px', borderRadius: '4px', border: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}
            >
              SUBMIT ORDER
            </button>
          </div>
        </>
      )}
    </main>
  );
}