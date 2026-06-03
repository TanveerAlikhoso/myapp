import React, { useState, useMemo, useRef, useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { useCart, useMenuData, Product } from '@lumina/core';
import {
  Search,
  Flame,
  Pizza,
  Beef,
  Wine,
  Cookie,
  Sparkles,
  Plus,
  Minus,
  ShoppingBag,
  Star,
  X,
  ChevronDown,
  UtensilsCrossed,
} from 'lucide-react';

type Category = Product['category'] | 'all';

const CATEGORIES: { key: Category; label: string; icon: React.ReactNode }[] = [
  { key: 'all',     label: 'All',     icon: <Sparkles size={15} /> },
  { key: 'burgers', label: 'Burgers', icon: <Beef size={15} /> },
  { key: 'pizza',   label: 'Pizza',   icon: <Pizza size={15} /> },
  { key: 'pasta',   label: 'Pasta',   icon: <UtensilsCrossed size={15} /> },
  { key: 'sides',   label: 'Sides',   icon: <Cookie size={15} /> },
  { key: 'drinks',  label: 'Drinks',  icon: <Wine size={15} /> },
];

export default function MenuDashboard() {
  const { products, getPopularProducts } = useMenuData();
  const { cart, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tag?.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy, products]);

  const popularProducts = getPopularProducts();

  const getCartItem = (productId: string) =>
    cart.find((item) => item.id === productId || item.productId === productId);

  const handleAdd = (product: Product) => {
    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      basePrice: product.price,
      price: product.price,
      image: product.image,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 800);
  };

  const handleIncrement = (product: Product) => {
    const item = getCartItem(product.id);
    if (item) updateQuantity(item.id, item.quantity + 1);
    else handleAdd(product);
  };

  const handleDecrement = (product: Product) => {
    const item = getCartItem(product.id);
    if (item) {
      if (item.quantity <= 1) removeFromCart(item.id);
      else updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <AppLayout title="Menu | Lumina Bites">
      <Head>
        <title>Menu | Lumina Bites</title>
        <meta
          name="description"
          content="Explore our premium menu featuring Wagyu burgers, artisan pizzas, hand-rolled pasta, botanical elixirs, and more."
        />
      </Head>

      <div
        style={{
          minHeight: 'calc(100vh - 68px)',
          background: '#0e0e10',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient background glows */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '20%',
            width: '650px',
            height: '650px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,122,0,0.12) 0%, transparent 70%)',
            filter: 'blur(120px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,0,0,0.15) 0%, transparent 70%)',
            filter: 'blur(140px)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Header ── */}
        <header
          style={{
            textAlign: 'center',
            padding: '48px 20px 24px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px',
              color: '#ff7a00',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Curated Selection
          </span>
          <h1
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 900,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '8px 0 0',
            }}
          >
            THE MENU
          </h1>
          <div
            style={{
              width: '64px',
              height: '4px',
              background: '#ff7a00',
              borderRadius: '99px',
              margin: '16px auto 0',
            }}
          />
        </header>

        {/* ── Search + Sort Bar ── */}
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 20px 16px',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Search */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '16px',
                color: 'rgba(255,182,139,0.5)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Search wagyu, truffle, elixir…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '13px 16px 13px 44px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,182,139,0.1)',
                color: '#fff',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(255,182,139,0.3)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(255,182,139,0.1)')
              }
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255,182,139,0.5)',
                  display: 'flex',
                  padding: 0,
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div ref={sortRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '13px 16px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,182,139,0.1)',
                color: 'rgba(255,182,139,0.7)',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'border-color 0.2s',
              }}
            >
              Sort
              <ChevronDown
                size={14}
                style={{
                  transform: showSortDropdown ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                }}
              />
            </button>
            {showSortDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  background: '#1c1b1b',
                  border: '1px solid rgba(255,182,139,0.12)',
                  borderRadius: '14px',
                  padding: '6px',
                  minWidth: '170px',
                  zIndex: 100,
                  boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                }}
              >
                {[
                  { value: 'default' as const, label: 'Default' },
                  { value: 'price-low' as const, label: 'Price: Low → High' },
                  { value: 'price-high' as const, label: 'Price: High → Low' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setShowSortDropdown(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: sortBy === opt.value ? 'rgba(249,115,22,0.1)' : 'transparent',
                      border: 'none',
                      color:
                        sortBy === opt.value ? '#ffb68b' : 'rgba(255,182,139,0.6)',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '12px',
                      fontWeight: sortBy === opt.value ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      if (sortBy !== opt.value)
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    }}
                    onMouseLeave={(e) => {
                      if (sortBy !== opt.value)
                        e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Category Tabs ── */}
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 20px 32px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            className="scrollbar-none"
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '10px 18px',
                    borderRadius: '9999px',
                    border: isActive
                      ? '1px solid #f97316'
                      : '1px solid rgba(255,255,255,0.06)',
                    background: isActive
                      ? 'rgba(249,115,22,0.12)'
                      : 'rgba(255,255,255,0.03)',
                    color: isActive ? '#ffb68b' : 'rgba(255,182,139,0.55)',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '12px',
                    fontWeight: isActive ? 700 : 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(255,182,139,0.2)';
                      e.currentTarget.style.color = '#ffb68b';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.color = 'rgba(255,182,139,0.55)';
                    }
                  }}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Popular Picks (only when 'all' and no search) ── */}
        {activeCategory === 'all' && !searchQuery && (
          <section
            style={{
              maxWidth: '1280px',
              margin: '0 auto 40px',
              padding: '0 20px',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              <Flame size={18} style={{ color: '#f97316' }} />
              <h2
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                }}
              >
                Popular Picks
              </h2>
            </div>
            <div
              className="scrollbar-none"
              style={{
                display: 'flex',
                gap: '16px',
                overflowX: 'auto',
                paddingBottom: '8px',
              }}
            >
              {popularProducts.slice(0, 8).map((product) => {
                const cartItem = getCartItem(product.id);
                return (
                  <div
                    key={product.id}
                    style={{
                      flexShrink: 0,
                      width: '220px',
                      borderRadius: '24px',
                      background: 'rgba(28,27,27,0.5)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      overflow: 'hidden',
                      transition: 'border-color 0.3s, transform 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,182,139,0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        height: '140px',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        loading="lazy"
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '50%',
                          background:
                            'linear-gradient(to top, rgba(14,14,16,0.9) 0%, transparent 100%)',
                        }}
                      />
                      {product.tag && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,182,139,0.15)',
                            color: '#ffb68b',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '9px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                          }}
                        >
                          {product.tag}
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '14px 16px 16px' }}>
                      <h3
                        style={{
                          fontFamily: 'Sora, sans-serif',
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#fff',
                          marginBottom: '4px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {product.name}
                      </h3>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'Sora, sans-serif',
                            fontSize: '16px',
                            fontWeight: 900,
                            color: '#ffb68b',
                          }}
                        >
                          ${product.price.toFixed(2)}
                        </span>
                        {cartItem ? (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDecrement(product);
                              }}
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                background: 'rgba(249,115,22,0.15)',
                                border: '1px solid rgba(249,115,22,0.3)',
                                color: '#ffb68b',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0,
                              }}
                            >
                              <Minus size={13} />
                            </button>
                            <span
                              style={{
                                fontFamily: 'Sora, sans-serif',
                                fontSize: '13px',
                                fontWeight: 800,
                                color: '#fff',
                                minWidth: '18px',
                                textAlign: 'center',
                              }}
                            >
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleIncrement(product);
                              }}
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                background: '#f97316',
                                border: 'none',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0,
                              }}
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAdd(product);
                            }}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: addedId === product.id ? '#16a34a' : '#f97316',
                              border: 'none',
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'background 0.3s, transform 0.15s',
                              transform: addedId === product.id ? 'scale(1.15)' : 'scale(1)',
                              padding: 0,
                            }}
                          >
                            <Plus size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Product Grid ── */}
        <section
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 20px 100px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {activeCategory === 'all' && !searchQuery && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              <Star size={18} style={{ color: '#ffb68b' }} />
              <h2
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                }}
              >
                Full Menu
              </h2>
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '11px',
                  color: 'rgba(255,182,139,0.5)',
                  fontWeight: 600,
                }}
              >
                ({filteredProducts.length} items)
              </span>
            </div>
          )}

          {searchQuery && (
            <div style={{ marginBottom: '20px' }}>
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '13px',
                  color: 'rgba(255,182,139,0.6)',
                }}
              >
                {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "
                <span style={{ color: '#ffb68b', fontWeight: 600 }}>{searchQuery}</span>"
              </span>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
              }}
            >
              <UtensilsCrossed
                size={48}
                style={{ color: 'rgba(255,182,139,0.2)', margin: '0 auto 16px' }}
              />
              <p
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                No dishes found
              </p>
              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '13px',
                  color: 'rgba(255,182,139,0.4)',
                  marginTop: '8px',
                }}
              >
                Try a different search or category
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {filteredProducts.map((product) => {
                const cartItem = getCartItem(product.id);
                const isJustAdded = addedId === product.id;
                return (
                  <div
                    key={product.id}
                    style={{
                      borderRadius: '28px',
                      background: 'rgba(28,27,27,0.45)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      overflow: 'hidden',
                      transition: 'border-color 0.3s, transform 0.25s, box-shadow 0.3s',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,182,139,0.15)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow =
                        '0 16px 48px rgba(255,122,0,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        position: 'relative',
                        height: '200px',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s',
                        }}
                        loading="lazy"
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = 'scale(1.06)')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = 'scale(1)')
                        }
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '60%',
                          background:
                            'linear-gradient(to top, rgba(14,14,16,0.95) 0%, transparent 100%)',
                        }}
                      />
                      {product.tag && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '12px',
                            left: '12px',
                            padding: '5px 12px',
                            borderRadius: '9999px',
                            background: 'rgba(0,0,0,0.55)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,182,139,0.15)',
                            color: '#ffb68b',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '9px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                          }}
                        >
                          {product.tag}
                        </span>
                      )}
                      {/* Category pill */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          padding: '5px 10px',
                          borderRadius: '9999px',
                          background: 'rgba(255,255,255,0.06)',
                          backdropFilter: 'blur(8px)',
                          color: 'rgba(255,255,255,0.5)',
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: '9px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {product.category}
                      </span>
                    </div>

                    {/* Details */}
                    <div
                      style={{
                        padding: '18px 20px 20px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'Sora, sans-serif',
                          fontSize: '16px',
                          fontWeight: 700,
                          color: '#fff',
                          marginBottom: '6px',
                        }}
                      >
                        {product.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: '12px',
                          color: 'rgba(224,192,175,0.6)',
                          lineHeight: 1.6,
                          flex: 1,
                          marginBottom: '16px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {product.description}
                      </p>

                      {/* Price + Cart Controls */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '14px',
                          borderTop: '1px solid rgba(255,255,255,0.04)',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'Sora, sans-serif',
                            fontSize: '20px',
                            fontWeight: 900,
                            color: '#ffb68b',
                          }}
                        >
                          ${product.price.toFixed(2)}
                        </span>

                        {cartItem ? (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              background: 'rgba(249,115,22,0.08)',
                              borderRadius: '9999px',
                              padding: '4px 6px',
                              border: '1px solid rgba(249,115,22,0.2)',
                            }}
                          >
                            <button
                              onClick={() => handleDecrement(product)}
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: 'rgba(249,115,22,0.15)',
                                border: 'none',
                                color: '#ffb68b',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0,
                                transition: 'background 0.15s',
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background =
                                  'rgba(249,115,22,0.25)')
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background =
                                  'rgba(249,115,22,0.15)')
                              }
                            >
                              <Minus size={14} />
                            </button>
                            <span
                              style={{
                                fontFamily: 'Sora, sans-serif',
                                fontSize: '14px',
                                fontWeight: 800,
                                color: '#fff',
                                minWidth: '22px',
                                textAlign: 'center',
                              }}
                            >
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => handleIncrement(product)}
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: '#f97316',
                                border: 'none',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                padding: 0,
                                transition: 'background 0.15s, transform 0.1s',
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background = '#ea6c0a')
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background = '#f97316')
                              }
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAdd(product)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '7px',
                              padding: '10px 18px',
                              borderRadius: '9999px',
                              background: isJustAdded
                                ? 'linear-gradient(135deg, #16a34a, #22c55e)'
                                : 'linear-gradient(135deg, #f97316, #ff8c3a)',
                              border: 'none',
                              color: '#fff',
                              fontFamily: 'Montserrat, sans-serif',
                              fontSize: '11px',
                              fontWeight: 700,
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase',
                              cursor: 'pointer',
                              transition:
                                'background 0.3s, transform 0.15s, box-shadow 0.2s',
                              boxShadow: '0 4px 16px rgba(249,115,22,0.3)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.04)';
                              e.currentTarget.style.boxShadow =
                                '0 6px 24px rgba(249,115,22,0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow =
                                '0 4px 16px rgba(249,115,22,0.3)';
                            }}
                            onMouseDown={(e) =>
                              (e.currentTarget.style.transform = 'scale(0.96)')
                            }
                            onMouseUp={(e) =>
                              (e.currentTarget.style.transform = 'scale(1.04)')
                            }
                          >
                            <Plus size={14} />
                            {isJustAdded ? 'Added!' : 'Add'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Floating Cart Summary ── */}
        {totalItems > 0 && (
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9998,
              width: '92%',
              maxWidth: '480px',
            }}
          >
            <button
              onClick={() => {
                const router = (window as any).__NEXT_DATA__?.page;
                window.location.href = '/checkout';
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #f97316, #ea6c0a)',
                border: 'none',
                cursor: 'pointer',
                boxShadow:
                  '0 8px 32px rgba(249,115,22,0.4), 0 0 0 1px rgba(255,182,139,0.2) inset',
                transition: 'transform 0.15s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) scale(1.02)';
                e.currentTarget.style.boxShadow =
                  '0 12px 40px rgba(249,115,22,0.5), 0 0 0 1px rgba(255,182,139,0.3) inset';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
                e.currentTarget.style.boxShadow =
                  '0 8px 32px rgba(249,115,22,0.4), 0 0 0 1px rgba(255,182,139,0.2) inset';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShoppingBag size={18} style={{ color: '#fff' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <span
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#fff',
                      display: 'block',
                    }}
                  >
                    View Cart
                  </span>
                  <span
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '11px',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {totalItems} item{totalItems !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <span
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '18px',
                  fontWeight: 900,
                  color: '#fff',
                }}
              >
                ${totalPrice.toFixed(2)}
              </span>
            </button>
          </div>
        )}

        {/* ── Footer ── */}
        <footer
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            padding: '32px 20px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            © 2026 Lumina Bites. Premium Fast Luxury Dining.
          </p>
        </footer>
      </div>
    </AppLayout>
  );
}
