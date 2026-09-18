'use client';

export default function OrderHistoryModal({ isOpen, onClose, orders, themeColors }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '1rem',
      }}
    >
      <div
        style={{
          backgroundColor: themeColors.surface,
          border: `1px solid ${themeColors.border}`,
          borderRadius: '20px',
          maxWidth: '560px',
          width: '100%',
          padding: '2rem',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800 }}>Order Tracking &amp; History</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.2rem',
              color: themeColors.textSecondary,
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 0', color: themeColors.textSecondary }}>
              No orders placed yet.
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                style={{
                  backgroundColor: themeColors.surfaceSubtle,
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: '12px',
                  padding: '1rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.4rem',
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Tracking: #{order.id}</span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#10b981',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                    }}
                  >
                    {order.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: themeColors.textSecondary }}>
                  Date: {order.date} • Total: ${order.total.toFixed(2)}
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.82rem' }}>
                  {order.items.map((it) => `${it.name} (x${it.quantity})`).join(', ')}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}