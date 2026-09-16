import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  Scale,
  ShoppingCart,
  FileText,
  Download,
  BookOpen,
  ShieldCheck,
  Building,
  CheckCircle2,
  Plus,
  Minus
} from 'lucide-react';
import { initialProducts } from '../../data/products';
import { formatOMR } from '../../utils/currency';
import { StatusBadge } from '../../components/common/Badge';
import { useCartStore } from '../../store/useCartStore';
import { useCompareStore } from '../../store/useCompareStore';
import { useAppStore } from '../../store/useAppStore';
import { useRFQStore } from '../../store/useRFQStore';
import { handleImageError, sanitizeImageUrl } from '../../utils/imageHelper';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const product = initialProducts.find(p => p.id === productId) || initialProducts[0];
  const { showToast } = useAppStore();
  const addItemToCart = useCartStore(state => state.addItem);
  const { addProduct: addToCompare, isComparing } = useCompareStore();
  const addDraftItem = useRFQStore(state => state.addDraftItem);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(sanitizeImageUrl(product.image));

  const handleAddToCart = () => {
    addItemToCart(product, quantity);
    showToast(`Added ${quantity}x "${product.name}" to Bulk Order Cart`, 'success');
  };

  const handleRequestQuote = () => {
    addDraftItem({
      productId: product.id,
      productName: product.name,
      category: product.category,
      estimatedUnitPrice: product.price,
      estimatedQuantity: quantity
    });
    showToast(`Added ${product.name} to RFQ draft`, 'success');
    navigate('/rfq');
  };

  return (
    <div className="space-y-6">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-xs text-slate-500">{product.category}</span>
        <span className="text-slate-300">/</span>
        <span className="text-xs font-bold text-slate-900 truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 6 cols: Gallery & Certifications */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex items-center justify-center">
            <img
              src={sanitizeImageUrl(selectedImage)}
              alt={product.name}
              onError={handleImageError}
              className="max-h-96 w-full object-contain rounded-xl"
            />
          </div>

          {product.thumbnails && (
            <div className="flex items-center gap-3">
              {product.thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(sanitizeImageUrl(thumb))}
                  className={`w-20 h-20 rounded-xl bg-white border p-1 overflow-hidden transition-all ${
                    selectedImage === thumb ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={sanitizeImageUrl(thumb)}
                    alt="thumb"
                    onError={handleImageError}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Supplier Info Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              <span>Supplier & Compliance</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Authorized Vendor</span>
                <span className="font-bold text-slate-800">{product.supplierName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">SME / Local Status</span>
                <span className="font-semibold text-emerald-600">
                  {product.isOmanSupplier ? 'Registered Omani Vendor' : 'International Partner'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Standard Warranty</span>
                <span className="font-semibold text-slate-800">{product.warranty}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Certifications</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {product.certifications.map(c => (
                    <span key={c} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-200">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 cols: Info, Pricing, Actions, Specs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  {product.category}
                </span>
                <StatusBadge status={product.availability} />
                <span className="text-xs text-slate-400">SKU: {product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Government Contract Price</span>
                <div className="text-2xl font-black text-slate-900">
                  {formatOMR(product.price)}
                </div>
                <span className="text-[11px] text-slate-400">Excluding 5% Value Added Tax</span>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Minimum Order</span>
                <span className="text-sm font-bold text-slate-800">{product.minOrderQuantity} Units</span>
                <span className="text-[11px] text-teal-600 block font-medium">Stock: {product.stock} available</span>
              </div>
            </div>

            {/* Quantity Selector & Action CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-300 rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-12 text-center text-sm font-bold text-slate-900 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add {quantity} to Bulk Order Cart</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleRequestQuote}
                  className="py-2.5 px-4 rounded-xl border border-blue-600 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request for Quote</span>
                </button>

                <button
                  onClick={() => addToCompare(product)}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Scale className="w-4 h-4 text-indigo-600" />
                  <span>{isComparing(product.id) ? 'Comparing' : 'Add to Compare'}</span>
                </button>
              </div>
            </div>

            {/* Specifications Detailed Table */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Detailed Technical Specifications</h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                {Object.entries(product.specs).map(([specKey, specVal]) => (
                  <div key={specKey} className="flex items-center justify-between px-4 py-2.5 bg-white">
                    <span className="text-slate-500 font-medium">{specKey}</span>
                    <span className="text-slate-900 font-semibold text-right">{specVal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
