export type ProductCategory = 
  | 'IT & Electronics'
  | 'Office & Furniture'
  | 'Facility Management'
  | 'Safety & Security'
  | 'Industrial Equipment'
  | 'Logistics & Transport';

export type AvailabilityStatus = 'In Stock' | 'On Order' | 'Lead Time > 30 days';

export interface ProductSpecification {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  department: string;
  description: string;
  price: number; // in OMR
  currency: 'OMR';
  availability: AvailabilityStatus;
  stock: number;
  minOrderQuantity: number;
  supplierId: string;
  supplierName: string;
  isOmanSupplier: boolean;
  certifications: string[]; // e.g. 'Omani Standard (OS)', 'ISO Certified', 'CE Marked'
  warranty: string;
  image: string;
  thumbnails?: string[];
  specs: ProductSpecification;
  isFavorite?: boolean;
  datasheetUrl?: string;
  manualUrl?: string;
}
