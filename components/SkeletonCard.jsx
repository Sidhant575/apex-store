'use client';

export default function SkeletonCard({ themeColors }) {
  return (
    <div
      style={{
        backgroundColor: themeColors.surface,
        border: `1px solid ${themeColors.border}`,
        borderRadius: '20px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '190px',
          borderRadius: '14px',
          backgroundColor: themeColors.surfaceSubtle,
          animation: 'pulse 1.5s infinite',
        }}
      />
      <div style={{ width: '40%', height: '14px', backgroundColor: themeColors.surfaceSubtle }} />
      <div style={{ width: '85%', height: '18px', backgroundColor: themeColors.surfaceSubtle }} />
      <div style={{ width: '60%', height: '14px', backgroundColor: themeColors.surfaceSubtle }} />
    </div>
  );
}