import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';

export default function Detail() {
  const { id } = useParams(); // Lấy id từ URL /detail/:id
  const [productDetail, setProductDetail] = useState(null);

  const getProductDetailApi = async () => {
    try {
      const res = await axios.get(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`);
      setProductDetail(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getProductDetailApi();
    }
  }, [id]);

  if (!productDetail) return <div className="text-center py-10">Đang tải chi tiết sản phẩm...</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Chi tiết sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
        <div className="flex justify-center">
          <img src={productDetail.image} alt={productDetail.name} className="w-96 h-96 object-contain" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{productDetail.name}</h1>
          <p className="text-gray-600 mb-4">{productDetail.description}</p>
          <div className="text-red-500 text-2xl font-bold mb-6">{productDetail.price}$</div>
          
          {/* Chọn Size */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Available Size:</h3>
            <div className="flex gap-2">
              {productDetail.size?.map((sz, index) => (
                <button key={index} className="border px-4 py-2 rounded bg-gray-100 hover:bg-black hover:text-white transition">
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition">
            Add to cart
          </button>
        </div>
      </div>

      {/* Sản phẩm liên quan (Related Product) */}
      <h2 className="text-2xl font-bold mb-6 text-center">- Related Product -</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productDetail.relatedProducts?.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}