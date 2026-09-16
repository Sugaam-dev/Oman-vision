import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Clock,
  ShieldCheck,
  Truck,
  Check,
  Search,
  Printer,
  Package
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useOrderStore } from '../../store/useOrderStore';
import { useAppStore } from '../../store/useAppStore';
import { initialProducts } from '../../data/products';
import { formatOMR } from '../../utils/currency';
import { Order } from '../../types/order';
import { handleImageError, sanitizeImageUrl } from '../../utils/imageHelper';

export const BulkOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, organization } = useAppStore();
  const {
    items: cartItems,
    addItem,
    updateQuantity,
    toggleItemSelection,
    removeItem,
    clearCart,
    getTotals
  } = useCartStore();

  const placeOrder = useOrderStore(state => state.placeOrder);

  // Workflow Steps: 1. Select Products -> 2. Review & Confirm -> 3. Place Order -> 4. Order Acknowledgement
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Shipping & Billing Details for Step 2/3
  const [shippingAddress, setShippingAddress] = useState('Central Warehouse, Sector 4, Ghala Industrial Area, Muscat');
  const [paymentTerms, setPaymentTerms] = useState('Net 30 Days (Standard Government Voucher)');
  const [deliveryNotes, setDeliveryNotes] = useState('Forklift offloading required on delivery site.');

  const categories = [
    'All Products',
    'IT & Electronics',
    'Office & Furniture',
    'Facility Management',
    'Safety & Security',
    'Industrial Equipment',
    'Logistics & Transport'
  ];

  // We ensure catalog products are present in the list so user can check/uncheck them like screenshot 1_4
  const displayItems = useMemo(() => {
    // Map existing products from catalog or cart
    return initialProducts.filter(p => {
      if (selectedCategory !== 'All Products' && p.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      }
      return true;
    }).map(product => {
      const existingCart = cartItems.find(item => item.productId === product.id);
      return {
        product,
        quantity: existingCart ? existingCart.quantity : 0,
        selected: existingCart ? existingCart.selected : false,
        subtotal: existingCart ? existingCart.quantity * product.price : 0
      };
    });
  }, [cartItems, selectedCategory, searchQuery]);

  // Dynamic totals from cart items that are selected
  const totals = getTotals();

  const handleToggleItem = (product: typeof initialProducts[0]) => {
    const existing = cartItems.find(i => i.productId === product.id);
    if (existing) {
      if (existing.quantity === 0) {
        updateQuantity(product.id, product.minOrderQuantity || 10);
      }
      toggleItemSelection(product.id);
    } else {
      addItem(product, product.minOrderQuantity || 10);
    }
  };

  const handleQuantityChange = (product: typeof initialProducts[0], newQty: number) => {
    const qty = Math.max(0, newQty);
    const existing = cartItems.find(i => i.productId === product.id);
    if (existing) {
      updateQuantity(product.id, qty);
    } else if (qty > 0) {
      addItem(product, qty);
    }
  };

  const handlePlaceOrder = () => {
    const selectedCartItems = cartItems.filter(i => i.selected && i.quantity > 0);
    if (selectedCartItems.length === 0) {
      showToast('Please select at least one product with quantity > 0', 'error');
      return;
    }

    const orderItems = selectedCartItems.map(item => ({
      id: 'oi-' + Date.now() + Math.random().toString(36).substring(2, 5),
      productId: item.product.id,
      productName: item.product.name,
      sku: item.product.sku,
      category: item.product.category,
      unitPrice: item.product.price,
      quantity: item.quantity,
      totalPrice: item.product.price * item.quantity,
      status: 'Processing' as const,
      image: item.product.image
    }));

    const newOrder = placeOrder({
      organization: organization.name,
      department: 'Procurement',
      orderType: 'Bulk Purchase',
      items: orderItems,
      subtotal: totals.subtotal,
      tax: totals.tax,
      totalAmount: totals.total,
      shippingAddress,
      paymentTerms
    });

    setCreatedOrder(newOrder);
    clearCart();
    setCurrentStep(4);
    showToast(`Order ${newOrder.orderNumber} placed successfully!`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Bulk Order</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Quick and easy ordering for standard bulk purchases.
          </p>
        </div>

        <button
          onClick={() => navigate('/rfq')}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-blue-600 bg-white hover:bg-blue-50 text-blue-600 shadow-2xs transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Switch to RFQ (For Custom Requirements)</span>
        </button>
      </div>

      {/* Stepper Wizard Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {[
            { step: 1, label: 'Select Products' },
            { step: 2, label: 'Review & Confirm' },
            { step: 3, label: 'Place Order' },
            { step: 4, label: 'Order Acknowledgement' },
          ].map((s, idx) => (
            <React.Fragment key={s.step}>
              <div
                onClick={() => {
                  if (currentStep !== 4) {
                    if (s.step <= currentStep) {
                      setCurrentStep(s.step);
                    } else if (cartItems.length > 0 && s.step <= 3) {
                      setCurrentStep(s.step);
                    } else if (cartItems.length === 0) {
                      showToast('Please select at least one product before proceeding.', 'info');
                    }
                  }
                }}
                className={`flex items-center gap-2.5 ${currentStep !== 4 ? 'cursor-pointer' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    currentStep === s.step
                      ? 'bg-blue-600 text-white shadow-xs'
                      : s.step < currentStep
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {s.step < currentStep ? <Check className="w-4 h-4" /> : s.step}
                </div>
                <span
                  className={`text-xs font-semibold hidden md:inline ${
                    currentStep === s.step ? 'text-blue-600' : s.step < currentStep ? 'text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>

              {idx < 3 && (
                <div className={`flex-1 h-0.5 mx-3 ${s.step < currentStep ? 'bg-emerald-500' : 'bg-slate-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* STEP 1: SELECT PRODUCTS */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Main Table Column (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Search and Excel Actions */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name, category or SKU..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => showToast('Simulated Excel import completed (3 items populated)', 'info')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                  <span>Import from Excel</span>
                </button>

                <button
                  onClick={() => showToast('Downloading Bulk Order Excel template (.xlsx)', 'info')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download Template</span>
                </button>
              </div>
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
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

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold text-[11px]">
                      <th className="py-3.5 px-4 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={totals.itemCount > 0 && totals.itemCount === cartItems.length}
                          onChange={(e) => useCartStore.getState().selectAll(e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 border-slate-300"
                        />
                      </th>
                      <th className="py-3.5 px-4">Product</th>
                      <th className="py-3.5 px-4">SKU</th>
                      <th className="py-3.5 px-4">Unit Price (OMR)</th>
                      <th className="py-3.5 px-4">Minimum Order</th>
                      <th className="py-3.5 px-4 w-32">Quantity</th>
                      <th className="py-3.5 px-4">Subtotal (OMR)</th>
                      <th className="py-3.5 px-4 w-10 text-center"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {displayItems.map(({ product, quantity, selected, subtotal }) => (
                      <tr
                        key={product.id}
                        className={`hover:bg-slate-50/70 transition-colors ${
                          selected && quantity > 0 ? 'bg-blue-50/20' : ''
                        }`}
                      >
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={selected && quantity > 0}
                            onChange={() => handleToggleItem(product)}
                            className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 border-slate-300 cursor-pointer"
                          />
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={sanitizeImageUrl(product.image)}
                              alt={product.name}
                              onError={handleImageError}
                              className="w-11 h-11 object-cover rounded-lg border border-slate-200 bg-white shrink-0"
                            />
                            <div className="min-w-0">
                              <h4 className="font-bold text-slate-900 text-xs truncate max-w-xs">{product.name}</h4>
                              <span className="text-[10px] text-slate-400">{product.category}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-mono text-slate-600 font-medium">
                          {product.sku}
                        </td>

                        <td className="py-3 px-4 font-bold text-slate-800">
                          {formatOMR(product.price)}
                        </td>

                        <td className="py-3 px-4 text-slate-600">
                          {product.minOrderQuantity}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center border border-slate-300 rounded-lg bg-white w-28">
                            <button
                              onClick={() => handleQuantityChange(product, quantity - 5)}
                              className="px-2 py-1 text-slate-500 hover:bg-slate-100 rounded-l cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <input
                              type="number"
                              min="0"
                              value={quantity}
                              onChange={(e) => handleQuantityChange(product, Number(e.target.value))}
                              className="w-full text-center text-xs font-bold text-slate-900 focus:outline-none"
                            />
                            <button
                              onClick={() => handleQuantityChange(product, quantity + 5)}
                              className="px-2 py-1 text-slate-500 hover:bg-slate-100 rounded-r cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-black text-slate-900">
                          {formatOMR(subtotal)}
                        </td>

                        <td className="py-3 px-4 text-center">
                          {quantity > 0 && (
                            <button
                              onClick={() => removeItem(product.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Custom Configuration Note matching screenshot bottom */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900">Need a custom configuration?</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  For customized requirements, volume discounts or special delivery terms, please use the Request for Quote (RFQ) process.
                </p>
                <button
                  onClick={() => navigate('/rfq')}
                  className="mt-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Go to RFQ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Summary Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Order Summary Card matching screenshot */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Items Selected</span>
                  <span className="font-bold text-slate-800">{totals.itemCount}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Total Quantity</span>
                  <span className="font-bold text-slate-800">{totals.totalQuantity}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal (OMR)</span>
                  <span className="font-bold text-slate-800">{formatOMR(totals.subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Estimated Tax (5%)</span>
                  <span className="font-bold text-slate-800">{formatOMR(totals.tax)}</span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Estimated Total</span>
                    <span className="text-[10px] text-slate-400">(Incl. VAT)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-black text-blue-600">
                      {formatOMR(totals.total)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (totals.itemCount === 0) {
                    showToast('Please select at least 1 product', 'warning');
                    return;
                  }
                  setCurrentStep(2);
                }}
                disabled={totals.itemCount === 0}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Proceed to Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bulk Order Benefits Card matching screenshot */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Bulk Order Benefits
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Streamlined purchasing</h4>
                    <p className="text-[11px] text-slate-500">Skip lengthy negotiations for standard items.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Preferred pricing</h4>
                    <p className="text-[11px] text-slate-500">Automatic bulk discounts applied for ministries.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Faster fulfillment</h4>
                    <p className="text-[11px] text-slate-500">Priority processing for government orders.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Full order tracking</h4>
                    <p className="text-[11px] text-slate-500">Real-time status updates until delivery in Oman.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Assistance Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Need Assistance?</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Contact our procurement support team for any custom questions.
                </p>
              </div>
              <button
                onClick={() => navigate('/help')}
                className="w-full py-2 px-3 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-semibold transition-colors cursor-pointer"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: REVIEW & CONFIRM */}
      {currentStep === 2 && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Step 2: Review Bulk Requisition</h2>
            <p className="text-xs text-slate-500 mt-0.5">Verify order line items and shipping parameters.</p>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                <tr>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Unit Price</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3 text-right">Total (OMR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cartItems.filter(i => i.selected && i.quantity > 0).map(item => (
                  <tr key={item.productId} className="bg-white">
                    <td className="p-3 font-semibold text-slate-800">{item.product.name}</td>
                    <td className="p-3 text-slate-500 font-mono">{item.product.sku}</td>
                    <td className="p-3">{formatOMR(item.product.price)}</td>
                    <td className="p-3 text-center font-bold">{item.quantity}</td>
                    <td className="p-3 text-right font-bold text-slate-900">
                      {formatOMR(item.product.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Shipping & Delivery inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Destination Address *</label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                rows={3}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Payment & Voucher Terms</label>
              <input
                type="text"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
              />
              <label className="block font-bold text-slate-700 mb-1">Logistics / Offloading Instructions</label>
              <input
                type="text"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Edit Items</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next: Confirm Authorization</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PLACE ORDER */}
      {currentStep === 3 && (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Step 3: Authorize & Place Purchase Order</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Confirm ministerial commitment under Oman Financial & Tender Regulations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-semibold text-slate-600">Procuring Organization</span>
              <span className="font-bold text-slate-900">{organization.name}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-semibold text-slate-600">Authorized Approver</span>
              <span className="font-bold text-slate-900">Ahmed Al Maskari (Procurement Manager)</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-semibold text-slate-600">Estimated Delivery Date</span>
              <span className="font-bold text-slate-900">30 Sep 2026</span>
            </div>
            <div className="flex items-center justify-between text-sm pt-1">
              <span className="font-bold text-slate-900">Total Purchase Commitment</span>
              <span className="font-black text-blue-600 text-base">{formatOMR(totals.total)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600 bg-amber-50 p-3 rounded-xl border border-amber-200">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              By clicking "Place Purchase Order", a valid government PO number will be minted and synchronized with vendor fulfillment systems in Oman.
            </span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handlePlaceOrder}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Place Purchase Order ({formatOMR(totals.total)})</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: ORDER ACKNOWLEDGEMENT */}
      {currentStep === 4 && createdOrder && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Purchase Order Successfully Placed
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              {createdOrder.orderNumber}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Your bulk order has been recorded in the central government procurement ledger and transmitted to suppliers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Order Number:</span>
              <span className="font-bold text-slate-900">{createdOrder.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Commitment:</span>
              <span className="font-bold text-slate-900">{formatOMR(createdOrder.totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Items:</span>
              <span className="font-bold text-slate-900">{createdOrder.items.length} Products</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Shipping Location:</span>
              <span className="font-semibold text-slate-800">{createdOrder.shippingAddress}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(`/orders/${createdOrder.id}`)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>Track Order Live</span>
            </button>

            <button
              onClick={() => navigate('/orders')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs cursor-pointer"
            >
              View My Orders List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
