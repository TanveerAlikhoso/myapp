import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      <Head>
        <title>Home | Lumina Bites</title>
        <meta name="description" content="Lumina Bites — The Art of Fast Luxury. Premium fast food reimagined." />
      </Head>
      <iframe
        src={isMobile ? '/stitch/lumina_bites_home.html' : '/stitch/lumina_bites_home_desktop.html'}
        style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
        sandbox="allow-scripts allow-same-origin allow-forms"
        title="Lumina Bites Home"
      />
    </>
  );
}
