import React from 'react';
import { 
  Camera, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { CREATOR_PROFILE } from '../context/AuthContext';

export default function Footer({ onCategoryClick, onOpenAiModal, onOpenListModal, onOpenContactModal }) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Main 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md">
                <Camera className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                Gear<span className="text-emerald-500">Share</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Peer-to-peer creative equipment and cinema gadget rental platform. Empowering filmmakers, photographers, and creators with escrow-backed gear sharing.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Escrow Protected Handover</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
              Explore Categories
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li><button onClick={() => onCategoryClick('cameras')} className="hover:text-emerald-500 transition-colors">Cinema & Hybrid Cameras</button></li>
              <li><button onClick={() => onCategoryClick('drones')} className="hover:text-emerald-500 transition-colors">Drones & Aerial Systems</button></li>
              <li><button onClick={() => onCategoryClick('lenses')} className="hover:text-emerald-500 transition-colors">G-Master & Cinema Lenses</button></li>
              <li><button onClick={() => onCategoryClick('audio')} className="hover:text-emerald-500 transition-colors">32-Bit Float Wireless Audio</button></li>
              <li><button onClick={() => onCategoryClick('lighting')} className="hover:text-emerald-500 transition-colors">Continuous Studio Lighting</button></li>
            </ul>
          </div>

          {/* Hubs & Coverage */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
              Local Creator Hubs
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-500" /> Bengaluru (Indiranagar, Koramangala)</li>
              <li className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-500" /> Chennai (Adyar, T. Nagar)</li>
              <li className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-500" /> Puducherry (White Town, Lawspet)</li>
              <li className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-500" /> Mumbai & Delhi NCR</li>
            </ul>
          </div>

          {/* Platform Tools */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
              Smart Tools & Contact
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenAiModal}
                className="w-full text-left p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-between"
              >
                <span>🤖 GearAI Kit Scout</span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              </button>
              
              <button
                onClick={onOpenContactModal}
                className="w-full text-left p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-between"
              >
                <span>👤 Contact Platform Lead</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
              </button>
            </div>
          </div>

        </div>

        {/* Prominent Lead Developer & Contact Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/20 glass-card">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left: Avatar + Details */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <img 
                src={CREATOR_PROFILE.avatar} 
                alt={CREATOR_PROFILE.name} 
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/40 shadow-md shrink-0" 
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                }}
              />
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {CREATOR_PROFILE.name}
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-300 dark:border-emerald-800">
                    Platform Lead & Architect
                  </span>
                </div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {CREATOR_PROFILE.role} • {CREATOR_PROFILE.institution}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <a href={`mailto:${CREATOR_PROFILE.email}`} className="flex items-center gap-1 hover:text-emerald-500 font-medium">
                    <Mail className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{CREATOR_PROFILE.email}</span>
                  </a>
                  <a href={`tel:${CREATOR_PROFILE.phone}`} className="flex items-center gap-1 hover:text-emerald-500 font-medium">
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{CREATOR_PROFILE.phone}</span>
                  </a>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{CREATOR_PROFILE.location}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Social Action Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a 
                href={CREATOR_PROFILE.linkedIn}
                target="_blank" 
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Linkedin className="w-4 h-4 text-blue-500" />
                <span>LinkedIn</span>
              </a>

              <a 
                href={CREATOR_PROFILE.github}
                target="_blank" 
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a 
                href={`https://wa.me/916383275813`}
                target="_blank" 
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={onOpenContactModal}
                className="px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <span>Direct Message</span>
              </button>
            </div>

          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 GearShare ⚡ Designed & Developed by <strong>Dhayanandham A.</strong></p>
          <div className="flex items-center gap-1">
            <span>Electronics & Communication Engineering • SMVEC</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
