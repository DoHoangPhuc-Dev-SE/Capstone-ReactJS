
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IMAGE_BASE_URL = 'https://shop.cyberlearn.vn/images/';

function getImageUrl(image) {
  if (typeof image !== 'string') return '';

  const value = image.trim();

  if (
    !value ||
    ['string', 'null', 'undefined'].includes(value.toLowerCase()) ||
    /\/images\/https?:\/\//i.test(value)
  ) {
    return '';
  }

  if (/^https?:\/\//i.test(value)) {
    try {
      const url = new URL(value);

      if (!/\.(png|jpe?g|webp|gif|avif)$/i.test(url.pathname)) {
        return '';
      }

      return url.href;
    } catch {
      return '';
    }
  }

  const fileName = value
    .replace(/^\/+/, '')
    .replace(/^images\//i, '');

  if (!/\.(png|jpe?g|webp|gif|avif)$/i.test(fileName)) {
    return '';
  }

  return `${IMAGE_BASE_URL}${fileName}`;
}

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);

  if (!product) return null;

  const productName = product.name || 'Sản phẩm chưa có tên';
  const imageUrl = getImageUrl(product.image);
  const price = Number(product.price);

  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '16px',
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        boxSizing: 'border-box',
      }}
    >
      <div>
        <div
          style={{
            width: '100%',
            height: '180px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#f9fafb',
          }}
        >
          {imageUrl && !imageFailed ? (
            <img
              src={imageUrl}
              alt={productName}
              loading="lazy"
              onError={() => setImageFailed(true)}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                fontSize: '14px',
              }}
            >
              <span style={{ fontSize: '32px' }}>🖼️</span>
              <span>No Image</span>
            </div>
          )}
        </div>

        <h3 style={{ margin: '0 0 8px', fontSize: '18px' }}>
          {productName}
        </h3>

        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          {product.shortDescription ||
            product.description ||
            'Chưa có mô tả.'}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          marginTop: '16px',
        }}
      >
        <button
          type="button"
          onClick={() => navigate(`/detail/${product.id}`)}
          style={{
            padding: '8px 12px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#2563eb',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Buy now
        </button>

        <span style={{ fontWeight: 'bold' }}>
          {Number.isFinite(price)
            ? `${price.toLocaleString('vi-VN')}$`
            : 'N/A'}
        </span>
      </div>
    </article>
  );
}
