import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard(props) {
  const { product } = props;
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col justify-between hover:shadow-md transition">
      <div>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-contain mb-4" 
          onError={(e) => {
            e.target.src = "https://i.imgur.com/391ZeHG.jpeg";
          }}
        />
        <h3 className="font-bold text-lg truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.shortDescription}</p>
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-red-500 font-bold text-xl">{product.price}$</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate(`/detail/${product.id}`)}
            className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition font-medium"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}