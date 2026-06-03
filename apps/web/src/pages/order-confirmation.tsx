import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AppLayout from '../components/AppLayout';
import { Check, MapPin, Receipt, ArrowRight } from 'lucide-react';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Generate a luxury order code
    const chars = '0123456789';
    let code = 'LB-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setOrderId(code);
  }, []);

  return (
    <AppLayout title="Order Confirmed | Lumina Bites">
      <Head>
        <title>Order Confirmed | Lumina Bites</title>
        <meta name="description" content="Your Lumina Bites order is secured and preparation has begun." />
      </Head>

      <div
        style={{
          minHeight: 'calc(100vh - 68px)',
          background: '#0e0e10',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
        }}
      >
        {/* Ambient background glows */}
        <div
          style={{
            position: 'absolute',
            top: '0%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,122,0,0.06) 0%, transparent 60%)',
            filter: 'blur(100px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,0,0,0.08) 0%, transparent 65%)',
            filter: 'blur(120px)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            background: 'rgba(25, 25, 27, 0.4)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,182,139,0.08)',
            borderRadius: '32px',
            padding: '48px 32px',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 40px rgba(255,122,0,0.1)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Animated Glowing Success Check Icon */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '32px' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,122,0,0.2)', filter: 'blur(16px)', borderRadius: '50%' }} />
            <div
              style={{
                position: 'relative',
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff7a00 0%, #ffb955 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 30px rgba(255,122,0,0.4)',
              }}
            >
              <Check size={40} color="#fff" strokeWidth={3} />
            </div>
          </div>

          {/* Typography */}
          <div style={{ marginBottom: '36px' }}>
            <h1
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(22px, 5vw, 32px)',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                margin: '0 0 12px 0',
                textTransform: 'uppercase',
              }}
            >
              Your Luxury Feast is on the Way
            </h1>
            <p
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '15px',
                color: 'rgba(255,182,139,0.7)',
                lineHeight: 1.5,
                margin: 0,
                maxWidth: '420px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Our master chefs are preparing your selection with artisanal precision.
            </p>
          </div>

          {/* Bento Order Details Card */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '36px' }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,182,139,0.06)',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'left',
              }}
            >
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: 'rgba(255,182,139,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                Order ID
              </span>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff' }}>
                #{orderId}
              </span>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,182,139,0.06)',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'left',
              }}
            >
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: 'rgba(255,182,139,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                Arrival Time
              </span>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#ff7a00' }}>
                25 - 30 Mins
              </span>
            </div>
          </div>

          {/* Preparation Status Bar */}
          <div style={{ marginBottom: '40px', padding: '0 8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '12px', fontFamily: 'Montserrat, sans-serif' }}>
              <span style={{ color: '#ff7a00', fontWeight: 700 }}>In Preparation</span>
              <span style={{ color: 'rgba(255,182,139,0.7)', fontWeight: 600 }}>75%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
              <div
                style={{
                  width: '75%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #ff7a00 0%, #ffb955 100%)',
                  boxShadow: '0 0 10px rgba(255,122,0,0.5)',
                  borderRadius: '99px',
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => router.push('/tracking')}
              style={{
                width: '100%',
                padding: '18px',
                background: 'linear-gradient(135deg, #ff7a00 0%, #ffb955 100%)',
                color: '#fff',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                fontWeight: 800,
                border: 'none',
                borderRadius: '14px',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 8px 20px rgba(255,122,0,0.3)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(255,122,0,0.45)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,122,0,0.3)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <MapPin size={16} />
              Track Order
            </button>

            <button
              onClick={() => router.push('/menu-dashboard')}
              style={{
                width: '100%',
                padding: '18px',
                background: 'rgba(255,255,255,0.04)',
                color: '#fff',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                border: '1px solid rgba(255,182,139,0.1)',
                borderRadius: '14px',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,182,139,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,182,139,0.1)';
              }}
            >
              Order Something Else <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
