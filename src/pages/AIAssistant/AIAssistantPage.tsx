import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Bot,
  BarChart2,
  Zap,
  BookOpen,
  ShieldCheck,
  FileText,
  Package,
  Send,
  Paperclip,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Leaf,
  Megaphone,
  Clock,
  HelpCircle,
  Building,
  CheckCircle2
} from 'lucide-react';
import { useAIStore } from '../../store/useAIStore';
import { useAppStore } from '../../store/useAppStore';
import { handleImageError, sanitizeImageUrl } from '../../utils/imageHelper';
import { formatOMR } from '../../utils/currency';

export const AIAssistantPage: React.FC = () => {
  const navigate = useNavigate();
  const { messages, sendMessage, isTyping } = useAIStore();
  const { organization, showToast } = useAppStore();

  const [inputQuery, setInputQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;
    sendMessage(text);
    setInputQuery('');
  };

  const quickPrompts = [
    { label: 'Create a new RFQ', icon: <FileText className="w-4 h-4 text-blue-600" />, query: 'create a new RFQ' },
    { label: 'Check status of my orders', icon: <Package className="w-4 h-4 text-amber-600" />, query: 'check status of my orders' },
    { label: 'Generate a procurement spend report', icon: <BarChart2 className="w-4 h-4 text-teal-600" />, query: 'generate a procurement spend report' },
    { label: 'Show procurement policy guidelines', icon: <BookOpen className="w-4 h-4 text-indigo-600" />, query: 'show procurement policy guidelines' },
    { label: 'Check compliance requirements', icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />, query: 'check compliance requirements' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Card matching AI_Assistant_v2 screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Assistant</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Customer Experience
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Your intelligent partner for procurement, supply chain and compliance.
          </p>
        </div>

        {/* Enterprise AI Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 px-3 py-1.5 rounded-xl shadow-2xs">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-purple-900">Powered by Generative AI</span>
              <span className="text-[9px] text-purple-600 font-medium">Trusted • Secure • Built for Enterprise</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Capability Cards matching screenshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => handleSend('Show procurement spend breakdown')}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-purple-300 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <BarChart2 className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 group-hover:text-purple-600">Get Insights</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Analyze your procurement data and spending trends.</p>
        </div>

        <div
          onClick={() => handleSend('Create a new RFQ for IT equipment')}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-amber-300 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-600">Take Action</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Create RFQs, manage orders and track progress.</p>
        </div>

        <div
          onClick={() => handleSend('Show procurement policy guidelines')}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Learn & Explore</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Guidance, best practices and compliance.</p>
        </div>

        <div
          onClick={() => handleSend('Check compliance requirements and ICV')}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">Stay Compliant</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Policies, regulations and governance.</p>
        </div>
      </div>

      {/* Main Area: Chat Window (8 cols) + Right Info Panels (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Chat Window (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col min-h-[560px]">
          {/* Messages Stream */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4 max-h-[500px]">
            {/* Greeting Card matching screenshot */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-100">
              <div className="w-12 h-12 rounded-2xl bg-[#1E293B] flex items-center justify-center text-teal-300 shrink-0 shadow-xs">
                <Bot className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Hello, I'm your PMRG Assistant!</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  I can help you with procurement planning, order tracking, policy guidance and more. How can I assist you today?
                </p>
              </div>
            </div>

            {/* Quick Prompts list when starting */}
            {messages.length <= 1 && (
              <div className="space-y-2 pt-2">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(qp.query)}
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-white transition-colors">
                        {qp.icon}
                      </div>
                      <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600">
                        {qp.label}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            )}

            {/* Rendered Conversation History */}
            {messages.slice(1).map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#1E293B] text-teal-300 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-xl rounded-2xl p-4 text-xs space-y-3 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Render Table Data if available */}
                  {msg.tableData && (
                    <div className="border border-slate-200 rounded-xl overflow-hidden mt-2 bg-white">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead className="bg-slate-100/70 border-b border-slate-200 font-bold text-slate-700">
                          <tr>
                            {msg.tableData.headers.map((h, i) => (
                              <th key={i} className="p-2.5">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {msg.tableData.rows.map((row, ri) => (
                            <tr key={ri} className="hover:bg-slate-50">
                              {row.map((cell, ci) => (
                                <td key={ci} className="p-2.5 font-medium">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Render Product Cards if available */}
                  {msg.productCards && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {msg.productCards.map(pc => (
                        <div key={pc.id} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-3">
                          <img
                            src={sanitizeImageUrl(pc.image)}
                            alt={pc.name}
                            onError={handleImageError}
                            className="w-12 h-12 rounded object-cover border border-slate-200"
                          />
                          <div className="min-w-0 flex-1">
                            <h5 className="font-bold text-slate-900 text-xs truncate">{pc.name}</h5>
                            <span className="font-black text-slate-800 block text-xs">{formatOMR(pc.price)}</span>
                            <button
                              onClick={() => navigate(`/products/${pc.id}`)}
                              className="text-[10px] text-blue-600 font-bold hover:underline"
                            >
                              View Details →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render Action Buttons */}
                  {msg.actions && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {msg.actions.map((act, ai) => (
                        <button
                          key={ai}
                          onClick={() => {
                            if (act.route) navigate(act.route);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                            act.isPrimary
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-6 h-6 rounded-full bg-[#1E293B] text-teal-300 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <span>PMRG Assistant is analyzing procurement database...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/70 rounded-b-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-2xs focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all"
            >
              <button
                type="button"
                onClick={() => showToast('Simulated file attachment (RFQ draft or RFP specification)', 'info')}
                className="text-slate-400 hover:text-slate-600 p-1"
                title="Attach Document"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Type your question here... (e.g. 'Show my orders', 'Create RFQ', 'Show spend report')"
                className="flex-1 text-xs text-slate-900 focus:outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
              <span>Try asking in natural language: "Show total spend by department last quarter"</span>
              <span>Secure Government Session</span>
            </div>
          </div>
        </div>

        {/* Right Column: Announcements, Activity, Knowledge Base (4 cols) matching screenshot */}
        <div className="lg:col-span-4 space-y-4">
          {/* Announcements Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Announcements</h3>
              <span className="text-xs text-blue-600 font-semibold cursor-pointer">View All</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-xs">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Megaphone className="w-3 h-3" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Updated Procurement Policy</h5>
                  <span className="text-[10px] text-slate-400">05 Aug 2026</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Please review the revised government procurement policy.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Leaf className="w-3 h-3" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">New Sustainable Procurement Guidelines</h5>
                  <span className="text-[10px] text-slate-400">28 Jul 2026</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Focus on environmentally friendly products and vendors.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-3 h-3" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">System Maintenance</h5>
                  <span className="text-[10px] text-slate-400">20 Jul 2026</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Scheduled maintenance on 22 Jul 2026, 10:00 PM – 2:00 AM (OMT).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Activity</h3>
              <span className="text-xs text-blue-600 font-semibold cursor-pointer">View All</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900">RFQ-2026-0045 created</h5>
                  <span className="text-[10px] text-slate-400">1 hour ago</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Package className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900">Order ORD-2026-00124 in fulfillment</h5>
                  <span className="text-[10px] text-slate-400">3 hours ago</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <BarChart2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900">Procurement spend report generated</h5>
                  <span className="text-[10px] text-slate-400">1 day ago</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <BookOpen className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900">Viewed procurement policy</h5>
                  <span className="text-[10px] text-slate-400">2 days ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge Base Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Knowledge Base</h3>
              <span className="text-xs text-blue-600 font-semibold cursor-pointer">View All</span>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { title: 'Procurement Policies', path: '/help' },
                { title: 'User Guides', path: '/help' },
                { title: 'FAQs', path: '/help' },
                { title: 'Oman Regulations & Compliance', path: '/help' },
              ].map((kb, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(kb.path)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>{kb.title}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights for You (Beta) row */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-slate-900">AI Insights for You</h3>
          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            Beta
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Spend Analysis</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Procurement spend increased by 12% this quarter. Consider reviewing top categories.
              </p>
            </div>
            <button
              onClick={() => navigate('/reports')}
              className="self-start text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Delivery Risk Alert</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                2 key orders have potential delivery delays in the next 30 days.
              </p>
            </div>
            <button
              onClick={() => navigate('/orders')}
              className="self-start text-xs font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1"
            >
              <span>Check Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Sustainability Opportunity</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                15% of your procurements can be sourced from eco-friendly alternatives.
              </p>
            </div>
            <button
              onClick={() => navigate('/products?category=Facility%20Management')}
              className="self-start text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Explore Options</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Mission Banner matching screenshot */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200/70 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Leaf className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-800">
            Driving sustainable and efficient supply chains for a better tomorrow.
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-100/60 px-3 py-1 rounded-full border border-purple-200">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Powered by AI</span>
        </div>
      </div>
    </div>
  );
};
