import { create } from 'zustand';
import { Order, OrderStatus, OrderActivity } from '../types/order';
import { initialOrders } from '../data/orders';
import { storage } from '../utils/storage';
import { formatDate } from '../utils/date';
import { sanitizeImageUrl } from '../utils/imageHelper';

interface OrderState {
  orders: Order[];
  
  // Actions
  placeOrder: (orderData: Partial<Order>) => Order;
  advanceOrderStatus: (orderId: string) => Order | null;
  getOrderById: (orderId: string) => Order | undefined;
  reorder: (orderId: string) => Order | null;
}

const statusProgression: OrderStatus[] = [
  'Processing',
  'Confirmed',
  'In Fulfillment',
  'Out for Delivery',
  'Delivered'
];

export const useOrderStore = create<OrderState>((set, get) => {
  const rawSaved = storage.get<Order[]>('orders_list', initialOrders);
  const saved = rawSaved.map(o => ({
    ...o,
    items: o.items.map(it => ({
      ...it,
      image: sanitizeImageUrl(it.image)
    }))
  }));

  return {
    orders: saved,

    getOrderById: (orderId: string) => {
      const all = get().orders;
      return all.find(o => o.id === orderId || o.orderNumber.toLowerCase() === orderId.toLowerCase());
    },

    placeOrder: (orderData) => {
      const all = get().orders;
      const nextNum = 125 + (all.length - initialOrders.length);
      const orderNumber = `ORD-2026-00${nextNum}`;
      const todayStr = new Date().toISOString().split('T')[0];
      const todayFormatted = formatDate(new Date());

      const newOrder: Order = {
        id: `ord-${nextNum}`,
        orderNumber,
        orderDate: todayStr,
        expectedDelivery: '2026-09-30',
        organization: orderData.organization || 'Ministry of Infrastructure',
        department: orderData.department || 'Procurement',
        contract: `GOV-2026-${Math.floor(Math.random() * 80 + 20)}`,
        orderType: orderData.orderType || 'Standard Order',
        status: 'Processing',
        supplierId: orderData.supplierId || 'sup-1',
        supplierName: orderData.supplierName || 'Oman Logistics Solutions',
        items: (orderData.items || []).map(it => ({ ...it, image: sanitizeImageUrl(it.image) })),
        subtotal: orderData.subtotal || 0,
        tax: orderData.tax || 0,
        totalAmount: orderData.totalAmount || 0,
        shippingAddress: orderData.shippingAddress || 'Central Warehouse, Ghala, Muscat',
        paymentTerms: orderData.paymentTerms || 'Net 30 Days',
        trackingCity: 'Muscat',
        trackingEstimatedDate: '30 Sep 2026',
        timeline: [
          { status: 'Processing', label: 'Order Placed', date: todayFormatted, completed: true, current: true },
          { status: 'Confirmed', label: 'Order Confirmed', completed: false, current: false },
          { status: 'In Fulfillment', label: 'In Fulfillment', completed: false, current: false },
          { status: 'Out for Delivery', label: 'Out for Delivery', completed: false, current: false },
          { status: 'Delivered', label: 'Delivered', completed: false, current: false }
        ],
        activities: [
          {
            id: 'act-' + Date.now(),
            timestamp: `${todayFormatted}, 10:00 AM`,
            title: 'Order placed',
            description: `Order ${orderNumber} created in portal by Ahmed Al Maskari`,
            iconType: 'create'
          }
        ]
      };

      const updated = [newOrder, ...all];
      storage.set('orders_list', updated);
      set({ orders: updated });
      return newOrder;
    },

    advanceOrderStatus: (orderId: string) => {
      const all = get().orders;
      const orderIndex = all.findIndex(o => o.id === orderId || o.orderNumber === orderId);
      if (orderIndex === -1) return null;

      const order = all[orderIndex];
      const currentIndex = statusProgression.indexOf(order.status);
      if (currentIndex === -1 || currentIndex >= statusProgression.length - 1) {
        return order; // Already delivered or cannot advance
      }

      const nextStatus = statusProgression[currentIndex + 1];
      const nowFormatted = formatDate(new Date());

      const nextCityMap: Record<OrderStatus, 'Muscat' | 'Sohar' | 'Nizwa' | 'Salalah' | 'Duqm'> = {
        'Processing': 'Muscat',
        'Confirmed': 'Muscat',
        'In Fulfillment': 'Sohar',
        'Out for Delivery': 'Nizwa',
        'Delivered': 'Nizwa',
        'Cancelled': 'Muscat'
      };

      const activityMap: Record<OrderStatus, OrderActivity> = {
        'Processing': { id: 'act-' + Date.now(), timestamp: nowFormatted, title: 'Order processing', description: 'Requisition entered into system', iconType: 'process' },
        'Confirmed': { id: 'act-' + Date.now(), timestamp: nowFormatted, title: 'Order confirmed', description: 'Purchase order approved by procurement committee', iconType: 'confirm' },
        'In Fulfillment': { id: 'act-' + Date.now(), timestamp: nowFormatted, title: 'In Fulfillment', description: 'Packed at Muscat central warehouse and manifest generated', iconType: 'pack' },
        'Out for Delivery': { id: 'act-' + Date.now(), timestamp: nowFormatted, title: 'Out for Delivery', description: 'Departed regional depot on route to destination site', iconType: 'transit' },
        'Delivered': { id: 'act-' + Date.now(), timestamp: nowFormatted, title: 'Delivered & Accepted', description: 'Inspected and signed for by receiver', iconType: 'deliver' },
        'Cancelled': { id: 'act-' + Date.now(), timestamp: nowFormatted, title: 'Cancelled', description: 'Cancelled by administrator', iconType: 'process' }
      };

      const updatedTimeline = order.timeline.map(t => {
        if (t.status === nextStatus) {
          return { ...t, completed: true, current: true, date: nowFormatted };
        }
        if (statusProgression.indexOf(t.status) < statusProgression.indexOf(nextStatus)) {
          return { ...t, completed: true, current: false };
        }
        return { ...t, current: false };
      });

      const updatedOrder: Order = {
        ...order,
        status: nextStatus,
        trackingCity: nextCityMap[nextStatus],
        timeline: updatedTimeline,
        activities: [activityMap[nextStatus], ...order.activities]
      };

      const updatedOrders = [...all];
      updatedOrders[orderIndex] = updatedOrder;

      storage.set('orders_list', updatedOrders);
      set({ orders: updatedOrders });
      return updatedOrder;
    },

    reorder: (orderId: string) => {
      const order = get().getOrderById(orderId);
      if (!order) return null;

      return get().placeOrder({
        organization: order.organization,
        department: order.department,
        orderType: order.orderType,
        supplierId: order.supplierId,
        supplierName: order.supplierName,
        items: order.items.map(i => ({ ...i, id: 'oi-' + Date.now() + Math.random().toString(36).substring(2, 5) })),
        subtotal: order.subtotal,
        tax: order.tax,
        totalAmount: order.totalAmount,
        shippingAddress: order.shippingAddress,
        paymentTerms: order.paymentTerms
      });
    }
  };
});
