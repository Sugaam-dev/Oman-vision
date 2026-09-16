import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Save,
  ArrowRight,
  ArrowLeft,
  Check,
  Search,
  Filter,
  Trash2,
  UploadCloud,
  Bot,
  Info,
  Calendar,
  Plus,
  Building,
  CheckCircle2
} from 'lucide-react';
import { useRFQStore } from '../../store/useRFQStore';
import { useAppStore } from '../../store/useAppStore';
import { initialProducts } from '../../data/products';
import { initialSuppliers } from '../../data/suppliers';
import { formatOMR } from '../../utils/currency';
import { StatusBadge } from '../../components/common/Badge';
import { handleImageError, sanitizeImageUrl } from '../../utils/imageHelper';

export const RFQPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, currentUser } = useAppStore();
  const {
    draft,
    setDraftStep,
    updateDraftField,
    addDraftItem,
    updateDraftItemQuantity,
    removeDraftItem,
    submitRFQ,
    saveDraftAsRFQ
  } = useRFQStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [selectedSupplierList, setSelectedSupplierList] = useState<string[]>(draft.selectedSuppliers);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);

  const categories = [
    'All Products',
    'IT & Electronics',
    'Office & Furniture',
    'Facility Management',
    'Safety & Security',
    'Industrial Equipment'
  ];

  // Estimated Total for draft items
  const estimatedTotal = draft.items.reduce((sum, item) => sum + item.estimatedSubtotal, 0);

  const filteredCatalogProducts = initialProducts.filter(p => {
    if (activeCategory !== 'All Products' && p.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }
    return true;
  });

  const handleSaveDraft = () => {
    saveDraftAsRFQ();
    showToast('Draft RFQ-2025-0008 saved successfully', 'success');
  };

  const handleSubmit = () => {
    if (draft.items.length === 0) {
      showToast('Please add at least 1 item to the RFQ', 'error');
      return;
    }
    const rfq = submitRFQ();
    setSubmissionSuccess(rfq);
    showToast(`RFQ ${rfq.rfqNumber} submitted to Tender Board & Vendors!`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row matching screenshot 1_3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Request for Quote (RFQ)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Get the best value through transparent and competitive quotations from our trusted suppliers.
          </p>
        </div>

        {!submissionSuccess && (
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4 text-blue-600" />
              <span>Save as Draft</span>
            </button>

            {draft.step < 4 ? (
              <button
                onClick={() => setDraftStep(draft.step + 1)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                <span>Next: {draft.step === 1 ? 'Additional Details' : draft.step === 2 ? 'Suppliers & Preferences' : 'Review & Submit'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                <span>Submit RFQ</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Stepper Wizard Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {[
            { step: 1, label: 'Select Products' },
            { step: 2, label: 'Additional Details' },
            { step: 3, label: 'Suppliers & Preferences' },
            { step: 4, label: 'Review & Submit' },
          ].map((s, idx) => (
            <React.Fragment key={s.step}>
              <div
                onClick={() => setDraftStep(s.step)}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    draft.step === s.step
                      ? 'bg-blue-600 text-white shadow-xs'
                      : s.step < draft.step
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {s.step < draft.step ? <Check className="w-4 h-4" /> : s.step}
                </div>
                <span
                  className={`text-xs font-semibold hidden md:inline ${
                    draft.step === s.step ? 'text-blue-600' : s.step < draft.step ? 'text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>

              {idx < 3 && (
                <div className={`flex-1 h-0.5 mx-3 ${s.step < draft.step ? 'bg-emerald-500' : 'bg-slate-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* SUCCESS CONFIRMATION MODAL/VIEW */}
      {submissionSuccess ? (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              RFQ Submitted Successfully
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              {submissionSuccess.rfqNumber}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Your Request for Quotation has been transmitted to verified suppliers. You will be notified as proposals are uploaded.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">RFQ Title:</span>
              <span className="font-bold text-slate-900">{submissionSuccess.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Total:</span>
              <span className="font-bold text-slate-900">{formatOMR(submissionSuccess.estimatedTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Required Delivery:</span>
              <span className="font-semibold text-slate-800">{submissionSuccess.requiredDeliveryDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Items:</span>
              <span className="font-semibold text-slate-800">{submissionSuccess.items.length} Products</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSubmissionSuccess(null);
                setDraftStep(1);
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
            >
              Create Another RFQ
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      ) : (
        /* MAIN WORKFLOW COLUMNS */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Main Left Content Area (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {/* STEP 1: Add Products Table */}
            {draft.step === 1 && (
              <>
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Add Products to RFQ</h3>

                  {/* Search and Filters */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products by name, category or keyword..."
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                      />
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer">
                      <Filter className="w-3.5 h-3.5" />
                      <span>Filters</span>
                    </button>
                  </div>

                  {/* Category Chips */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border cursor-pointer ${
                          activeCategory === cat
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Products Table */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold text-[11px]">
                          <th className="p-3 w-10 text-center">
                            <input type="checkbox" className="rounded text-blue-600 w-3.5 h-3.5 border-slate-300" />
                          </th>
                          <th className="p-3">Product</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Specification</th>
                          <th className="p-3 w-24">Est. Quantity</th>
                          <th className="p-3 w-16">Unit</th>
                          <th className="p-3 w-20 text-center">Action</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {filteredCatalogProducts.slice(0, 6).map(product => {
                          const isInRFQ = draft.items.some(i => i.productId === product.id);
                          const specSummary = Object.entries(product.specs).slice(0, 3).map(([k, v]) => `${k}: ${v}`).join(', ');

                          return (
                            <tr key={product.id} className="hover:bg-slate-50/70">
                              <td className="p-3 text-center">
                                <input
                                  type="checkbox"
                                  checked={isInRFQ}
                                  onChange={() => {
                                    if (isInRFQ) {
                                      const existing = draft.items.find(i => i.productId === product.id);
                                      if (existing) removeDraftItem(existing.id);
                                    } else {
                                      addDraftItem({
                                        productId: product.id,
                                        productName: product.name,
                                        category: product.category,
                                        estimatedUnitPrice: product.price,
                                        estimatedQuantity: 50
                                      });
                                    }
                                  }}
                                  className="rounded text-blue-600 w-3.5 h-3.5 border-slate-300 cursor-pointer"
                                />
                              </td>

                              <td className="p-3">
                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={sanitizeImageUrl(product.image)}
                                    alt={product.name}
                                    onError={handleImageError}
                                    className="w-9 h-9 object-cover rounded-lg border border-slate-200"
                                  />
                                  <span className="font-bold text-slate-900 text-xs truncate max-w-xs">{product.name}</span>
                                </div>
                              </td>

                              <td className="p-3 text-slate-500 font-medium">
                                {product.category}
                              </td>

                              <td className="p-3 text-slate-500 truncate max-w-xs" title={specSummary}>
                                {specSummary || 'Standard Tender Board Specs'}
                              </td>

                              <td className="p-3">
                                <input
                                  type="number"
                                  min="1"
                                  defaultValue="50"
                                  className="w-18 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-center text-xs font-bold text-slate-800"
                                />
                              </td>

                              <td className="p-3 text-slate-500">
                                Nos
                              </td>

                              <td className="p-3 text-center">
                                <button
                                  onClick={() => {
                                    addDraftItem({
                                      productId: product.id,
                                      productName: product.name,
                                      category: product.category,
                                      estimatedUnitPrice: product.price,
                                      estimatedQuantity: 50
                                    });
                                    showToast(`Added ${product.name} to RFQ`, 'success');
                                  }}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                                    isInRFQ
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'
                                  }`}
                                >
                                  {isInRFQ ? 'Added' : '+ Add'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Additional Information Form matching screenshot */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Additional Information</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Purpose of Request *
                      </label>
                      <select
                        value={draft.purpose}
                        onChange={(e) => updateDraftField('purpose', e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Standard Procurement">Standard Procurement</option>
                        <option value="Emergency Requisition">Emergency Requisition</option>
                        <option value="Annual Rate Contract">Annual Rate Contract</option>
                        <option value="Capital Infrastructure Upgrade">Capital Infrastructure Upgrade</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Project / Reference
                      </label>
                      <input
                        type="text"
                        placeholder="Enter project or reference number (optional)"
                        value={draft.projectReference}
                        onChange={(e) => updateDraftField('projectReference', e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Required Delivery Date *
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          value={draft.requiredDeliveryDate}
                          onChange={(e) => updateDraftField('requiredDeliveryDate', e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Notes to Suppliers
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Add any specific requirements, terms or conditions (e.g., warranty, installation, training, etc.)"
                        value={draft.notesToSuppliers}
                        onChange={(e) => updateDraftField('notesToSuppliers', e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-1 focus:ring-blue-500"
                      />
                      <span className="text-[10px] text-slate-400 float-right">0/500</span>
                    </div>
                  </div>

                  {/* Drag & Drop Attachments Box */}
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">
                      Attachments
                    </label>
                    <div
                      onClick={() => showToast('File attached: Technical_Specs_MOI.pdf (2.1 MB)', 'info')}
                      className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/20 transition-all"
                    >
                      <UploadCloud className="w-8 h-8 text-slate-400 hover:text-blue-600 mx-auto mb-2" />
                      <div className="text-xs font-semibold text-slate-700">
                        Drag & drop files here or <span className="text-blue-600 font-bold underline">Browse Files</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Supported formats: PDF, DOC, XLS, JPG (Max 10 MB each)
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* STEP 2: ADDITIONAL DETAILS */}
            {draft.step === 2 && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
                <h3 className="text-base font-bold text-slate-900">Step 2: Requisition Specifications & Timeline</h3>
                <p className="text-xs text-slate-500">Provide detailed project milestones and technical evaluation criteria.</p>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Project Worksite Governors & Site Address</label>
                    <input
                      type="text"
                      defaultValue="Muscat Governorate, Al Khuwair Central Complex"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">In-Country Value (ICV) Mandate</label>
                    <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <option>Tier 1: Minimum 20% Local Omani Content Required</option>
                      <option>Tier 2: Minimum 10% Local Content</option>
                      <option>Open International Tender</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Quotation Validity Period</label>
                    <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <option>60 Days from Bid Submission</option>
                      <option>90 Days</option>
                      <option>120 Days</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button onClick={() => setDraftStep(1)} className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold">
                    Back to Products
                  </button>
                  <button onClick={() => setDraftStep(3)} className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-bold">
                    Next: Select Suppliers
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SUPPLIERS & PREFERENCES */}
            {draft.step === 3 && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
                <h3 className="text-base font-bold text-slate-900">Step 3: Supplier Invitation & Auto-Match</h3>
                <p className="text-xs text-slate-500">
                  Select registered vendors to invite or enable automatic competitive tender dispatch.
                </p>

                <div className="space-y-3">
                  {initialSuppliers.slice(0, 5).map(sup => {
                    const isSelected = selectedSupplierList.includes(sup.id);
                    return (
                      <div
                        key={sup.id}
                        onClick={() => {
                          if (isSelected) setSelectedSupplierList(selectedSupplierList.filter(id => id !== sup.id));
                          else setSelectedSupplierList([...selectedSupplierList, sup.id]);
                        }}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{sup.name}</h4>
                            <span className="text-[10px] text-slate-400">{sup.category} • {sup.location}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-bold text-emerald-600">On-Time: {sup.onTimeDeliveryRate}%</span>
                          <span className="text-[10px] text-slate-400 block">Rating: ★ {sup.rating}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button onClick={() => setDraftStep(2)} className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold">
                    Back
                  </button>
                  <button onClick={() => setDraftStep(4)} className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-bold">
                    Next: Review & Submit
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & SUBMIT */}
            {draft.step === 4 && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
                <h3 className="text-base font-bold text-slate-900">Step 4: Final Requisition Review</h3>
                <p className="text-xs text-slate-500">
                  Review complete RFQ payload before broadcasting to suppliers under official ministerial seal.
                </p>

                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                  <div className="p-3 bg-slate-50 flex justify-between font-semibold text-slate-700">
                    <span>Item</span>
                    <span>Quantity</span>
                    <span>Estimated Subtotal</span>
                  </div>
                  {draft.items.map(item => (
                    <div key={item.id} className="p-3 flex justify-between items-center bg-white">
                      <div>
                        <span className="font-bold text-slate-900 block">{item.productName}</span>
                        <span className="text-[10px] text-slate-400">{item.specification}</span>
                      </div>
                      <span className="font-medium text-slate-700">{item.estimatedQuantity} {item.unit}</span>
                      <span className="font-bold text-slate-900">{formatOMR(item.estimatedSubtotal)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button onClick={() => setDraftStep(3)} className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold">
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Broadcast RFQ</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: RFQ Summary + Need Help + Tip (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* RFQ Summary Card matching screenshot */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-900">RFQ Summary</span>
                </div>
                <StatusBadge status="Draft" size="sm" />
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Created On</span>
                  <span className="font-semibold text-slate-800">18 Aug 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Created by</span>
                  <span className="font-semibold text-slate-800">Ahmed Al Maskari</span>
                </div>
              </div>

              {/* Items in Request List */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Items in Request ({draft.items.length})</span>
                  <button onClick={() => setDraftStep(1)} className="text-blue-600 text-[11px] hover:underline font-semibold">
                    Edit
                  </button>
                </div>

                <div className="space-y-2">
                  {draft.items.map(item => (
                    <div key={item.id} className="flex items-start justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2 min-w-0">
                        {item.image && (
                          <img
                            src={sanitizeImageUrl(item.image)}
                            alt={item.productName}
                            onError={handleImageError}
                            className="w-8 h-8 rounded object-cover border border-slate-200"
                          />
                        )}
                        <div className="min-w-0">
                          <h5 className="font-bold text-slate-800 text-[11px] truncate max-w-[140px]">{item.productName}</h5>
                          <span className="text-[10px] text-slate-400 block">
                            {item.estimatedQuantity} {item.unit} • {formatOMR(item.estimatedUnitPrice)} (Est.)
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeDraftItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimated Total */}
              <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Estimated Total</span>
                  <span className="text-[10px] text-slate-400">(Excl. VAT)</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-slate-900">
                    {formatOMR(estimatedTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Need Help? Card matching screenshot */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">Need Help?</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get assistance from our AI Assistant to find the right products or draft specifications.
              </p>
              <button
                onClick={() => navigate('/ai-assistant')}
                className="w-full py-2 px-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Ask AI Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tip Card matching screenshot */}
            <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-200/80 flex items-start gap-2.5 text-xs text-slate-600">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span className="font-bold text-blue-900">Tip: </span>
                You can invite specific suppliers or let our system auto-match the best suppliers in the next step.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
