import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function OrderConfirmationPage() {
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
        <title>Order Confirmed | Lumina Bites</title>
        <meta name="description" content="Your Lumina Bites order has been confirmed — thank you for your patronage." />
      </Head>
      <iframe
        src={isMobile ? '/stitch/order_confirmation_mobile.html' : '/stitch/order_confirmation_desktop.html'}
        style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
        sandbox="allow-scripts allow-same-origin allow-forms"
        title="Order Confirmation"
      />
    </>
  );
}
