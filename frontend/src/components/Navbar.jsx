import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Camera, 
  Sparkles, 
  ShoppingBag, 
  PlusCircle, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  UserCheck, 
  ChevronDown,
  Layers
} from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, onOpenListModal, onOpenAiModal, onOpenContactModal }) {
  const { currentUser, switchUser, availableUsers } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'explore', label: 'Explore Gear', icon: Camera },
    { id: 'rentals', label: 'My Rentals', icon: ShoppingBag },
    { id: 'listings', label: 'Lender Studio', icon: Layers },
    { id: 'admin', label: 'Admin Portal', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => { setCurrentView('explore'); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  Gear<span className="text-emerald-500">Share</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 rounded-md border border-emerald-300 dark:border-emerald-800">
                  P2P RENTAL
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Rent Creative Gadgets & Cinema Gear
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentView(link.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shadow-xs' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}

            {/* AI Scout Button */}
            <button
              onClick={onOpenAiModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all animate-pulse"
            >
              <Sparkles className="w-4 h-4" />
              <span>GearAI Scout</span>
            </button>
          </nav>

          {/* Right Action Icons & Persona Switcher */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Contact Developer Button */}
            <button
              onClick={onOpenContactModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              title="Contact Dhayanandham A. (Platform Lead)"
            >
              <img src="/dhayanandham.jpg" alt="Dhayanandham" className="w-4 h-4 rounded-full object-cover" />
              <span>Contact Lead</span>
            </button>

            {/* List Gear CTA */}
            <button
              onClick={onOpenListModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-emerald-100" />
              <span>List Gear</span>
            </button>

            {/* Dark/Light Mode */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-emerald-500 transition-all shadow-xs"
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-500/50" 
                />
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 leading-tight">
                    {currentUser.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {currentUser.role}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl glass-card shadow-2xl p-2 z-50 border border-slate-200 dark:border-slate-700">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-semibold text-slate-400 uppercase">Switch Demo Persona</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Test app as any user role:</p>
                  </div>
                  <div className="py-1 space-y-1">
                    {availableUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => {
                          switchUser(user.role);
                          setUserDropdownOpen(false);
                          if (user.role === 'admin') setCurrentView('admin');
                          else if (user.role === 'lender') setCurrentView('listings');
                          else setCurrentView('rentals');
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                          currentUser.role === user.role
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="font-bold flex items-center justify-between">
                            <span>{user.name}</span>
                            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700">
                              {user.role}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400">{user.city}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentView(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                    currentView === link.id 
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' 
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAiModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>GearAI Scout Assistant</span>
            </button>

            <button
              onClick={() => {
                onOpenContactModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold text-sm"
            >
              <img src="/dhayanandham.jpg" alt="Dhayanandham" className="w-4 h-4 rounded-full object-cover" />
              <span>Contact Platform Lead (Dhayanandham)</span>
            </button>
          </div>

          {/* Mobile Persona Switch */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-400 uppercase mb-2">Switch Active Persona:</p>
            <div className="grid grid-cols-3 gap-1.5">
              {availableUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    switchUser(u.role);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-xl text-center text-xs font-bold border ${
                    currentUser.role === u.role
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {u.role.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
