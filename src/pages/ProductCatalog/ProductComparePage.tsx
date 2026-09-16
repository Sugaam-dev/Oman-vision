import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingCart, FileText, Plus, X, Check } from 'lucide-react';
import { useCompareStore } from '../../store/useCompareStore';
import { useCartStore } from '../../store/useCartStore';
import { useRFQStore } from '../../store/useRFQStore';
import { useAppStore } from '../../store/useAppStore';
import { formatOMR } from '../../utils/currency';
import { StatusBadge } from '../../components/common/Badge';
import { initialProducts } from '../../data/products';
import { Product } from '../../types/product';
import { handleImageError, sanitizeImageUrl } from '../../utils/imageHelper';

export const ProductComparePage: React.FC = () => {
  const navigate = useNavigate();
  const { products, removeProduct, clearCompare, addProduct } = useCompareStore();
  const addItemToCart = useCartStore(state => state.addItem);
  const addDraftItem = useRFQStore(state => state.addDraftItem);
  const { showToast } = useAppStore();

  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    addItemToCart(product, 1);
    showToast(`Added ${product.name} to cart`, 'success');
  };

  const handleRequestQuote = (product: Product) => {
    addDraftItem({
      productId: product.id,
      productName: product.name,
      category: product.category,
      estimatedUnitPrice: product.price,
      estimatedQuantity: 10
    });
    showToast(`Added ${product.name} to RFQ`, 'success');
    navigate('/rfq');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Product Catalog</span>
          </button>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Product Comparison</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Side-by-side technical evaluation and procurement pricing (up to 3 products).
          </p>
        </div>

        {products.length > 0 && (
          <div className="flex items-center gap-2.5">
            {products.length < 3 && (
              <button
                onClick={() => setAddModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            )}

            <button
              onClick={() => {
                clearCompare();
                showToast('Cleared comparison list', 'info');
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-slate-400" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No products selected for comparison</h3>
          <p className="text-xs text-slate-500">
            Browse the product catalog and click "Add to Compare" on any product to inspect specifications side-by-side.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs inline-flex items-center gap-2"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="p-4 w-48 font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                  Product Overview
                </th>
                {products.map((p) => (
                  <th key={p.id} className="p-4 w-72 min-w-64 align-top">
                    <div className="relative space-y-2">
                      <button
                        onClick={() => removeProduct(p.id)}
                        className="absolute -top-1 -right-1 text-slate-400 hover:text-rose-600 p-1 rounded-full hover:bg-slate-100"
                        title="Remove product"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <img
                        src={sanitizeImageUrl(p.image)}
                        alt={p.name}
                        onError={handleImageError}
                        className="w-full h-36 object-contain rounded-xl bg-white border border-slate-200 p-2"
                      />

                      <h4 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2">
                        {p.name}
                      </h4>

                      <div className="text-sm font-black text-slate-900">
                        {formatOMR(p.price)}
                      </div>

                      <div className="flex flex-col gap-1.5 pt-2">
                        <button
                          onClick={() => handleAddToCart(p)}
                          className="w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => handleRequestQuote(p)}
                          className="w-full py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Request Quote</span>
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Category</td>
                {products.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-slate-800">{p.category}</td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50">SKU</td>
                {products.map((p) => (
                  <td key={p.id} className="p-4 font-mono text-slate-600">{p.sku}</td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Availability</td>
                {products.map((p) => (
                  <td key={p.id} className="p-4">
                    <StatusBadge status={p.availability} size="sm" />
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Authorized Supplier</td>
                {products.map((p) => (
                  <td key={p.id} className="p-4 font-medium text-slate-800">
                    <div>{p.supplierName}</div>
                    <span className="text-[10px] text-emerald-600 font-semibold">
                      {p.isOmanSupplier ? 'Local SME / Oman Entity' : 'International Partner'}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Min Order Qty</td>
                {products.map((p) => (
                  <td key={p.id} className="p-4 text-slate-800">{p.minOrderQuantity} Units</td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Warranty Terms</td>
                {products.map((p) => (
                  <td key={p.id} className="p-4 font-medium text-slate-800">{p.warranty}</td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Certifications</td>
                {products.map((p) => (
                  <td key={p.id} className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {p.certifications.map(c => (
                        <span key={c} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-200">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Dynamic specs rows */}
              {['Processor', 'RAM', 'Storage', 'Display', 'Operating System', 'Lift Capacity', 'Prime Power', 'Cooling Capacity'].map(specTitle => {
                const hasAny = products.some(p => p.specs && p.specs[specTitle]);
                if (!hasAny) return null;

                return (
                  <tr key={specTitle}>
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">{specTitle}</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-4 text-slate-700">
                        {p.specs?.[specTitle] || '—'}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 w-full max-w-xl shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Select Product to Compare</h3>
              <button onClick={() => setAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-2">
              {initialProducts
                .filter(p => !products.some(cp => cp.id === p.id))
                .map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      addProduct(p);
                      setAddModalOpen(false);
                      showToast(`Added ${p.name} to comparison`, 'success');
                    }}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={sanitizeImageUrl(p.image)}
                        alt={p.name}
                        onError={handleImageError}
                        className="w-10 h-10 object-cover rounded-lg border border-slate-200"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                        <span className="text-[10px] text-slate-400">{p.sku} • {p.category}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-slate-900">{formatOMR(p.price)}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
