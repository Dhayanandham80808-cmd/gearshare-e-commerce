import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GearFilters from './components/GearFilters';
import GearCard from './components/GearCard';
import GearDetailModal from './components/GearDetailModal';
import ListGearModal from './components/ListGearModal';
import GearAiModal from './components/GearAiModal';
import HandoverChecklistModal from './components/HandoverChecklistModal';
import ContactModal from './components/ContactModal';
import MyRentalsView from './components/MyRentalsView';
import MyListingsView from './components/MyListingsView';
import AdminDashboardView from './components/AdminDashboardView';
import Footer from './components/Footer';
import { api } from './services/api';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('explore'); // 'explore' | 'rentals' | 'listings' | 'admin'
  const [gearList, setGearList] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Modals
  const [selectedGear, setSelectedGear] = useState(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [checklistBooking, setChecklistBooking] = useState(null);

  // Toast message
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Fetch Gear
  const fetchGear = async () => {
    setLoading(true);
    try {
      const data = await api.getGear({
        category: selectedCategory !== 'all' ? selectedCategory : '',
        city: selectedCity !== 'all' ? selectedCity : '',
        search: searchKeyword,
        sort: sortBy,
        available: onlyAvailable ? 'true' : ''
      });
      setGearList(data);
    } catch (err) {
      console.error('Error fetching gear:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Stats
  const fetchStats = async () => {
    try {
      const s = await api.getStats();
      setStats(s);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGear();
  }, [selectedCategory, selectedCity, searchKeyword, sortBy, onlyAvailable]);

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-4 duration-300">
          <div className="glass-card px-4 py-3 rounded-2xl shadow-xl border border-emerald-500/40 flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenListModal={() => setIsListModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Main Body per View */}
      <main className="flex-1">
        {currentView === 'explore' && (
          <div className="space-y-10">
            {/* Hero Section */}
            <Hero
              onSearch={(term) => setSearchKeyword(term)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              stats={stats}
              onOpenAiModal={() => setIsAiModalOpen(true)}
              onOpenListModal={() => setIsListModalOpen(true)}
              onOpenContactModal={() => setIsContactModalOpen(true)}
            />

            {/* Catalog Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              
              {/* Category & Filter Pills */}
              <GearFilters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onlyAvailable={onlyAvailable}
                setOnlyAvailable={setOnlyAvailable}
                gearCount={gearList.length}
              />

              {/* Items Grid */}
              {loading ? (
                <div className="py-24 text-center space-y-2">
                  <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-slate-400 font-semibold">Scanning verified equipment catalog...</p>
                </div>
              ) : gearList.length === 0 ? (
                <div className="text-center py-20 glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-3">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    No gear matched your filter criteria.
                  </p>
                  <p className="text-xs text-slate-400">
                    Try changing your category or search term, or click below to reset.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedCity('all');
                      setSearchKeyword('');
                      setOnlyAvailable(false);
                    }}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {gearList.map((item) => (
                    <GearCard
                      key={item.id}
                      gear={item}
                      onSelectGear={(g) => setSelectedGear(g)}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {currentView === 'rentals' && (
          <MyRentalsView
            onOpenChecklistModal={(b) => setChecklistBooking(b)}
            onExploreMore={() => setCurrentView('explore')}
          />
        )}

        {currentView === 'listings' && (
          <MyListingsView
            onOpenListModal={() => setIsListModalOpen(true)}
            onSelectGear={(g) => setSelectedGear(g)}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboardView
            onSelectGear={(g) => setSelectedGear(g)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onCategoryClick={(cat) => {
          setCurrentView('explore');
          setSelectedCategory(cat);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenListModal={() => setIsListModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Modals */}
      {selectedGear && (
        <GearDetailModal
          gear={selectedGear}
          onClose={() => setSelectedGear(null)}
          onBookingSuccess={(booking) => {
            showToast(`Gear reserved! Passcode: ${booking.handoverCode}`);
            fetchStats();
          }}
          onOpenChecklistModal={(booking) => {
            setSelectedGear(null);
            setChecklistBooking(booking);
          }}
        />
      )}

      {isListModalOpen && (
        <ListGearModal
          onClose={() => setIsListModalOpen(false)}
          onGearCreated={(newGear) => {
            showToast(`Listing for ${newGear.title} published!`);
            fetchGear();
            fetchStats();
          }}
        />
      )}

      {isAiModalOpen && (
        <GearAiModal
          onClose={() => setIsAiModalOpen(false)}
          onSelectGear={(item) => setSelectedGear(item)}
        />
      )}

      {isContactModalOpen && (
        <ContactModal
          onClose={() => setIsContactModalOpen(false)}
        />
      )}

      {checklistBooking && (
        <HandoverChecklistModal
          booking={checklistBooking}
          onClose={() => setChecklistBooking(null)}
          onUpdateStatus={(id, status) => {
            showToast(`Handover checklist verified! Status: ${status}`);
          }}
        />
      )}

    </div>
  );
}
