import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
import { tokens } from '../theme/tokens';

interface NavbarProps {
  totalItems: number;
  onCartClick: () => void;
  currentPath?: string;
  onLocationsClick?: () => void;
  onVipHubClick?: () => void;
  onOrderNowClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalItems,
  onCartClick,
  currentPath = '/',
  onVipHubClick,
  onOrderNowClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    // Small delay to trigger CSS transition
    requestAnimationFrame(() => {
      setIsAnimating(true);
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsAnimating(false);
    // Wait for CSS transition to complete before removing from DOM
    setTimeout(() => {
      setIsOpen(false);
    }, 320);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    closeMenu();
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Desktop navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu-dashboard' },
    { name: 'Experience', href: '/experience' },
    { name: 'Catering', href: '/catering-dynamic' },
    { name: 'Locations', href: '/locate-us' },
  ];

  // Mobile drawer links
  const mobileLinks = [
    { name: 'Menu', href: '/menu-dashboard' },
    { name: 'Offers', href: '/luxury-offers' },
    { name: 'About', href: '/ingredients' },
    { name: 'Reviews', href: '/experience' },
  ];

  const handleOrderNow = () => {
    closeMenu();
    window.location.href = '/menu-dashboard';
  };

  return (
    <>
      {/* ─── Fixed Top Navbar ─── */}
      <nav
        className="fixed top-0 left-0 z-40 transition-all duration-300"
        style={{
          display: 'flex',
          width: '100vw',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 48px',
          background: 'rgba(18, 18, 20, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(224, 192, 175, 0.15)',
        }}
      >
        {/* ─── Left: Logo ─── */}
        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', alignItems: 'center', maxHeight: '30px', overflow: 'hidden' }}>
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: '20px', color: '#ffb68b', letterSpacing: '-0.02em', textTransform: 'uppercase' as const, lineHeight: 1 }}>
              LUMINA BITES
            </span>
          </a>
        </div>

        {/* ─── Center: Nav Links (≥ 768px) ─── */}
        <div className="hidden md:flex" style={{ flex: 'none', justifyContent: 'center', alignItems: 'center', gap: '32px' }}>
          {navLinks.map((link) => {
            const isCurrent = currentPath === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative cursor-pointer transition-colors duration-200"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  textTransform: 'capitalize' as const,
                  color: isCurrent ? '#ffb68b' : 'rgba(255, 182, 139, 0.7)',
                  borderBottom: isCurrent ? '2px solid #ffb68b' : '2px solid transparent',
                  paddingBottom: '4px',
                  lineHeight: 1,
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => { if (!isCurrent) (e.target as HTMLElement).style.color = '#ffb68b'; }}
                onMouseLeave={(e) => { if (!isCurrent) (e.target as HTMLElement).style.color = 'rgba(255, 182, 139, 0.7)'; }}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* ─── Right: Search + Icons + Order Button ─── */}
        <div className="hidden md:flex" style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'center', gap: '24px' }}>
          
          {/* Search Bar */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', left: '12px', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(224, 192, 175, 0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search menu..."
              className="outline-none transition-all duration-300 placeholder:text-[rgba(224,192,175,0.4)]"
              style={{
                width: '160px',
                padding: '8px 16px 8px 36px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '12px',
                lineHeight: 1,
              }}
            />
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="cursor-pointer transition-colors duration-200"
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,182,139,0.8)', background: 'transparent', border: 'none' }}
            aria-label="Open Shopping Cart"
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffb68b')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,182,139,0.8)')}
          >
            <ShoppingBag size={20} strokeWidth={2} />
            {totalItems > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#ff7a00',
                  color: '#131313',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '10px',
                  fontWeight: 800,
                  border: '2px solid #121214',
                }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Profile Icon */}
          <button
            onClick={onVipHubClick}
            className="cursor-pointer transition-colors duration-200"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,182,139,0.8)', background: 'transparent', border: 'none' }}
            aria-label="Profile"
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffb68b')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,182,139,0.8)')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          {/* Order Now Button */}
          <button
            onClick={onOrderNowClick}
            className="cursor-pointer transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '42px',
              padding: '0 28px',
              borderRadius: '100px',
              backgroundColor: '#f97316',
              color: '#1a0500',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              border: 'none',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            Order Now
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden" style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={openMenu}
            className="cursor-pointer transition-all duration-200"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,182,139,0.8)', background: 'transparent', border: 'none' }}
            aria-label="Open Navigation Menu"
          >
            <Menu size={24} strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* ─── Mobile Drawer Overlay ─── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Backdrop */}
          <div
            onClick={closeMenu}
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              backgroundColor: isAnimating ? 'rgba(0, 0, 0, 0.65)' : 'rgba(0, 0, 0, 0)',
              backdropFilter: isAnimating ? 'blur(6px)' : 'blur(0px)',
            }}
          />

          {/* Drawer Panel — slides from right */}
          <div
            className="absolute top-0 right-0 h-full flex flex-col transition-transform duration-300"
            style={{
              width: 300,
              backgroundColor: '#121214',
              borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
              boxShadow: isAnimating
                ? '-8px 0 48px rgba(255, 122, 0, 0.12), -2px 0 24px rgba(0, 0, 0, 0.6)'
                : 'none',
              transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
              transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
            }}
          >
            {/* ── Drawer Header ── */}
            <div
              className="flex items-center justify-between shrink-0"
              style={{
                height: 80,
                paddingLeft: 24,
                paddingRight: 24,
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Mini Logo */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #ff7a00, #ffb68b)',
                    boxShadow: '0 0 14px rgba(255, 122, 0, 0.3)',
                  }}
                >
                  <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 13, color: '#522300' }}>L</span>
                </div>
                <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 16, color: '#ffffff', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
                  Lumina<span style={{ color: '#ffb68b', fontWeight: 400, textTransform: 'lowercase' as const }}>bites</span>
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={closeMenu}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 122, 0, 0.15)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.05)'; }}
                aria-label="Close Navigation Menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Drawer Body — Links ── */}
            <div className="flex-1 overflow-y-auto" style={{ padding: '32px 24px' }}>
              {/* Section Label */}
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase' as const,
                color: '#ffb68b',
                marginBottom: 28,
              }}>
                Savor Selection
              </p>

              {/* Navigation Links */}
              <div className="flex flex-col" style={{ gap: 4 }}>
                {mobileLinks.map((link, idx) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="flex items-center justify-between cursor-pointer group transition-colors duration-200"
                    style={{
                      padding: '18px 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    }}
                  >
                    <span
                      className="group-hover:text-[#ffb68b] transition-colors duration-200"
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: 16,
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase' as const,
                        color: '#e0c0af',
                      }}
                    >
                      {link.name}
                    </span>
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                      style={{ color: '#ff7a00', opacity: 0.6 }}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Drawer Footer — Order Now CTA ── */}
            <div
              className="shrink-0"
              style={{
                padding: '20px 24px 32px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <button
                onClick={handleOrderNow}
                className="w-full flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-[0.97]"
                style={{
                  height: 52,
                  borderRadius: 26,
                  background: 'linear-gradient(135deg, #ff7a00 0%, #ffb68b 100%)',
                  color: '#522300',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase' as const,
                  boxShadow: '0 6px 24px rgba(255, 122, 0, 0.3)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(255, 122, 0, 0.5)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(255, 122, 0, 0.3)'; }}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
