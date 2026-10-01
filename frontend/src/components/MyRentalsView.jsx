import React, { useState, useEffect } from 'react';
import GearImage from './GearImage';
import { useAuth } from '../context/AuthContext';
import { 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Star,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

export default function MyRentalsView({ onOpenChecklistModal, onExploreMore }) {
  const { currentUser } = useAuth();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRentals = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings?renterId=${currentUser.id}`);
      if (res.ok) {
        const data = await res.json();
        setRentals(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRentals();
  }, [currentUser]);

  const handleReturnGear = async (bookingId) => {
    if (!window.confirm('Confirm returning this gear? Your refundable security deposit will be released from escrow.')) return;
    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Completed' })
      });
      if (res.ok) {
        fetchMyRentals();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              My Rental Passes
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-300 dark:border-emerald-800">
              Renter Portal
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track active reservations, pickup codes, and escrow security deposit refunds for <strong>{currentUser.name}</strong>.
          </p>
        </div>

        <button
          onClick={fetchMyRentals}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Rentals List */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-xs animate-pulse">
          Loading your rental reservations...
        </div>
      ) : rentals.length === 0 ? (
        <div className="py-16 text-center glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No active rental bookings found</h3>
            <p className="text-xs text-slate-500">You haven't reserved any creative gear yet. Browse verified cameras, drones, and mics!</p>
          </div>
          <button
            onClick={onExploreMore}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            Explore Verified Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rentals.map((item) => (
            <div 
              key={item.id}
              className="glass-card rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Top status & passcode */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Confirmed'
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-800'
                      : item.status === 'Active'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{item.status}</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Handover PIN:</span>
                    <span className="font-mono text-xs font-black bg-slate-900 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                      {item.handoverCode}
                    </span>
                  </div>
                </div>

                {/* Gear image & title */}
                <div className="flex gap-3">
                  <GearImage src={item.gearImage} alt={item.gearTitle} className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-200 dark:border-slate-700" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {item.gearTitle}
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Lender: <strong className="text-slate-700 dark:text-slate-300">{item.lenderName}</strong>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-500" />
                      <span>{item.pickupLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Date range & breakdown */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Rental Dates:</span>
                    </span>
                    <span className="font-bold">{item.startDate} → {item.endDate} ({item.rentalDays} days)</span>
                  </div>

                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Refundable Escrow Deposit:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">${item.securityDeposit}</span>
                  </div>

                  <div className="flex justify-between text-slate-900 dark:text-white font-black border-t border-slate-200 dark:border-slate-700 pt-1.5">
                    <span>Total Escrow Paid:</span>
                    <span>${item.totalPaid}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => onOpenChecklistModal(item)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Handover Checklist</span>
                </button>

                {item.status !== 'Completed' && (
                  <button
                    onClick={() => handleReturnGear(item.id)}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Return & Release Deposit</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
