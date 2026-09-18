'use client';

export default function AdminDashboard({
  products,
  orders,
  onOpenProductModal,
  onEditProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  themeColors,
}) {
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Admin Management Hub</h2>
          <p style={{ color: themeColors.textSecondary, margin: '0.2rem 0 0' }}>
            Live Inventory, Revenue Streams, and Order Pipeline
          </p>
        </div>
        <button
          onClick={onOpenProductModal}
          style={{
            backgroundColor: '#10b981',
            color: '#061311',
            border: 'none',
            padding: '0.65rem 1.3rem',
            borderRadius: '12px',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          + Add Product
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        {[
          { label: 'Total Sales Revenue', val: `$${totalRevenue.toFixed(2)}`, color: '#10b981' },
          { label: 'Total Orders', val: orders.length, color: '#34d399' },
          { label: 'Inventory Items', val: products.length, color: '#f59e0b' },
        ].map((kpi, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: themeColors.surface,
              border: `1px solid ${themeColors.border}`,
              borderRadius: '18px',
              padding: '1.25rem',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                color: themeColors.textSecondary,
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              {kpi.label}
            </span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.4rem', color: kpi.color }}>
              {kpi.val}
            </div>
          </div>
        ))}
      </div>

      <section style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Active Orders</h3>
        <div
          style={{
            backgroundColor: themeColors.surface,
            border: `1px solid ${themeColors.border}`,
            borderRadius: '18px',
            overflowX: 'auto',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${themeColors.border}`, color: themeColors.textSecondary }}>
                <th style={{ padding: '1rem' }}>Order ID</th>
                <th style={{ padding: '1rem' }}>Total</th>
                <th style={{ padding: '1rem' }}>Current Status</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id || o.id} style={{ borderBottom: `1px solid ${themeColors.border}` }}>
                  <td style={{ padding: '1rem' }}>#{String(o._id || o.id).slice(-6)}</td>
                  <td style={{ padding: '1rem', fontWeight: 700 }}>${o.total?.toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>{o.status}</td>
                  <td style={{ padding: '1rem' }}>
                    <select
                      value={o.status}
                      onChange={(e) => onUpdateOrderStatus(o._id || o.id, e.target.value)}
                      style={{
                        backgroundColor: themeColors.surfaceSubtle,
                        border: `1px solid ${themeColors.border}`,
                        color: themeColors.text,
                        padding: '0.35rem 0.6rem',
                        borderRadius: '8px',
                      }}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Product Inventory</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {products.map((p) => (
            <div
              key={p._id || p.id}
              style={{
                backgroundColor: themeColors.surface,
                border: `1px solid ${themeColors.border}`,
                borderRadius: '16px',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{p.name}</div>
                <div style={{ fontSize: '0.8rem', color: themeColors.textSecondary }}>
                  ${p.price} • Stock: {p.stock}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => onEditProduct(p)}
                  style={{
                    backgroundColor: themeColors.surfaceSubtle,
                    border: `1px solid ${themeColors.border}`,
                    color: themeColors.text,
                    padding: '0.3rem 0.6rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteProduct(p._id || p.id)}
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: 'none',
                    color: '#ef4444',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}