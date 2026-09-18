'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import OrderHistoryView from '../components/OrderHistoryView';
import AdminDashboard from '../components/AdminDashboard';
import UserProfileModal from '../components/UserProfileModal';
import Toast from '../components/Toast';

const Ecommerce3DModel = dynamic(() => import('../components/Ecommerce3DModel'), { ssr: false });

const INITIAL_MOCK_PRODUCTS = [
  {
    _id: '1',
    name: 'Acoustic Pro Headphones',
    description: 'Active noise cancellation with high-fidelity studio response.',
    price: 199.99,
    category: 'Audio',
    stock: 12,
    ratings: 4.9,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'],
  },
  {
    _id: '2',
    name: 'Chronograph Minimalist Watch',
    description: 'Sapphire crystal glass casing with premium Italian leather band.',
    price: 149.0,
    category: 'Accessories',
    stock: 7,
    ratings: 4.7,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'],
  },
  {
    _id: '3',
    name: 'Mechanical Tactile Keyboard',
    description: 'Hot-swappable custom switches with RGB matrix backlighting.',
    price: 129.5,
    category: 'Computing',
    stock: 19,
    ratings: 4.8,
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600'],
  },
  {
    _id: '4',
    name: 'Trail Running Sneakers',
    description: 'Ultra-lightweight weatherproof woven knit with traction grip.',
    price: 159.0,
    category: 'Footwear',
    stock: 5,
    ratings: 4.6,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'],
  },
];

export default function Page() {
  const [products, setProducts] = useState(INITIAL_MOCK_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState({ name: 'Alex Johnson', email: 'alex@example.com', role: 'admin' });

  const [currentView, setCurrentView] = useState('store');
  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [calculations, setCalculations] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Emerald & Cyber Jade Palette
  const themeColors = {
    bg: isDark ? '#061311' : '#f0fdf4',
    surface: isDark ? '#0b1e1b' : '#ffffff',
    surfaceSubtle: isDark ? '#132d29' : '#e6f7ed',
    border: isDark ? '#1f433d' : '#bbf7d0',
    text: isDark ? '#f0fdf4' : '#052e16',
    textSecondary: isDark ? '#6ee7b7' : '#166534',
    primary: '#10b981',
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  };

  useEffect(() => {
    const savedProducts = localStorage.getItem('apex_products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch {
        setProducts(INITIAL_MOCK_PRODUCTS);
      }
    }
    const savedCart = localStorage.getItem('apex_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedOrders = localStorage.getItem('apex_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('apex_products', JSON.stringify(products));
    localStorage.setItem('apex_cart', JSON.stringify(cart));
    localStorage.setItem('apex_orders', JSON.stringify(orders));
  }, [products, cart, orders]);

  const handleAddToCart = (product) => {
    const existing = cart.find((i) => i._id === product._id);
    if (existing) {
      setCart(cart.map((i) => (i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i)));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    showToast(`Added "${product.name}" to cart!`);
  };

  const handleUpdateQuantity = (id, delta) => {
    setCart(
      cart
        .map((item) => (item._id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleToggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((i) => i !== id));
      showToast('Removed from favorites');
    } else {
      setWishlist([...wishlist, id]);
      showToast('Added to favorites ♥');
    }
  };

  const handleProceedToCheckout = (calcs) => {
    setCalculations(calcs);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleConfirmOrder = ({ address, paymentMethod, calculations: calcs }) => {
    const newOrder = {
      _id: 'ord_' + Math.floor(100000 + Math.random() * 900000),
      items: [...cart],
      shippingAddress: address,
      paymentMethod,
      total: calcs.total,
      subtotal: calcs.subtotal,
      status: 'Processing',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 4 * 86400000).toISOString(),
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setCheckoutOpen(false);
    setCurrentView('orders');
    showToast('Order confirmed and dispatched!');
  };

  const handleCancelOrder = (orderId) => {
    setOrders(orders.map((o) => ((o._id || o.id) === orderId ? { ...o, status: 'Cancelled' } : o)));
    showToast('Order marked as cancelled', 'error');
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map((o) => ((o._id || o.id) === orderId ? { ...o, status: newStatus } : o)));
    showToast(`Order status updated to ${newStatus}`);
  };

  const filteredProducts = products
    .filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'All' || p.category === category;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.ratings || 0) - (a.ratings || 0);
      return 0;
    });

  const cartTotalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      style={{
        backgroundColor: themeColors.bg,
        color: themeColors.text,
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cartTotalUnits}
        onOpenCart={() => setCartOpen(true)}
        user={user}
        onOpenProfile={() => setProfileOpen(true)}
        theme={theme}
        setTheme={setTheme}
        themeColors={themeColors}
      />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {currentView === 'store' && (
          <>
            <section
              style={{
                backgroundColor: themeColors.surface,
                border: `1px solid ${themeColors.border}`,
                borderRadius: '24px',
                padding: '1.75rem 2rem',
                marginBottom: '2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <div>
                <span
                  style={{
                    color: '#10b981',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Next-Gen Storefront
                </span>
                <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.4rem 0', letterSpacing: '-0.02em' }}>
                  Engineered Hardware &amp; Lifestyle
                </h1>
                <p style={{ color: themeColors.textSecondary, fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
                  Discover performance devices with real-time stock allocation and 3D preview.
                </p>
              </div>
              <div style={{ height: '180px' }}>
                <Ecommerce3DModel cartItemCount={cartTotalUnits} isDark={isDark} />
              </div>
            </section>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.75rem',
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', flex: 1 }}>
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    backgroundColor: themeColors.surface,
                    border: `1px solid ${themeColors.border}`,
                    borderRadius: '12px',
                    padding: '0.65rem 1rem',
                    color: themeColors.text,
                    outline: 'none',
                    maxWidth: '260px',
                    width: '100%',
                  }}
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    backgroundColor: themeColors.surface,
                    border: `1px solid ${themeColors.border}`,
                    borderRadius: '12px',
                    padding: '0.65rem 1rem',
                    color: themeColors.text,
                    outline: 'none',
                  }}
                >
                  <option value="All">All Categories</option>
                  <option value="Audio">Audio</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Computing">Computing</option>
                  <option value="Footwear">Footwear</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    backgroundColor: themeColors.surface,
                    border: `1px solid ${themeColors.border}`,
                    borderRadius: '12px',
                    padding: '0.65rem 1rem',
                    color: themeColors.text,
                    outline: 'none',
                  }}
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <span style={{ fontSize: '0.85rem', color: themeColors.textSecondary }}>
                Showing {filteredProducts.length} items
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  themeColors={themeColors}
                  onAddToCart={handleAddToCart}
                  onQuickView={setQuickViewProduct}
                  isWishlisted={wishlist.includes(product._id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          </>
        )}

        {currentView === 'orders' && (
          <OrderHistoryView orders={orders} onCancelOrder={handleCancelOrder} themeColors={themeColors} />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            products={products}
            orders={orders}
            onOpenProductModal={() => showToast('Product creator modal')}
            onEditProduct={(p) => showToast(`Editing ${p.name}`)}
            onDeleteProduct={(id) => {
              setProducts(products.filter((p) => (p._id || p.id) !== id));
              showToast('Product removed');
            }}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            themeColors={themeColors}
          />
        )}
      </main>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onProceedToCheckout={handleProceedToCheckout}
        themeColors={themeColors}
      />

      <QuickViewModal
        isOpen={Boolean(quickViewProduct)}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        themeColors={themeColors}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        calculations={calculations}
        onConfirmOrder={handleConfirmOrder}
        themeColors={themeColors}
      />

      <UserProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        onLogout={() => {
          setUser(null);
          setProfileOpen(false);
          showToast('Signed out');
        }}
        themeColors={themeColors}
      />
    </div>
  );
}