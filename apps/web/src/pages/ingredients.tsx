import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AppLayout from '../components/AppLayout';
import { Sparkles, Award, ShieldAlert, Star, ShieldCheck, CheckCircle2, Shield } from 'lucide-react';

export default function IngredientsPage() {
  const router = useRouter();

  const handleBegin = () => {
    const el = document.getElementById('wagyu-detail');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AppLayout title="Ingredients | Lumina Bites">
      <Head>
        <title>The Provenance of Perfection | Lumina Bites</title>
        <meta name="description" content="Discover the world-class ingredients behind Lumina Bites. Japanese A5 Wagyu, French Perigord Black Truffles, Sargol Saffron, and 24K Gold leaf." />
      </Head>

      <div style={{ background: '#0e0e10', color: '#e5e2e1', overflowX: 'hidden' }}>
        
        {/* ── 1. Hero Section ── */}
        <section
          style={{
            position: 'relative',
            height: '80vh',
            minHeight: '600px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background Image */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtjPVi_SoGqzAR8_b7z2vbSlKwOdXOQpqHkiqZ2r31UTwEc8cC0CkhCgEVgyN2Lq-65_aedKv20-B-f6D2LSN_YK7JaJDDrmkLcFacptw-OyUEr9y0B0-gsIQvnSduhuNDjwsqrgNala5zQ7dSg6FPIbPH1MXs4Uuo2rXEQ_i8PYkU14UwzKcF5ylmOmzu119vRAV3n7vps3t9PfJQdQm7R2FwHAtNMAizFC06BGssT4YA3em16eIGmmH80Y2mx1klOiZLKo9Kq0oV"
              alt="Raw Wagyu and Truffle Spread"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0e0e10 15%, transparent 80%)' }} />
          </div>

          <div
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '0 48px',
              maxWidth: '1280px',
              margin: '0 auto',
              width: '100%',
            }}
            className="hero-container"
          >
            <div style={{ maxWidth: '640px' }}>
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '11px',
                  color: '#ff7a00',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '16px'
                }}
              >
                The Art of Provenance
              </span>
              <h1
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 'clamp(32px, 6vw, 56px)',
                  fontWeight: 900,
                  color: '#fff',
                  lineHeight: 1.1,
                  margin: '0 0 24px 0',
                  textTransform: 'uppercase',
                }}
              >
                The Provenance of <br />
                <span style={{ background: 'linear-gradient(135deg, #ffb68b 0%, #ff7a00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Perfection</span>
              </h1>
              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '16px',
                  color: 'rgba(255,182,139,0.7)',
                  lineHeight: 1.6,
                  margin: '0 0 40px 0',
                }}
              >
                We believe that true luxury is found in the relentless pursuit of the world's most exceptional ingredients. Every bite is a curated ritual of flavor.
              </p>
              <button
                onClick={handleBegin}
                style={{
                  padding: '18px 40px',
                  background: 'linear-gradient(135deg, #ff7a00 0%, #ffb955 100%)',
                  color: '#fff',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '13px',
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
                Begin the Experience
              </button>
            </div>
          </div>
        </section>

        {/* ── 2. Wagyu Section ── */}
        <section
          id="wagyu-detail"
          style={{
            padding: '100px 20px',
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '64px',
              alignItems: 'center',
            }}
            className="split-grid"
          >
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  aspectRatio: '4/5',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(25, 25, 27, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,182,139,0.1)',
                  padding: '8px',
                }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5POiEP43QJrbrZxCUxI6DCDLmPiFKA-WCdUL-rZWr5xLeXBKh8xAdqqk000miYbm5SH0IvmFLywcdhhEMIFJuTaMAJBF_rjK3BKsyAydi1LZBcdrQ0psvwRh1VRy4LV6a5Lh-IgeJWjKhoL2j4Ox19onB4LTUziouq-0qRf4OJPs0OuYA9joI7BAjbaF4GuYM2uD9-cdouDFGOquLxEe6O6Oc9vN40O9yYhme03qczdJD3hKIR7whZqkhNl4eQm6PeQHUJa2m1jNH"
                  alt="Raw Wagyu Marbling Slice"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '-30px',
                  right: '-30px',
                  background: 'rgba(18, 18, 20, 0.95)',
                  border: '1px solid rgba(255,182,139,0.15)',
                  padding: '24px',
                  borderRadius: '16px',
                  maxWidth: '240px',
                  backdropFilter: 'blur(12px)',
                }}
                className="desktop-only"
              >
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '24px', fontWeight: 800, color: '#ff7a00', margin: '0 0 4px 0' }}>72hr</p>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: 'rgba(255,182,139,0.7)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Salt-Chamber Aging</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#ff7a00', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700 }}>Exclusive Selection</span>
              <h2
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 'clamp(28px, 4vw, 38px)',
                  fontWeight: 800,
                  color: '#fff',
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                Japanese <span style={{ color: '#ff7a00' }}>A5 Wagyu</span>
              </h2>
              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '15px',
                  color: 'rgba(255,182,139,0.7)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Sourced exclusively from the Kagoshima prefecture, our Wagyu represents the pinnacle of bovine genetics. We subject each cut to a precise 72-hour aging process within our custom-built Himalayan salt chambers, intensifying the buttery richness that defines the A5 grade.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,122,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff7a00' }}>
                    <Shield size={20} />
                  </div>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: 700, color: '#fff' }}>Certified BMS 12+ Marbling</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,122,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff7a00' }}>
                    <Sparkles size={20} />
                  </div>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: 700, color: '#fff' }}>Cryogenic Precision Slicing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Truffles Spotlight Section ── */}
        <section style={{ background: '#121214', padding: '100px 20px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 'clamp(28px, 4vw, 36px)',
                  fontWeight: 800,
                  color: '#fff',
                  margin: '0 0 16px 0',
                  textTransform: 'uppercase',
                  fontStyle: 'italic',
                }}
              >
                The Black Diamonds
              </h2>
              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '15px',
                  color: 'rgba(255,182,139,0.7)',
                  lineHeight: 1.6,
                  margin: '0 auto',
                  maxWidth: '640px',
                }}
              >
                Harvested at the peak of winter in the Perigord region of France, these aromatic treasures are flown in within 24 hours of discovery.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '32px',
              }}
              className="truffles-grid"
            >
              {/* Card 1 */}
              <div
                style={{
                  background: 'rgba(28, 27, 27, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,182,139,0.06)',
                  borderRadius: '24px',
                  padding: '6px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ aspectRatio: '1/1', position: 'relative', borderRadius: '18px', overflow: 'hidden' }}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx-5SnLwRC-mNWkGVUqdWRFAw-9yxcq2dDzK_V1lwU-m8rXgvQsg2Ma0KQBmNR3e8VYy6wYdqUHQ5H90eRIHUhmYTdCMcRu5CJ9Z0xVUbLN2NL9BoqqXO_74miHd15taSFLAGMkVZrWi1QMeK5-MTGDvXdx3rBszu37HXPD-32_gA_JjP9T-B1RWQvJPvh48Q8K5ydVmVJ8N3kBmTIO6j8X00RiHxwgpzV1PtD8V0UI0aMfkXpH30KKO_N_bqg9Kx1rx7m8o3uPr4c"
                    alt="Black Truffles Detail"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                  <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
                    <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 4px 0' }}>Aromatic Intensity</p>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, color: '#ff7a00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Olfactory Mastery</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div
                style={{
                  background: 'rgba(28, 27, 27, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,182,139,0.06)',
                  borderRadius: '24px',
                  padding: '6px',
                  overflow: 'hidden',
                }}
                className="truffles-offset-card"
              >
                <div style={{ aspectRatio: '1/1', position: 'relative', borderRadius: '18px', overflow: 'hidden' }}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM-2J094EEV-b2JaImXDI-nhuPRFbmZE1LczAujtgvzN-uAyyhEVlIyDXHylFfH1OUDyu2MQOHzX2RrsdCfOO6G55rHrqVRu2XhMZ0gBs0jifp_27_FXgUzsUwynHD2vWHJNcPQhfZYFjDJz2uq77I-n6WeuBnInhI5sIRySHQSqDy9mHkCbdNgk471AiKhxOyRgaP73FPb-ovpio-voy3iWmV6J8aGSmdHEH5GwZ448kU9ze_2lkq2CN4H__cUO3uhVSxZ66brYc6"
                    alt="Chef Shaving Truffles"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                  <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
                    <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 4px 0' }}>Precision Shaving</p>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, color: '#ff7a00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Paper-Thin Perfection</span>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div
                style={{
                  background: 'rgba(28, 27, 27, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,182,139,0.06)',
                  borderRadius: '24px',
                  padding: '6px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ aspectRatio: '1/1', position: 'relative', borderRadius: '18px', overflow: 'hidden' }}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGa1B4a1yWqETNUwfZtX05s2Bt1HMSPF-XaPCRIeCK_bJWeLdLZJf3-JBKgcWYUBsoJUPwldfuxfe3ffDYX2jQm9E6QLfnuB270ux6o3KdrT4zlKcF1_rIO0mqIzVgP3eXwI-VAeCG-9k1xG_WuUcyHD-bk8IfAF2n-uzzmgmORej-qixhv_rTJezt6WwntRSfJscXKbCXVT0d6adtY2Nt77gIULlpaHQkjExwaulZXHumFnyzQVhWkxgYr4fLHymQYcwUv311ExdW"
                    alt="Truffle Preservation"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                  <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
                    <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 4px 0' }}>Provenance</p>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, color: '#ff7a00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Perigord Heritage</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 4. Gold & Saffron Section ── */}
        <section style={{ padding: '100px 20px', maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '64px',
              alignItems: 'center',
            }}
            className="split-grid"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  fontWeight: 900,
                  color: '#fff',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                <span style={{ background: 'linear-gradient(135deg, #ffb68b 0%, #ff7a00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>24K Gold</span> &amp; Saffron
              </h2>
              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '15px',
                  color: 'rgba(255,182,139,0.7)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                We use edible 24K gold leaf and Iranian Sargol saffron not just for their visual splendor, but for the ritual they represent. Saffron, the most expensive spice in the world, is hand-picked at dawn to preserve its floral, honeyed notes.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <div
                  style={{
                    background: 'rgba(25, 25, 27, 0.4)',
                    border: '1px solid rgba(255,182,139,0.06)',
                    borderRadius: '16px',
                    padding: '24px',
                  }}
                >
                  <Star size={24} color="#ff7a00" style={{ marginBottom: '12px' }} />
                  <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 700, color: '#fff', margin: '0 0 4px 0' }}>Purest Origin</h4>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: 'rgba(255,182,139,0.5)', margin: 0 }}>Sargol Grade Saffron</p>
                </div>

                <div
                  style={{
                    background: 'rgba(25, 25, 27, 0.4)',
                    border: '1px solid rgba(255,182,139,0.06)',
                    borderRadius: '16px',
                    padding: '24px',
                  }}
                >
                  <Sparkles size={24} color="#ff7a00" style={{ marginBottom: '12px' }} />
                  <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 700, color: '#fff', margin: '0 0 4px 0' }}>Visual Art</h4>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: 'rgba(255,182,139,0.5)', margin: 0 }}>Hand-Applied Gold</p>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,182,139,0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7NWEJOSudS6WUPqcjW2_9EMt6r6c0kXJlK60YwPTgkDJQh_w4s73wuwwxAcEUb33-BcEle6g4xVuykDR5M2n_9oGIYpXubPCxHgwp6yMouH35CJcch08tb9mKwarPMpjPfT8yhIXuBwuwtvPxK0AlU6AM_93sCTUMOGE1vEwPwVA2l0xAOZEvDD5yfSPXJ6DvZNzbSOc0DCfiloFcMkse9djKI926xg2iP14jWwbraIwCwegSWedVCicW32B86LKO4c6Dk9iSY5y4"
                  alt="Gold and Saffron Garnish"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,122,0,0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: -1 }} />
            </div>
          </div>
        </section>

        {/* ── 5. The Lumina Code ── */}
        <section style={{ background: '#121214', borderTop: '1px solid rgba(255,182,139,0.04)', borderBottom: '1px solid rgba(255,182,139,0.04)', padding: '100px 20px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, color: '#fff', margin: '0 0 8px 0', textTransform: 'uppercase' }}>The Lumina Code</h2>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#ff7a00', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', margin: 0 }}>Our Triple Commitment</p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '32px',
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 32px',
                  background: 'rgba(25, 25, 27, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,182,139,0.06)',
                  borderRadius: '24px',
                  transition: 'border-color 0.2s',
                }}
                className="code-card"
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,122,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff7a00', margin: '0 auto 24px' }}>
                  <Award size={28} />
                </div>
                <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 16px 0' }}>Uncompromising Quality</h3>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: 'rgba(255,182,139,0.6)', lineHeight: 1.6, margin: 0 }}>
                  If an ingredient does not meet our rigorous BMS or Grade 1 standards, it never touches our kitchen. No exceptions.
                </p>
              </div>

              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 32px',
                  background: 'rgba(25, 25, 27, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,182,139,0.06)',
                  borderRadius: '24px',
                  transition: 'border-color 0.2s',
                }}
                className="code-card"
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,122,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff7a00', margin: '0 auto 24px' }}>
                  <CheckCircle2 size={28} />
                </div>
                <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 16px 0' }}>Artisanal Sourcing</h3>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: 'rgba(255,182,139,0.6)', lineHeight: 1.6, margin: 0 }}>
                  We partner with multi-generational families of farmers and foragers who respect the land as much as the product.
                </p>
              </div>

              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 32px',
                  background: 'rgba(25, 25, 27, 0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,182,139,0.06)',
                  borderRadius: '24px',
                  transition: 'border-color 0.2s',
                }}
                className="code-card"
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,122,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff7a00', margin: '0 auto 24px' }}>
                  <Sparkles size={28} />
                </div>
                <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 16px 0' }}>Cinematic Craftsmanship</h3>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: 'rgba(255,182,139,0.6)', lineHeight: 1.6, margin: 0 }}>
                  Food is performance. Every plate is engineered for visual impact, depth, and a high-fidelity dining experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. CTA Section ── */}
        <section style={{ padding: '120px 20px', textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxWidth: '800px', height: '350px', background: 'radial-gradient(circle, rgba(255,122,0,0.05) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', margin: '0 0 20px 0', letterSpacing: '-0.02em' }}>Taste the Obsession</h2>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', color: 'rgba(255,182,139,0.7)', lineHeight: 1.6, margin: '0 auto 40px', maxWidth: '480px' }}>
              Experience the alchemy of world-class ingredients reimagined for the modern epicurean.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <button
                onClick={() => router.push('/menu-dashboard')}
                style={{
                  padding: '18px 40px',
                  background: 'linear-gradient(135deg, #ff7a00 0%, #ffb955 100%)',
                  color: '#fff',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '13px',
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
                Explore Menu
              </button>

              <button
                onClick={() => router.push('/locations')}
                style={{
                  padding: '18px 40px',
                  background: 'rgba(255,255,255,0.03)',
                  color: '#fff',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: '1px solid rgba(255,182,139,0.1)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,182,139,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,182,139,0.1)';
                }}
              >
                Book a Ritual
              </button>
            </div>
          </div>
        </section>

      </div>

      <style jsx>{`
        .code-card {
          transition: all 0.25s ease-in-out;
        }
        .code-card:hover {
          border-color: rgba(255,182,139,0.3) !important;
          background: rgba(30, 30, 32, 0.6) !important;
          transform: translateY(-4px);
        }
        @media (min-width: 769px) {
          .split-grid {
            grid-template-columns: 1fr 1.2fr !important;
          }
          .truffles-offset-card {
            transform: translateY(32px);
          }
          .truffles-grid {
            padding-bottom: 32px;
          }
        }
        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </AppLayout>
  );
}
