import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductApi } from '../../redux/productSlice';
import ProductCard from '../../components/ProductCard';

export default function Index() {
  const dispatch = useDispatch();
  const { arrProduct } = useSelector((state) => state.productSlice);

  useEffect(() => {
    dispatch(getProductApi());
  }, [dispatch]);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Banner / Carousel đầu trang */}
      <div className="bg-gray-100 rounded-2xl p-8 mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold mb-4">Product Feature</h1>
          <p className="text-gray-600 mb-6">Khám phá những mẫu giày thể thao mới nhất và hot nhất!</p>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <h2 className="text-2xl font-bold mb-6 text-center">- Product Feature -</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {arrProduct?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}