import React, { useState } from 'react';
import GearImage from './GearImage';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Box, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Sparkles, 
  ArrowRight,
  MessageSquarePlus,
  Send,
  UserCheck
} from 'lucide-react';

export default function GearDetailModal({ 
  gear, 
  onClose, 
  onBookingSuccess, 
  onOpenChecklistModal 
}) {
  const { currentUser } = useAuth();

  // Booking date calculation state
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const threeDaysLater = new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(tomorrow);
  const [endDate, setEndDate] = useState(threeDaysLater);
  const [pickupNote, setPickupNote] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  // Review state
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewsList, setReviewsList] = useState(gear.reviews || []);

  // Calculate rental duration in days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  const rentalDays = isNaN(diffTime) || diffTime <= 0 ? 1 : diffTime;

  const rentalFee = rentalDays * gear.dailyRate;
  const insuranceFee = Math.round(rentalFee * 0.1) || 10;
  const securityDeposit = gear.securityDeposit;
  const totalPayable = rentalFee + insuranceFee + securityDeposit;

  // Handle Booking Submit
  const handleBookNow = async () => {
    setBookingLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gearId: gear.id,
          renterId: currentUser.id,
          renterName: currentUser.name,
          renterEmail: currentUser.email,
          startDate,
          endDate,
          pickupLocation: `${gear.location} (${pickupNote || 'Standard Meetup'})`
        })
      });

      if (!res.ok) throw new Error('Booking creation failed');
      const booking = await res.json();
      setBookingConfirmed(booking);
      if (onBookingSuccess) onBookingSuccess(booking);
    } catch (err) {
      console.error(err);
      alert('Error booking gear. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  // Handle Review Submit
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;
    setReviewSubmitting(true);
    try {
      const res = await fetch(`/api/gear/${gear.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: currentUser.name,
          rating: newReviewRating,
          comment: newReviewComment
        })
      });
      if (res.ok) {
        const added = await res.json();
        setReviewsList([added, ...reviewsList]);
        setNewReviewComment('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="glass-card w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
              {gear.category}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {gear.location}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          {/* Booking Confirmed State */}
          {bookingConfirmed ? (
            <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Gear Rental Booking Confirmed! 🎉
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Your reservation is locked in with escrow deposit security.
                </p>
              </div>

              <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Digital Handover Pass:</span>
                  <span className="font-mono text-sm font-black px-2.5 py-0.5 rounded bg-emerald-600 text-white">
                    {bookingConfirmed.handoverCode}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Reserved Dates:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{bookingConfirmed.startDate} to {bookingConfirmed.endDate}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Pickup Location:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{bookingConfirmed.pickupLocation}</span>
                </div>
                <div className="flex justify-between text-xs border-t border-slate-200 dark:border-slate-700 pt-2">
                  <span className="text-slate-500 dark:text-slate-400">Total Escrow Deposited:</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400">${bookingConfirmed.totalPaid}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => {
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-700"
                >
                  View In My Rentals
                </button>
                <button
                  onClick={() => onOpenChecklistModal(bookingConfirmed)}
                  className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Open Handover Condition Checklist
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Details, Specs & In the box */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Main Image */}
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-[16/10] bg-slate-100 dark:bg-slate-800 relative">
                  <GearImage
                    src={gear.imageUrl} 
                    alt={gear.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{gear.rating}</span>
                    <span className="text-slate-400">({gear.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Title & Brand */}
                <div className="space-y-2">
                  <div className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                    {gear.brand} • Condition: {gear.condition}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    {gear.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {gear.description}
                  </p>
                </div>

                {/* What's In The Box */}
                <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Box className="w-4 h-4 text-emerald-500" />
                    <span>What's Included in the Case</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {gear.includedInBox.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-teal-500" />
                    <span>Technical Highlights</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {gear.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lender Profile Card */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={gear.owner.avatar} 
                      alt={gear.owner.name} 
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/40" 
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {gear.owner.name}
                        </span>
                        {gear.owner.verified && (
                          <ShieldCheck className="w-4 h-4 text-emerald-500" title="Verified Creator" />
                        )}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {gear.owner.completedRentals} successful handovers • Response: {gear.owner.responseRate}
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="px-2.5 py-1 rounded-full font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      ⚡ Replies {gear.owner.responseTime}
                    </span>
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>Creator Reviews ({reviewsList.length})</span>
                    </h4>
                  </div>

                  {/* Add review form */}
                  <form onSubmit={handleReviewSubmit} className="space-y-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">Leave a review as {currentUser.name}:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReviewRating(star)}
                            className="p-0.5"
                          >
                            <Star className={`w-4 h-4 ${star <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Write brief feedback on this gear..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="flex-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        disabled={reviewSubmitting || !newReviewComment.trim()}
                        className="px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 disabled:opacity-50 transition-colors flex items-center gap-1"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Post</span>
                      </button>
                    </div>
                  </form>

                  {/* Existing Reviews */}
                  <div className="space-y-3">
                    {reviewsList.map((rev) => (
                      <div key={rev.id} className="p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800 dark:text-slate-200">{rev.userName}</span>
                          <div className="flex items-center gap-1 text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span className="font-black text-slate-700 dark:text-slate-300">{rev.rating}</span>
                            <span className="text-[10px] text-slate-400 ml-1">{rev.date}</span>
                          </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Pricing & Interactive Rental Calculator */}
              <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-4">
                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl space-y-5">
                  
                  {/* Daily Rate header */}
                  <div className="flex items-baseline justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div>
                      <span className="text-3xl font-black text-slate-900 dark:text-white">
                        ${gear.dailyRate}
                      </span>
                      <span className="text-sm font-semibold text-slate-400"> / day</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                        Escrow Protected
                      </span>
                    </div>
                  </div>

                  {/* Date Range Picker */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      <span>Select Rental Dates</span>
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-semibold">Start Date</span>
                        <input
                          type="date"
                          value={startDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-semibold">End Date</span>
                        <input
                          type="date"
                          value={endDate}
                          min={startDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 text-right">
                      Total rental duration: <strong>{rentalDays} {rentalDays === 1 ? 'day' : 'days'}</strong>
                    </div>
                  </div>

                  {/* Pickup Note / Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Handover Location / Meeting Point:
                    </label>
                    <input
                      type="text"
                      placeholder={`e.g. Near ${gear.location}`}
                      value={pickupNote}
                      onChange={(e) => setPickupNote(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Price Breakdown Calculation */}
                  <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>${gear.dailyRate} × {rentalDays} days rental</span>
                      <span className="font-bold text-slate-900 dark:text-white">${rentalFee}</span>
                    </div>

                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <span>Refundable Security Deposit</span>
                        <Lock className="w-3 h-3 text-emerald-500" title="Held in escrow, 100% returned upon handover check" />
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">${securityDeposit}</span>
                    </div>

                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>GearCare Damage Protection</span>
                      <span className="font-bold text-slate-900 dark:text-white">${insuranceFee}</span>
                    </div>

                    <div className="flex justify-between text-sm font-black pt-3 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      <span>Total Amount Payable</span>
                      <span className="text-emerald-600 dark:text-emerald-400 text-base">${totalPayable}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      *Security deposit (${securityDeposit}) is held in secure escrow and released back to your card immediately after returning the gear undamaged.
                    </p>
                  </div>

                  {/* Booking CTA Button */}
                  <button
                    onClick={handleBookNow}
                    disabled={bookingLoading || !gear.available}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-black text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    {bookingLoading ? (
                      <span>Reserving Gear & Locking Escrow...</span>
                    ) : gear.available ? (
                      <>
                        <span>Confirm & Book Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <span>Currently On Rental</span>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Free cancellation up to 24h before pickup</span>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
