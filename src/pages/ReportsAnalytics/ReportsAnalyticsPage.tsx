import React, { useState } from 'react';
import {
  BarChart3,
  Calendar,
  Download,
  TrendingUp,
  Package,
  CheckCircle2,
  Users2,
  ChevronDown,
  Lightbulb,
  Sparkles,
  FileText,
  Star,
  MapPin,
  X,
  ArrowRight,
  Truck,
  ShieldCheck,
  Building,
  DollarSign,
  Clock,
  Layers,
  Award,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ComposedChart
} from 'recharts';
import { formatOMR, formatNumber } from '../../utils/currency';
import { useAppStore } from '../../store/useAppStore';
import { handleImageError, sanitizeImageUrl } from '../../utils/imageHelper';

export const ReportsAnalyticsPage: React.FC = () => {
  const { showToast } = useAppStore();

  const [dateRange, setDateRange] = useState('01 Aug 2025 - 31 Aug 2025');
  const [activeTab, setActiveTab] = useState('Overview');
  const [customReportModalOpen, setCustomReportModalOpen] = useState(false);
  const [reportResultModalOpen, setReportResultModalOpen] = useState(false);

  // Custom Report Form
  const [customReportName, setCustomReportName] = useState('Q3 Ministerial Sourcing Audit');
  const [reportType, setReportType] = useState('Spend Analytics & ICV');
  const [reportDepartment, setReportDepartment] = useState('All Departments');

  // Chart 1: Procurement Spend Trend Data
  const spendTrendData = [
    { month: 'Jan', it: 120000, office: 80000, industrial: 90000, safety: 40000, others: 30000, total: 360000 },
    { month: 'Feb', it: 150000, office: 90000, industrial: 110000, safety: 45000, others: 35000, total: 430000 },
    { month: 'Mar', it: 180000, office: 110000, industrial: 130000, safety: 50000, others: 40000, total: 510000 },
    { month: 'Apr', it: 170000, office: 100000, industrial: 120000, safety: 55000, others: 45000, total: 490000 },
    { month: 'May', it: 210000, office: 120000, industrial: 140000, safety: 60000, others: 50000, total: 580000 },
    { month: 'Jun', it: 240000, office: 130000, industrial: 160000, safety: 70000, others: 55000, total: 655000 },
    { month: 'Jul', it: 280000, office: 140000, industrial: 190000, safety: 80000, others: 60000, total: 750000 },
    { month: 'Aug', it: 340000, office: 160000, industrial: 210000, safety: 95000, others: 89250, total: 894250 },
  ];

  // Chart 2: Orders by Status Donut Data
  const orderStatusData = [
    { name: 'Delivered', value: 68, color: '#10B981' },
    { name: 'In Fulfillment', value: 32, color: '#3B82F6' },
    { name: 'Processing', value: 18, color: '#F59E0B' },
    { name: 'Cancelled', value: 10, color: '#EF4444' },
  ];

  // Chart 5: Orders by Department Donut Data
  const departmentData = [
    { name: 'Infrastructure & Roads', value: 36, color: '#2563EB' },
    { name: 'Public Works', value: 24, color: '#06B6D4' },
    { name: 'Municipal Housing', value: 18, color: '#10B981' },
    { name: 'IT & Digital Service', value: 14, color: '#8B5CF6' },
    { name: 'Health Facilities', value: 8, color: '#F59E0B' },
  ];

  // Top Products List with verified working images
  const topProductsList = [
    {
      num: 1,
      name: 'Dell Latitude 7450 Laptop',
      amount: 100625,
      qty: 235,
      category: 'IT & Electronics',
      img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=100&auto=format&fit=crop&q=80'
    },
    {
      num: 2,
      name: 'AC Unit 2 Ton Inverter',
      amount: 73750,
      qty: 350,
      category: 'Facility Management',
      img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=100&auto=format&fit=crop&q=80'
    },
    {
      num: 3,
      name: 'Ergonomic Office Chair',
      amount: 60775,
      qty: 715,
      category: 'Office & Furniture',
      img: 'https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=100&auto=format&fit=crop&q=80'
    },
    {
      num: 4,
      name: 'Diesel Generator 100 kVA',
      amount: 54125,
      qty: 12,
      category: 'Industrial Equipment',
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=100&auto=format&fit=crop&q=80'
    },
    {
      num: 5,
      name: 'Safety Helmet with Chin Strap',
      amount: 28800,
      qty: 2400,
      category: 'Safety & Security',
      img: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=100&auto=format&fit=crop&q=80'
    },
  ];

  // Supplier Scorecards
  const suppliersPerformanceList = [
    { name: 'Oman Logistics Solutions', category: 'Logistics & Transport', onTime: 98, rating: 4.8, icv: 72, orders: 42, spend: 320400 },
    { name: 'Gulf Industrial Supplies', category: 'Industrial Equipment', onTime: 95, rating: 4.6, icv: 64, orders: 28, spend: 215600 },
    { name: 'Al Badr Electronics', category: 'IT & Electronics', onTime: 92, rating: 4.5, icv: 58, orders: 24, spend: 184500 },
    { name: 'Muscat Office Solutions', category: 'Office & Furniture', onTime: 90, rating: 4.3, icv: 68, orders: 20, spend: 112800 },
    { name: 'National Safety Co.', category: 'Safety & Security', onTime: 88, rating: 4.1, icv: 62, orders: 18, spend: 60950 },
  ];

  const handleExportPDF = () => {
    showToast('Compiling analytical summary PDF...', 'info');
    setTimeout(() => {
      showToast('Downloaded "Oman_Procurement_Analytics_Aug2025.pdf"', 'success');
    }, 800);
  };

  const handleGenerateCustomReport = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomReportModalOpen(false);
    setReportResultModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header matching screenshot 1_8 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Reports & Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor institutional spend velocity, supplier SLA adherence, and Oman In-Country Value (ICV) metrics.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Date range selector */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{dateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <button
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Report (PDF)</span>
          </button>

          <button
            onClick={() => setCustomReportModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Custom Report</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-bold text-slate-500 overflow-x-auto scrollbar-none">
        {[
          'Overview',
          'Procurement',
          'Suppliers',
          'Orders & Fulfillment',
          'Product Insights',
          'Usage & Adoption'
        ].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Total Orders</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-slate-900">128</span>
              <span className="text-[11px] font-bold text-emerald-600">↑ 18%</span>
            </div>
            <span className="text-[10px] text-slate-400">vs. previous month</span>
          </div>
        </div>

        {/* Total Spend */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Total Spend (OMR)</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-slate-900">894,250</span>
              <span className="text-[11px] font-bold text-emerald-600">↑ 12%</span>
            </div>
            <span className="text-[10px] text-slate-400">vs. previous month</span>
          </div>
        </div>

        {/* Fulfillment Rate */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Fulfillment Rate</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-slate-900">96%</span>
              <span className="text-[11px] font-bold text-emerald-600">↑ 4%</span>
            </div>
            <span className="text-[10px] text-slate-400">vs. previous month</span>
          </div>
        </div>

        {/* Active Suppliers */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Active Suppliers</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-slate-900">198</span>
              <span className="text-[11px] font-bold text-emerald-600">↑ 8%</span>
            </div>
            <span className="text-[10px] text-slate-400">vs. previous month</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW */}
      {/* ========================================================================= */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          {/* Grid of 6 Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* 1. Procurement Spend Trend (col-span-2) */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">Procurement Spend Trend</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="px-2 py-1 bg-slate-50 border border-slate-200 rounded font-medium">Monthly</span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={spendTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#64748B' }}
                      tickFormatter={(val) => `${val / 1000}K`}
                    />
                    <Tooltip
                      formatter={(val: any) => formatOMR(Number(val))}
                      contentStyle={{ backgroundColor: '#0B1727', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                    />
                    <Bar dataKey="it" stackId="a" fill="#3B82F6" name="IT & Electronics" />
                    <Bar dataKey="office" stackId="a" fill="#8B5CF6" name="Office & Furniture" />
                    <Bar dataKey="industrial" stackId="a" fill="#06B6D4" name="Industrial Equipment" />
                    <Bar dataKey="safety" stackId="a" fill="#F59E0B" name="Safety & Security" />
                    <Bar dataKey="others" stackId="a" fill="#F97316" name="Others" />
                    <Line type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} name="Total Spend" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-slate-500 pt-3 border-t border-slate-100 mt-2">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#3B82F6]" /> IT & Electronics</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#8B5CF6]" /> Office & Furniture</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#06B6D4]" /> Industrial Equipment</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#F59E0B]" /> Safety & Security</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#F97316]" /> Others</span>
              </div>
            </div>

            {/* 2. Orders by Status (Donut Chart) (col-span-1) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-900">Orders by Status</h3>
              </div>

              <div className="relative h-52 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `${val} Orders`} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-black text-slate-900">128</span>
                  <span className="text-[10px] text-slate-400 font-medium">Orders</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                {orderStatusData.map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-600">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </span>
                    <span className="font-bold text-slate-800">
                      {item.value} ({Math.round((item.value / 128) * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Top Products by Spend */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Top Products by Spend</h3>
                <span className="text-xs text-slate-400 font-medium">Top 5</span>
              </div>

              <div className="space-y-3">
                {topProductsList.map(p => (
                  <div key={p.num} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center text-[10px]">
                        {p.num}
                      </span>
                      <img
                        src={sanitizeImageUrl(p.img)}
                        alt={p.name}
                        onError={handleImageError}
                        className="w-7 h-7 rounded object-cover border border-slate-200 shrink-0 bg-slate-50"
                      />
                      <span className="font-bold text-slate-800 truncate max-w-[130px]">{p.name}</span>
                    </div>
                    <span className="font-black text-slate-900">{formatOMR(p.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Supplier Performance */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Supplier Performance</h3>
                <button
                  onClick={() => setActiveTab('Suppliers')}
                  className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {suppliersPerformanceList.map(sup => (
                  <div key={sup.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800 text-[11px] truncate max-w-[140px]">{sup.name}</span>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="font-bold text-emerald-600">{sup.onTime}% On-Time</span>
                        <span className="text-amber-500 font-bold">★ {sup.rating}</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${sup.onTime}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Orders by Department (Donut) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-900">Orders by Department</h3>
              </div>

              <div className="relative h-44 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `${val}% Share`} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-lg font-black text-slate-900">128</span>
                  <span className="text-[9px] text-slate-400">Orders</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 text-[11px]">
                {departmentData.map(item => (
                  <div key={item.name} className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="truncate">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Geographic Distribution */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Geographic Distribution</h3>
                <span className="text-xs text-slate-400">Governorates</span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { city: 'Muscat Capital', percent: 46, color: '#3B82F6' },
                  { city: 'Sohar (Al Batinah)', percent: 18, color: '#06B6D4' },
                  { city: 'Salalah (Dhofar)', percent: 14, color: '#10B981' },
                  { city: 'Nizwa (Al Dakhiliyah)', percent: 12, color: '#8B5CF6' },
                  { city: 'Duqm (Al Wusta)', percent: 8, color: '#F59E0B' },
                  { city: 'Other Regions', percent: 2, color: '#94A3B8' },
                ].map(loc => (
                  <div key={loc.city} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-700">{loc.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${loc.percent * 2}%`, backgroundColor: loc.color }} />
                      </div>
                      <span className="font-bold text-slate-900 w-8 text-right">{loc.percent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PROCUREMENT */}
      {/* ========================================================================= */}
      {activeTab === 'Procurement' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-400 font-medium">Tender Savings Realized</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">OMR 48,200</div>
              <span className="text-[11px] text-slate-500">Average 5.4% under maximum baseline ceiling</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-400 font-medium">Average Procurement Lead Time</span>
              <div className="text-2xl font-black text-blue-600 mt-1">11.4 Days</div>
              <span className="text-[11px] text-emerald-600 font-semibold">↓ 3.2 days faster vs 2024</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-400 font-medium">Tender Board Compliance</span>
              <div className="text-2xl font-black text-slate-900 mt-1">98.8%</div>
              <span className="text-[11px] text-slate-500">Royal Decree 84/2020 adherence</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Procurement Budget Allocation vs Actual Spend (YTD)</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748B' }} tickFormatter={(val) => `${val / 1000}K`} />
                  <Tooltip formatter={(val: any) => formatOMR(Number(val))} />
                  <Legend />
                  <Bar dataKey="it" fill="#3B82F6" name="IT & Electronics" />
                  <Bar dataKey="office" fill="#8B5CF6" name="Office & Furniture" />
                  <Bar dataKey="industrial" fill="#06B6D4" name="Industrial Equipment" />
                  <Bar dataKey="safety" fill="#F59E0B" name="Safety & Security" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SUPPLIERS */}
      {/* ========================================================================= */}
      {activeTab === 'Suppliers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">Verified Supplier Scorecard Matrix</h3>
                <p className="text-xs text-slate-500">
                  Real-time delivery SLAs, In-Country Value (ICV) compliance, and order ratings.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                198 Registered Vendors
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[11px]">
                  <tr>
                    <th className="p-3.5">Supplier Name</th>
                    <th className="p-3.5">Primary Category</th>
                    <th className="p-3.5 text-center">On-Time SLA</th>
                    <th className="p-3.5 text-center">In-Country Value (ICV)</th>
                    <th className="p-3.5 text-center">Rating</th>
                    <th className="p-3.5 text-center">Total Orders</th>
                    <th className="p-3.5 text-right">Total Spend (OMR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {suppliersPerformanceList.map(sup => (
                    <tr key={sup.name} className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-bold text-slate-900">{sup.name}</td>
                      <td className="p-3.5 text-slate-600">{sup.category}</td>
                      <td className="p-3.5 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                          {sup.onTime}% On-Time
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-bold text-blue-600">{sup.icv}%</td>
                      <td className="p-3.5 text-center text-amber-500 font-bold">★ {sup.rating}</td>
                      <td className="p-3.5 text-center font-semibold text-slate-800">{sup.orders}</td>
                      <td className="p-3.5 text-right font-black text-slate-900">{formatOMR(sup.spend)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ORDERS & FULFILLMENT */}
      {/* ========================================================================= */}
      {activeTab === 'Orders & Fulfillment' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Delivery Velocity by Governorate</h3>
              <div className="space-y-3 text-xs">
                {[
                  { region: 'Muscat Capital Hub', leadTime: '1.8 Days', onTime: 99 },
                  { region: 'Sohar Regional Depot (North Al Batinah)', leadTime: '2.4 Days', onTime: 96 },
                  { region: 'Nizwa Station (Al Dakhiliyah)', leadTime: '2.9 Days', onTime: 94 },
                  { region: 'Salalah Port Depot (Dhofar)', leadTime: '3.6 Days', onTime: 91 },
                  { region: 'Duqm Special Economic Zone (Al Wusta)', leadTime: '4.1 Days', onTime: 90 },
                ].map(r => (
                  <div key={r.region} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">{r.region}</span>
                      <span className="text-[10px] text-slate-400">Average Turnaround: {r.leadTime}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      {r.onTime}% SLA Met
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Fulfillment Health Indicators</h3>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between">
                  <span className="font-medium text-emerald-900">First-Time-Right Packaging</span>
                  <span className="font-bold text-emerald-700">98.4%</span>
                </div>
                <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 flex items-center justify-between">
                  <span className="font-medium text-blue-900">Electronic Sign-off & GRN Matching</span>
                  <span className="font-bold text-blue-700">99.1%</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <span className="font-medium text-slate-700">Consignment Rejection / Return Rate</span>
                  <span className="font-bold text-slate-900">0.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: PRODUCT INSIGHTS */}
      {/* ========================================================================= */}
      {activeTab === 'Product Insights' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
            <h3 className="text-base font-black text-slate-900">High-Demand Products & Consumption Analysis</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[11px]">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5 text-center">Units Procured</th>
                    <th className="p-3.5 text-right">Total Expenditure</th>
                    <th className="p-3.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topProductsList.map(p => (
                    <tr key={p.num} className="hover:bg-slate-50/70">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={sanitizeImageUrl(p.img)}
                            alt={p.name}
                            onError={handleImageError}
                            className="w-9 h-9 rounded object-cover border border-slate-200 shrink-0 bg-slate-50"
                          />
                          <span className="font-bold text-slate-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-600">{p.category}</td>
                      <td className="p-3.5 text-center font-bold text-slate-800">{formatNumber(p.qty)} Units</td>
                      <td className="p-3.5 text-right font-black text-slate-900">{formatOMR(p.amount)}</td>
                      <td className="p-3.5 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                          Active Contract
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: USAGE & ADOPTION */}
      {/* ========================================================================= */}
      {activeTab === 'Usage & Adoption' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-400 font-medium">Digital Procurement Adoption</span>
              <div className="text-2xl font-black text-blue-600 mt-1">94.8%</div>
              <span className="text-[11px] text-emerald-600 font-semibold">Oman Vision 2040 e-Gov Target Met</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-400 font-medium">Paperless Requisitions Processed</span>
              <div className="text-2xl font-black text-slate-900 mt-1">1,480 Vouchers</div>
              <span className="text-[11px] text-slate-500">100% electronic approvals</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
              <span className="text-xs text-slate-400 font-medium">Active Ministerial Buyers</span>
              <div className="text-2xl font-black text-purple-600 mt-1">48 Officers</div>
              <span className="text-[11px] text-slate-500">Across 6 directorates</span>
            </div>
          </div>
        </div>
      )}

      {/* Custom Report Creation Modal */}
      {customReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900">Configure Custom Report</h3>
              <button onClick={() => setCustomReportModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGenerateCustomReport} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Report Title</label>
                <input
                  type="text"
                  required
                  value={customReportName}
                  onChange={(e) => setCustomReportName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="Spend Analytics & ICV">Spend Analytics & In-Country Value (ICV)</option>
                  <option value="Vendor SLA & Delivery Audit">Vendor SLA & Delivery Audit</option>
                  <option value="Departmental Budget Consumption">Departmental Budget Consumption</option>
                  <option value="Product Sourcing Volume Breakdown">Product Sourcing Volume Breakdown</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department Scope</label>
                <select
                  value={reportDepartment}
                  onChange={(e) => setReportDepartment(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="All Departments">All Departments (Consolidated)</option>
                  <option value="Procurement">Procurement</option>
                  <option value="Operations">Operations</option>
                  <option value="Finance">Finance</option>
                  <option value="IT & Digital Transformation">IT & Digital Transformation</option>
                </select>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setCustomReportModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-bold shadow-xs cursor-pointer"
                >
                  Generate Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generated Report Result Modal */}
      {reportResultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 w-full max-w-xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{customReportName}</h3>
                <span className="text-[10px] text-slate-400">{reportType} • {reportDepartment}</span>
              </div>
              <button onClick={() => setReportResultModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Period:</span>
                <span className="font-bold text-slate-800">{dateRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Analyzed Spend:</span>
                <span className="font-bold text-slate-800">{formatOMR(894250)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">In-Country Value (ICV) Share:</span>
                <span className="font-bold text-emerald-600">24.2% (Target: &gt;15%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Compliant Requisitions:</span>
                <span className="font-bold text-slate-800">128 of 128 (100%)</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                onClick={() => setReportResultModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast('Exported report file (.xlsx)', 'success');
                  setReportResultModalOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
