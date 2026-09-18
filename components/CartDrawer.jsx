'use client';

import { useState } from 'react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onProceedToCheckout,
  themeColors,
}) {
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const tax = (subtotal - discount) * 0.08;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const total = subtotal - discount + tax + shipping;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'APEX20') {
      setDiscountPercent(20);
      setCouponError('');
    } else {
      setCouponError('Invalid code (Try "APEX20")');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          backgroundColor: themeColors.surface,
          borderLeft: `1px solid ${themeColors.border}`,
          height: '100%',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Shopping Bag</h2>
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

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxHeight: '44vh',
              overflowY: 'auto',
            }}
          >
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: themeColors.textSecondary }}>
                Your cart is empty.
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: `1px solid ${themeColors.border}`,
                    paddingBottom: '0.85rem',
                  }}
                >
                  <div>
                    <h4 style={{ margin: '0 0 0.2rem', fontSize: '0.95rem' }}>{item.name}</h4>
                    <span style={{ fontSize: '0.85rem', color: themeColors.textSecondary }}>
                      ${item.price} each
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <button
                      onClick={() => onUpdateQuantity(item._id, -1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        border: `1px solid ${themeColors.border}`,
                        background: themeColors.surfaceSubtle,
                        color: themeColors.text,
                        cursor: 'pointer',
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item._id, 1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        border: `1px solid ${themeColors.border}`,
                        background: themeColors.surfaceSubtle,
                        color: themeColors.text,
                        cursor: 'pointer',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Promo Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                style={{
                  flex: 1,
                  backgroundColor: themeColors.surfaceSubtle,
                  border: `1px solid ${themeColors.border}`,
                  padding: '0.5rem 0.8rem',
                  borderRadius: '10px',
                  color: themeColors.text,
                  outline: 'none',
                }}
              />
              <button
                onClick={applyCoupon}
                style={{
                  backgroundColor: themeColors.surfaceSubtle,
                  border: `1px solid ${themeColors.border}`,
                  padding: '0.5rem 0.9rem',
                  borderRadius: '10px',
                  color: themeColors.text,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Apply
              </button>
            </div>
            {couponError && (
              <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.3rem', display: 'block' }}>
                {couponError}
              </span>
            )}
          </div>

          <div
            style={{
              borderTop: `1px solid ${themeColors.border}`,
              paddingTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              fontSize: '0.9rem',
              color: themeColors.textSecondary,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                <span>Discount (20%):</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: themeColors.text,
                marginTop: '0.5rem',
              }}
            >
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={() => onProceedToCheckout({ subtotal, discount, tax, shipping, total })}
            style={{
              width: '100%',
              backgroundColor: cart.length > 0 ? '#10b981' : themeColors.border,
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.9rem',
              fontWeight: 700,
              fontSize: '1rem',
              marginTop: '1.25rem',
              cursor: cart.length > 0 ? 'pointer' : 'not-allowed',
            }}
          >
            Checkout (${total.toFixed(2)})
          </button>
        </div>
      </div>
    </div>
  );
}