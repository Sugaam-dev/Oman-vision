import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Boxes,
  Building2,
  Users2,
  Bot,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Truck,
  FileText,
  ShoppingCart,
  Building,
  ChevronRight,
  Lightbulb,
  TrendingUp,
  Megaphone,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useOrderStore } from '../../store/useOrderStore';
import { initialAnnouncements } from '../../data/announcements';
import { formatOMR } from '../../utils/currency';
import { StatusBadge } from '../../components/common/Badge';
import { handleImageError, sanitizeImageUrl } from '../../utils/imageHelper';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { organization } = useAppStore();
  const orders = useOrderStore(state => state.orders);

  // Take the 4 most recent orders
  const recentOrders = orders.slice(0, 4);

  const categories = [
    { name: 'IT & Electronics', count: 20, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&auto=format&fit=crop&q=80' },
    { name: 'Office & Furniture', count: 20, image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=300&auto=format&fit=crop&q=80' },
    { name: 'Facility Management', count: 20, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&auto=format&fit=crop&q=80' },
    { name: 'Safety & Security', count: 20, image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=300&auto=format&fit=crop&q=80' },
    { name: 'Industrial Equipment', count: 20, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=80' },
    { name: 'Logistics & Transport', count: 20, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Grid: Hero Banner + Right Column Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Hero Banner (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl relative overflow-hidden bg-gradient-to-r from-[#0C1B33] via-[#102A4C] to-[#17375E] text-white p-6 sm:p-8 flex flex-col justify-between shadow-md border border-slate-700/50">
          {/* Subtle container terminal port silhouette background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 space-y-4">
            {/* Oman Vision 2040 badge top right */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-teal-300 tracking-wide uppercase">
                Digital Supply Chain • Trusted Partners • Greater Impact
              </span>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span className="text-[11px] font-bold text-white">Oman Vision 2040</span>
                <span className="text-[10px] text-teal-300">رؤية عمان</span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Smart Procurement <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-blue-200 to-white">
                  for a Connected Oman
                </span>
              </h1>
            </div>

            {/* Strategic Pillars */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-200">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Efficient</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Transparent</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Sustainable</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Future-Ready</span>
            </div>
          </div>

          {/* Metric cards bottom row */}
          <div className="relative z-10 grid grid-cols-3 gap-3 pt-6 border-t border-white/15 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-teal-300 shrink-0">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-black text-white">120+</div>
                <div className="text-[11px] text-slate-300">Products</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-black text-white">6</div>
                <div className="text-[11px] text-slate-300">Core Departments</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0">
                <Users2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-black text-white">100+</div>
                <div className="text-[11px] text-slate-300">Government Entities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: AI Card + My Organization Card */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* AI Procurement Assistant Card */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-5 text-white border border-slate-700/60 shadow-sm relative overflow-hidden flex-1 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-purple-400 uppercase bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/60">
                  AI ASSISTANT
                </span>
                <h3 className="text-base font-bold text-white mt-1">Your AI Procurement Assistant</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Search products, compare specifications, get recommendations – all within a secure, local AI.
                </p>
              </div>

              {/* 3D Robot Mascot Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 p-0.5 shadow-md shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                  <Bot className="w-8 h-8 text-teal-300 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => navigate('/ai-assistant')}
                className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-xs text-white shadow-md transition-all flex items-center justify-center gap-1.5 group cursor-pointer"
              >
                <span>Try AI Search</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* My Organization Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{organization.name}</h4>
                    <span className="text-[10px] text-slate-400">{organization.type}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/organization')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  Switch
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Users</span>
                  <span className="text-sm font-bold text-slate-800">12</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Departments</span>
                  <span className="text-sm font-bold text-slate-800">4</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Active Contracts</span>
                  <span className="text-sm font-bold text-slate-800">3</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Account Status</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
          <span className="text-xs text-slate-400">Access primary procurement workflows</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => navigate('/products')}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition-all text-center group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Boxes className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600">
              Browse Product Catalog
            </span>
          </button>

          <button
            onClick={() => navigate('/rfq')}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-purple-50/50 hover:border-purple-200 transition-all text-center group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 group-hover:text-purple-600">
              Request a Quote (CPQ)
            </span>
          </button>

          <button
            onClick={() => navigate('/bulk-order')}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all text-center group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 group-hover:text-emerald-600">
              Place Bulk Order
            </span>
          </button>

          <button
            onClick={() => navigate('/orders')}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-amber-50/50 hover:border-amber-200 transition-all text-center group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Truck className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 group-hover:text-amber-600">
              Track My Orders
            </span>
          </button>

          <button
            onClick={() => navigate('/organization')}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-teal-50/50 hover:border-teal-200 transition-all text-center group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 group-hover:text-teal-600">
              Manage Organization
            </span>
          </button>

          <button
            onClick={() => navigate('/ai-assistant')}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all text-center group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600">
              AI Assistant
            </span>
          </button>
        </div>
      </div>

      {/* Middle Grid: Product Catalog Preview + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Product Catalog Preview (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Product Catalog</h3>
            <button
              onClick={() => navigate('/products')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {categories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
                className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer bg-slate-50/40 hover:bg-white group"
              >
                <div className="w-full h-24 rounded-lg overflow-hidden mb-2 bg-slate-100 flex items-center justify-center">
                  <img
                    src={sanitizeImageUrl(cat.image)}
                    alt={cat.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                  {cat.name}
                </h4>
                <span className="text-[11px] text-slate-400">({cat.count} Products)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-slate-900">Recent Orders</h3>
              <button
                onClick={() => navigate('/orders')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentOrders.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => navigate(`/orders/${ord.id}`)}
                  className="py-3 first:pt-0 last:pb-0 flex items-center justify-between hover:bg-slate-50/80 px-1 rounded-lg cursor-pointer transition-colors"
                >
                  <div>
                    <span className="text-xs font-bold text-blue-600 hover:underline block">
                      {ord.orderNumber}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {ord.orderDate} • {formatOMR(ord.totalAmount)}
                    </span>
                  </div>

                  <StatusBadge status={ord.status} size="sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              onClick={() => navigate('/bulk-order')}
              className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-blue-50 text-blue-600 text-xs font-semibold border border-slate-200 hover:border-blue-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Create New Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Procurement Workflow Section */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900">Procurement Workflow</h3>
          <span className="text-xs text-slate-400">Tender Board Standard Requisition Process</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 relative">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs mb-2">
              1
            </div>
            <h4 className="text-xs font-bold text-slate-900">Request Quote / Order</h4>
            <p className="text-[11px] text-slate-500 mt-1">Initiate requisition or bulk purchase from verified suppliers.</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs mb-2">
              2
            </div>
            <h4 className="text-xs font-bold text-slate-900">Review & Negotiate</h4>
            <p className="text-[11px] text-slate-500 mt-1">Compare technical bids, prices, and ICV scorecards.</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs mb-2">
              3
            </div>
            <h4 className="text-xs font-bold text-slate-900">Approval & Confirmation</h4>
            <p className="text-[11px] text-slate-500 mt-1">Purchase Order issuance and financial commitment sign-off.</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs mb-2">
              4
            </div>
            <h4 className="text-xs font-bold text-slate-900">Fulfillment & Delivery</h4>
            <p className="text-[11px] text-slate-500 mt-1">Real-time transit tracking and physical goods receipt.</p>
          </div>
        </div>
      </div>

      {/* Bottom Grid: AI Insights + Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* AI Insights (Beta) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">AI Insights</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                Beta
              </span>
            </div>
            <button
              onClick={() => navigate('/ai-assistant')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900">Recommended for You</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Based on your past orders, we recommend restocking Office Supplies (A4 Paper, Toner) before end of month.
                </p>
                <button
                  onClick={() => navigate('/products?category=Office%20%26%20Furniture')}
                  className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View Products</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900">Predictive Demand</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Your organization's inventory for Safety Equipment is likely to run low in 4 weeks due to port activity.
                </p>
                <button
                  onClick={() => navigate('/bulk-order')}
                  className="mt-2 text-xs font-bold text-teal-600 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Create Bulk Order</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Announcements</h3>
            <button
              onClick={() => navigate('/help')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {initialAnnouncements.slice(0, 2).map((ann) => (
              <div
                key={ann.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{ann.title}</h4>
                    <span className="text-[10px] text-slate-400">{ann.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {ann.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
