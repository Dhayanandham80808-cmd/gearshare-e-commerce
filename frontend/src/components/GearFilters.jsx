import React from 'react';
import { 
  Sparkles, 
  Camera, 
  Disc, 
  Mic, 
  SunMedium, 
  Gamepad2, 
  Radio, 
  Filter,
  Check
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Equipment', icon: Sparkles },
  { id: 'cameras', label: 'Cameras & Cinema', icon: Camera },
  { id: 'drones', label: 'Drones & Aerial', icon: Radio },
  { id: 'lenses', label: 'G-Master Lenses', icon: Disc },
  { id: 'audio', label: 'Wireless Audio', icon: Mic },
  { id: 'lighting', label: 'Studio Lighting', icon: SunMedium },
  { id: 'gaming-vr', label: 'VR & Tech Gear', icon: Gamepad2 }
];

export default function GearFilters({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  onlyAvailable,
  setOnlyAvailable,
  gearCount
}) {
  return (
    <div className="space-y-4">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-[1.02]'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-2xs'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary filter & sort controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Showing <strong className="text-slate-900 dark:text-white font-bold">{gearCount}</strong> verified gear items</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Availability checkbox */}
          <button
            onClick={() => setOnlyAvailable(!onlyAvailable)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              onlyAvailable
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
              onlyAvailable ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-400'
            }`}>
              {onlyAvailable && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span>Available for rent now</span>
          </button>

          {/* Sort selector */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-800 dark:text-slate-200 font-bold focus:outline-none cursor-pointer"
            >
              <option value="popular" className="bg-white dark:bg-slate-900">Featured & Popular</option>
              <option value="price-asc" className="bg-white dark:bg-slate-900">Price: Low to High</option>
              <option value="price-desc" className="bg-white dark:bg-slate-900">Price: High to Low</option>
              <option value="rating" className="bg-white dark:bg-slate-900">Highest Rated (★)</option>
              <option value="reviews" className="bg-white dark:bg-slate-900">Most Reviews</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
