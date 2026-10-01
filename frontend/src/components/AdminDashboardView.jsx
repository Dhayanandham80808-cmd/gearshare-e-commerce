import React, { useState, useEffect } from 'react';
import GearImage from './GearImage';
import { 
  ShieldCheck, 
  Layers, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  Lock, 
  Sparkles,
  RefreshCw,
  Search
} from 'lucide-react';

export default function AdminDashboardView({ onSelectGear }) {
  const [stats, setStats] = useState(null);
  const [allGear, setAllGear] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'gear' | 'bookings' | 'users'
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, gearRes, bookRes, usersRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/gear'),
        fetch('/api/bookings'),
        fetch('/api/users')
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (gearRes.ok) setAllGear(await gearRes.json());
      if (bookRes.ok) setAllBookings(await bookRes.json());
      if (usersRes.ok) setAllUsers(await usersRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteGear = async (id) => {
    if (!window.confirm('Admin action: Delete this equipment listing permanently?')) return;
    try {
      const res = await fetch(`/api/gear/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAllGear(prev => prev.filter(g => g.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setAllBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredGear = allGear.filter(g => 
    g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.owner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Platform Master Admin Console
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Global monitoring of peer escrows, disputes, listings compliance, and platform fees.
          </p>
        </div>

        <button
          onClick={fetchAdminData}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync Realtime Data</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl space-y-1">
          <span className="text-xs font-semibold text-slate-400">Total Listed Assets</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {stats?.totalGear || allGear.length}
          </div>
          <span className="text-[11px] text-emerald-500 font-bold">Verified catalog</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-1">
          <span className="text-xs font-semibold text-slate-400">Active Rentals Out</span>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
            {stats?.activeRentals || allBookings.filter(b => b.status === 'Confirmed' || b.status === 'Active').length}
          </div>
          <span className="text-[11px] text-slate-400">In creator hands</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-1">
          <span className="text-xs font-semibold text-slate-400">Gross Escrow Handled</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
            ${stats?.escrowVolume || 650}
          </div>
          <span className="text-[11px] text-emerald-500 font-bold">Protected in smart trust</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-1">
          <span className="text-xs font-semibold text-slate-400">Platform 10% Fee Revenue</span>
          <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">
            ${stats?.platformRevenue || 65}
          </div>
          <span className="text-[11px] text-purple-500 font-bold">Retained commission</span>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'overview', label: 'Overview & Categories' },
          { id: 'gear', label: `All Gear Listings (${allGear.length})` },
          { id: 'bookings', label: `Escrow Bookings (${allBookings.length})` },
          { id: 'users', label: `Verified Users (${allUsers.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Category Breakdown */}
            <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>Equipment Distribution by Category</span>
              </h3>

              <div className="space-y-3">
                {stats?.categories && Object.entries(stats.categories).map(([cat, count]) => (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="capitalize">{cat}</span>
                      <span className="text-slate-400">{count} units ({Math.round((count / (allGear.length || 1)) * 100)}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${Math.min(100, (count / (allGear.length || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Escrow & Trust Posture */}
            <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-500" />
                <span>Escrow Trust Engine Status</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>0 Open Damage Disputes</span>
                  </div>
                  <p className="text-emerald-700/80 dark:text-emerald-400/80 text-[11px]">
                    All handovers completed via 6-point digital condition verification checklist.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Refund Guarantee</span>
                  <p className="text-slate-500 text-[11px]">
                    Security deposits automatically auto-release within 6 hours of verified equipment handover check.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: All Gear Listings */}
      {activeTab === 'gear' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 max-w-md">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search gear by name, category, or lender..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5">Equipment</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Lender</th>
                  <th className="p-3.5">Rate / Day</th>
                  <th className="p-3.5">Deposit</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredGear.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 flex items-center gap-2.5">
                      <GearImage src={g.imageUrl} alt={g.title} className="w-9 h-9 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{g.title}</div>
                        <div className="text-[10px] text-slate-400">{g.city}</div>
                      </div>
                    </td>
                    <td className="p-3.5 uppercase font-semibold text-slate-500">{g.category}</td>
                    <td className="p-3.5 font-medium">{g.owner?.name}</td>
                    <td className="p-3.5 font-bold">${g.dailyRate}</td>
                    <td className="p-3.5 text-emerald-600 font-bold">${g.securityDeposit}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        g.available ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {g.available ? 'Available' : 'Booked'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        onClick={() => onSelectGear(g)}
                        className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-[10px] font-bold"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => handleDeleteGear(g.id)}
                        className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                        title="Delete listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: All Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5">Booking ID</th>
                  <th className="p-3.5">Item</th>
                  <th className="p-3.5">Renter</th>
                  <th className="p-3.5">Lender</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Escrow Total</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {allBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-mono text-[11px] font-bold text-slate-500">{b.id}</td>
                    <td className="p-3.5 font-bold line-clamp-1 max-w-[200px]">{b.gearTitle}</td>
                    <td className="p-3.5">{b.renterName}</td>
                    <td className="p-3.5">{b.lenderName}</td>
                    <td className="p-3.5 text-slate-500">{b.startDate} to {b.endDate}</td>
                    <td className="p-3.5 font-bold text-emerald-600">${b.totalPaid}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-200 dark:bg-slate-700">
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      {b.status !== 'Completed' ? (
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'Completed')}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px]"
                        >
                          Release Escrow
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400">Settled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Users Directory */}
      {activeTab === 'users' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {allUsers.map((u) => (
            <div key={u.id} className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                  <span>{u.name}</span>
                  {u.verifiedId && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
                <div className="text-[11px] text-slate-400">{u.email}</div>
                <div className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 mt-1">
                  Role: {u.role} • {u.city}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
