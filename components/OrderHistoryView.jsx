'use client';

export default function OrderHistoryView({ orders, onCancelOrder, themeColors }) {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem' }}>
        Order Tracking &amp; History
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {orders.length === 0 ? (
          <div
            style={{
              backgroundColor: themeColors.surface,
              border: `1px solid ${themeColors.border}`,
              borderRadius: '20px',
              padding: '3rem',
              textAlign: 'center',
              color: themeColors.textSecondary,
            }}
          >
            No orders found. Add items to your bag and check out to view live tracking.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id || order.id}
              style={{
                backgroundColor: themeColors.surface,
                border: `1px solid ${themeColors.border}`,
                borderRadius: '18px',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.8rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <div>
                  <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>
                    Order #{String(order._id || order.id).slice(-8)}
                  </span>
                  <div style={{ fontSize: '0.8rem', color: themeColors.textSecondary, marginTop: '0.2rem' }}>
                    Placed on: {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      backgroundColor:
                        order.status === 'Delivered'
                          ? 'rgba(16, 185, 129, 0.15)'
                          : order.status === 'Cancelled'
                          ? 'rgba(239, 68, 68, 0.15)'
                          : 'rgba(16, 185, 129, 0.15)',
                      color:
                        order.status === 'Delivered'
                          ? '#10b981'
                          : order.status === 'Cancelled'
                          ? '#ef4444'
                          : '#10b981',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '100px',
                    }}
                  >
                    ● {order.status}
                  </span>

                  {order.status === 'Processing' && (
                    <button
                      onClick={() => onCancelOrder(order._id || order.id)}
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        color: '#ef4444',
                        padding: '0.3rem 0.6rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  margin: '1rem 0',
                  borderTop: `1px solid ${themeColors.border}`,
                  paddingTop: '0.85rem',
                }}
              >
                {order.items?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: `1px solid ${themeColors.border}`,
                  paddingTop: '0.85rem',
                  fontSize: '0.95rem',
                }}
              >
                <span style={{ color: themeColors.textSecondary }}>
                  Delivery Est: {new Date(order.estimatedDelivery || Date.now()).toLocaleDateString()}
                </span>
                <span style={{ fontWeight: 800 }}>Total: ${order.total?.toFixed(2)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}