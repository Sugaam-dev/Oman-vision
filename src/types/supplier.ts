export interface Supplier {
  id: string;
  name: string;
  code: string;
  category: string;
  location: string;
  country: string;
  isOmanSupplier: boolean;
  status: 'Active' | 'Under Review' | 'Preferred' | 'Suspended';
  rating: number; // e.g. 4.8
  totalOrders: number;
  onTimeDeliveryRate: number; // e.g. 98%
  qualityRating: number; // e.g. 4.8
  contactPerson: string;
  email: string;
  phone: string;
  crNumber: string; // Commercial Registration
  vatNumber: string;
  address: string;
  tags: string[];
}
