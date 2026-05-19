import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '@lumina/core';
import { Navbar } from '@lumina/ui';
import { 
  Compass, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowLeft,
  Navigation,
  Activity,
  Cpu,
  Plane,
  AlertCircle
} from 'lucide-react';

interface TrackingStep {
  label: string;
  subLabel: string;
  status: 'done' | 'active' | 'pending';
}

export default function Tracking() {
  const { totalItems } = useCart();
  const [eta, setEta] = useState<string>('12 mins');
  const [knots, setKnots] = useState<number>(45);
  const [altitude, setAltitude] = useState<number>(120);
  const [battery, setBattery] = useState<number>(84);
  const [lat, setLat] = useState<string>('34.0736° N');
  const [lng, setLng] = useState<string>('118.4004° W');

  const trackingSteps: TrackingStep[] = [
    { label: 'PATRON REQUEST SECURED', subLabel: 'Wagyu Sourdough selections verified by kitchen.', status: 'done' },
    { label: 'OVEN FIRED PREPARATION', subLabel: 'Charcoal stones heated to 750°F.', status: 'done' },
    { label: 'GASTRONOMY FLAKE DUSTING', subLabel: 'Gold flaking & organic truffles finished by Chef.', status: 'done' },
    { label: 'DRONE DEPLOYMENT SUCCESS', subLabel: 'Lumina flight unit loaded at Launch Terminal 4.', status: 'done' },
    { label: 'AUTONOMOUS SATELLITE CRUISE', subLabel: 'High-speed routing active. Laser altimeter locked.', status: 'active' },
    { label: 'PRESTIGE TOUCHDOWN', subLabel: 'Sub-15 minute premium coordinates release.', status: 'pending' }
  ];

  // Tick simulation to make it feel alive!
  useEffect(() => {
    const interval = setInterval(() => {
      setKnots(prev => Math.min(52, Math.max(38, prev + (Math.random() > 0.5 ? 1 : -1))));
      setAltitude(prev => Math.min(135, Math.max(115, prev + (Math.random() > 0.5 ? 2 : -2))));
      setBattery(prev => Math.max(12, prev - 1));
      
      const newLat = (34.0736 + (Math.random() * 0.0005)).toFixed(4);
      const newLng = (118.4004 - (Math.random() * 0.0005)).toFixed(4);
      setLat(`${newLat}° N`);
      setLng(`${newLng}° W`);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] relative overflow-x-hidden font-body selection:bg-[#ffb68b]/30 pb-20">
      <Head>
        <title>Lumina Foods | Drone Flight Satellite Tracking</title>
        <meta name="description" content="Track your autonomous high-speed drone delivery from Lumina Foods kitchen to your precise coordinate location." />
      </Head>

      {/* Decorative radial glows */}
      <div 
        className="absolute top-0 right-1/3 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20 z-0"
        style={{ background: 'radial-gradient(circle, rgba(255, 122, 0, 0.25) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-10 z-0"
        style={{ background: 'radial-gradient(circle, rgba(139, 0, 0, 0.3) 0%, transparent 70%)' }}
      />

      {/* Glassmorphic Navbar */}
      <Navbar 
        totalItems={totalItems} 
        onCartClick={() => { window.location.href = '/'; }} 
        currentPath="/tracking" 
      />

      {/* Header title */}
      <header className="pt-36 pb-12 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center space-y-4">
        <span className="font-body text-xs text-[#ff7a00] tracking-[0.3em] uppercase block">
          Satellite Logistics
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white tracking-tight leading-none uppercase">
          DRONE FLIGHT TRACKING
        </h1>
        <div className="w-16 h-1 bg-[#ff7a00] mx-auto rounded-full mt-2" />
      </header>

      {/* Primary Dashboard Layout */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Drone Flight Simulation Dashboard (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 bg-[#1c1b1b]/50 border border-white/5 rounded-[40px] backdrop-blur-md relative overflow-hidden space-y-8">
            
            {/* Live radar sweep */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff7a00]/5 rounded-full blur-xl" />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping absolute" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                <span className="font-display font-bold text-sm text-white uppercase tracking-wider">Flight Active</span>
              </div>
              <span className="text-[10px] text-[#e0c0af]/50 font-bold uppercase tracking-wider">Target ID: LMN-DRN982</span>
            </div>

            {/* Simulated Satellite Vector HUD */}
            <div className="aspect-[16/9] w-full rounded-3xl bg-black/80 border border-white/5 relative overflow-hidden flex items-center justify-center">
              
              {/* Concentric scan lines */}
              <div className="absolute inset-0 border border-white/2.5 rounded-full scale-90" />
              <div className="absolute inset-0 border border-[#ff7a00]/5 rounded-full scale-50" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />

              {/* Glowing flight coordinates */}
              <div className="absolute top-6 left-6 text-[10px] font-mono text-[#ffb68b]/70 space-y-0.5">
                <p>LAT: {lat}</p>
                <p>LNG: {lng}</p>
              </div>

              <div className="absolute bottom-6 right-6 text-[10px] font-mono text-emerald-400/70 flex items-center gap-1.5">
                <Cpu size={12} />
                <span>SATELLITE LOCK: 11 SAT</span>
              </div>

              {/* Drone marker */}
              <div className="relative animate-pulse flex flex-col items-center">
                <div className="absolute -inset-4 rounded-full border border-[#ffb68b]/20 animate-ping" />
                <div className="w-10 h-10 rounded-full bg-[#ff7a00]/25 border border-[#ffb68b] flex items-center justify-center shadow-[0_0_20px_rgba(255,122,0,0.5)]">
                  <Plane className="text-white transform rotate-45" size={18} />
                </div>
                <span className="text-[9px] font-mono bg-black/60 px-2 py-0.5 rounded border border-[#ffb68b]/20 text-[#ffb68b] font-bold mt-2">
                  ALT: {altitude}FT
                </span>
              </div>

              {/* Dynamic status overlays */}
              <div className="absolute bottom-6 left-6 bg-black/50 border border-white/5 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <Activity size={12} className="text-[#ff7a00] animate-pulse" />
                <span className="text-[9px] font-semibold text-white uppercase tracking-wider">HUD FEED ACTIVE</span>
              </div>
            </div>

            {/* Flight Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="p-4 bg-black/30 border border-white/5 rounded-2xl text-center space-y-1">
                <span className="text-[9px] text-[#e0c0af]/50 font-bold uppercase tracking-wider block">Ground Speed</span>
                <p className="font-display font-black text-lg text-white">{knots} Knots</p>
              </div>

              <div className="p-4 bg-black/30 border border-white/5 rounded-2xl text-center space-y-1">
                <span className="text-[9px] text-[#e0c0af]/50 font-bold uppercase tracking-wider block">Laser Altitude</span>
                <p className="font-display font-black text-lg text-white">{altitude} Feet</p>
              </div>

              <div className="p-4 bg-black/30 border border-white/5 rounded-2xl text-center space-y-1">
                <span className="text-[9px] text-[#e0c0af]/50 font-bold uppercase tracking-wider block">Estimated ETA</span>
                <p className="font-display font-black text-lg text-[#ffb68b]">{eta}</p>
              </div>

              <div className="p-4 bg-black/30 border border-white/5 rounded-2xl text-center space-y-1">
                <span className="text-[9px] text-[#e0c0af]/50 font-bold uppercase tracking-wider block">Flight Battery</span>
                <p className="font-display font-black text-lg text-emerald-400">{battery}%</p>
              </div>

            </div>

          </div>
        </div>

        {/* Right Column: Tracking Milestones (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 bg-[#1c1b1b]/50 border border-white/5 rounded-[40px] backdrop-blur-md space-y-6">
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Navigation size={18} className="text-[#ffb68b]" /> FLIGHT LOG MILESTONES
            </h3>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
              {trackingSteps.map((step, i) => (
                <div key={i} className="flex gap-4 items-start relative z-10">
                  
                  {/* Status Circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    step.status === 'done'
                      ? 'bg-gradient-to-br from-[#ff7a00] to-[#ffb68b] border-transparent text-[#522300]'
                      : step.status === 'active'
                        ? 'bg-[#1c1b1b] border-[#ff7a00] text-[#ff7a00] shadow-[0_0_15px_rgba(255,122,0,0.3)] animate-pulse'
                        : 'bg-[#121212] border-white/5 text-white/20'
                  }`}>
                    {step.status === 'done' ? (
                      <ShieldCheck size={14} />
                    ) : (
                      <span className="text-[10px] font-black">{i + 1}</span>
                    )}
                  </div>

                  <div className="space-y-0.5 pt-1">
                    <h4 className={`text-xs font-black uppercase tracking-wider ${
                      step.status === 'done' 
                        ? 'text-white' 
                        : step.status === 'active' 
                          ? 'text-[#ffb68b]' 
                          : 'text-white/30'
                    }`}>
                      {step.label}
                    </h4>
                    <p className={`text-[10px] font-body ${
                      step.status === 'done' || step.status === 'active'
                        ? 'text-[#e0c0af]/70'
                        : 'text-white/20'
                    }`}>
                      {step.subLabel}
                    </p>
                  </div>

                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5 space-y-4">
              <div className="flex gap-2 items-center text-[10px] text-[#e0c0af]/40 uppercase font-semibold">
                <AlertCircle size={12} className="text-[#ff7a00]" />
                <span>Security Flight protocol active</span>
              </div>
              <button 
                onClick={() => alert("Helpline dispatcher called. Premium drone coordinate matching initialized.")}
                className="w-full py-3.5 bg-black/40 hover:bg-white/5 border border-white/10 text-white rounded-2xl text-xs font-semibold uppercase tracking-wider text-center transition-all cursor-pointer"
              >
                Connect Dispatch Concierge
              </button>
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-container-max mx-auto text-center border-t border-white/5 mt-20 pt-8 text-[10px] text-white/30 px-margin-mobile">
        <p>© 2026 LUMINA FOODS CORPORATION. HIGH-ALTITUDE DRONE SECURITY PATROLLER.</p>
      </footer>
    </div>
  );
}
