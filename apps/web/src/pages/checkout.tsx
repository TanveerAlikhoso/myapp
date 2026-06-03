import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AppLayout from '../components/AppLayout';
import { useCart } from '@lumina/core';
import {
  MapPin,
  Clock,
  CreditCard,
  CheckCircle2,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Info,
  ChevronRight,
  Edit2
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [deliveryTime, setDeliveryTime] = useState<'asap' | 'later'>('asap');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');
  const [cardName, setCardName] = useState('ALEXANDER VANCE');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const DELIVERY_FEE = 5.00;
  const PACKAGING_FEE = 3.00;
  const finalTotal = totalPrice + DELIVERY_FEE + PACKAGING_FEE;

  const handleConfirm = () => {
    if (cart.length === 0) return;
    // Route to confirmation
    router.push('/order-confirmation');
    // Clear cart after navigation
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  return (
    <AppLayout title="Checkout | Lumina Bites">
      <Head>
        <title>Checkout | Lumina Bites</title>
        <meta name="description" content="Complete your premium gastronomy order at Lumina Bites." />
      </Head>

      <div
        style={{
          minHeight: 'calc(100vh - 68px)',
          background: '#0e0e10',
          position: 'relative',
          overflow: 'hidden',
          padding: '48px 20px',
        }}
      >
        {/* Ambient background glows */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,122,0,0.08) 0%, transparent 70%)',
            filter: 'blur(100px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '5%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,0,0,0.1) 0%, transparent 70%)',
            filter: 'blur(120px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <header style={{ marginBottom: '40px' }}>
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '11px',
                color: '#ff7a00',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 700,
                display: 'block',
                marginBottom: '8px'
              }}
            >
              Bespoke Transaction
            </span>
            <h1
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 900,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Checkout
            </h1>
            <div style={{ width: '48px', height: '4px', background: '#ff7a00', borderRadius: '99px', marginTop: '12px' }} />
          </header>

          <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
            {/* Left Column: Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Delivery Address Section */}
              <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={20} color="#ff7a00" />
                  <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Delivery Address
                  </h2>
                </div>
                <div
                  style={{
                    background: 'rgba(25, 25, 25, 0.4)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,182,139,0.08)',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                  }}
                  className="card-hover-effect"
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#ff7a00', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                        Current Location
                      </span>
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', color: '#fff', fontWeight: 600, margin: '0 0 4px 0' }}>
                        1200 Luxury Plaza, Penthouse 4
                      </p>
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: 'rgba(255,182,139,0.6)', margin: 0 }}>
                        Beverly Hills, CA 90210
                      </p>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ff7a00',
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: 0,
                          marginTop: '16px',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ffb68b')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#ff7a00')}
                      >
                        <Edit2 size={12} /> Change Address
                      </button>
                    </div>

                    <div
                      style={{
                        width: '100%',
                        maxWidth: '240px',
                        height: '120px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative',
                        border: '1px solid rgba(255,182,139,0.15)',
                      }}
                    >
                      <img
                        style={{ width: '100%', height: '100%', objectCover: 'cover' } as any}
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2wrLFPLDB-OVZQHeJsJCzcMVnzlbuEthbWGhBf9KD81u3oSM01LMMpzXqfjuV9ttlKESfiU8pzwFUNxpd8yG5TYzbHHd0o4ZNUmi0iFir7UN3T4FOWA78UCuE8l5qF3ByjOB_cfzsGNol3SmXKpUK6ZNUuBVE3v7df2J19A7DKxRSTcu_uOmusJzv7-y4p1yuC9QEPh5c6V9Am7WUfAdH5VqmIz47Gh8dmq_Kvxq2vTUAj9q9P__b1bECol2WsrW5p_7VXP_wVYMN"
                        alt="Map Coordinates"
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,14,16,0.7), transparent)' }} />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: '10px',
                          background: '#ff7a00',
                          color: '#fff',
                          fontSize: '9px',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        }}
                      >
                        Selected
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Delivery Time Section */}
              <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={20} color="#ff7a00" />
                  <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Delivery Time
                  </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <label
                    style={{
                      cursor: 'pointer',
                      background: deliveryTime === 'asap' ? 'rgba(255,122,0,0.06)' : 'rgba(25, 25, 25, 0.4)',
                      border: deliveryTime === 'asap' ? '2px solid #ff7a00' : '2px solid rgba(255,182,139,0.08)',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      transition: 'all 0.2s',
                    }}
                  >
                    <input
                      type="radio"
                      name="deliveryTime"
                      checked={deliveryTime === 'asap'}
                      onChange={() => setDeliveryTime('asap')}
                      style={{ display: 'none' }}
                    />
                    <div>
                      <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 4px 0' }}>ASAP</h3>
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: 'rgba(255,182,139,0.6)', margin: 0 }}>25 - 35 mins</p>
                    </div>
                    {deliveryTime === 'asap' && <CheckCircle2 size={18} color="#ff7a00" />}
                  </label>

                  <label
                    style={{
                      cursor: 'pointer',
                      background: deliveryTime === 'later' ? 'rgba(255,122,0,0.06)' : 'rgba(25, 25, 25, 0.4)',
                      border: deliveryTime === 'later' ? '2px solid #ff7a00' : '2px solid rgba(255,182,139,0.08)',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      transition: 'all 0.2s',
                    }}
                  >
                    <input
                      type="radio"
                      name="deliveryTime"
                      checked={deliveryTime === 'later'}
                      onChange={() => setDeliveryTime('later')}
                      style={{ display: 'none' }}
                    />
                    <div>
                      <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 4px 0' }}>Schedule</h3>
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: 'rgba(255,182,139,0.6)', margin: 0 }}>Choose for later</p>
                    </div>
                    {deliveryTime === 'later' && <CheckCircle2 size={18} color="#ff7a00" />}
                  </label>
                </div>
              </section>

              {/* Payment Method Section */}
              <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CreditCard size={20} color="#ff7a00" />
                  <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Payment Method
                  </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                  {/* Apple Pay */}
                  <div
                    onClick={() => setPaymentMethod('apple')}
                    style={{
                      cursor: 'pointer',
                      background: paymentMethod === 'apple' ? 'rgba(255,122,0,0.06)' : 'rgba(25, 25, 25, 0.4)',
                      border: paymentMethod === 'apple' ? '2px solid #ff7a00' : '2px solid rgba(255,182,139,0.08)',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#000', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Sora, sans-serif' }}></span>
                    </div>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 700, color: '#fff' }}>Apple Pay</span>
                  </div>

                  {/* Credit Card */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      cursor: 'pointer',
                      background: paymentMethod === 'card' ? 'rgba(255,122,0,0.06)' : 'rgba(25, 25, 25, 0.4)',
                      border: paymentMethod === 'card' ? '2px solid #ff7a00' : '2px solid rgba(255,182,139,0.08)',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '16px',
                      minHeight: '110px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <CreditCard size={24} color="#ffb955" />
                      {paymentMethod === 'card' && <CheckCircle2 size={16} color="#ff7a00" />}
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 700, color: '#fff', margin: '0 0 2px 0', letterSpacing: '2px' }}>•••• 8829</p>
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700, color: 'rgba(255,182,139,0.5)', textTransform: 'uppercase', margin: 0 }}>Lumina Reserve Card</p>
                    </div>
                  </div>

                  {/* Google Pay */}
                  <div
                    onClick={() => setPaymentMethod('google')}
                    style={{
                      cursor: 'pointer',
                      background: paymentMethod === 'google' ? 'rgba(255,122,0,0.06)' : 'rgba(25, 25, 25, 0.4)',
                      border: paymentMethod === 'google' ? '2px solid #ff7a00' : '2px solid rgba(255,182,139,0.08)',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#ea4335', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Sora, sans-serif' }}>G</span>
                    </div>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 700, color: '#fff' }}>Google Pay</span>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div
                    style={{
                      background: 'rgba(25, 25, 25, 0.4)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,182,139,0.08)',
                      borderRadius: '16px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      marginTop: '8px'
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: 'rgba(255,182,139,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cardholder Name</label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,182,139,0.1)',
                            borderRadius: '8px',
                            padding: '12px',
                            color: '#fff',
                            fontSize: '13px',
                            fontFamily: 'Montserrat, sans-serif',
                            outline: 'none',
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: 'rgba(255,182,139,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,182,139,0.1)',
                            borderRadius: '8px',
                            padding: '12px',
                            color: '#fff',
                            fontSize: '13px',
                            fontFamily: 'Montserrat, sans-serif',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Right Column: Order Summary */}
            <div>
              <aside
                style={{
                  background: 'rgba(25, 25, 25, 0.5)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,182,139,0.12)',
                  borderRadius: '24px',
                  padding: '32px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  position: 'sticky',
                  top: '100px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#fff',
                    margin: '0 0 24px 0',
                    borderBottom: '1px solid rgba(255,182,139,0.1)',
                    paddingBottom: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                  }}
                >
                  Order Summary
                </h3>

                {/* Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
                  {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                      <ShoppingBag size={40} color="rgba(255,182,139,0.2)" />
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,182,139,0.5)', margin: 0 }}>
                        Your cart is empty
                      </p>
                      <button
                        onClick={() => router.push('/menu-dashboard')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ff7a00',
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          padding: 0,
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ffb68b')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#ff7a00')}
                      >
                        Browse Menu →
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          gap: '16px',
                          alignItems: 'center',
                          borderBottom: '1px solid rgba(255,182,139,0.05)',
                          paddingBottom: '16px',
                        }}
                      >
                        <div
                          style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,182,139,0.1)',
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              // Replace broken images
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop';
                            }}
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                            <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 700, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {item.name}
                            </h4>
                            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 700, color: '#ffb68b' }}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '99px', padding: '2px 8px', border: '1px solid rgba(255,182,139,0.08)' }}>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                style={{ background: 'none', border: 'none', color: '#ff7a00', cursor: 'pointer', display: 'flex', padding: 2 }}
                              >
                                <Minus size={12} />
                              </button>
                              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#fff', fontWeight: 700, minWidth: '12px', textAlign: 'center' }}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                style={{ background: 'none', border: 'none', color: '#ff7a00', cursor: 'pointer', display: 'flex', padding: 2 }}
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'rgba(255,182,139,0.4)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '11px',
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 600,
                                padding: '4px',
                                transition: 'color 0.2s',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,182,139,0.4)')}
                            >
                              <Trash2 size={12} /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Subtotals & Fees */}
                {cart.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255,182,139,0.1)', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontFamily: 'Montserrat, sans-serif' }}>
                      <span style={{ color: 'rgba(255,182,139,0.6)' }}>Subtotal</span>
                      <span style={{ color: '#fff', fontWeight: 600 }}>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontFamily: 'Montserrat, sans-serif' }}>
                      <span style={{ color: 'rgba(255,182,139,0.6)' }}>Delivery Fee</span>
                      <span style={{ color: '#fff', fontWeight: 600 }}>${DELIVERY_FEE.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontFamily: 'Montserrat, sans-serif' }}>
                      <span style={{ color: 'rgba(255,182,139,0.6)' }}>Luxury Packaging</span>
                      <span style={{ color: '#ffb955', fontWeight: 600 }}>${PACKAGING_FEE.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,182,139,0.1)', paddingTop: '16px', marginTop: '4px' }}>
                      <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff' }}>Total</span>
                      <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: 800, color: '#ff7a00' }}>${finalTotal.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={handleConfirm}
                      style={{
                        width: '100%',
                        marginTop: '24px',
                        padding: '16px',
                        background: 'linear-gradient(135deg, #ff7a00 0%, #ffb955 100%)',
                        color: '#fff',
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '14px',
                        fontWeight: 800,
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        boxShadow: '0 0 20px rgba(255,122,0,0.3)',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(255,122,0,0.5)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(255,122,0,0.3)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      Confirm Order
                    </button>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', color: 'rgba(255,182,139,0.4)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '12px 0 0 0' }}>
                      Secure encrypted transaction by Lumina Pay
                    </p>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-hover-effect {
          transition: border-color 0.2s, background-color 0.2s;
        }
        .card-hover-effect:hover {
          border-color: rgba(255,182,139,0.2) !important;
          background: rgba(30, 30, 32, 0.5) !important;
        }
        @media (min-width: 1024px) {
          .checkout-grid {
            grid-template-columns: 1.6fr 1fr !important;
          }
        }
      `}</style>
    </AppLayout>
  );
}
