import React, { useState } from 'react';
import GearImage from './GearImage';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  DollarSign, 
  Camera, 
  Layers
} from 'lucide-react';

export default function GearAiModal({ onClose, onSelectGear }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "👋 Hey there! I'm **GearAI Scout**, your creative gear advisor. Tell me about your upcoming shoot, project budget, or equipment wishlist, and I'll assemble the perfect verified kit directly from our local catalog! ⚡",
      items: [],
      recommendations: []
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const promptSuggestions = [
    "YouTube cinematic travel vlog kit under $60/day",
    "Wedding cinema kit with camera, lighting & gimbal",
    "Aerial drone coverage for outdoor landscape shoot",
    "Dual wireless mic setup for podcast interviews"
  ];

  const handleSend = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    // Append user message
    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/scout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend })
      });

      if (!res.ok) throw new Error('AI request failed');
      const data = await res.json();

      const aiMsg = {
        sender: 'ai',
        text: data.reply,
        items: data.items || [],
        recommendations: data.recommendations || [],
        bundleRate: data.bundleDailyRate
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "I ran into a temporary hiccup scanning the inventory. Please try asking again!",
          items: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="glass-card w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  GearAI Scout
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-300 dark:border-emerald-800">
                  Grounded In Live Inventory
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                AI Kit Builder & Gear Recommendation Engine
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

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-4 text-xs space-y-3 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white font-medium rounded-br-none shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-800 shadow-xs'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* Recommendations bullet points */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">Kit Breakdown:</p>
                    {msg.recommendations.map((rec, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{rec}</span>
                      </div>
                    ))}
                    {msg.bundleRate && (
                      <div className="pt-1.5 text-right font-bold text-slate-900 dark:text-white">
                        Estimated Bundle Daily Rate: <span className="text-emerald-500 text-sm font-black">${msg.bundleRate}/day</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Matched Product Cards inside AI response */}
                {msg.items && msg.items.length > 0 && (
                  <div className="pt-3 space-y-2">
                    <p className="font-bold text-[11px] text-slate-500 uppercase tracking-wider">
                      Matched Available Items ({msg.items.length}):
                    </p>
                    <div className="space-y-2">
                      {msg.items.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 hover:border-emerald-500 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <GearImage src={item.imageUrl} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.title}</div>
                              <div className="text-[10px] text-slate-400">{item.city} • Condition: {item.condition}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs">${item.dailyRate}/d</span>
                            <button
                              onClick={() => {
                                onClose();
                                onSelectGear(item);
                              }}
                              className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold hover:bg-emerald-700 flex items-center gap-1"
                            >
                              <span>Rent</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
              <span>GearAI is scanning inventory and calculating kit compatibility...</span>
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {promptSuggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                disabled={loading}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 whitespace-nowrap"
              >
                💡 {s}
              </button>
            ))}
          </div>
        </div>

        {/* Query Input Box */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask GearAI (e.g. 'Build me a budget YouTube documentary setup')..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              disabled={loading}
              className="flex-1 text-xs p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="p-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl shadow-md transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
