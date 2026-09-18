'use client';

export default function Navbar({
  currentView,
  setCurrentView,
  cartCount,
  onOpenCart,
  user,
  onOpenProfile,
  theme,
  setTheme,
  themeColors,
}) {
  const isDark = theme === 'dark';

  return (
    <nav
      style={{
        backgroundColor: themeColors.surface,
        borderBottom: `1px solid ${themeColors.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backdropFilter: 'blur(10px)',
        padding: '0.9rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div
            onClick={() => setCurrentView('store')}
            style={{
              fontSize: '1.4rem',
              fontWeight: 900,
              cursor: 'pointer',
              letterSpacing: '-0.03em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span style={{ color: '#10b981' }}>APEX</span>
            <span>STORE</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {['store', 'orders', user?.role === 'admin' ? 'admin' : null]
              .filter(Boolean)
              .map((view) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: currentView === view ? '#10b981' : themeColors.textSecondary,
                    fontWeight: currentView === view ? 700 : 500,
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                    fontSize: '0.92rem',
                    transition: 'color 0.2s',
                  }}
                >
                  {view}
                </button>
              ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            title="Toggle theme"
            style={{
              background: themeColors.surfaceSubtle,
              border: `1px solid ${themeColors.border}`,
              color: themeColors.text,
              padding: '0.5rem 0.75rem',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <button
            onClick={onOpenCart}
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10b981',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            🛒 <span>Cart ({cartCount})</span>
          </button>

          {user && (
            <button
              onClick={onOpenProfile}
              style={{
                backgroundColor: themeColors.surfaceSubtle,
                border: `1px solid ${themeColors.border}`,
                color: themeColors.text,
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              👤 {user.name.split(' ')[0]}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}