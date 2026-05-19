import Head from 'next/head';
import AppLayout from '../components/AppLayout';

interface IframePageProps {
  title: string;
  description: string;
  desktopSrc: string;
  mobileSrc: string;
}

import { useState, useEffect } from 'react';

export default function IframePage({ title, description, desktopSrc, mobileSrc }: IframePageProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <iframe
        src={isMobile ? mobileSrc : desktopSrc}
        style={{
          width: '100%',
          height: 'calc(100vh - 68px)',
          border: 'none',
          display: 'block',
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        title={title}
      />
    </AppLayout>
  );
}
