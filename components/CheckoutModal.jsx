'use client';

import { useState } from 'react';

export default function CheckoutModal({ isOpen, onClose, calculations, onConfirmOrder, themeColors }) {
  const [address, setAddress] = useState({
    street: '124 Innovation Way',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
  });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmOrder({ address, paymentMethod, calculations });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 70,
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
          maxWidth: '520px',
          width: '100%',
          padding: '2rem',
        }}
      >
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 1.25rem' }}>
          Delivery &amp; Payment
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: themeColors.textSecondary }}>
              Street Address
            </label>
            <input
              type="text"
              required
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              style={{
                width: '100%',
                backgroundColor: themeColors.surfaceSubtle,
                border: `1px solid ${themeColors.border}`,
                padding: '0.65rem',
                borderRadius: '10px',
                color: themeColors.text,
                marginTop: '0.35rem',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.75rem' }}>
            <input
              type="text"
              placeholder="City"
              required
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              style={{
                backgroundColor: themeColors.surfaceSubtle,
                border: `1px solid ${themeColors.border}`,
                padding: '0.65rem',
                borderRadius: '10px',
                color: themeColors.text,
              }}
            />
            <input
              type="text"
              placeholder="State"
              required
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              style={{
                backgroundColor: themeColors.surfaceSubtle,
                border: `1px solid ${themeColors.border}`,
                padding: '0.65rem',
                borderRadius: '10px',
                color: themeColors.text,
              }}
            />
            <input
              type="text"
              placeholder="ZIP"
              required
              value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
              style={{
                backgroundColor: themeColors.surfaceSubtle,
                border: `1px solid ${themeColors.border}`,
                padding: '0.65rem',
                borderRadius: '10px',
                color: themeColors.text,
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: themeColors.textSecondary }}>
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: themeColors.surfaceSubtle,
                border: `1px solid ${themeColors.border}`,
                padding: '0.65rem',
                borderRadius: '10px',
                color: themeColors.text,
                marginTop: '0.35rem',
              }}
            >
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '0.8rem',
            }}
          >
            <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>
              Due: ${calculations?.total.toFixed(2)}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'none',
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
                  backgroundColor: '#10b981',
                  color: '#fff',
                  border: 'none',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}