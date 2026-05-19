import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function LuminaBitesHomeMobilePage() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#131313] flex items-center justify-center text-[#ffb68b] font-bold text-lg tracking-widest uppercase">
        Loading Lumina Home...
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-[#131313]">
      <Head>
        <title>Lumina Bites | Luxury Dining</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Cinematic flavor, elite fast-food delivery, and curated recipes at your fingertips." />
      </Head>
      <iframe 
        src="/stitch/lumina_bites_home_mobile.html" 
        title="Lumina Home Mobile"
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
}
