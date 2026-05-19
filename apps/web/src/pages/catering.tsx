import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '@lumina/core';
import { Navbar } from '@lumina/ui';
import { 
  Sparkles, 
  MapPin, 
  Users, 
  Coins, 
  ArrowLeft,
  Calendar,
  Compass,
  UtensilsCrossed,
  ChefHat,
  Gem,
  Award,
  CheckCircle2
} from 'lucide-react';

interface EventPackage {
  id: string;
  title: string;
  tagline: string;
  description: string;
  pricePerPatron: number;
  minPatrons: number;
  badge: string;
  perks: string[];
}

export default function Catering() {
  const { totalItems } = useCart();
  const [guestCount, setGuestCount] = useState<number>(50);
  const [selectedPackage, setSelectedPackage] = useState<string>('gala');
  const [includeGold, setIncludeGold] = useState<boolean>(true);
  const [includeTruffles, setIncludeTruffles] = useState<boolean>(true);
  const [includeSommelier, setIncludeSommelier] = useState<boolean>(false);
  const [submittedProposal, setSubmittedProposal] = useState<boolean>(false);
  const [proposalCode, setProposalCode] = useState<string>('');

  const packagesList: EventPackage[] = [
    {
      id: 'gala',
      title: 'Sovereign Banquet',
      tagline: 'High-Society Site Gastronomy',
      description: 'Mobilizes our full wood-fired stone ovens and culinary teams directly to your estate. Tailored culinary showcases.',
      pricePerPatron: 185.00,
      minPatrons: 40,
      badge: 'Most Distinguished',
      perks: [
        'Full artisanal wood-fired pizza ovens on site',
        'Customized wagyu sourdough sliders with hand-pressed glazes',
        'All botanical elixirs custom infused to theme',
        'Assigned Master Sommelier & 3 dedicated chefs'
      ]
    },
    {
      id: 'yacht',
      title: 'Elite Yacht Soiree',
      tagline: 'Marine Coordinates Delivery',
      description: 'Exclusive nautical dining. High-speed boat tenders deliver freshly fire-roasted dishes to your marine coordinates.',
      pricePerPatron: 290.00,
      minPatrons: 15,
      badge: 'Ocean prestige',
      perks: [
        'Raw oyster & cold-water caviar styling bar',
        'Priority drone-shipping tender support',
        'Black truffle infused food pairings',
        'Ultra-private sommelier presentation'
      ]
    },
    {
      id: 'gallery',
      title: 'Vance Gallery Lounge',
      tagline: 'Art & Minimalist Sensory Pairing',
      description: 'Designed for private gallery openings, fashion circles, and high-end artistic showcases.',
      pricePerPatron: 145.00,
      minPatrons: 30,
      badge: 'Artistic minimalist',
      perks: [
        'Tasting towers with edible gold charcoal snacks',
        'Mini slider flights with dry-aged prime brisket',
        'Craft lavender botanical cocktails',
        'Ambient smoke & sensory dome plating'
      ]
    }
  ];

  const handleGenerateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'PROP-' + Math.floor(100000 + Math.random() * 900000);
    setProposalCode(code);
    setSubmittedProposal(true);
  };

  const activePack = packagesList.find(p => p.id === selectedPackage) || packagesList[0];
  
  // Calculate pricing based on custom variables
  const baseCost = activePack.pricePerPatron * guestCount;
  const goldCost = includeGold ? 25 * guestCount : 0;
  const truffleCost = includeTruffles ? 30 * guestCount : 0;
  const sommelierCost = includeSommelier ? 1200 : 0; // Flat setup fee
  const totalCost = baseCost + goldCost + truffleCost + sommelierCost;

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] relative overflow-x-hidden font-body selection:bg-[#ffb68b]/30 pb-20">
      <Head>
        <title>Lumina Foods | Elite Sovereign Catering</title>
        <meta name="description" content="High-society banquets, elite marine yacht catering, and customized truffle culinary proposals by Lumina Foods." />
      </Head>

      {/* Background radial glows */}
      <div 
        className="absolute top-0 left-1/4 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none opacity-20 z-0"
        style={{ background: 'radial-gradient(circle, rgba(255, 122, 0, 0.3) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-1/4 right-0 w-[550px] h-[550px] rounded-full blur-[150px] pointer-events-none opacity-15 z-0"
        style={{ background: 'radial-gradient(circle, rgba(139, 0, 0, 0.35) 0%, transparent 70%)' }}
      />

      {/* Glassmorphic Navbar */}
      <Navbar 
        totalItems={totalItems} 
        onCartClick={() => { window.location.href = '/'; }} 
        currentPath="/catering" 
      />

      {/* Header section */}
      <header className="pt-36 pb-12 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center space-y-4">
        <span className="font-body text-xs text-[#ffb68b] tracking-[0.3em] uppercase block">
          Elite Event Design
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-black text-white tracking-tight leading-none uppercase">
          SOVEREIGN CATERING
        </h1>
        <p className="font-body text-sm md:text-base text-[#e0c0af] max-w-2xl mx-auto leading-relaxed">
          Reimagine high-society corporate banquets and private yacht receptions through the culinary lens of raw wagyu luxury, premium wood-fired stones, and custom elixirs.
        </p>
        <div className="w-16 h-1 bg-[#ff7a00] mx-auto rounded-full mt-2" />
      </header>

      {/* Packages Grid */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packagesList.map((pack) => (
            <div 
              key={pack.id}
              onClick={() => setSelectedPackage(pack.id)}
              className={`p-8 rounded-[40px] border flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden ${
                selectedPackage === pack.id
                  ? 'bg-[#1c1b1b]/80 border-[#ffb68b] shadow-[0_15px_30px_rgba(255,122,0,0.1)] scale-[1.01]'
                  : 'bg-[#1c1b1b]/30 border-white/5 hover:border-white/10 hover:bg-[#1c1b1b]/50'
              }`}
            >
              {selectedPackage === pack.id && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff7a00]/10 rounded-full blur-xl" />
              )}

              <div className="space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#ffb68b] text-[9px] font-bold uppercase tracking-wider">
                    {pack.badge}
                  </span>
                  <span className="font-display font-black text-white text-lg">
                    ${pack.pricePerPatron}<span className="text-[10px] text-white/40 font-normal"> / guest</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">{pack.title}</h3>
                  <p className="text-[10px] text-[#ff7a00] uppercase tracking-wider font-semibold block">{pack.tagline}</p>
                  <p className="text-xs text-[#e0c0af]/80 leading-relaxed font-body">{pack.description}</p>
                </div>

                <div className="h-px bg-white/5" />

                <ul className="space-y-3">
                  {pack.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#e0c0af]/70 font-body">
                      <Sparkles size={11} className="text-[#ff7a00] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button 
                  className={`w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                    selectedPackage === pack.id
                      ? 'bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] text-[#522300]'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  {selectedPackage === pack.id ? 'SELECTED PACKAGE' : 'CHOOSE PACKAGE'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Configurator Form */}
      <section className="max-w-4xl mx-auto px-margin-mobile relative z-10">
        <div className="p-8 md:p-12 bg-[#1c1b1b]/50 border border-white/5 rounded-[48px] backdrop-blur-md relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-44 h-44 bg-[#ff7a00]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-8">
            <ChefHat size={32} className="text-[#ffb68b]" />
            <div className="space-y-0.5">
              <span className="text-[10px] text-[#ffb68b] font-black uppercase tracking-widest block">Sovereign Planner</span>
              <h3 className="font-display text-xl md:text-2xl font-black text-white uppercase tracking-tight">GASTRONOMY PROPOSAL GENERATOR</h3>
            </div>
          </div>

          <form onSubmit={handleGenerateProposal} className="space-y-8">
            
            {/* Guest Count slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="text-white/60 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Users size={14} className="text-[#ffb68b]" /> Expected Patrons
                </label>
                <span className="text-[#ffb68b] font-black text-sm">{guestCount} Guests</span>
              </div>
              <input 
                type="range"
                min="10"
                max="300"
                step="5"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full h-1 bg-black/40 rounded-lg appearance-none cursor-pointer accent-[#ff7a00] border border-white/5"
              />
              <div className="flex justify-between text-[9px] text-[#e0c0af]/40 font-semibold uppercase">
                <span>Min: 10</span>
                <span>Max: 300</span>
              </div>
            </div>

            {/* Custom VIP add-ons */}
            <div className="space-y-4">
              <label className="text-xs text-white/60 font-semibold uppercase tracking-wider block">
                Signature Gastronomic Add-ons
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div 
                  onClick={() => setIncludeGold(!includeGold)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    includeGold 
                      ? 'bg-[#ff7a00]/5 border-[#ffb68b]' 
                      : 'bg-black/20 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <Gem size={18} className={includeGold ? 'text-[#ffb68b]' : 'text-white/40'} />
                    <input type="checkbox" checked={includeGold} readOnly className="accent-[#ff7a00]" />
                  </div>
                  <div className="mt-4">
                    <span className="text-[10px] font-bold text-white uppercase block">24K Gold Flake Dusting</span>
                    <span className="text-[9px] text-[#e0c0af]/50 block">+$25.00 per patron</span>
                  </div>
                </div>

                <div 
                  onClick={() => setIncludeTruffles(!includeTruffles)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    includeTruffles 
                      ? 'bg-[#ff7a00]/5 border-[#ffb68b]' 
                      : 'bg-black/20 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <Award size={18} className={includeTruffles ? 'text-[#ffb68b]' : 'text-white/40'} />
                    <input type="checkbox" checked={includeTruffles} readOnly className="accent-[#ff7a00]" />
                  </div>
                  <div className="mt-4">
                    <span className="text-[10px] font-bold text-white uppercase block">Truffle Honey Drizzles</span>
                    <span className="text-[9px] text-[#e0c0af]/50 block">+$30.00 per patron</span>
                  </div>
                </div>

                <div 
                  onClick={() => setIncludeSommelier(!includeSommelier)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    includeSommelier 
                      ? 'bg-[#ff7a00]/5 border-[#ffb68b]' 
                      : 'bg-black/20 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <Coins size={18} className={includeSommelier ? 'text-[#ffb68b]' : 'text-white/40'} />
                    <input type="checkbox" checked={includeSommelier} readOnly className="accent-[#ff7a00]" />
                  </div>
                  <div className="mt-4">
                    <span className="text-[10px] font-bold text-white uppercase block">Assigned Sommelier Host</span>
                    <span className="text-[9px] text-[#e0c0af]/50 block">+$1,200.00 flat fee</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Pricing Summary */}
            <div className="p-6 bg-black/40 border border-white/5 rounded-3xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/50">Base Package ({activePack.title})</span>
                <span className="text-white font-bold">${baseCost.toLocaleString()}</span>
              </div>
              
              {(includeGold || includeTruffles || includeSommelier) && (
                <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-white/50">
                  {includeGold && (
                    <div className="flex justify-between">
                      <span>• 24K Gold Dusting Pairing</span>
                      <span className="text-white">${goldCost.toLocaleString()}</span>
                    </div>
                  )}
                  {includeTruffles && (
                    <div className="flex justify-between">
                      <span>• Truffle Honey Infusions</span>
                      <span className="text-white">${truffleCost.toLocaleString()}</span>
                    </div>
                  )}
                  {includeSommelier && (
                    <div className="flex justify-between">
                      <span>• Reserved Sommelier Concierge</span>
                      <span className="text-white">${sommelierCost.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4 border-t border-[#ff7a00]/20 flex justify-between items-end">
                <div>
                  <span className="text-[9px] text-[#e0c0af]/40 uppercase font-black tracking-widest block">Estimated Proposal Value</span>
                  <span className="text-xs text-white/60 font-body">Subject to coordinate approvals</span>
                </div>
                <span className="font-display font-black text-2xl md:text-3xl text-white tracking-tight">
                  ${totalCost.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit proposal button */}
            <button 
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] text-[#522300] font-black text-sm tracking-wider uppercase rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(255,122,0,0.25)] hover:scale-[1.01] active:scale-98 transition-all cursor-pointer"
            >
              Generate Sovereign Event Proposal
            </button>
          </form>

          {/* Submitted Modal Overlay */}
          {submittedProposal && (
            <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-8 text-center space-y-6 animate-fadeIn z-20">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <CheckCircle2 size={32} className="text-emerald-400" />
              </div>

              <div className="space-y-2">
                <span className="text-[9px] text-emerald-400 font-black uppercase tracking-[0.2em] block">Sovereign Proposal Confirmed</span>
                <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight">PROPOSAL REGISTERED SUCCESSFULLY</h3>
                <p className="text-xs text-[#e0c0af]/70 max-w-md mx-auto leading-relaxed">
                  Our High-Society Culinary Architect has locked your draft estimate code <span className="text-[#ffb68b] font-bold">{proposalCode}</span>. A representative will contact you shortly to confirm yacht coordinates or estate details.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left w-full max-w-sm space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Draft code:</span>
                  <span className="text-white font-bold">{proposalCode}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Event package:</span>
                  <span className="text-white font-bold">{activePack.title}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/50">Total patrons:</span>
                  <span className="text-white font-bold">{guestCount} Guests</span>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-white/5">
                  <span className="text-white/50">Est. Total:</span>
                  <span className="text-[#ffb68b] font-black">${totalCost.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => setSubmittedProposal(false)}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Modify Design Settings
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-container-max mx-auto text-center border-t border-white/5 mt-20 pt-8 text-[10px] text-white/30 px-margin-mobile">
        <p>© 2026 LUMINA FOODS CORPORATION. SOVEREIGN CATERING AND SEALTITUDE GASTRONOMY REGISTRATIONS.</p>
      </footer>
    </div>
  );
}
