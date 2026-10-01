import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Camera, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function Hero({ 
  onSearch, 
  selectedCategory, 
  setSelectedCategory, 
  selectedCity, 
  setSelectedCity, 
  stats, 
  onOpenAiModal, 
  onOpenListModal,
  onOpenContactModal 
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const cities = ['All Cities', 'Bengaluru', 'Chennai', 'Puducherry', 'Mumbai', 'Delhi'];

  return (
    <div className="relative overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-20 border-b border-slate-200/70 dark:border-slate-800/80 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent">
      {/* Background glowing orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-72 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          {/* Trust Badge & Architect Chip */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-900 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>₹2,50,000+ Escrow Protected Peer Rentals</span>
            </div>

            <button 
              onClick={onOpenContactModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-emerald-500 border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs group"
              title="Click to view Dhayanandham A. contact details"
            >
              <img src="/dhayanandham.jpg" alt="Dhayanandham A." className="w-4 h-4 rounded-full object-cover ring-1 ring-emerald-500" />
              <span>Architect: <strong className="group-hover:text-emerald-500">Dhayanandham A.</strong> (Puducherry)</span>
            </button>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Rent Cinema & Tech Gear <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              From Verified Creators Near You.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal">
            Skip hefty retail prices. Rent 4K cinema cameras, Hasselblad drones, 32-bit float audio mics, and VR headsets with digital handover protection.
          </p>

          {/* Interactive Search & Filter Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="pt-4 max-w-3xl mx-auto"
          >
            <div className="glass-card p-2 sm:p-2.5 rounded-2xl sm:rounded-full shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col sm:flex-row items-center gap-2 border border-slate-200/90 dark:border-slate-700/80">
              
              {/* Search Keyword */}
              <div className="flex items-center gap-2.5 px-3 w-full sm:flex-1">
                <Search className="w-5 h-5 text-emerald-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Search 'Sony A7 IV', 'Mavic 3', 'RØDE Mic'..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-700" />

              {/* City Selector */}
              <div className="flex items-center gap-2 px-3 w-full sm:w-auto">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer pr-4"
                >
                  {cities.map((c) => (
                    <option key={c} value={c === 'All Cities' ? 'all' : c} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Search Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Find Gear</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick AI Trigger & Lending CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenAiModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              <span>Unsure what you need? <strong>Ask GearAI Scout</strong></span>
            </button>

            <button
              onClick={onOpenListModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <span>Have idle camera gear? <strong>Earn ₹15,000+/mo</strong></span>
            </button>
          </div>

        </div>

        {/* Live Metrics Counter Bar */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {stats?.totalGear || 8}+
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Verified Cinema Items
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
              ₹{stats?.escrowVolume ? (stats.escrowVolume * 80).toLocaleString() : '1,84,000'}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Escrow Secured Volume
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              4.95 ★
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Creator Handover Score
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400">
              {stats?.verifiedLenders || 4}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              Active Verified Lenders
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
