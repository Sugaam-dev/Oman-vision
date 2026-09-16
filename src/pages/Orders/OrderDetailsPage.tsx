import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  RotateCcw,
  Download,
  ExternalLink,
  CheckCircle2,
  Truck,
  Clock,
  MapPin,
  Bot,
  FileText,
  MessageSquare,
  Edit2,
  Calendar,
  Building,
  Check,
  Package,
  Layers,
  Sparkles,
  Send,
  ShieldCheck,
  Eye,
  UploadCloud,
  Phone,
  User,
  AlertCircle,
  TrendingUp,
  Tag
} from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { useAppStore } from '../../store/useAppStore';
import { formatOMR } from '../../utils/currency';
import { StatusBadge } from '../../components/common/Badge';
import { handleImageError, sanitizeImageUrl } from '../../utils/imageHelper';

interface MockMessage {
  id: string;
  sender: string;
  role: string;
  time: string;
  avatarBg: string;
  content: string;
  isCurrentUser?: boolean;
}

export const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { getOrderById, advanceOrderStatus, reorder } = useOrderStore();
  const { showToast } = useAppStore();

  const order = getOrderById(orderId || 'ord-124') || useOrderStore.getState().orders[0];

  const defaultTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [printableModalOpen, setPrintableModalOpen] = useState(false);

  // Sync tab with URL search parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'items', 'tracking', 'documents', 'communications', 'rfq'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    navigate(`/orders/${order.id}?tab=${key}`, { replace: true });
  };

  // Communications tab state
  const [messages, setMessages] = useState<MockMessage[]>([
    {
      id: 'msg-1',
      sender: 'Salim Al-Harthy',
      role: 'Muscat Office Solutions • Account Manager',
      time: '14 Aug 2025, 11:30 AM',
      avatarBg: 'bg-blue-600',
      content: 'Purchase order received and validated. All line items are allocated at our central logistics hub for quality verification.',
      isCurrentUser: false
    },
    {
      id: 'msg-2',
      sender: 'Nasser Al-Kindi',
      role: 'Ministry Procurement Officer',
      time: '15 Aug 2025, 02:15 PM',
      avatarBg: 'bg-emerald-600',
      content: 'Please ensure that the 200 units of Safety Helmets (SS-HE-001) include the certified chin straps matching OS 142/2021 standards.',
      isCurrentUser: true
    },
    {
      id: 'msg-3',
      sender: 'Salim Al-Harthy',
      role: 'Muscat Office Solutions • Account Manager',
      time: '15 Aug 2025, 03:45 PM',
      avatarBg: 'bg-blue-600',
      content: 'Confirmed. Inspection certificate and OS compliance documents have been verified and uploaded under the Documents tab.',
      isCurrentUser: false
    },
    {
      id: 'msg-4',
      sender: 'Logistics Fleet Dispatch',
      role: 'Oman Logistics Highway • Carrier Dispatch',
      time: '16 Aug 2025, 08:30 AM',
      avatarBg: 'bg-purple-600',
      content: 'Consignment departed Muscat Central Depot on Vehicle #4829-OM. En route to regional hub with estimated arrival today.',
      isCurrentUser: false
    }
  ]);
  const [newMessageText, setNewMessageText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const newMsg: MockMessage = {
      id: `msg-${Date.now()}`,
      sender: 'Nasser Al-Kindi',
      role: 'Ministry Procurement Officer',
      time: 'Just now',
      avatarBg: 'bg-emerald-600',
      content: newMessageText.trim(),
      isCurrentUser: true
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessageText('');
    showToast('Message sent to supplier liaison and logistics fleet.', 'success');
  };

  const handleAdvanceStatus = () => {
    const updated = advanceOrderStatus(order.id);
    if (updated) {
      showToast(`Status advanced to "${updated.status}"!`, 'success');
    }
  };

  const handleReorder = () => {
    const newOrd = reorder(order.id);
    if (newOrd) {
      showToast(`Reordered successfully as ${newOrd.orderNumber}`, 'success');
      navigate(`/orders/${newOrd.id}`);
    }
  };

  const documentsList = [
    {
      id: 'doc-1',
      title: `Official Purchase Order (PO)`,
      filename: `PO-${order.orderNumber}.pdf`,
      type: 'Purchase Order',
      date: order.orderDate,
      size: '245 KB',
      status: 'Signed & Issued',
      isPrintable: true
    },
    {
      id: 'doc-2',
      title: `Oman Tax Authority (OTA) VAT Invoice`,
      filename: `TAX-INV-${order.orderNumber}.pdf`,
      type: 'Tax Invoice',
      date: order.orderDate,
      size: '310 KB',
      status: '5% VAT Validated',
      isPrintable: true
    },
    {
      id: 'doc-3',
      title: `Consignment Waybill & Delivery Manifest`,
      filename: `WAYBILL-OM-88294.pdf`,
      type: 'Waybill',
      date: '16 Aug 2025',
      size: '185 KB',
      status: 'In Transit Manifest',
      isPrintable: false
    },
    {
      id: 'doc-4',
      title: `In-Country Value (ICV) & Quality Certificate`,
      filename: `ICV-QC-2025-44.pdf`,
      type: 'Compliance Certificate',
      date: '15 Aug 2025',
      size: '420 KB',
      status: 'Standards Compliant',
      isPrintable: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Back link */}
      <div>
        <button
          onClick={() => navigate('/orders')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Orders</span>
        </button>
      </div>

      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {order.orderNumber}
            </h1>
            <StatusBadge status={order.status} size="md" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Placed on {order.orderDate} • {order.organization} • Contract: {order.contract}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleAdvanceStatus}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 shadow-2xs cursor-pointer transition-colors"
            title="Advance simulated workflow status"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Advance Status (Demo)</span>
          </button>

          <button
            onClick={handleReorder}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reorder</span>
          </button>

          <button
            onClick={() => setPrintableModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => handleTabChange('tracking')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg shadow-xs cursor-pointer transition-all ${
              activeTab === 'tracking'
                ? 'bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Track Live</span>
          </button>
        </div>
      </div>

      {/* Order Status Timeline Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs">
        <div className="grid grid-cols-5 gap-2 max-w-4xl mx-auto relative">
          {[
            { label: 'Order Confirmed', date: '13 Aug 2025', key: 'Confirmed' },
            { label: 'Procurement', date: '14 Aug 2025', key: 'Procurement' },
            { label: 'In Fulfillment', date: '16 Aug 2025', key: 'In Fulfillment' },
            { label: 'Out for Delivery', date: order.status === 'Out for Delivery' || order.status === 'Delivered' ? '18 Aug 2025' : '—', key: 'Out for Delivery' },
            { label: 'Delivered', date: order.status === 'Delivered' ? '20 Aug 2025' : '—', key: 'Delivered' },
          ].map((step, idx) => {
            const isCompleted = 
              order.status === 'Delivered' || 
              (order.status === 'Out for Delivery' && idx <= 3) ||
              (order.status === 'In Fulfillment' && idx <= 2) ||
              (order.status === 'Confirmed' && idx <= 1) ||
              (order.status === 'Processing' && idx === 0);

            const isCurrent = 
              (order.status === 'Delivered' && idx === 4) ||
              (order.status === 'Out for Delivery' && idx === 3) ||
              (order.status === 'In Fulfillment' && idx === 2) ||
              (order.status === 'Confirmed' && idx === 0);

            return (
              <div key={step.label} className="flex flex-col items-center text-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-xs ${
                    isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="w-5 h-5" />
                  ) : isCurrent ? (
                    <Truck className="w-5 h-5" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>

                <h4 className={`text-xs font-bold mt-2.5 ${isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                  {step.label}
                </h4>
                <span className="text-[10px] text-slate-400 mt-0.5">{step.date}</span>
              </div>
            );
          })}

          {/* Progress connecting lines */}
          <div className="absolute top-5 left-10 right-10 h-0.5 bg-slate-200 -z-0">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{
                width:
                  order.status === 'Delivered'
                    ? '100%'
                    : order.status === 'Out for Delivery'
                    ? '75%'
                    : order.status === 'In Fulfillment'
                    ? '50%'
                    : order.status === 'Confirmed'
                    ? '25%'
                    : '10%'
              }}
            />
          </div>
        </div>
      </div>

      {/* Tabs Row matching screenshot */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-bold text-slate-500 overflow-x-auto scrollbar-none">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'items', label: `Items (${order.items.length})` },
          { key: 'tracking', label: 'Tracking' },
          { key: 'documents', label: 'Documents (4)' },
          { key: 'communications', label: 'Communications' },
          { key: 'rfq', label: 'Related RFQs' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW (Unified High-Level View) */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs">
                <span className="text-[11px] text-slate-400 block font-medium">Total Commitment</span>
                <span className="text-base font-black text-slate-900">{formatOMR(order.totalAmount)}</span>
                <span className="text-[10px] text-emerald-600 block font-semibold mt-0.5">Includes 5% Oman VAT</span>
              </div>

              <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs">
                <span className="text-[11px] text-slate-400 block font-medium">Fulfillment Status</span>
                <div className="mt-1">
                  <StatusBadge status={order.status} size="sm" />
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">Via {order.supplierName}</span>
              </div>

              <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400 block font-medium">Estimated Arrival</span>
                <span className="text-base font-black text-blue-600">{order.expectedDelivery}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Sohar Depot En Route</span>
              </div>
            </div>

            {/* Order Items Summary Table */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Order Items ({order.items.length})
                </h3>
                <button
                  onClick={() => handleTabChange('items')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  View full items breakdown →
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px]">
                    <tr>
                      <th className="p-3 w-8 text-center">#</th>
                      <th className="p-3">Product</th>
                      <th className="p-3">SKU</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3">Unit Price (OMR)</th>
                      <th className="p-3">Total (OMR)</th>
                      <th className="p-3 text-right">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {order.items.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50/70">
                        <td className="p-3 text-center font-bold text-slate-400">{idx + 1}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={sanitizeImageUrl(item.image)}
                              alt={item.productName}
                              onError={handleImageError}
                              className="w-8 h-8 rounded object-cover border border-slate-200"
                            />
                            <span className="font-bold text-slate-900 text-xs">{item.productName}</span>
                          </div>
                        </td>
                        <td className="p-3 font-mono text-slate-500">{item.sku}</td>
                        <td className="p-3 text-center font-bold text-slate-800">{item.quantity}</td>
                        <td className="p-3 font-medium text-slate-700">{formatOMR(item.unitPrice)}</td>
                        <td className="p-3 font-black text-slate-900">{formatOMR(item.totalPrice)}</td>
                        <td className="p-3 text-right">
                          <StatusBadge status={item.status} size="sm" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Logistics Route Snapshot */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Live Logistics Snapshot</h3>
                  <span className="text-[11px] text-slate-500">Route 1: Muscat Capital → Al Batinah Regional Hub</span>
                </div>
                <button
                  onClick={() => handleTabChange('tracking')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 cursor-pointer"
                >
                  Full Tracking Map →
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Currently In Transit (Sohar Hub)</span>
                    <span className="text-[11px] text-slate-500">Oman Logistics Highway • Vehicle Unit #4829</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-medium">Estimated Arrival</span>
                  <span className="text-xs font-bold text-slate-900">{order.expectedDelivery}</span>
                </div>
              </div>
            </div>

            {/* AI Helper Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-5 h-5 text-teal-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Need an update on your order?</h4>
                  <p className="text-xs text-slate-600">
                    Ask our AI Assistant for real-time status, estimated delivery, or document details.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/ai-assistant')}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI Assistant</span>
              </button>
            </div>
          </div>

          {/* Right Column: Order Details + Activity Log (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Order Details Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Order Details
                </h3>
                <button
                  onClick={() => showToast('Editing order parameters', 'info')}
                  className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Order Number</span>
                  <span className="font-bold text-slate-900">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Order Type</span>
                  <span className="font-semibold text-slate-800">{order.orderType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Organization</span>
                  <span className="font-semibold text-slate-800">{order.organization}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contract</span>
                  <span className="font-semibold text-slate-800">{order.contract}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Order Date</span>
                  <span className="font-semibold text-slate-800">{order.orderDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Requested Delivery</span>
                  <span className="font-semibold text-slate-800">{order.expectedDelivery}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Ship To</span>
                  <span className="font-medium text-slate-800">{order.shippingAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment Terms</span>
                  <span className="font-semibold text-slate-800">{order.paymentTerms}</span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Total Amount</span>
                    <span className="text-[10px] text-slate-400">(Incl. 5% VAT)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">
                      {formatOMR(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Log Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Activity Log
                </h3>
                <span className="text-xs text-blue-600 font-semibold cursor-pointer">View All</span>
              </div>

              <div className="space-y-3">
                {order.activities.map((act) => (
                  <div key={act.id} className="flex items-start gap-2.5 text-xs">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-slate-400 block">{act.timestamp}</span>
                      <h5 className="font-bold text-slate-900 leading-tight">{act.title}</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{act.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ITEMS (Dedicated Detailed Items View) */}
      {/* ========================================================================= */}
      {activeTab === 'items' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Purchased Items ({order.items.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Full technical line items, unit contract pricing, and fulfillment state for each line.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">
                  Subtotal: <strong className="text-slate-900 font-bold">{formatOMR(order.subtotal)}</strong>
                </span>
                <span className="text-xs text-slate-500">
                  VAT (5%): <strong className="text-slate-900 font-bold">{formatOMR(order.tax)}</strong>
                </span>
                <span className="text-xs text-blue-600 font-black bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                  Total: {formatOMR(order.totalAmount)}
                </span>
              </div>
            </div>

            {/* Complete Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[11px]">
                  <tr>
                    <th className="p-3.5 w-10 text-center">#</th>
                    <th className="p-3.5">Product & Description</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">SKU</th>
                    <th className="p-3.5 text-center">Quantity</th>
                    <th className="p-3.5">Unit Price (OMR)</th>
                    <th className="p-3.5">Total (OMR)</th>
                    <th className="p-3.5 text-center">Line Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {order.items.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 text-center font-bold text-slate-400">{idx + 1}</td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={sanitizeImageUrl(item.image)}
                            alt={item.productName}
                            onError={handleImageError}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-50"
                          />
                          <div>
                            <span className="font-bold text-slate-900 text-xs block hover:text-blue-600">
                              {item.productName}
                            </span>
                            <span className="text-[11px] text-slate-400 block font-mono mt-0.5">
                              {item.sku}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-slate-600">{item.sku}</td>
                      <td className="p-3.5 text-center font-black text-slate-900 text-sm">
                        {item.quantity}
                      </td>
                      <td className="p-3.5 font-semibold text-slate-700">
                        {formatOMR(item.unitPrice)}
                      </td>
                      <td className="p-3.5 font-black text-slate-900 text-sm">
                        {formatOMR(item.totalPrice)}
                      </td>
                      <td className="p-3.5 text-center">
                        <StatusBadge status={item.status} size="sm" />
                      </td>
                      <td className="p-3.5 text-right">
                        <Link
                          to={`/products/${item.productId}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                        >
                          <span>View Product</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Detailed Cards for Each Product */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={sanitizeImageUrl(item.image)}
                      alt={item.productName}
                      onError={handleImageError}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0 bg-white"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{item.productName}</h4>
                      <span className="text-[10px] text-slate-400">{item.category} • {item.sku}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs pt-1 border-t border-slate-200/70">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Order Quantity:</span>
                      <span className="font-bold text-slate-800">{item.quantity} Units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Contract Price:</span>
                      <span className="font-semibold text-slate-800">{formatOMR(item.unitPrice)} / unit</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Commitment:</span>
                      <span className="font-black text-slate-900">{formatOMR(item.totalPrice)}</span>
                    </div>
                  </div>

                  <Link
                    to={`/products/${item.productId}`}
                    className="block text-center py-2 text-xs font-semibold text-blue-600 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors"
                  >
                    View Catalog Specifications
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: TRACKING (Dedicated Full Tracking Interface matching screenshot) */}
      {/* ========================================================================= */}
      {activeTab === 'tracking' && (
        <div className="space-y-5">
          {/* Header Banner for Live Shipment Tracking */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">Shipment Tracking & Telematics</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live GPS
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Waybill Number: <span className="font-mono font-bold text-slate-700">WAYBILL-OM-882941</span> • Carrier: <span className="font-semibold text-blue-600">Oman Logistics Highway Fleet</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                  Oman Logistics Highway
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Driver: Khamis Al-Harthy (+968 9123 4567)
                </span>
              </div>
            </div>

            {/* Map Illustration & Milestones Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Map Illustration (7 cols) */}
              <div className="md:col-span-7 bg-[#EEF4FF] rounded-2xl p-5 border border-blue-100 relative min-h-72 flex flex-col justify-between overflow-hidden">
                {/* Delivery Date Tag */}
                <div className="self-end bg-white rounded-xl p-2.5 border border-blue-200 shadow-xs flex items-center gap-2.5 text-xs">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-[10px] text-slate-400 block leading-tight">Estimated Delivery</span>
                    <span className="font-bold text-slate-900">{order.expectedDelivery}</span>
                  </div>
                </div>

                {/* SVG Visual Road Path Muscat -> Sohar -> Nizwa */}
                <div className="relative my-6 flex items-center justify-between px-6">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M 60 40 Q 150 15 240 50 T 360 80"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3"
                      strokeDasharray="6 4"
                    />
                  </svg>

                  {/* Node 1: Muscat */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-6 h-6 rounded-full bg-blue-600 ring-4 ring-blue-200 flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-xs font-bold text-slate-900 mt-1">Muscat</span>
                    <span className="text-[9px] text-slate-500">(Warehouse)</span>
                  </div>

                  {/* Node 2: Sohar (In Transit) */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white shadow-md flex items-center justify-center animate-bounce">
                      <Truck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 mt-1">Sohar</span>
                    <span className="text-[9px] text-blue-600 font-semibold">(In Transit)</span>
                  </div>

                  {/* Node 3: Nizwa (Next Stop) */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-6 h-6 rounded-full bg-slate-300 ring-4 ring-slate-100 flex items-center justify-center text-slate-600 text-[10px]">
                      •
                    </div>
                    <span className="text-xs font-bold text-slate-900 mt-1">Nizwa</span>
                    <span className="text-[9px] text-slate-500">(Next Stop)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-2 border-t border-blue-200/50">
                  <span>Route: Muscat Capital → Al Batinah North → Al Dakhiliyah</span>
                  <span className="text-blue-700 font-bold">Speed: 74 km/h • Temp: 21°C</span>
                </div>
              </div>

              {/* Milestones Checklist (5 cols) */}
              <div className="md:col-span-5 space-y-3.5 text-xs bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Delivery Milestones
                </h4>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-900">Order Processed</h5>
                    <span className="text-[10px] text-slate-400">14 Aug 2025, 10:15 AM</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-900">Packed at Warehouse (Muscat)</h5>
                    <span className="text-[10px] text-slate-400">15 Aug 2025, 04:30 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold">
                    ✓
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-600">In Transit (Sohar)</h5>
                    <span className="text-[10px] text-slate-400">16 Aug 2025, 09:20 AM</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 opacity-50">
                  <Truck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-700">Out for Delivery to Delivery Site</h5>
                    <span className="text-[10px] text-slate-400">Scheduled: {order.expectedDelivery}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 opacity-50">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-700">Delivered & Site Sign-off</h5>
                    <span className="text-[10px] text-slate-400">Pending final arrival</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Instructions & Driver Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1 text-xs">
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Site Delivery Instructions</span>
                <p className="font-medium text-slate-800">
                  Forklift offloading required on delivery site. Deliver directly to Gate 4, Muscat Logistics Central Depots.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1 text-xs">
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Carrier Telematics</span>
                <p className="font-medium text-slate-800">
                  Vehicle: <strong className="text-slate-900">Scania R450 Heavy Carrier</strong> • Seal: <strong className="text-slate-900 font-mono">SEAL-OM-9921-OK</strong> • Driver: Khamis Al-Harthy
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: DOCUMENTS (4 Documents View) */}
      {/* ========================================================================= */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Official Procurement Documents (4)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Download official Purchase Orders, OTA tax invoices, carrier waybills, and ICV compliance certificates.
                </p>
              </div>

              <button
                onClick={() => showToast('Attach document feature: Select file to upload.', 'info')}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-2xs cursor-pointer"
              >
                <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
                <span>Upload Document / Receipt</span>
              </button>
            </div>

            {/* Grid of 4 Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentsList.map((doc) => (
                <div key={doc.id} className="p-5 rounded-xl border border-slate-200 hover:border-blue-300 transition-all bg-white shadow-2xs flex flex-col justify-between space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {doc.type}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          {doc.status}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm mt-1 leading-snug">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {doc.filename} • {doc.size}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">Issued: {doc.date}</span>

                    <div className="flex items-center gap-2">
                      {doc.isPrintable && (
                        <button
                          onClick={() => setPrintableModalOpen(true)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>
                      )}

                      <button
                        onClick={() => showToast(`Downloading ${doc.filename}...`, 'success')}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Compliance Guarantee */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center gap-3 text-xs text-blue-900">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <span>
                All purchase orders and tax invoices generated on this platform are compliant with Sultanate of Oman Royal Decree 84/2020 procurement regulations and Zakat, Tax and Customs Authority requirements.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: COMMUNICATIONS (Messages Thread) */}
      {/* ========================================================================= */}
      {activeTab === 'communications' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Order Communications Log
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct coordination with vendor liaison Salim Al-Harthy and logistics transport officers.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active Coordination Channel
              </span>
            </div>

            {/* Message Thread */}
            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 text-xs ${
                    msg.isCurrentUser ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${msg.avatarBg} text-white font-bold flex items-center justify-center shrink-0 text-[11px]`}>
                    {msg.sender.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div
                    className={`max-w-xl rounded-2xl p-4 shadow-2xs space-y-1.5 ${
                      msg.isCurrentUser
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 text-[10px]">
                      <span className={`font-bold ${msg.isCurrentUser ? 'text-blue-100' : 'text-slate-900'}`}>
                        {msg.sender}
                      </span>
                      <span className={msg.isCurrentUser ? 'text-blue-200' : 'text-slate-400'}>
                        {msg.time}
                      </span>
                    </div>
                    <span className={`text-[10px] block ${msg.isCurrentUser ? 'text-blue-200' : 'text-slate-500'}`}>
                      {msg.role}
                    </span>
                    <p className="text-xs leading-relaxed pt-1">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Message Input */}
            <form onSubmit={handleSendMessage} className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
                <span className="font-semibold text-slate-400 text-[11px]">Quick Templates:</span>
                <button
                  type="button"
                  onClick={() => setNewMessageText('Please provide an updated ETA for Gate 4 offloading.')}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] cursor-pointer"
                >
                  ETA Update
                </button>
                <button
                  type="button"
                  onClick={() => setNewMessageText('Inspection team is on-site and ready to receive consignment.')}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] cursor-pointer"
                >
                  Inspection Team Ready
                </button>
                <button
                  type="button"
                  onClick={() => setNewMessageText('Please send updated electronic packing list with serial numbers.')}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] cursor-pointer"
                >
                  Packing List Request
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  placeholder="Type an official message or instruction to supplier liaison..."
                  className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: RELATED RFQS (Linked Tenders & Quotes) */}
      {/* ========================================================================= */}
      {activeTab === 'rfq' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Related RFQ & Tendering History
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Originating competitive quotations and evaluation scores for order {order.orderNumber}.
                </p>
              </div>

              <button
                onClick={() => navigate('/rfq')}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
              >
                <span>Open RFQ Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Linked RFQ Card */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                    Awarded Tender Reference
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-0.5">
                    RFQ-2025-0008: Annual Workplace & IT Equipment Supply
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Tender Board Reference: TB-2025-INF-099 • Closed: 12 Aug 2025
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                  Tender Awarded
                </span>
              </div>

              {/* Vendor Competitive Quotations Matrix */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-2.5">
                  Competitive Quotations Evaluated:
                </h4>

                <div className="overflow-x-auto border border-blue-200/80 rounded-xl bg-white">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[11px]">
                      <tr>
                        <th className="p-3">Vendor / Supplier</th>
                        <th className="p-3">Total Bid Quote</th>
                        <th className="p-3 text-center">In-Country Value (ICV)</th>
                        <th className="p-3 text-center">Technical Score</th>
                        <th className="p-3 text-right">Tender Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="bg-emerald-50/40 font-medium">
                        <td className="p-3 font-bold text-slate-900">
                          {order.supplierName} (Awarded)
                        </td>
                        <td className="p-3 font-black text-slate-900">
                          {formatOMR(order.totalAmount)}
                        </td>
                        <td className="p-3 text-center text-emerald-700 font-bold">
                          68% (Riyada Tier 1)
                        </td>
                        <td className="p-3 text-center font-bold text-slate-800">
                          94.2 / 100
                        </td>
                        <td className="p-3 text-right">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Awarded Order
                          </span>
                        </td>
                      </tr>
                      <tr className="text-slate-600">
                        <td className="p-3">Gulf Commercial Partners LLC</td>
                        <td className="p-3 font-semibold">{formatOMR(order.totalAmount * 1.08)}</td>
                        <td className="p-3 text-center">54%</td>
                        <td className="p-3 text-center">88.0 / 100</td>
                        <td className="p-3 text-right">
                          <span className="text-[10px] text-slate-400 font-medium">Alternative Bid</span>
                        </td>
                      </tr>
                      <tr className="text-slate-600">
                        <td className="p-3">Al-Batinah National Supplies</td>
                        <td className="p-3 font-semibold">{formatOMR(order.totalAmount * 1.14)}</td>
                        <td className="p-3 text-center">61%</td>
                        <td className="p-3 text-center">82.5 / 100</td>
                        <td className="p-3 text-right">
                          <span className="text-[10px] text-slate-400 font-medium">Rejected</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Printable Invoice / PDF Preview Modal */}
      {printableModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 w-full max-w-2xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Official Purchase Order</h3>
                <span className="text-xs text-slate-500">Sultanate of Oman • Ministry of Infrastructure</span>
              </div>
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                {order.orderNumber}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold">SUPPLIER:</span>
                <span className="font-bold text-slate-900">{order.supplierName}</span>
                <span className="text-slate-500 block">Sultanate of Oman</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">SHIP TO:</span>
                <span className="font-bold text-slate-900">{order.shippingAddress}</span>
              </div>
            </div>

            <table className="w-full text-xs text-left border-collapse border border-slate-200">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="p-2">Item</th>
                  <th className="p-2 text-center">Qty</th>
                  <th className="p-2 text-right">Unit Price</th>
                  <th className="p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td className="p-2">{item.productName}</td>
                    <td className="p-2 text-center">{item.quantity}</td>
                    <td className="p-2 text-right">{formatOMR(item.unitPrice)}</td>
                    <td className="p-2 text-right font-bold">{formatOMR(item.totalPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right text-xs space-y-1">
              <div>Subtotal: <span className="font-bold">{formatOMR(order.subtotal)}</span></div>
              <div>Oman VAT (5%): <span className="font-bold">{formatOMR(order.tax)}</span></div>
              <div className="text-sm font-black text-slate-900">Total Commitment: {formatOMR(order.totalAmount)}</div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setPrintableModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  setPrintableModalOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold cursor-pointer"
              >
                Print / Save Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
