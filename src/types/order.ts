export type OrderStatus = 
  | 'Processing' 
  | 'Confirmed' 
  | 'In Fulfillment' 
  | 'Out for Delivery' 
  | 'Delivered' 
  | 'Cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  category: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  status: 'In Fulfillment' | 'Packed' | 'Awaiting Dispatch' | 'Delivered' | 'Processing';
  image?: string;
}

export interface OrderTimelineStep {
  status: OrderStatus;
  label: string;
  date?: string;
  completed: boolean;
  current: boolean;
}

export interface OrderActivity {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  iconType?: 'transit' | 'pack' | 'process' | 'confirm' | 'create' | 'deliver';
}

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  expectedDelivery: string;
  organization: string;
  department: string;
  contract: string;
  orderType: 'Standard Order' | 'Bulk Purchase' | 'Emergency Order';
  status: OrderStatus;
  supplierId: string;
  supplierName: string;
  items: OrderItem[];
  subtotal: number;
  tax: number; // 5% VAT in Oman
  totalAmount: number;
  shippingAddress: string;
  paymentTerms: string;
  trackingCity?: 'Muscat' | 'Sohar' | 'Nizwa' | 'Salalah' | 'Duqm';
  trackingEstimatedDate?: string;
  timeline: OrderTimelineStep[];
  activities: OrderActivity[];
  relatedRFQId?: string;
}
