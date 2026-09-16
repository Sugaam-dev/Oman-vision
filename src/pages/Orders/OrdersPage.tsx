import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Search,
  Filter,
  Eye,
  Truck,
  RotateCcw,
  FileDown,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { useAppStore } from '../../store/useAppStore';
import { formatOMR } from '../../utils/currency';
import { StatusBadge } from '../../components/common/Badge';
import { Pagination } from '../../components/common/Pagination';
import { OrderStatus } from '../../types/order';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders, reorder } = useOrderStore();
  const { showToast } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const statuses: (string | OrderStatus)[] = [
    'All',
    'Processing',
    'Confirmed',
    'In Fulfillment',
    'Out for Delivery',
    'Delivered',
    'Cancelled'
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (statusFilter !== 'All' && o.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          o.orderNumber.toLowerCase().includes(q) ||
          o.supplierName.toLowerCase().includes(q) ||
          o.organization.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleReorder = (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newOrd = reorder(orderId);
    if (newOrd) {
      showToast(`Reordered successfully as ${newOrd.orderNumber}`, 'success');
      navigate(`/orders/${newOrd.id}`);
    }
  };

  const handleDownloadPDF = (orderNumber: string, e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(`Generating and downloading PDF for ${orderNumber}...`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">My Orders</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor and track ministerial purchasing orders, delivery manifests, and fulfillment SLAs.
          </p>
        </div>

        <button
          onClick={() => navigate('/bulk-order')}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Bulk Order</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order #, Supplier, or keyword..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                statusFilter === status
                  ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold text-[11px]">
                <th className="py-3.5 px-4">Order Number</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Expected Delivery</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-xs text-slate-400">
                    No orders found matching the criteria.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-blue-600 hover:underline">
                        {order.orderNumber}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      {order.orderDate}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {order.supplierName}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </td>

                    <td className="py-3.5 px-4 font-black text-slate-900">
                      {formatOMR(order.totalAmount)}
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={order.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      {order.expectedDelivery}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => navigate(`/orders/${order.id}`)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 rounded-md hover:bg-slate-100"
                          title="View Order Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => navigate(`/orders/${order.id}?tab=tracking`)}
                          className="p-1.5 text-slate-500 hover:text-amber-600 rounded-md hover:bg-slate-100"
                          title="Track Live Shipment"
                        >
                          <Truck className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={(e) => handleDownloadPDF(order.orderNumber, e)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 rounded-md hover:bg-slate-100"
                          title="Download PDF"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={(e) => handleReorder(order.id, e)}
                          className="p-1.5 text-slate-500 hover:text-emerald-600 rounded-md hover:bg-slate-100"
                          title="Reorder"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredOrders.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredOrders.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        )}
      </div>
    </div>
  );
};
