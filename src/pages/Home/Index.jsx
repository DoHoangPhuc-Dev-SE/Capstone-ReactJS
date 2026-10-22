import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductApi } from '../../redux/productSlice';
import ProductCard from '../../components/ProductCard';

export default function Index() {
  const dispatch = useDispatch();
  
  // Sửa đúng tên reducer từ store: productReducer (khớp với configStore.js)
  const { arrProduct, loading, error } = useSelector((state) => state.productReducer || { arrProduct: [], loading: false, error: null });

  useEffect(() => {
    dispatch(getProductApi());
  }, [dispatch]);

  return (
    <main className="container mx-auto px-4 py-8" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Title */}
      <h2 className="text-3xl font-bold text-center my-8 uppercase tracking-wide" style={{ textAlign: 'center', fontSize: '28px', margin: '24px 0', fontWeight: 'bold' }}>
        - Product Feature -
      </h2>

      {loading && (
        <p className="py-12 text-center text-gray-500" style={{ textAlign: 'center', padding: '40px' }}>
          Đang tải danh sách sản phẩm...
        </p>
      )}

      {!loading && error && (
        <div className="p-4 text-center text-red-600 bg-red-50 rounded" style={{ textAlign: 'center', padding: '16px', color: '#DC2626' }}>
          Không thể tải danh sách sản phẩm. {error}
          <button
            type="button"
            onClick={() => dispatch(getProductApi())}
            className="ml-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            style={{ marginLeft: '12px', padding: '4px 12px', backgroundColor: '#DC2626', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Thử lại
          </button>
        </div>
      )}

      {!loading && !error && (!arrProduct || arrProduct.length === 0) && (
        <p className="py-12 text-center text-gray-500" style={{ textAlign: 'center', padding: '40px' }}>
          Chưa có sản phẩm để hiển thị.
        </p>
      )}

      {/* Lưới sản phẩm 3 - 4 cột chuẩn responsive */}
      {!loading && !error && arrProduct && arrProduct.length > 0 && (
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '28px' 
          }}
        >
          {arrProduct.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}