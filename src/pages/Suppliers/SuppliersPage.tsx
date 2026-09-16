import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users2,
  Search,
  Filter,
  Star,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Building,
  ShieldCheck,
  FileText,
  X,
  ExternalLink
} from 'lucide-react';
import { initialSuppliers } from '../../data/suppliers';
import { Supplier } from '../../types/supplier';
import { StatusBadge } from '../../components/common/Badge';
import { useAppStore } from '../../store/useAppStore';

export const SuppliersPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const categories = [
    'All',
    'Logistics & Equipment',
    'Industrial Equipment',
    'IT & Electronics',
    'Office & Furniture',
    'Safety & Security',
    'Facility Management'
  ];

  const filteredSuppliers = useMemo(() => {
    return initialSuppliers.filter(s => {
      if (selectedCategory !== 'All' && s.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleContactSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleRequestQuote = (supplier: Supplier) => {
    showToast(`Starting RFQ with invited vendor: ${supplier.name}`, 'info');
    navigate('/rfq');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Suppliers Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered government vendors, In-Country Value (ICV) scorecards, and historical delivery SLAs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-200">
            Total Active Vendors: <span className="text-blue-600 font-extrabold">{initialSuppliers.length}</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search suppliers by name, code, or city..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{supplier.name}</h3>
                  <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{supplier.code} • {supplier.category}</span>
                </div>
                <StatusBadge status={supplier.status} size="sm" />
              </div>

              <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Rating</span>
                  <span className="font-black text-slate-800 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{supplier.rating} / 5.0</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">On-Time SLA</span>
                  <span className="font-bold text-emerald-600">{supplier.onTimeDeliveryRate}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Location</span>
                  <span className="font-semibold text-slate-700 truncate block">{supplier.location}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Orders Completed</span>
                  <span className="font-semibold text-slate-700">{supplier.totalOrders}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {supplier.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="grid grid-cols-2 gap-2 pt-4 mt-3 border-t border-slate-100 text-xs">
              <button
                onClick={() => handleContactSupplier(supplier)}
                className="py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
              >
                View Profile
              </button>

              <button
                onClick={() => handleRequestQuote(supplier)}
                className="py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
              >
                Request Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Supplier Profile Modal */}
      {selectedSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 w-full max-w-lg shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">{selectedSupplier.name}</h3>
                <p className="text-xs text-slate-500">{selectedSupplier.category} • {selectedSupplier.location}</p>
              </div>
              <button
                onClick={() => setSelectedSupplier(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Commercial Registration (CR):</span>
                  <span className="font-mono font-bold text-slate-900">{selectedSupplier.crNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Oman VAT Tax ID:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedSupplier.vatNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Local Omani Status:</span>
                  <span className="font-bold text-emerald-600">
                    {selectedSupplier.isOmanSupplier ? 'Tier 1 Local Content (ICV)' : 'International Direct'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">Direct Contact & Contracting Point</h4>
                <div className="flex items-center gap-2 text-slate-700">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span>Contact: {selectedSupplier.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a href={`mailto:${selectedSupplier.email}`} className="text-blue-600 hover:underline">{selectedSupplier.email}</a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{selectedSupplier.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setSelectedSupplier(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedSupplier(null);
                  handleRequestQuote(selectedSupplier);
                }}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
              >
                Start RFQ with Supplier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
