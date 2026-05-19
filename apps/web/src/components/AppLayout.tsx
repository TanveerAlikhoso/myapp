import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ShoppingBag, Menu, X, Search, User, ChevronRight } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const navLinks = [
  { name: 'Home',       href: '/' },
  { name: 'Menu',       href: '/menu-dashboard' },
  { name: 'Experience', href: '/experience' },
  { name: 'Catering',   href: '/catering-dynamic' },
  { name: 'Locate',     href: '/locate-us' },
];

const mobileLinks = [
  { name: 'Home',             href: '/' },
  { name: 'Menu',             href: '/menu-dashboard' },
  { name: 'Experience',       href: '/experience' },
  { name: 'Catering',         href: '/catering-dynamic' },
  { name: 'Locate Us',        href: '/locate-us' },
  { name: 'Luxury Offers',    href: '/luxury-offers' },
  { name: 'My Profile',       href: '/my-profile' },
  { name: 'Ingredients',      href: '/ingredients' },
  { name: 'Order Tracking',   href: '/order-tracking' },
];

export default function AppLayout({ children, title }: AppLayoutProps) {
  const router = useRouter();
  const [cartCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  // Lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeDrawer(); setSearchOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openDrawer = () => {
    setIsDrawerOpen(true);
    requestAnimationFrame(() => setIsAnimating(true));
  };
  const closeDrawer = () => {
    setIsAnimating(false);
    setTimeout(() => setIsDrawerOpen(false), 320);
  };

  const navigate = (href: string) => {
    closeDrawer();
    router.push(href);
  };

  const isCurrent = (href: string) => router.pathname === href;

  return (
    <div style={{ minHeight: '100vh', background: '#0e0e10' }}>
      {/* ── Navbar ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          height: '68px',
          background: 'rgba(14, 14, 16, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,182,139,0.1)',
          boxSizing: 'border-box',
        }}
      >
        {/* LEFT: Logo */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', gap: 8,
            flexShrink: 0,
          }}
          aria-label="Go Home"
        >
          {/* Flame icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 7 8 7 13a5 5 0 0 0 10 0c0-2.5-2-5-2-5s-1 3-3 3c0-3 3-6 3-6z" fill="#f97316" opacity="0.9"/>
            <path d="M12 17.5A2.5 2.5 0 0 1 9.5 15c0-1.5 1.5-3 1.5-3s.5 1.5 1.5 1.5c0-1.5 1.5-3 1.5-3S14.5 12 14.5 15A2.5 2.5 0 0 1 12 17.5z" fill="#ffb68b"/>
          </svg>
          <span
            style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 900,
              fontSize: '18px',
              color: '#ffb68b',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}
          >
            Lumina Bites
          </span>
        </button>

        {/* CENTER: Nav Links — desktop only */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '36px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          className="desktop-nav"
        >
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={() => navigate(link.href)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: isCurrent(link.href) ? '2px solid #f97316' : '2px solid transparent',
                cursor: 'pointer',
                padding: '4px 0',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                fontWeight: isCurrent(link.href) ? 700 : 600,
                color: isCurrent(link.href) ? '#ffb68b' : 'rgba(255,182,139,0.65)',
                letterSpacing: '0.04em',
                transition: 'color 0.2s, border-color 0.2s',
                whiteSpace: 'nowrap',
                lineHeight: 1,
              }}
              onMouseEnter={e => {
                if (!isCurrent(link.href)) (e.currentTarget as HTMLElement).style.color = '#ffb68b';
              }}
              onMouseLeave={e => {
                if (!isCurrent(link.href)) (e.currentTarget as HTMLElement).style.color = 'rgba(255,182,139,0.65)';
              }}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* RIGHT: Search + Icons + CTA */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}
        >
          {/* Search — desktop */}
          <div className="desktop-nav" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {searchOpen ? (
              <input
                autoFocus
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search menu…"
                style={{
                  width: '160px',
                  padding: '7px 14px 7px 34px',
                  borderRadius: '9999px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,182,139,0.2)',
                  color: '#fff',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '12px',
                  outline: 'none',
                }}
                onBlur={() => { if (!searchVal) setSearchOpen(false); }}
              />
            ) : null}
            <button
              onClick={() => setSearchOpen(s => !s)}
              style={{
                position: searchOpen ? 'absolute' : 'relative',
                left: searchOpen ? '10px' : 'auto',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(255,182,139,0.7)',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
              }}
              aria-label="Search"
            >
              <Search size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Cart */}
          <button
            onClick={() => navigate('/checkout')}
            aria-label="Cart"
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,182,139,0.7)',
              display: 'flex',
              alignItems: 'center',
              padding: 0,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffb68b')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,182,139,0.7)')}
          >
            <ShoppingBag size={20} strokeWidth={2} />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  width: '17px',
                  height: '17px',
                  borderRadius: '50%',
                  background: '#f97316',
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #0e0e10',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile — desktop only */}
          <button
            className="desktop-nav"
            onClick={() => navigate('/my-profile')}
            aria-label="Profile"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,182,139,0.7)',
              display: 'flex',
              alignItems: 'center',
              padding: 0,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffb68b')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,182,139,0.7)')}
          >
            <User size={20} strokeWidth={2} />
          </button>

          {/* Order Now — desktop */}
          <button
            className="desktop-nav"
            onClick={() => navigate('/menu-dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '40px',
              padding: '0 24px',
              borderRadius: '9999px',
              background: '#f97316',
              color: '#fff',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ea6c0a'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#f97316'; }}
            onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.96)'; }}
            onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >
            Order Now
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="mobile-menu-btn"
            onClick={openDrawer}
            aria-label="Open menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,182,139,0.8)',
              alignItems: 'center',
              padding: 0,
            }}
          >
            <Menu size={24} strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {isDrawerOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 99999 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            onClick={closeDrawer}
            style={{
              position: 'absolute',
              inset: 0,
              background: isAnimating ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0)',
              backdropFilter: isAnimating ? 'blur(6px)' : 'none',
              transition: 'background 0.3s, backdrop-filter 0.3s',
            }}
          />
          {/* Panel */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              width: '300px',
              background: '#121214',
              borderLeft: '1px solid rgba(255,182,139,0.08)',
              display: 'flex',
              flexDirection: 'column',
              transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.32s cubic-bezier(0.32, 0, 0.67, 0)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                borderBottom: '1px solid rgba(255,182,139,0.08)',
              }}
            >
              <span
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: 800,
                  fontSize: '16px',
                  color: '#ffb68b',
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                }}
              >
                Lumina Bites
              </span>
              <button
                onClick={closeDrawer}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,182,139,0.6)', display: 'flex' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <nav style={{ padding: '12px 0', flex: 1, overflowY: 'auto' }}>
              {mobileLinks.map(link => (
                <button
                  key={link.name}
                  onClick={() => navigate(link.href)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 24px',
                    background: isCurrent(link.href) ? 'rgba(249,115,22,0.08)' : 'none',
                    border: 'none',
                    borderLeft: isCurrent(link.href) ? '3px solid #f97316' : '3px solid transparent',
                    cursor: 'pointer',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '14px',
                    fontWeight: isCurrent(link.href) ? 700 : 500,
                    color: isCurrent(link.href) ? '#ffb68b' : 'rgba(255,182,139,0.65)',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                >
                  {link.name}
                  <ChevronRight size={16} style={{ opacity: 0.4 }} />
                </button>
              ))}
            </nav>

            {/* Order Now CTA */}
            <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,182,139,0.08)' }}>
              <button
                onClick={() => navigate('/menu-dashboard')}
                style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '9999px',
                  background: '#f97316',
                  color: '#fff',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page Content ── */}
      <main style={{ paddingTop: '68px', minHeight: '100vh' }}>
        {children}
      </main>

      {/* ── Global Styles ── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0e0e10; }
      `}</style>
    </div>
  );
}
