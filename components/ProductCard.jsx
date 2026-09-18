'use client';

export default function ProductCard({
  product,
  themeColors,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
}) {
  return (
    <div
      style={{
        backgroundColor: themeColors.surface,
        border: `1px solid ${themeColors.border}`,
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      <button
        onClick={() => onToggleWishlist(product._id)}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(6px)',
          border: 'none',
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          cursor: 'pointer',
          color: isWishlisted ? '#ef4444' : '#fff',
          fontSize: '1rem',
        }}
      >
        {isWishlisted ? '♥' : '♡'}
      </button>

      <div
        onClick={() => onQuickView(product)}
        style={{ position: 'relative', height: '210px', cursor: 'pointer', overflow: 'hidden' }}
      >
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            color: '#fff',
            fontSize: '0.75rem',
            padding: '0.25rem 0.55rem',
            borderRadius: '6px',
            fontWeight: 600,
          }}
        >
          Quick View 👁
        </div>
      </div>

      <div style={{ padding: '1.25rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.4rem',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>
            {product.category}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}>
            ★ {product.ratings || 4.8}
          </span>
        </div>

        <h3
          onClick={() => onQuickView(product)}
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            margin: '0 0 0.4rem',
            cursor: 'pointer',
            color: themeColors.text,
          }}
        >
          {product.name}
        </h3>

        <div
          style={{
            fontSize: '0.82rem',
            color: product.stock > 0 ? '#10b981' : '#ef4444',
            fontWeight: 600,
            marginBottom: '1rem',
          }}
        >
          {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `1px solid ${themeColors.border}`,
            paddingTop: '0.85rem',
          }}
        >
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: themeColors.text }}>
            ${product.price?.toFixed(2)}
          </div>
          <button
            disabled={product.stock <= 0}
            onClick={() => onAddToCart(product)}
            style={{
              backgroundColor: product.stock > 0 ? '#10b981' : themeColors.surfaceSubtle,
              color: product.stock > 0 ? '#ffffff' : themeColors.textSecondary,
              border: 'none',
              borderRadius: '10px',
              padding: '0.5rem 1rem',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
            }}
          >
            Add +
          </button>
        </div>
      </div>
    </div>
  );
}