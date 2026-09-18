'use client';

export default function UserProfileModal({ isOpen, onClose, user, onLogout, themeColors }) {
  if (!isOpen || !user) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
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
          maxWidth: '440px',
          width: '100%',
          padding: '2rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800 }}>User Profile</h3>
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

        <div style={{ margin: '1.5rem 0' }}>
          <div style={{ fontSize: '0.8rem', color: themeColors.textSecondary }}>Name</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{user.name}</div>

          <div style={{ fontSize: '0.8rem', color: themeColors.textSecondary, marginTop: '0.8rem' }}>
            Email
          </div>
          <div style={{ fontSize: '0.95rem' }}>{user.email}</div>

          <div style={{ fontSize: '0.8rem', color: themeColors.textSecondary, marginTop: '0.8rem' }}>
            Role
          </div>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 800,
              backgroundColor: '#10b981',
              color: '#061311',
              padding: '0.2rem 0.55rem',
              borderRadius: '6px',
              textTransform: 'uppercase',
              marginTop: '0.3rem',
            }}
          >
            {user.role}
          </div>
        </div>

        <button
          onClick={onLogout}
          style={{
            width: '100%',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '0.75rem',
            borderRadius: '12px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}