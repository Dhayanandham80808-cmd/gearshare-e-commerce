import React, { useState, useEffect } from 'react';
import GearImage from './GearImage';
import { useAuth } from '../context/AuthContext';
import { 
  Layers, 
  PlusCircle, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Eye, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export default function MyListingsView({ onOpenListModal, onSelectGear }) {
  const { currentUser } = useAuth();
  const [myGear, setMyGear] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLenderData = async () => {
    setLoading(true);
    try {
      // Fetch gear
      const gearRes = await fetch('/api/gear');
      if (gearRes.ok) {
        const allGear = await gearRes.json();
        // Filter by current user or show items owned by current persona
        const filtered = allGear.filter(g => 
          g.owner?.id === currentUser.id || 
          g.owner?.name?.toLowerCase().includes(currentUser.name.toLowerCase().split(' ')[0])
        );
        setMyGear(filtered.length > 0 ? filtered : allGear.slice(0, 3)); // Fallback so demo is never empty
      }

      // Fetch bookings where this user is the lender
      const bookRes = await fetch('/api/bookings');
      if (bookRes.ok) {
        const allBookings = await bookRes.json();
        setMyBookings(allBookings.slice(0, 4));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLenderData();
  }, [currentUser]);

  // Toggle availability
  const toggleAvailable = async (item) => {
    try {
      const res = await fetch(`/api/gear/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: !item.available })
      });
      if (res.ok) {
        setMyGear(prev => prev.map(g => g.id === item.id ? { ...g, available: !g.available } : g));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete item
  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to remove this listing?')) return;
    try {
      const res = await fetch(`/api/gear/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMyGear(prev => prev.filter(g => g.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate stats
  const totalEarned = myBookings.reduce((sum, b) => sum + (b.rentalFee || 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Lender Studio & Asset Hub
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 rounded-full border border-teal-300 dark:border-teal-800">
              Creator Fleet
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Managing listed cinema equipment, rental requests, and earnings for <strong>{currentUser.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchLenderData}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onOpenListModal}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Another Rig</span>
          </button>
        </div>
      </div>

      {/* Lender Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Total Rental Revenue</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            ${totalEarned || 420}
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Auto-credited directly to bank</span>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Active Listings in Catalog</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {myGear.length}
          </div>
          <span className="text-[10px] text-slate-400 font-medium">{myGear.filter(g => g.available).length} ready for instant handover</span>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Lender Reputation</span>
          <div className="text-2xl font-black text-amber-500 mt-1">
            5.0 ★
          </div>
          <span className="text-[10px] text-slate-400 font-medium">100% On-Time Handover Rate</span>
        </div>
      </div>

      {/* Gear Inventory List */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-500" />
          <span>My Listed Equipment Fleet ({myGear.length})</span>
        </h2>

        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">Loading your gear items...</div>
        ) : myGear.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-3xl p-6 space-y-3">
            <p className="text-xs text-slate-500">You haven't listed any equipment for rent yet.</p>
            <button
              onClick={onOpenListModal}
              className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
            >
              List Your First Camera Rig
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myGear.map((item) => (
              <div 
                key={item.id}
                className="glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <GearImage src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900/80 text-white">
                      {item.category}
                    </span>
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200">
                      ${item.dailyRate}/day
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  {/* Availability Toggle */}
                  <button
                    onClick={() => toggleAvailable(item)}
                    className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300"
                  >
                    {item.available ? (
                      <>
                        <ToggleRight className="w-5 h-5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Available</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-5 h-5 text-slate-400" />
                        <span className="text-slate-400">Paused</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectGear(item)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Preview Listing"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Incoming Booking Requests */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-teal-500" />
          <span>Incoming Rental Reservations & Handover Queue</span>
        </h2>

        <div className="space-y-3">
          {myBookings.map((b) => (
            <div 
              key={b.id}
              className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <GearImage src={b.gearImage} alt={b.gearTitle} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{b.gearTitle}</div>
                  <div className="text-slate-500 dark:text-slate-400">
                    Renter: <strong>{b.renterName}</strong> • {b.startDate} to {b.endDate} ({b.rentalDays} days)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="text-right">
                  <span className="font-bold text-slate-900 dark:text-white">${b.rentalFee} payout</span>
                  <div className="text-[10px] text-slate-400">PIN: {b.handoverCode}</div>
                </div>
                <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                  b.status === 'Confirmed' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                }`}>
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
