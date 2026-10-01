import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  GraduationCap, 
  ShieldCheck, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { CREATOR_PROFILE } from '../context/AuthContext';
import { api } from '../services/api';

export default function ContactModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(CREATOR_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const result = await api.sendContactMessage(formData);
      setConfirmationSent(result.confirmationSent !== false);
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="glass-card w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Developer & Platform Contact
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Profile Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="relative shrink-0">
              <img 
                src={CREATOR_PROFILE.avatar} 
                alt={CREATOR_PROFILE.name} 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-emerald-500/30 shadow-lg shadow-emerald-500/20"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                }}
              />
              <span className="absolute -bottom-1.5 -right-1.5 bg-emerald-600 text-white p-1 rounded-full shadow-md" title="Verified Creator & Engineer">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {CREATOR_PROFILE.name}
                </h2>
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-300 dark:border-emerald-800 self-center sm:self-auto">
                  Lead Engineer
                </span>
              </div>

              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {CREATOR_PROFILE.role}
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{CREATOR_PROFILE.education}</span>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {CREATOR_PROFILE.institution}
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>{CREATOR_PROFILE.location}</span>
              </div>
            </div>
          </div>

          {/* Direct Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            
            {/* Email card */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-500 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">EMAIL</span>
                  <a href={`mailto:${CREATOR_PROFILE.email}`} className="font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-500">
                    {CREATOR_PROFILE.email}
                  </a>
                </div>
              </div>
              <button 
                onClick={copyEmail}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone card */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">PHONE & WHATSAPP</span>
                  <a href={`tel:${CREATOR_PROFILE.phone}`} className="font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-500">
                    {CREATOR_PROFILE.phone}
                  </a>
                </div>
              </div>
              <a 
                href={`https://wa.me/916383275813`} 
                target="_blank" 
                rel="noreferrer"
                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold"
              >
                WhatsApp
              </a>
            </div>

            {/* LinkedIn card */}
            <a 
              href={CREATOR_PROFILE.linkedIn} 
              target="_blank" 
              rel="noreferrer"
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-blue-500 transition-colors shadow-2xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">LINKEDIN</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-500">
                    dhayanandham-a
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
            </a>

            {/* GitHub card */}
            <a 
              href={CREATOR_PROFILE.github} 
              target="_blank" 
              rel="noreferrer"
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-slate-400 transition-colors shadow-2xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 flex items-center justify-center">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">GITHUB</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-500">
                    dhayanandham80808-cmd
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
            </a>

          </div>

          {/* Direct Message Form */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>Send a Direct Message to Dhayanandham</span>
            </h4>

            {submitted ? (
              <div className="py-4 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <div className="font-bold text-xs text-slate-900 dark:text-white">Message sent successfully</div>
                <p className="text-[11px] text-slate-500">
                  {confirmationSent
                    ? `A thank-you confirmation was sent to ${formData.email}.`
                    : 'Your message was delivered, but we could not send a confirmation email.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {submitError && (
                  <p role="alert" className="text-xs font-semibold text-red-600 dark:text-red-400">
                    {submitError}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject (e.g. Project Collaboration / Rental Inquiry)"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                />
                <textarea
                  rows={3}
                  placeholder="Write your message here..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
