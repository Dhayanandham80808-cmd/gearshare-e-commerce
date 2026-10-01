import React from 'react';
import GearImage from './GearImage';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function GearCard({ gear, onSelectGear }) {
  return (
    <div 
      onClick={() => onSelectGear(gear)}
      className="group glass-card rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col cursor-pointer border border-slate-200/90 dark:border-slate-800/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/50"
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <GearImage
          src={gear.imageUrl} 
          alt={gear.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white rounded-lg border border-white/20">
            {gear.category}
          </span>
          <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-500/90 backdrop-blur-md text-white rounded-lg shadow-sm">
            {gear.condition}
          </span>
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold backdrop-blur-md ${
            gear.available 
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40' 
              : 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${gear.available ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            {gear.available ? 'Available' : 'Booked'}
          </span>
        </div>

        {/* Rating overlay bottom-right */}
        <div className="absolute bottom-2.5 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs border border-slate-200/60 dark:border-slate-700/60">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-black text-slate-800 dark:text-slate-100">{gear.rating}</span>
          <span className="text-[10px] text-slate-400">({gear.reviewCount})</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Brand & City */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
              {gear.brand}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{gear.city}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {gear.title}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {gear.description}
          </p>
        </div>

        {/* Specs highlights */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {gear.specs.slice(0, 2).map((spec, i) => (
            <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
              {spec}
            </span>
          ))}
          {gear.specs.length > 2 && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400">
              +{gear.specs.length - 2} more
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200/70 dark:bg-slate-800" />

        {/* Footer info: Owner & Pricing */}
        <div className="flex items-center justify-between pt-1">
          
          {/* Lender Info */}
          <div className="flex items-center gap-2">
            <img 
              src={gear.owner.avatar} 
              alt={gear.owner.name} 
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700" 
            />
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 flex items-center gap-1">
                <span>{gear.owner.name.split(' ')[0]}</span>
                {gear.owner.verified && (
                  <ShieldCheck className="w-3 h-3 text-emerald-500" title="Verified Owner" />
                )}
              </div>
              <div className="text-[10px] text-slate-400">
                {gear.owner.completedRentals} rentals
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                ${gear.dailyRate}
              </span>
              <span className="text-xs font-semibold text-slate-400">/day</span>
            </div>
            <div className="text-[10px] font-medium text-slate-400">
              Deposit: ${gear.securityDeposit} (escrow)
            </div>
          </div>

        </div>

        {/* CTA Button */}
        <button className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs group-hover:bg-emerald-600 group-hover:text-white">
          <span>Rent This Gear</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}
