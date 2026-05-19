import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Users, 
  Calendar, 
  ArrowLeft, 
  ChevronRight, 
  Search, 
  Sparkles, 
  Check, 
  ShoppingBag,
  Info
} from 'lucide-react';
import { useLocationsData, DiningLocation, useCart, formatPrice } from '@lumina/core';
import { Navbar } from '@lumina/ui';

export default function Locations() {
  const { locations } = useLocationsData();
  const { totalItems } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLoc, setSelectedLoc] = useState<DiningLocation>(locations[0]);
  const [filterOccupancy, setFilterOccupancy] = useState<'all' | 'available' | 'busy'>('all');
  
  // Booking form states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingGuests, setBookingGuests] = useState('2');
  const [bookingTier, setBookingTier] = useState('julian-vance');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [resId, setResId] = useState('');

  // Filter locations
  const filteredLocations = locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          loc.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterOccupancy === 'available') {
      return matchesSearch && loc.densityValue < 80;
    }
    if (filterOccupancy === 'busy') {
      return matchesSearch && loc.densityValue >= 80;
    }
    return matchesSearch;
  });

  const handleOpenBooking = (loc: DiningLocation) => {
    setSelectedLoc(loc);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) {
      alert("Please select a date and time for your dining experience.");
      return;
    }

    // Generate random luxury reservation ID
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'LMN-';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    setResId(result);
    setBookingSuccess(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setBookingSuccess(false);
    setBookingDate('');
    setBookingTime('');
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] relative overflow-x-hidden font-body selection:bg-[#ffb68b]/30 pb-20">
      <Head>
        <title>Lumina Foods | Premium Dining &amp; Vault Locations</title>
        <meta name="description" content="Discover our luxury fast-dining vault locations in Beverly Hills, Manhattan, and Mayfair. Live capacity tracking and exclusive room reservations." />
      </Head>

      {/* Background Ambient Radial Glows */}
      <div 
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20 z-0"
        style={{ background: 'radial-gradient(circle, rgba(255, 122, 0, 0.4) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-10 z-0"
        style={{ background: 'radial-gradient(circle, rgba(255, 182, 139, 0.3) 0%, transparent 70%)' }}
      />

      {/* 1. Glassmorphic Navigation Bar */}
      <Navbar 
        totalItems={totalItems} 
        onCartClick={() => { window.location.href = '/'; }} 
        currentPath="/locations" 
      />

      {/* 2. Page Hero Header */}
      <header className="pt-36 pb-12 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center space-y-4">
        <span className="font-body text-xs text-[#ffb68b] tracking-[0.3em] uppercase block">
          Elite Physical Footprint
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-black text-white tracking-tight leading-none uppercase">
          LUMINA GASTRONOMY VAULTS
        </h1>
        <p className="font-body text-sm md:text-base text-[#e0c0af] max-w-2xl mx-auto leading-relaxed">
          Step into our architecturally curated locations combining gold-leaf kitchen design with rapid drone dispatch networks. Enjoy our menu fresh at a table or delivered within minutes.
        </p>
        <div className="w-16 h-1 bg-[#ff7a00] mx-auto rounded-full mt-2" />
      </header>

      {/* 3. Search and Filtering Controls */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 mb-10">
        <div className="p-4 bg-[#1c1b1b]/60 border border-white/5 rounded-3xl backdrop-blur-md flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="Search by city, state, or street..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#ff7a00] transition-colors"
            />
          </div>

          {/* Filtering Toggles */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-none">
            <button 
              onClick={() => setFilterOccupancy('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                filterOccupancy === 'all' 
                  ? 'bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] text-[#522300] shadow-lg' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              All Vaults
            </button>
            <button 
              onClick={() => setFilterOccupancy('available')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                filterOccupancy === 'available' 
                  ? 'bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] text-[#522300] shadow-lg' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              Available Seating
            </button>
            <button 
              onClick={() => setFilterOccupancy('busy')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                filterOccupancy === 'busy' 
                  ? 'bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] text-[#522300] shadow-lg' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              Fully Booked / Peak
            </button>
          </div>
        </div>
      </section>

      {/* 4. Double Panel Workspace */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Vault Cards List (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          {filteredLocations.length === 0 ? (
            <div className="p-12 text-center bg-[#1c1b1b]/40 border border-white/5 rounded-3xl">
              <p className="text-[#e0c0af]/60 font-body text-base">No active vaults match your search queries.</p>
              <button 
                onClick={() => { setSearchQuery(''); setFilterOccupancy('all'); }} 
                className="mt-4 text-[#ffb68b] underline text-sm font-semibold hover:text-white transition-colors"
              >
                Clear Search &amp; Filters
              </button>
            </div>
          ) : (
            filteredLocations.map((loc) => {
              const isActive = selectedLoc.id === loc.id;
              return (
                <div 
                  key={loc.id}
                  onClick={() => setSelectedLoc(loc)}
                  className={`p-6 rounded-[32px] border transition-all duration-300 cursor-pointer flex flex-col md:flex-row gap-6 relative group ${
                    isActive 
                      ? 'border-[#ffb68b] bg-[#ffb68b]/5 shadow-[0_15px_30px_rgba(255,122,0,0.1)]' 
                      : 'border-white/5 bg-[#1c1b1b]/40 hover:border-white/10 hover:bg-[#1c1b1b]/60'
                  }`}
                >
                  {/* Decorative corner tag for active cards */}
                  {isActive && (
                    <span className="absolute top-4 right-4 bg-[#ff7a00] text-[#522300] px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <Sparkles size={8} /> Active Focus
                    </span>
                  )}

                  {/* Image wrapper */}
                  <div className="w-full md:w-44 h-44 rounded-2xl overflow-hidden relative border border-white/10 shrink-0">
                    <img 
                      src={loc.image} 
                      alt={loc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content details */}
                  <div className="flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-[#ffb68b] transition-colors">{loc.name}</h3>
                      <p className="text-xs text-[#e0c0af]/80 font-body leading-relaxed">{loc.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-body text-white/60">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#ff7a00]" />
                        <span className="truncate">{loc.address.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[#ff7a00]" />
                        <span>{loc.hours}</span>
                      </div>
                    </div>

                    {/* Progress Bar density tracker */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] uppercase font-semibold">
                        <span className="text-[#e0c0af]/50">Seating Occupancy</span>
                        <span className={loc.densityValue > 80 ? 'text-red-400 font-bold' : 'text-[#ffb68b]'}>
                          {loc.seatingDensity}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            loc.densityValue > 80 
                              ? 'bg-gradient-to-r from-red-500 to-rose-400' 
                              : 'bg-gradient-to-r from-[#ff7a00] to-[#ffb68b]'
                          }`}
                          style={{ width: `${loc.densityValue}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-3 items-center justify-between">
                      <a 
                        href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-xs font-bold text-[#e0c0af]/80 hover:text-white transition-colors cursor-pointer"
                      >
                        <Phone size={12} className="text-[#ff7a00]" /> {loc.phone}
                      </a>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenBooking(loc);
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] text-[#522300] rounded-xl text-[10px] font-black uppercase tracking-wider shadow-[0_5px_15px_rgba(255,122,0,0.2)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        Book Table
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Side: Lumina Interactive Map Grid Mock (5 Columns) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-[#1c1b1b]/40 border border-white/5 rounded-[40px] p-6 backdrop-blur-md space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-[10px] text-[#ffb68b] font-black uppercase tracking-widest">Live Visual Interface</span>
                <h3 className="font-display text-lg font-bold text-white uppercase">Vault Locator Matrix</h3>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Satellite Active
              </div>
            </div>

            {/* Premium World Grid vector illustration */}
            <div className="aspect-[4/3] bg-black/60 border border-white/10 rounded-3xl overflow-hidden relative flex items-center justify-center p-4">
              {/* Map grid scan lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.1),transparent_80%)] pointer-events-none" />

              {/* Central Radar Circle scanning */}
              <div className="absolute w-44 h-44 border border-white/10 rounded-full animate-ping pointer-events-none opacity-10" />
              <div className="absolute w-64 h-64 border border-white/5 rounded-full pointer-events-none" />

              {/* Luxury Graphic elements: World layout representation */}
              <svg className="w-full h-full opacity-30 pointer-events-none" viewBox="0 0 400 300">
                <path d="M 50 150 Q 80 100 120 150 T 200 150 T 280 150 T 350 150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <path d="M 80 200 Q 140 120 200 200 T 320 200" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <path d="M 120 100 Q 180 40 240 100 T 360 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              </svg>

              {/* Locations Interactive Pins */}
              {locations.map((loc) => {
                const isSelected = selectedLoc.id === loc.id;
                // Pre-defined responsive coordinate mappings for our mockup map
                const coordinateMapping: Record<string, { x: number; y: number }> = {
                  'beverly-hills': { x: 75, y: 140 },
                  'manhattan': { x: 165, y: 110 },
                  'mayfair': { x: 310, y: 85 }
                };
                const pos = coordinateMapping[loc.id] || { x: 200, y: 150 };

                return (
                  <div 
                    key={loc.id}
                    onClick={() => setSelectedLoc(loc)}
                    className="absolute cursor-pointer transition-all duration-300 flex flex-col items-center group z-20"
                    style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                  >
                    {/* Glowing concentric ripple rings */}
                    {isSelected && (
                      <>
                        <span className="absolute w-12 h-12 rounded-full border border-[#ff7a00]/30 animate-ping opacity-75" style={{ animationDuration: '2s' }} />
                        <span className="absolute w-8 h-8 rounded-full bg-[#ff7a00]/10 border border-[#ffb68b]/20 animate-pulse" />
                      </>
                    )}
                    
                    {/* Glowing Pin Point */}
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-[#ff7a00] border-[#ffb68b] scale-125 shadow-[0_0_15px_rgba(255,122,0,0.8)]' 
                        : 'bg-black/60 border-white/40 group-hover:bg-[#ff7a00] group-hover:border-[#ffb68b] group-hover:scale-110'
                    }`}>
                      <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-[#522300]' : 'bg-white/80'}`} />
                    </div>

                    {/* Popover Card Label */}
                    <div className={`absolute bottom-6 px-2.5 py-1 bg-[#131313] border border-white/10 rounded-lg shadow-xl text-[9px] font-bold text-white tracking-wider uppercase flex items-center gap-1.5 transition-all duration-200 ${
                      isSelected ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0'
                    }`}>
                      <MapPin size={8} className="text-[#ff7a00]" /> {loc.name.split(' ')[1]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Vault Details panel */}
            <div className="p-5 bg-black/40 border border-white/5 rounded-3xl space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-white/10">
                  <img src={selectedLoc.image} alt={selectedLoc.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-0.5 flex-grow min-w-0">
                  <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide truncate">{selectedLoc.name}</h4>
                  <p className="text-[10px] text-[#ffb68b] uppercase tracking-wider font-semibold">{selectedLoc.hours}</p>
                </div>
              </div>
              
              <div className="h-px bg-white/5" />
              
              <div className="space-y-2 text-xs font-body text-[#e0c0af]/85 leading-relaxed">
                <div className="flex gap-2">
                  <span className="text-[#ff7a00] font-semibold shrink-0">ADDRESS:</span>
                  <span>{selectedLoc.address}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-[#ff7a00] font-semibold shrink-0">DENSITY:</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-semibold">{selectedLoc.seatingDensity}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedLoc.address)}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-grow py-2.5 border border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-wider text-center transition-all cursor-pointer"
                >
                  Directions
                </a>
                <button 
                  onClick={() => handleOpenBooking(selectedLoc)}
                  className="flex-grow py-2.5 bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] text-[#522300] rounded-xl text-[10px] font-black uppercase tracking-wider shadow-[0_5px_15px_rgba(255,122,0,0.2)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Book Vault
                </button>
              </div>
            </div>

            {/* Drone service notification card */}
            <div className="p-4 bg-[#ff7a00]/5 border border-[#ff7a00]/10 rounded-2xl flex items-center gap-3">
              <Info size={16} className="text-[#ffb68b] shrink-0" />
              <p className="text-[10px] text-[#e0c0af] leading-relaxed font-body">
                Premium delivery dispatched via high-speed autonomous courier drones within 4 miles of any active vault location.
              </p>
            </div>

          </div>
        </div>

      </main>

      {/* 5. Booking Reservation Drawer/Modal Overlay */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" onClick={closeBookingModal}>
          <div 
            className="bg-[#131313] border border-white/15 rounded-[40px] p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient gold corner decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#ff7a00]/25 to-transparent blur-xl pointer-events-none" />

            {bookingSuccess ? (
              // Booking Confirmation View
              <div className="text-center space-y-6 py-6">
                <div className="w-20 h-20 rounded-full bg-[#ff7a00]/10 border-2 border-[#ffb68b] flex items-center justify-center mx-auto text-[#ffb68b] shadow-[0_0_30px_rgba(255,122,0,0.3)]">
                  <Check size={40} strokeWidth={3} />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] text-[#ffb68b] font-black tracking-widest uppercase">Reservation Confirmed</span>
                  <h3 className="font-display text-3xl font-black text-white">YOUR VAULT IS SECURED!</h3>
                  <p className="font-body text-xs text-[#e0c0af]/80 leading-relaxed max-w-sm mx-auto">
                    A luxury dining capsule has been assigned for you at <span className="text-white font-bold">{selectedLoc.name}</span>. Please display this access matrix receipt upon entry.
                  </p>
                </div>

                <div className="p-5 bg-black/40 border border-white/5 rounded-3xl inline-block max-w-xs w-full space-y-3 font-body text-xs text-left">
                  <div className="flex justify-between">
                    <span className="text-white/40">RECEIPT ID:</span>
                    <span className="text-[#ffb68b] font-bold tracking-widest">{resId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">GUESTS:</span>
                    <span className="text-white font-semibold">{bookingGuests} Patrons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">DATE &amp; TIME:</span>
                    <span className="text-white font-semibold">{bookingDate} @ {bookingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">DINING TIER:</span>
                    <span className="text-[#ffb68b] font-semibold uppercase tracking-wider">
                      {bookingTier === 'julian-vance' ? 'VIP Vance Chamber' : bookingTier === 'imperial' ? 'Imperial Lounge' : 'Charcoal Gallery'}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={closeBookingModal}
                  className="w-full bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] text-[#522300] py-4 rounded-full font-body font-black text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(255,122,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  Receive Access Code
                </button>
              </div>
            ) : (
              // Booking Form View
              <form onSubmit={handleConfirmBooking} className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#ff7a00] font-black tracking-widest uppercase">Secure Bespoke Table</span>
                  <h3 className="font-display text-2xl font-black text-white uppercase">RESERVE A DINING VAULT</h3>
                  <p className="text-xs text-[#e0c0af]/60 font-body">Selected Vault: {selectedLoc.name}</p>
                </div>

                <div className="h-px bg-white/10" />

                {/* Form fields */}
                <div className="space-y-4">
                  
                  {/* Guests and Tier selectors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Users size={12} className="text-[#ff7a00]" /> Patrons Count
                      </label>
                      <select 
                        value={bookingGuests} 
                        onChange={(e) => setBookingGuests(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff7a00]"
                      >
                        <option value="1">1 Person (Solo Luxury)</option>
                        <option value="2">2 Patrons (Chef Pairing)</option>
                        <option value="4">4 Patrons (Gastronomy Circle)</option>
                        <option value="6">6 Patrons (Julian's Table)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={12} className="text-[#ff7a00]" /> Dining Tier
                      </label>
                      <select 
                        value={bookingTier} 
                        onChange={(e) => setBookingTier(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff7a00]"
                      >
                        <option value="julian-vance">Julian Vance VIP Chamber</option>
                        <option value="imperial">Imperial Savor Lounge</option>
                        <option value="charcoal">The Charcoal Gallery</option>
                      </select>
                    </div>
                  </div>

                  {/* Date and Time Pickers */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar size={12} className="text-[#ff7a00]" /> Select Date
                      </label>
                      <input 
                        type="date" 
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff7a00] [color-scheme:dark]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Clock size={12} className="text-[#ff7a00]" /> Select Hours
                      </label>
                      <input 
                        type="time" 
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff7a00] [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Contact / Phone number fields */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Phone size={12} className="text-[#ff7a00]" /> Patron Callback Number
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#ff7a00]"
                    />
                  </div>

                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button" 
                    onClick={closeBookingModal}
                    className="flex-grow py-3.5 border border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full text-xs font-semibold uppercase tracking-wider text-center transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-grow py-3.5 bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] text-[#522300] rounded-full text-xs font-black uppercase tracking-wider shadow-[0_10px_25px_rgba(255,122,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  >
                    Confirm Vault Reservation
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* 6. Web Footer */}
      <footer className="bg-[#0e0e0e] border-t border-white/5 py-16 px-margin-mobile md:px-margin-desktop mt-20">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 font-body">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ff7a00] flex items-center justify-center">
                <span className="font-display font-black text-sm text-[#522300]">L</span>
              </div>
              <span className="font-display text-lg font-black text-white uppercase tracking-wider">LUMINA FOODS</span>
            </div>
            <p className="text-xs text-[#e0c0af]/60 leading-relaxed">
              Gastronomic fast-dining vaults. Indulge in premium-sourced wagyu beef, black truffles, and charcoal oven pizzas.
            </p>
          </div>
          <div>
            <h5 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">Gastronomy</h5>
            <div className="space-y-2 text-xs text-[#e0c0af]/60">
              <Link href="/#menu" className="block hover:underline">Dry-Aged Wagyu</Link>
              <Link href="/#menu" className="block hover:underline">Sourdough Fermentation</Link>
              <Link href="/#offers" className="block hover:underline">VIP Dining Club</Link>
            </div>
          </div>
          <div>
            <h5 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">Services</h5>
            <div className="space-y-2 text-xs text-[#e0c0af]/60">
              <a href="#" className="block hover:underline">Autonomous Drone Delivery</a>
              <a href="#" className="block hover:underline">Bespoke Catering</a>
              <a href="#" className="block hover:underline">Private Room Booking</a>
            </div>
          </div>
          <div>
            <h5 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">Global Locations</h5>
            <div className="space-y-2 text-xs text-[#e0c0af]/60">
              <p>📍 Beverly Hills, CA</p>
              <p>📍 Manhattan, NY</p>
              <p>📍 Mayfair, London</p>
            </div>
          </div>
        </div>
        <div className="max-w-container-max mx-auto border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/30">
          <p>© 2026 LUMINA FOODS CORPORATION. BESPOKE FLAVORS ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">PRIVACY LAWS</a>
            <span>•</span>
            <a href="#" className="hover:underline">TERMS OF PATRONAGE</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
