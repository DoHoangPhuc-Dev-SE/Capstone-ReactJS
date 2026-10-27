import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';
import { addToCart } from '../../redux/cartSlice';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // 1. Gọi API lấy chi tiết sản phẩm theo ID[cite: 34, 41]
    axios.get(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`)
      .then(res => {
        const item = res.data.content;
        setProduct(item);
        if (item?.size?.length > 0) {
          setSelectedSize(item.size[0]); // Mặc định chọn size đầu tiên
        }
      })
      .catch(err => console.log('Lỗi gọi API chi tiết sản phẩm:', err));
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;

    const itemCart = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: quantity,
    };

    dispatch(addToCart(itemCart));
    alert(`Đã thêm ${quantity} sản phẩm (Size: ${selectedSize}) vào giỏ hàng thành công!`);
  };

  if (!product) {
    return <div className="py-20 text-center text-gray-500">Đang tải chi tiết sản phẩm...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        
        <div className="bg-[#F8F8F8] border border-gray-200 rounded-lg p-8 flex items-center justify-center" style={{ backgroundColor: '#F8F8F8', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '40px', minHeight: '380px' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ maxHeight: '320px', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800" style={{ fontSize: '30px', fontWeight: 'bold', color: '#1F2937' }}>
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed" style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.6' }}>
            {product.description}
          </p>
          
          <div className="text-2xl font-bold text-red-500 mb-6" style={{ fontSize: '24px', fontWeight: 'bold', color: '#EF4444' }}>
            {product.price} $
          </div>

          <div className="mb-6">
            <span className="block font-semibold mb-2 text-gray-700" style={{ fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
              Available Size:
            </span>
            <div className="flex gap-3 flex-wrap" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {product.size?.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    border: selectedSize === size ? '2px solid #000' : '1px solid #D1D5DB',
                    backgroundColor: selectedSize === size ? '#000' : '#E5E7EB',
                    color: selectedSize === size ? '#fff' : '#1F2937',
                    cursor: 'pointer'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden" style={{ display: 'flex', border: '1px solid #D1D5DB', borderRadius: '4px' }}>
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                style={{ padding: '8px 16px', backgroundColor: '#F3F4F6', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                -
              </button>
              <span style={{ padding: '8px 20px', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                style={{ padding: '8px 16px', backgroundColor: '#F3F4F6', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                +
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              style={{
                backgroundColor: '#7C3AED',
                color: '#fff',
                padding: '10px 32px',
                borderRadius: '4px',
                border: 'none',
                fontWeight: '600',
                fontSize: '15px',
                cursor: 'pointer'
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-wide" style={{ fontSize: '24px', textAlign: 'center', margin: '40px 0 24px', fontWeight: 'bold' }}>
          - Related Product -
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {product.relatedProducts?.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </main>
  );
}