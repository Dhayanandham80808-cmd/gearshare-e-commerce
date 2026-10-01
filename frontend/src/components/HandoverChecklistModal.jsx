import React, { useState } from 'react';
import GearImage from './GearImage';
import { 
  X, 
  ShieldCheck, 
  CheckSquare, 
  Square, 
  CheckCircle2, 
  Lock, 
  Camera, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

export default function HandoverChecklistModal({ booking, onClose, onUpdateStatus }) {
  const [checks, setChecks] = useState({
    optics: true,
    mechanics: true,
    battery: true,
    storage: true,
    accessories: true,
    escrow: true
  });
  const [signatureName, setSignatureName] = useState('');
  const [completed, setCompleted] = useState(false);

  const toggleCheck = (key) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecked = Object.values(checks).every(Boolean);

  const handleSignHandover = () => {
    if (!signatureName.trim()) {
      alert('Please enter your full name to electronically sign the handover inspection.');
      return;
    }
    setCompleted(true);
    if (onUpdateStatus && booking) {
      onUpdateStatus(booking.id, 'Active');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="glass-card w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Digital Handover & Condition Inspection
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                P2P Escrow Protection Guarantee
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {booking && (
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GearImage src={booking.gearImage} alt={booking.gearTitle} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{booking.gearTitle}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Renter: {booking.renterName} • Lender: {booking.lenderName}</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Passcode</span>
                <span className="font-mono text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                  {booking.handoverCode}
                </span>
              </div>
            </div>
          )}

          {completed ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Inspection Signed & Gear Released! 🎬
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Both parties have verified the equipment condition. Escrow deposit is securely held and rental timer is active.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
              >
                Close Inspector
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 dark:text-slate-300">
                Verify each condition check in person with the lender before releasing the digital security deposit:
              </div>

              {/* 6 Inspection items */}
              <div className="space-y-2.5">
                {[
                  { id: 'optics', title: 'Optical & Sensor Glass Cleanliness', desc: 'No sensor spots, scratches on front/rear elements, or internal mold/dust.' },
                  { id: 'mechanics', title: 'Mechanical & Motor Smoothness', desc: 'Mount bayonet locks firmly, autofocus rings move smoothly without friction.' },
                  { id: 'battery', title: 'Battery Health & Genuine Charging', desc: 'Original OEM batteries tested above 90% charge with official charging brick.' },
                  { id: 'storage', title: 'Media Card Speed & Formatting', desc: 'High-speed V60/V90 SDXC or CFexpress card initialized and recognized.' },
                  { id: 'accessories', title: 'Case & Accessory Inventory', desc: 'All cables, lens hoods, filters, and safety cages verified present in case.' },
                  { id: 'escrow', title: 'Escrow Security Deposit Locked', desc: 'Security deposit held in trust, refundable immediately upon return.' }
                ].map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      checks[item.id]
                        ? 'border-emerald-500/50 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500'
                    }`}
                  >
                    <div className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                      {checks[item.id] ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{item.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Signature Input */}
              <div className="pt-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Electronic Signature (Type Full Legal Name):
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kavya Patel"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Sign CTA */}
              <button
                onClick={handleSignHandover}
                disabled={!allChecked}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Digitally Sign Handover & Lock Escrow</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
