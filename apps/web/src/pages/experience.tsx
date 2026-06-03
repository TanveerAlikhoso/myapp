import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AppLayout from '../components/AppLayout';
import { Sparkles, Calendar, ChevronRight, Award, Star, ShieldCheck, Compass } from 'lucide-react';

export default function ExperiencePage() {
  const router = useRouter();

  const timelineSteps = [
    { year: '2018', title: 'The Inception', desc: 'The first Lumina Lab opens in Tokyo, focused on ingredient molecular mapping.' },
    { year: '2020', title: 'London Flagship', desc: 'Opening our Mayfair location, introducing the cinematic \'Dining Ritual\'.' },
    { year: '2022', title: 'Tech Integration', desc: 'Launch of the global concierge app with AR food storytelling.' },
    { year: '2024', title: 'The Expansion', desc: 'Dubai, New York, and Seoul join the luxury ecosystem.' },
  ];

  return (
    <AppLayout title="Experience | Lumina Bites">
      <Head>
        <title>Experience | Lumina Bites</title>
        <meta name="description" content="Discover the Lumina Bites dining experience. Beyond fast food, pure luxury." />
      </Head>

      <div style={{ background: '#0e0e10', color: '#e5e2e1', overflowX: 'hidden' }}>
        
        {/* ── 1. Hero Section ── */}
        <section
          style={{
            position: 'relative',
            height: '75vh',
            minHeight: '550px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Image Background */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnqbzz_H9RQVVRediZaMBG9PSUTjClyzkY0ApNmVXS2fzY5Zvpm6a4OoajZb1uQrlo_qVvg3bGNhFvh9ifVU21G980MoBZ1kREIVlXQjpyqXb97nsixyjLGDU9pyT-YZrWnRXOzm8tWaDc9e0_4Rm40SHKleqQO6as9rNnuWBxytm9uViaFYyv7Cb_jpj7eTnJrsos9v2RDHuNt004yq-3VzaogxSMIVe54zbElml8ZTlE_gz1K8_gMBNhU7xAQh-a3bY46F0ZxOek"
              alt="Cinematic Savor Background"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35) grayscale(20%)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, #0e0e10 100%)' }} />
          </div>

          <div
            style={{
              position: 'relative',
              zIndex: 10,
              textAlign: 'center',
              padding: '0 20px',
              maxWidth: '800px',
              margin: '0 auto',
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
                display: 'block',
                marginBottom: '16px',
              }}
            >
              The Gastronomic Vision
            </span>
            <h1
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(32px, 6vw, 56px)',
                fontWeight: 900,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                margin: '0 0 24px 0',
              }}
            >
              Beyond Fast.<br />
              <span style={{ color: '#ffb68b' }}>Pure Luxury.</span>
            </h1>
            <p
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(14px, 2.5vw, 17px)',
                color: 'rgba(255,182,139,0.75)',
                lineHeight: 1.6,
                margin: '0 auto 36px',
                maxWidth: '600px',
              }}
            >
              We didn't just redefine fast food. We elevated it into a digital ritual of premium ingredients and cinematic craftsmanship.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('philosophy');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #ff7a00 0%, #ffb955 100%)',
                color: '#fff',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                fontWeight: 800,
                border: 'none',
                borderRadius: '9999px',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                boxShadow: '0 0 25px rgba(255,122,0,0.3)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 35px rgba(255,122,0,0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 25px rgba(255,122,0,0.3)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              Discover The Ritual
            </button>
          </div>
        </section>

        {/* ── 2. Philosophy Section ── */}
        <section
          id="philosophy"
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
            className="philosophy-grid"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                The Philosophy
              </span>
              <h2
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.1,
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                Fast food, but make it <span style={{ color: '#ffb68b', fontStyle: 'italic' }}>couture.</span>
              </h2>
              <div
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '16px',
                  color: 'rgba(255,182,139,0.7)',
                  lineHeight: 1.7,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <p>
                  At Lumina Bites, we believe that convenience should never compromise craftsmanship. Our journey began with a single vision: to bridge the gap between high-end gastronomy and the modern pace of life.
                </p>
                <p>
                  Every bite is a curated experience, blending the raw energy of street food with the meticulous precision of a Michelin-starred kitchen. We serve those who refuse to settle for the ordinary.
                </p>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  aspectRatio: '4/5',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,182,139,0.1)',
                  background: 'rgba(25, 25, 27, 0.4)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtfhYP2flW8_FlVN7gWQlzocP8uefpWMS4Lee34cJJxFoA3Ls24gFGJOABeWDCTP63Pa50A7bgd8C_CQSuQqLG3vCbh7P6iv63f20X0ZBV36TY-QFylI7YiikzgTdGLONuCMWLcC0zULJSnlZ-vk2SGUYS8XMwzV87-LX5IhNer1TLfqZSRIDRGbinQSkl7XtAzYAblE4kfkDFwc_oNOs3Md6Iu9B1wjD7w8FVwJ7r65colyAeMBHkiIpSqpTJ9VZxtXIk9MyNDdZX"
                  alt="Fine Restaurant Ambience"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '-30px',
                  left: '-30px',
                  background: 'rgba(18, 18, 20, 0.9)',
                  border: '1px solid rgba(255,182,139,0.15)',
                  padding: '24px',
                  borderRadius: '16px',
                  maxWidth: '240px',
                  backdropFilter: 'blur(12px)',
                }}
                className="desktop-only"
              >
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '24px', fontWeight: 800, color: '#ff7a00', margin: '0 0 4px 0' }}>01</p>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#fff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Uncompromising Standards</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Bento Ingredients Section ── */}
        <section style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,182,139,0.04)', borderBottom: '1px solid rgba(255,182,139,0.04)', padding: '100px 20px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '11px',
                  color: '#ff7a00',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '12px'
                }}
              >
                The Sourcing
              </span>
              <h2
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 'clamp(28px, 4vw, 36px)',
                  fontWeight: 800,
                  color: '#fff',
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                Provenance in Every Particle
              </h2>
            </div>

            <div className="bento-grid" style={{ display: 'grid', gap: '24px', gridTemplateColumns: '1fr' }}>
              
              {/* Wagyu Card (Large) */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  minHeight: '320px',
                  border: '1px solid rgba(255,182,139,0.08)',
                }}
                className="bento-wagyu"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc4OBj7CS9SAlE7rbTJ6IH0JWbC9h_Vc8gD-qyLvUP0DNP-0o_kO_ditPPZ3xTPLtVwTnQ4q2wefB7HPlLFZUzXUtHvLmeYDurUcndwP9Nbnsj1N6b0oWF6ZRYPznGQH5HUWgGTsUrn_S-f3zQo1BAMKwRIlzmOVog2rnk98_DZFb2KCGUq56E1yLDl-8vIfI6JaLVqSFwl3sBBQfYrw-uYvtOxwr1YjUEsh5qkWIm1u3uIt86LxfUOichC4C0HVyo5X_GVl39l9O3"
                  alt="A5 Wagyu Beef"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: 0 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,14,16,0.92) 20%, transparent 80%)', zIndex: 1 }} />
                <div style={{ position: 'relative', zIndex: 2, padding: '36px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '10px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#ff7a00', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Selected Origin</span>
                  <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', margin: 0 }}>Japanese A5 Wagyu</h3>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,182,139,0.7)', margin: 0, maxWidth: '500px' }}>
                    Sourced exclusively from selected prefectures, our Wagyu is the centerpiece of the Lumina experience.
                  </p>
                </div>
              </div>

              {/* Truffle Card (Medium) */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  minHeight: '260px',
                  border: '1px solid rgba(255,182,139,0.08)',
                }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzlvsM2bFuU8oTk1xOsoh9jjJ69bjlhh89IqsoYoU_6EOljJjBNLOHBJziZBmEUdACkGZBaEPzjxHsSX6WbOEb44omexCj-15_K1RMvfNrfPTNTmGApGzSw0wyYxVCcuUEBVcZSZWN_rplQipN50lRGI0Vbzs60W2RBOydUxNh3vL03NtOJUJwkOZrjPbB2FxFjQAY49QeUIrcLGA9PNxWfj-6OR-Ko7BYEst-N9Awc-QDoHT6EKHwuE-Au2czMiipn4PRkwIAm2v6"
                  alt="Black Winter Truffles"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: 0 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,14,16,0.92) 20%, transparent 80%)', zIndex: 1 }} />
                <div style={{ position: 'relative', zIndex: 2, padding: '36px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '10px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#ff7a00', letterSpacing: '0.2em', textTransform: 'uppercase' }}>French Perigord</span>
                  <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', margin: 0 }}>Winter Black Truffle</h3>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,182,139,0.7)', margin: 0 }}>
                    The 'Black Diamond' of gastronomy, shaved fresh for every order.
                  </p>
                </div>
              </div>

              {/* Gold Leaf & Saffron Details (Small Cards Grid) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    height: '240px',
                    border: '1px solid rgba(255,182,139,0.08)',
                  }}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAylqQty97iob2XcZZKpdqBbjjpBRkORrpJM5y36r1IfM6xEEJ9Z8FB8_YHYlGdjEsA2rmSArzTK_CSV2ZpbAxsaYgS7ysY6BSvBPbEEb5rGIzKW9YuDNTvfLLwQyOa3PI6C96nxriUQTMSfYShhak2cdNp75UBYlhS-2MKptc0qHpz8p0TCS-88EergO31KR5ZVyWqCjhhnm4W4-2whZJw83f8IoQrUJh4tDuptvbRXz8-37V5eY8iUNNzwEL85CNzSBTozEIfxJzn"
                    alt="Gold Flakes"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: 0 }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,14,16,0.92) 20%, transparent 80%)', zIndex: 1 }} />
                  <div style={{ position: 'relative', zIndex: 2, padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>24K Gold Leaf Finishing</h4>
                  </div>
                </div>

                <div
                  style={{
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    height: '240px',
                    border: '1px solid rgba(255,182,139,0.08)',
                  }}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDojewYtCC4MAsR0FGBBiQOQbVFoLqpcSYbAiv5OMJ0ywyrEs24t-qmjZRXlORMmlv91eawk-sW9M2FQOSSUJuLjYR0X9ViduqAWg5tTS2LfTZdfOIpv7UFXUHpYfhJZ80w016XkkXSXVQ7wz-uTvGhyThidAVv-tyerqAJO_K3IBEq_i8ZgcSOkq4402BTCp6qOGUdm5cBaDKHchSPrz5sLSjAiEaewf4okrZiMb5kyS8o0gwk29cnr3vRJKdT-q0yka0YJogVr8op"
                    alt="Saffron Bowl"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: 0 }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,14,16,0.92) 20%, transparent 80%)', zIndex: 1 }} />
                  <div style={{ position: 'relative', zIndex: 2, padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>Rare Sargol Kashmiri Saffron</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Milestones Timeline Section ── */}
        <section style={{ padding: '100px 20px', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '11px',
                color: '#ff7a00',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 700,
                display: 'block',
                marginBottom: '12px'
              }}
            >
              The Legacy
            </span>
            <h2
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(28px, 4vw, 36px)',
                fontWeight: 800,
                color: '#fff',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Expanding the Lumina Footprint
            </h2>
          </div>

          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '32px',
            }}
          >
            {timelineSteps.map((step, idx) => (
              <div
                key={step.year}
                style={{
                  background: 'rgba(25, 25, 27, 0.4)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,182,139,0.06)',
                  borderRadius: '24px',
                  padding: '32px',
                  transition: 'all 0.3s',
                }}
                className="card-hover-effect"
              >
                <span
                  style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: '24px',
                    fontWeight: 800,
                    color: '#ff7a00',
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  {step.year}
                </span>
                <h4
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 10px 0',
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(255,182,139,0.6)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. Call To Action ── */}
        <section
          style={{
            position: 'relative',
            padding: '120px 20px',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Subtle bottom glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: '800px',
              height: '350px',
              background: 'radial-gradient(circle, rgba(255,122,0,0.06) 0%, transparent 70%)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(28px, 5vw, 44px)',
                fontWeight: 900,
                color: '#fff',
                textTransform: 'uppercase',
                margin: '0 0 20px 0',
                letterSpacing: '-0.02em',
              }}
            >
              Taste the Obsession
            </h2>
            <p
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '16px',
                color: 'rgba(255,182,139,0.7)',
                lineHeight: 1.6,
                margin: '0 auto 40px',
                maxWidth: '480px',
              }}
            >
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
        .card-hover-effect {
          transition: all 0.25s ease-in-out;
        }
        .card-hover-effect:hover {
          border-color: rgba(255,182,139,0.25) !important;
          background: rgba(30, 30, 32, 0.6) !important;
          transform: translateY(-4px);
        }
        @media (min-width: 769px) {
          .philosophy-grid {
            grid-template-columns: 1.2fr 1fr !important;
          }
          .bento-grid {
            grid-template-columns: 1.5fr 1fr !important;
            grid-template-rows: auto auto !important;
          }
          .bento-wagyu {
            grid-row: span 2;
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
