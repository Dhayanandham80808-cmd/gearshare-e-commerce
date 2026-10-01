import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  PlusCircle, 
  Upload, 
  Sparkles, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  Camera,
  Image as ImageIcon
} from 'lucide-react';

const PRESET_TEMPLATES = [
  {
    name: 'Sony FX3 Cinema Line',
    category: 'cameras',
    brand: 'Sony',
    dailyRate: 65,
    securityDeposit: 350,
    replacementValue: 3899,
    location: 'Bengaluru, Whitefield',
    city: 'Bengaluru',
    condition: 'Mint',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
    description: 'Sony FX3 full-frame cinema line camera with XLR handle, dual base ISO 800/12800, internal cooling fan for unlimited 4K 120p recording.',
    specs: 'Full-Frame 10.2MP Back-Illuminated Sensor, 4K 120p 10-bit 4:2:2, Dual Base ISO 800/12800, Active cooling fan',
    includedInBox: 'FX3 Body, Top XLR Audio Handle, 3x NP-FZ100 Batteries, 160GB CFexpress Type A Card, Hard Case'
  },
  {
    name: 'DJI Avata 2 FPV Drone Fly More',
    category: 'drones',
    brand: 'DJI',
    dailyRate: 40,
    securityDeposit: 200,
    replacementValue: 1199,
    location: 'Chennai, Velachery',
    city: 'Chennai',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80',
    description: 'Immersive FPV drone with 4K 60fps HDR super-wide camera, DJI Goggles 3, and RC Motion 3 controller. Easy one-push acrobatic flips and roll.',
    specs: '1/1.3-inch Image Sensor, 4K 60fps HDR 155° FOV, 23-Min Flight Time, RockSteady 3.0+ & HorizonSteady',
    includedInBox: 'DJI Avata 2 Aircraft, DJI Goggles 3, RC Motion 3 Controller, 3x Flight Batteries, Two-Way Charging Hub'
  },
  {
    name: 'Shure SM7B Studio Vocal Mic + Cloudlifter',
    category: 'audio',
    brand: 'Shure',
    dailyRate: 22,
    securityDeposit: 110,
    replacementValue: 549,
    location: 'Puducherry, Mission St',
    city: 'Puducherry',
    condition: 'Mint',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1000&q=80',
    description: 'The world-famous legendary vocal microphone for studio podcasts, broadcasting, and voiceovers. Paired with Cloudlifter CL-1 for +25dB ultra-clean gain.',
    specs: 'Cardioid Dynamic Vocal Microphone, Flat wide-range frequency response, Bass rolloff and mid-range emphasis, Internal air suspension shock isolation',
    includedInBox: 'Shure SM7B Microphone, Cloudlifter CL-1 Mic Activator, Mogami Gold XLR Cable, Heavy Duty Desk Boom Arm'
  }
];

export default function ListGearModal({ onClose, onGearCreated }) {
  const { currentUser } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('cameras');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('Like New');
  const [dailyRate, setDailyRate] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [city, setCity] = useState(currentUser.city || 'Bengaluru');
  const [location, setLocation] = useState(currentUser.city ? `${currentUser.city}, Main Area` : 'Bengaluru, Indiranagar');
  const [description, setDescription] = useState('');
  const [specs, setSpecs] = useState('');
  const [includedInBox, setIncludedInBox] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80');
  const [loading, setLoading] = useState(false);

  const applyTemplate = (tpl) => {
    setTitle(tpl.name);
    setCategory(tpl.category);
    setBrand(tpl.brand);
    setDailyRate(tpl.dailyRate);
    setSecurityDeposit(tpl.securityDeposit);
    setCity(tpl.city);
    setLocation(tpl.location);
    setCondition(tpl.condition);
    setImageUrl(tpl.imageUrl);
    setDescription(tpl.description);
    setSpecs(tpl.specs);
    setIncludedInBox(tpl.includedInBox);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !dailyRate) {
      alert('Please fill in title and daily rate');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title,
        category,
        brand: brand || 'Pro Rig',
        dailyRate: Number(dailyRate),
        securityDeposit: Number(securityDeposit) || Math.round(Number(dailyRate) * 5),
        replacementValue: Math.round(Number(dailyRate) * 40),
        location,
        city,
        condition,
        imageUrl,
        description,
        specs: specs.split(',').map(s => s.trim()).filter(Boolean),
        includedInBox: includedInBox.split(',').map(i => i.trim()).filter(Boolean),
        owner: {
          id: currentUser.id,
          name: currentUser.name,
          rating: 5.0,
          completedRentals: 1,
          avatar: currentUser.avatar,
          responseRate: '100%',
          responseTime: '< 15 mins',
          verified: true
        }
      };

      const res = await fetch('/api/gear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to list gear');
      const newGear = await res.json();
      if (onGearCreated) onGearCreated(newGear);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error listing equipment. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="glass-card w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-500" />
              <span>List Your Gear for Peer Rental</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Listing as <strong className="text-emerald-600 dark:text-emerald-400">{currentUser.name}</strong> ({currentUser.role})
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Quick preset chips */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Speed Test: One-Click Populate with Real Cinema Presets</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_TEMPLATES.map((tpl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => applyTemplate(tpl)}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-2xs"
                >
                  + {tpl.name}
                </button>
              ))}
            </div>
          </div>

          {/* Title & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Equipment Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Sony Alpha A7 IV Full-Frame Camera"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Brand / Manufacturer
              </label>
              <input
                type="text"
                placeholder="e.g. Sony, DJI, RØDE"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Category, Condition, City */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="cameras">Cameras & Cinema</option>
                <option value="drones">Drones & Aerial</option>
                <option value="lenses">Cinema Lenses</option>
                <option value="audio">Wireless Audio</option>
                <option value="lighting">Studio Lighting</option>
                <option value="gaming-vr">VR & Tech Gear</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Mint">Mint (Flawless)</option>
                <option value="Like New">Like New (Minimal signs)</option>
                <option value="Good">Good (Fully functional)</option>
                <option value="Fair">Fair (Noticeable wear)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                City / Region
              </label>
              <input
                type="text"
                placeholder="e.g. Bengaluru, Chennai, Puducherry"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Pricing: Daily Rate & Security Deposit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Daily Rental Rate ($ USD) *
              </label>
              <input
                type="number"
                placeholder="e.g. 45"
                value={dailyRate}
                onChange={(e) => setDailyRate(e.target.value)}
                required
                className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-slate-400">Renters pay this per calendar day</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Escrow Security Deposit ($ USD)
              </label>
              <input
                type="number"
                placeholder="e.g. 250"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
                className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-slate-400">Held in escrow to protect against damage or loss</span>
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Photo / Cover Image URL</span>
              <span className="text-[10px] text-slate-400 font-normal">Direct link to high-res JPG/PNG</span>
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Detailed Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe condition, firmware version, and recommended use..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Specs & Included in Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Key Specs (comma-separated)
              </label>
              <textarea
                rows={2}
                placeholder="4K 60p, 10-bit color, Dual Card Slots"
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Included in Box (comma-separated)
              </label>
              <textarea
                rows={2}
                placeholder="Main Body, 2x Batteries, Rapid Charger, Case"
                value={includedInBox}
                onChange={(e) => setIncludedInBox(e.target.value)}
                className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Publishing Listing to Catalog...</span>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Equipment Listing</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
