import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '@lumina/core';
import { Navbar } from '@lumina/ui';
import { 
  Gift, 
  Copy, 
  Sparkles, 
  Clock, 
  Compass, 
  ShieldCheck, 
  ArrowLeft, 
  Check, 
  Info,
  BadgePercent
} from 'lucide-react';

interface PromoOffer {
  id: string;
  code: string;
  title: string;
  description: string;
  badge: string;
  highlight: string;
  expires: string;
  terms: string;
  tierRequired: 'General' | 'Gold Elite' | 'Obsidian VIP';
}

export default function Offers() {
  const { totalItems } = useCart();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [userTier, setUserTier] = useState<'General' | 'Gold Elite' | 'Obsidian VIP'>('Obsidian VIP');
  
  const offersList: PromoOffer[] = [
    {
      id: 'gold-flakes',
      code: 'OBSIDIANGOLD',
      title: 'Obsidian 24K Culinary Flakes',
      description: 'Complimentary organic 24K gold-leaf dusting on any dry-aged wagyu burger selection. Hand-finished by the Chef.',
      badge: 'Signature Prestige',
      highlight: 'VIP Elite Perk',
      expires: 'Valid until June 30, 2026',
      terms: 'Requires active Obsidian VIP membership tier.',
      tierRequired: 'Obsidian VIP'
    },
    {
      id: 'botanicals',
      code: 'BOTANICALS',
      title: 'Sommelier Botanical Pairing',
      description: 'Complimentary hand-distilled botanical elixir with any wood-fired truffle pizza order. Curated flower blends.',
      badge: 'Sommelier Match',
      highlight: 'Free Elixir',
      expires: 'Valid until June 15, 2026',
      terms: 'Applicable to standard and customized pizza selections.',
      tierRequired: 'Gold Elite'
    },
    {
      id: 'drones',
      code: 'DRONENIGHT',
      title: 'Midnight Autonomous Flight',
      description: 'Complimentary high-speed satellite-guided drone shipping on all orders placed between 10:00 PM and 3:00 AM.',
      badge: 'Logistics Elite',
      highlight: 'Free Drone Delivery',
      expires: 'Ongoing Benefit',
      terms: 'Minimum cart value of $45 required. Dynamic altitude routing.',
      tierRequired: 'General'
    },
    {
      id: 'tasting-board',
      code: 'CHEFSTASTING',
      title: 'Private Vault Tasting Board',
      description: 'Complimentary dry-aged charcuterie and black truffle honeycomb board upon booking a private dining vault for 4+ patrons.',
      badge: 'Vault Experience',
      highlight: 'Chef Tasting Gift',
      expires: 'Valid until July 10, 2026',
      terms: 'Must book vault session through the Lumina locations portal.',
      tierRequired: 'Gold Elite'
    }
  ];

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] relative overflow-x-hidden font-body selection:bg-[#ffb68b]/30 pb-20">
      <Head>
        <title>Lumina Foods | Elite Offers &amp; Promos</title>
        <meta name="description" content="Exclusive luxury dining codes, truffle pairings, 24k gold flakes, and free drone deliveries at Lumina Bites." />
      </Head>

      {/* Ambient background glows */}
      <div 
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-25 z-0"
        style={{ background: 'radial-gradient(circle, rgba(255, 122, 0, 0.3) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-1/3 left-10 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-10 z-0"
        style={{ background: 'radial-gradient(circle, rgba(139, 0, 0, 0.4) 0%, transparent 70%)' }}
      />

      {/* Glassmorphic Navbar */}
      <Navbar 
        totalItems={totalItems} 
        onCartClick={() => { window.location.href = '/'; }} 
        currentPath="/offers" 
      />

      {/* Hero Header */}
      <header className="pt-36 pb-12 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center space-y-4">
        <span className="font-body text-xs text-[#ffb68b] tracking-[0.3em] uppercase block">
          Elite Indulgences
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-black text-white tracking-tight leading-none uppercase">
          LUXURY OFFER GRIDS
        </h1>
        <p className="font-body text-sm md:text-base text-[#e0c0af] max-w-2xl mx-auto leading-relaxed">
          Unlock gold-standard gastronomic deals. Copy exclusive callback vouchers or activate active drone coupons to elevate your dining order instantly.
        </p>
        <div className="w-16 h-1 bg-[#ff7a00] mx-auto rounded-full mt-2" />
      </header>

      {/* VIP Tier Toggle Selector */}
      <section className="max-w-4xl mx-auto px-margin-mobile relative z-10 mb-12">
        <div className="p-5 bg-[#1c1b1b]/60 border border-white/5 rounded-3xl backdrop-blur-md flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={28} className="text-[#ffb68b] shrink-0" />
            <div className="space-y-0.5">
              <span className="text-[10px] text-[#e0c0af]/50 font-black uppercase tracking-widest block">Active Selector Status</span>
              <p className="text-sm font-semibold text-white">Select Your Loyalty Tier to check Eligibility</p>
            </div>
          </div>
          
          <div className="flex gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5 w-full md:w-auto overflow-x-auto scrollbar-none">
            {['General', 'Gold Elite', 'Obsidian VIP'].map((tier) => (
              <button 
                key={tier}
                onClick={() => setUserTier(tier as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  userTier === tier 
                    ? 'bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] text-[#522300] font-black shadow-md' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {offersList.map((offer) => {
          const isEligible = 
            userTier === 'Obsidian VIP' || 
            (userTier === 'Gold Elite' && offer.tierRequired !== 'Obsidian VIP') ||
            (userTier === 'General' && offer.tierRequired === 'General');
          
          return (
            <div 
              key={offer.id}
              className={`p-8 rounded-[40px] border relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                isEligible 
                  ? 'bg-[#1c1b1b]/40 border-white/5 hover:border-[#ffb68b]/40 hover:bg-[#1c1b1b]/70 hover:shadow-[0_15px_35px_rgba(255,122,0,0.06)]' 
                  : 'bg-[#121212]/90 border-white/2.5 opacity-55'
              }`}
            >
              {/* Background gradient hint */}
              {isEligible && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ff7a00]/10 to-transparent blur-2xl pointer-events-none" />
              )}

              {/* Offer header */}
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#ffb68b] text-[10px] font-semibold tracking-wider uppercase">
                    {offer.badge}
                  </span>
                  
                  {isEligible ? (
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Check size={12} /> Active Access
                    </span>
                  ) : (
                    <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      🔒 Tier Required: {offer.tierRequired}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-[#ff7a00] font-black uppercase tracking-[0.2em] block">
                    {offer.highlight}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight uppercase leading-none">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-[#e0c0af]/80 leading-relaxed font-body">
                    {offer.description}
                  </p>
                </div>
              </div>

              {/* Action and coupon block */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[9px] text-[#e0c0af]/40 uppercase font-semibold flex items-center gap-1">
                    <Clock size={10} /> {offer.expires}
                  </p>
                  <p className="text-[9px] text-white/50 leading-normal">
                    {offer.terms}
                  </p>
                </div>

                {isEligible ? (
                  <button 
                    onClick={() => handleCopyCode(offer.id, offer.code)}
                    className="h-12 px-6 rounded-2xl bg-black/40 hover:bg-[#ffb68b]/10 border border-white/10 text-white flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0 text-xs font-black uppercase tracking-wider"
                  >
                    {copiedId === offer.id ? (
                      <>
                        <Check size={14} className="text-emerald-400 animate-pulse" />
                        <span className="text-emerald-400 font-bold">VOUCHER SECURED</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} className="text-[#ffb68b]" />
                        <span>Code: <span className="text-[#ffb68b]">{offer.code}</span></span>
                      </>
                    )}
                  </button>
                ) : (
                  <button 
                    disabled
                    className="h-12 px-6 rounded-2xl bg-white/2.5 border border-white/2.5 text-white/20 text-xs font-bold uppercase tracking-wider shrink-0 cursor-not-allowed"
                  >
                    LOCKED TIER
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </main>

      {/* Coupon banner */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-16 relative z-10">
        <div className="p-8 rounded-[48px] bg-gradient-to-r from-[#ff7a00]/20 via-[#8b0000]/10 to-[#ffb68b]/5 border border-white/10 flex flex-col lg:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-[#ff7a00]/10 rounded-full blur-2xl" />
          
          <div className="space-y-3 relative z-10 max-w-2xl text-center lg:text-left">
            <span className="px-3.5 py-1 rounded-full bg-black/40 border border-[#ff7a00]/25 text-[#ffb68b] text-[10px] font-bold uppercase tracking-wider">
              Automatic Coupon Dispatch
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-black text-white leading-none uppercase">
              REVEAL SOMMELIER DISCOUNTS
            </h3>
            <p className="font-body text-xs md:text-sm text-[#e0c0af]/80 leading-relaxed">
              Every 5th order receives an automatic $25 dining credit valid at any luxury gastronomy vault in Beverly Hills, Manhattan, or London Mayfair. Join the VIP club today to register your account.
            </p>
          </div>

          <div className="shrink-0 relative z-10 w-full lg:w-auto">
            <Link 
              href="/profile"
              className="w-full lg:w-auto h-14 px-8 bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] text-[#522300] rounded-full flex items-center justify-center font-black text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(255,122,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              Sign Up For Credits
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-container-max mx-auto text-center border-t border-white/5 mt-20 pt-8 text-[10px] text-white/30 px-margin-mobile">
        <p>© 2026 LUMINA FOODS CORPORATION. PRIVILEGED BENEFITS &amp; ELITE VOUCHERS RESERVED FOR MEMBERS.</p>
      </footer>
    </div>
  );
}
