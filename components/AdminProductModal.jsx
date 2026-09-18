'use client';

export default function AdminProductModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEditing,
  themeColors,
}) {
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
          maxWidth: '480px',
          width: '100%',
          padding: '2rem',
        }}
      >
        <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.35rem', fontWeight: 800 }}>
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h3>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: themeColors.textSecondary }}>
              Product Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                backgroundColor: themeColors.surfaceSubtle,
                border: `1px solid ${themeColors.border}`,
                borderRadius: '10px',
                padding: '0.7rem',
                color: themeColors.text,
                marginTop: '0.35rem',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: themeColors.textSecondary }}>
              Description
            </label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{
                width: '100%',
                backgroundColor: themeColors.surfaceSubtle,
                border: `1px solid ${themeColors.border}`,
                borderRadius: '10px',
                padding: '0.7rem',
                color: themeColors.text,
                marginTop: '0.35rem',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: themeColors.textSecondary }}>
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                style={{
                  width: '100%',
                  backgroundColor: themeColors.surfaceSubtle,
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: '10px',
                  padding: '0.7rem',
                  color: themeColors.text,
                  marginTop: '0.35rem',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: themeColors.textSecondary }}>
                Stock Units
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                style={{
                  width: '100%',
                  backgroundColor: themeColors.surfaceSubtle,
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: '10px',
                  padding: '0.7rem',
                  color: themeColors.text,
                  marginTop: '0.35rem',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: themeColors.textSecondary }}>
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{
                width: '100%',
                backgroundColor: themeColors.surfaceSubtle,
                border: `1px solid ${themeColors.border}`,
                borderRadius: '10px',
                padding: '0.7rem',
                color: themeColors.text,
                marginTop: '0.35rem',
              }}
            >
              <option value="Electronics">Electronics</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
              <option value="Apparel">Apparel</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'transparent',
                border: `1px solid ${themeColors.border}`,
                padding: '0.6rem 1.2rem',
                borderRadius: '10px',
                color: themeColors.text,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: '#38bdf8',
                border: 'none',
                padding: '0.6rem 1.4rem',
                borderRadius: '10px',
                color: '#0f172a',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}