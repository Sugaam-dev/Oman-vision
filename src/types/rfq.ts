export type RFQStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Quotes Received' | 'Awarded' | 'Closed';

export interface RFQItem {
  id: string;
  productId: string;
  productName: string;
  category: string;
  specification: string;
  estimatedQuantity: number;
  unit: string;
  estimatedUnitPrice: number;
  estimatedSubtotal: number;
  image?: string;
}

export interface RFQ {
  id: string;
  rfqNumber: string;
  title: string;
  status: RFQStatus;
  createdOn: string;
  createdBy: string;
  organization: string;
  department: string;
  purpose: string;
  projectReference?: string;
  requiredDeliveryDate: string;
  notesToSuppliers?: string;
  attachments?: { name: string; size: string; type: string }[];
  selectedSuppliers?: string[];
  items: RFQItem[];
  estimatedTotal: number;
}
