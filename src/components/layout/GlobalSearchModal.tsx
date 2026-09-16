import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Package, Boxes, Users2, FileText, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { initialProducts } from '../../data/products';
import { useOrderStore } from '../../store/useOrderStore';
import { initialSuppliers } from '../../data/suppliers';
import { useRFQStore } from '../../store/useRFQStore';
import { formatOMR } from '../../utils/currency';
import { handleImageError, sanitizeImageUrl } from '../../utils/imageHelper';

export const GlobalSearchModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen } = useAppStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const orders = useOrderStore(state => state.orders);
  const rfqs = useRFQStore(state => state.rfqs);

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(!searchModalOpen);
      }
      if (e.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { products: [], orders: [], suppliers: [], rfqs: [] };

    const matchedProducts = initialProducts
      .filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.sku.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q)
      )
      .slice(0, 4);

    const matchedOrders = orders
      .filter(o => 
        o.orderNumber.toLowerCase().includes(q) || 
        o.supplierName.toLowerCase().includes(q) || 
        o.status.toLowerCase().includes(q)
      )
      .slice(0, 4);

    const matchedSuppliers = initialSuppliers
      .filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.category.toLowerCase().includes(q) || 
        s.location.toLowerCase().includes(q)
      )
      .slice(0, 4);

    const matchedRFQs = rfqs
      .filter(r => 
        r.rfqNumber.toLowerCase().includes(q) || 
        r.title.toLowerCase().includes(q) || 
        r.status.toLowerCase().includes(q)
      )
      .slice(0, 4);

    return {
      products: matchedProducts,
      orders: matchedOrders,
      suppliers: matchedSuppliers,
      rfqs: matchedRFQs
    };
  }, [query, orders, rfqs]);

  if (!searchModalOpen) return null;

  const totalResults = 
    searchResults.products.length + 
    searchResults.orders.length + 
    searchResults.suppliers.length + 
    searchResults.rfqs.length;

  const handleSelect = (path: string) => {
    setSearchModalOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-blue-600 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, orders, suppliers, RFQs..."
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="text-center py-8 text-xs text-slate-400">
              Type keywords like <span className="font-semibold text-blue-600">"Dell"</span>, <span className="font-semibold text-blue-600">"Generator"</span>, <span className="font-semibold text-blue-600">"ORD-2025"</span>, or <span className="font-semibold text-blue-600">"Logistics"</span> to search across the procurement portal.
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="text-center py-8 text-xs text-slate-500">
              No results found for "<span className="font-semibold text-slate-700">{query}</span>"
            </div>
          )}

          {/* Products Section */}
          {searchResults.products.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Boxes className="w-3.5 h-3.5 text-blue-600" />
                <span>Products ({searchResults.products.length})</span>
              </div>
              <div className="space-y-1">
                {searchResults.products.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect(`/products/${p.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={sanitizeImageUrl(p.image)}
                        alt={p.name}
                        onError={handleImageError}
                        className="w-9 h-9 rounded object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900 group-hover:text-blue-600">{p.name}</h4>
                        <span className="text-[10px] text-slate-400">{p.sku} • {p.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{formatOMR(p.price)}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Section */}
          {searchResults.orders.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Package className="w-3.5 h-3.5 text-blue-600" />
                <span>Orders ({searchResults.orders.length})</span>
              </div>
              <div className="space-y-1">
                {searchResults.orders.map(o => (
                  <div
                    key={o.id}
                    onClick={() => handleSelect(`/orders/${o.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900 group-hover:text-blue-600">{o.orderNumber}</h4>
                      <span className="text-[10px] text-slate-400">{o.supplierName} • {o.orderDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{formatOMR(o.totalAmount)}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suppliers Section */}
          {searchResults.suppliers.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Users2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Suppliers ({searchResults.suppliers.length})</span>
              </div>
              <div className="space-y-1">
                {searchResults.suppliers.map(s => (
                  <div
                    key={s.id}
                    onClick={() => handleSelect(`/suppliers`)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900 group-hover:text-blue-600">{s.name}</h4>
                      <span className="text-[10px] text-slate-400">{s.category} • {s.location}</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-medium">★ {s.rating}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RFQs Section */}
          {searchResults.rfqs.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>RFQs ({searchResults.rfqs.length})</span>
              </div>
              <div className="space-y-1">
                {searchResults.rfqs.map(r => (
                  <div
                    key={r.id}
                    onClick={() => handleSelect(`/rfq`)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900 group-hover:text-blue-600">{r.rfqNumber}</h4>
                      <span className="text-[10px] text-slate-400">{r.title}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with mouse or keyboard</span>
          <span>Oman Vision 2040 Smart Procurement</span>
        </div>
      </div>
    </div>
  );
};
