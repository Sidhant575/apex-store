'use client';

export default function Toast({ message, type, onClose }) {
  if (!message) return null;
  const isError = type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 100,
        backgroundColor: isError ? '#ef4444' : '#10b981',
        color: '#ffffff',
        padding: '0.85rem 1.4rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontWeight: 600,
        fontSize: '0.9rem',
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        ✕
      </button>
    </div>
  );
}