import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '@lumina/core';
import { Navbar } from '@lumina/ui';
import { 
  User, 
  ShieldAlert, 
  MapPin, 
  Calendar, 
  Clock, 
  ShoppingBag, 
  Sparkles, 
  LogOut,
  ArrowLeft,
  Settings,
  CircleDollarSign,
  Compass,
  CheckCircle2,
  Trash2
} from 'lucide-react';

interface PastOrder {
  id: string;
  date: string;
  items: string;
  price: number;
  deliveryMethod: 'Drone Flight' | 'Sommelier Vault Table';
  status: 'Delivered' | 'In Flight' | 'Cooking';
}

interface UserReservation {
  id: string;
  locationName: string;
  date: string;
  time: string;
  guestsCount: number;
  tier: string;
  status: 'Confirmed' | 'Completed' | 'Pending';
}

export default function Profile() {
  const { totalItems } = useCart();
  const [copiedRes, setCopiedRes] = useState<string | null>(null);
  
  // Custom mock data based on our locations and luxury parameters
  const [reservations, setReservations] = useState<UserReservation[]>([
    {
      id: 'LMN-H192K3',
      locationName: 'Beverly Hills Vault Lounge',
      date: 'May 20, 2026',
      time: '07:30 PM',
      guestsCount: 2,
      tier: 'Julian Vance VIP Chamber',
      status: 'Confirmed'
    },
    {
      id: 'LMN-M983L1',
      locationName: 'Mayfair Flame-Roasted Chamber',
      date: 'April 14, 2026',
      time: '08:00 PM',
      guestsCount: 4,
      tier: 'Imperial Savor Lounge',
      status: 'Completed'
    }
  ]);

  const [orders, setOrders] = useState<PastOrder[]>([
    {
      id: 'ORD-98301',
      date: 'May 16, 2026',
      items: '1x Brioche Wagyu Burger, 1x Elderflower Elixir, 1x Charcoal Pizza',
      price: 114.00,
      deliveryMethod: 'Drone Flight',
      status: 'Delivered'
    },
    {
      id: 'ORD-92813',
      date: 'May 10, 2026',
      items: '2x Truffle Mushroom Pizza, 2x Jasmine Citrus botanical',
      price: 156.00,
      deliveryMethod: 'Drone Flight',
      status: 'Delivered'
    }
  ]);

  const handleCopyReceipt = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedRes(id);
    setTimeout(() => setCopiedRes(null), 2000);
  };

  const handleCancelReservation = (id: string) => {
    if (confirm("Are you sure you want to cancel this elite reservation vault booking?")) {
      setReservations(reservations.filter(res => res.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] relative overflow-x-hidden font-body selection:bg-[#ffb68b]/30 pb-20">
      <Head>
        <title>Lumina Foods | Premium Patron Profile</title>
        <meta name="description" content="Manage your Lumina VIP dining reservations, track autonomous drone dispatches, and check exclusive loyalty points." />
      </Head>

      {/* Decorative Background Glows */}
      <div 
        className="absolute top-0 right-10 w-[550px] h-[550px] rounded-full blur-[130px] pointer-events-none opacity-20 z-0"
        style={{ background: 'radial-gradient(circle, rgba(255, 122, 0, 0.4) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-10 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-10 z-0"
        style={{ background: 'radial-gradient(circle, rgba(255, 182, 139, 0.2) 0%, transparent 70%)' }}
      />

      {/* Navigation Header */}
      <Navbar 
        totalItems={totalItems} 
        onCartClick={() => { window.location.href = '/'; }} 
        currentPath="/profile" 
      />

      {/* Main Body Grid */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        {/* Left Column: VIP Account Profile Badge (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 bg-[#1c1b1b]/50 border border-white/10 rounded-[40px] text-center relative overflow-hidden backdrop-blur-md">
            
            {/* VIP Glow Ring */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff7a00]/10 rounded-full blur-2xl" />

            <div className="w-24 h-24 rounded-full border-2 border-[#ffb68b] bg-black/40 flex items-center justify-center mx-auto mb-4 relative shadow-[0_0_25px_rgba(255,122,0,0.25)]">
              <User size={48} className="text-[#ffb68b]" />
              <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] text-[#522300] px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                Elite
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="font-display text-xl font-bold text-white tracking-tight uppercase">Julian Vance</h2>
              <span className="text-[#ffb68b] text-xs font-semibold uppercase tracking-wider block">Obsidian VIP Member</span>
              <p className="text-[10px] text-[#e0c0af]/50">Patron Since March 2024</p>
            </div>

            <div className="h-px bg-white/5 my-6" />

            {/* Points Progress */}
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/50 uppercase font-semibold">Tier Progress</span>
                <span className="text-white font-bold">4,850 / 5,000 pts</span>
              </div>
              <div className="w-full h-2 bg-black/40 border border-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] shadow-[0_0_10px_rgba(255,122,0,0.5)]"
                  style={{ width: '97%' }}
                />
              </div>
              <p className="text-[9px] text-[#e0c0af]/50 text-center leading-normal">
                Only <span className="text-[#ffb68b] font-bold">150 points</span> remaining to unlock Imperial Emperor level.
              </p>
            </div>

            <div className="h-px bg-white/5 my-6" />

            {/* Loyalty details list */}
            <div className="space-y-3.5 text-left text-xs font-body">
              <div className="flex justify-between items-center">
                <span className="text-[#e0c0af]/60">Drone Delivery:</span>
                <span className="text-emerald-400 font-semibold uppercase">Unlimited Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#e0c0af]/60">Vault Booking Window:</span>
                <span className="text-white font-semibold">30 Days Priority</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#e0c0af]/60">Callback Helpline:</span>
                <span className="text-[#ffb68b] font-bold">Direct Line Active</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button 
                onClick={() => alert("Helpline dispatcher called. Premium Callback requested.")}
                className="w-full py-3 border border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Request Concierge Call
              </button>
              <button 
                onClick={() => alert("Signed out of premium profile session.")}
                className="w-full py-3 bg-[#8b0000]/10 hover:bg-[#8b0000]/20 border border-[#8b0000]/30 text-rose-300 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <LogOut size={12} /> Sign Out Session
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Dashboard (8 columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Active Reservations */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#ffb68b]" />
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">Active Dining Vaults</h3>
            </div>

            {reservations.length === 0 ? (
              <div className="p-8 bg-[#1c1b1b]/40 border border-white/5 rounded-3xl text-center">
                <p className="text-xs text-[#e0c0af]/50 font-body">No upcoming luxury vault dining sessions scheduled.</p>
                <Link href="/locations" className="text-[#ffb68b] text-xs font-bold uppercase tracking-wider underline hover:text-white transition-colors block mt-2">
                  Secure A Vault Lounge Now
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reservations.map((res) => (
                  <div key={res.id} className="p-6 bg-[#1c1b1b]/40 border border-white/5 rounded-[32px] relative space-y-4 hover:border-white/10 transition-colors">
                    
                    <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold uppercase tracking-wider">
                      {res.status}
                    </span>

                    <div className="space-y-1">
                      <h4 className="font-display text-sm font-bold text-white uppercase truncate pr-16">{res.locationName}</h4>
                      <p className="text-[10px] text-[#ffb68b] uppercase tracking-wider font-semibold">{res.tier}</p>
                    </div>

                    <div className="space-y-2 text-xs font-body text-[#e0c0af]/80">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-[#ff7a00]" />
                        <span>{res.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-[#ff7a00]" />
                        <span>{res.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={12} className="text-[#ff7a00]" />
                        <span>{res.guestsCount} Patrons Invited</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex gap-3">
                      <button 
                        onClick={() => handleCopyReceipt(res.id)}
                        className="flex-grow py-2 border border-white/10 bg-black/20 hover:bg-white/5 text-white rounded-lg text-[10px] font-semibold uppercase tracking-wider text-center transition-all cursor-pointer"
                      >
                        {copiedRes === res.id ? 'Voucher Copied!' : 'Access Receipt'}
                      </button>
                      <button 
                        onClick={() => handleCancelReservation(res.id)}
                        className="p-2 border border-rose-950 bg-rose-950/10 hover:bg-rose-950/30 text-rose-300 rounded-lg transition-all cursor-pointer flex items-center justify-center"
                        title="Cancel Reservation"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section 2: Order History */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#ffb68b]" />
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">Drone Dispatch Logs</h3>
            </div>

            <div className="p-6 bg-[#1c1b1b]/40 border border-white/5 rounded-[40px] overflow-hidden">
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5 last:pb-0 last:border-b-0">
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-semibold text-sm text-white uppercase">{order.id}</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-white/50">{order.date}</span>
                      </div>
                      <p className="text-xs text-[#e0c0af]/80 font-body leading-relaxed">{order.items}</p>
                      <div className="flex items-center gap-2 text-[10px] text-[#ffb68b] uppercase tracking-wide">
                        <Compass size={11} /> {order.deliveryMethod}
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                      <span className="font-display font-black text-white">${order.price.toFixed(2)}</span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                        <CheckCircle2 size={10} /> {order.status}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: VIP Elite Benefits */}
          <section className="p-8 bg-gradient-to-r from-[#ff7a00]/10 to-transparent border border-[#ff7a00]/20 rounded-[40px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#ffb68b]/10 to-transparent blur-xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#ffb68b]" />
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">Active VIP Privileges</h4>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-body text-[#e0c0af]/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#ff7a00] shrink-0 font-bold">•</span>
                  <span>Unlimited priority dispatch on botanical elixirs and charcoal ovens.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff7a00] shrink-0 font-bold">•</span>
                  <span>Zero reservation premium fees on Julian Vance and Imperial dining chambers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff7a00] shrink-0 font-bold">•</span>
                  <span>Autonomous drone routing prioritized at altitude for sub-15 minute arrivals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff7a00] shrink-0 font-bold">•</span>
                  <span>Chef customized menus and private dining pairings.</span>
                </li>
              </ul>
            </div>
          </section>

        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-container-max mx-auto text-center border-t border-white/5 mt-20 pt-8 text-[10px] text-white/30 px-margin-mobile">
        <p>© 2026 LUMINA FOODS CORPORATION. PATRON IDENTITY METRIC RECEIPTER.</p>
      </footer>
    </div>
  );
}
