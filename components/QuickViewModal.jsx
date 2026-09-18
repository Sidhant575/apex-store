'use client';

import { useState } from 'react';

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart, themeColors }) {
  const [selectedImg, setSelectedImg] = useState(0);

  if (!isOpen || !product) return null;

  const images = product.images?.length
    ? product.images
    : [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
      ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(5px)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        style={{
          backgroundColor: themeColors.surface,
          border: `1px solid ${themeColors.border}`,
          borderRadius: '24px',
          maxWidth: '740px',
          width: '100%',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            color: themeColors.textSecondary,
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        <div>
          <img
            src={images[selectedImg]}
            alt={product.name}
            style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '16px' }}
          />
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.8rem' }}>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setSelectedImg(idx)}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  border: `2px solid ${selectedImg === idx ? '#10b981' : 'transparent'}`,
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
              {product.category}
            </span>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0.4rem 0' }}>{product.name}</h2>
            <p style={{ color: themeColors.textSecondary, fontSize: '0.9rem', lineHeight: 1.5 }}>
              {product.description}
            </p>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, margin: '1rem 0' }}>
              ${product.price?.toFixed(2)}
            </div>
          </div>

          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            disabled={product.stock <= 0}
            style={{
              width: '100%',
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              padding: '0.85rem',
              borderRadius: '12px',
              fontWeight: 800,
              cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
            }}
          >
            Add to Shopping Bag
          </button>
        </div>
      </div>
    </div>
  );
}