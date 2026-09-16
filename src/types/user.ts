export type UserRole = 
  | 'Organization Admin'
  | 'Department Admin'
  | 'Procurement Manager'
  | 'Buyer'
  | 'Viewer';

export type UserStatus = 'Active' | 'Inactive' | 'Suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  subDepartment?: string;
  status: UserStatus;
  lastLogin: string;
  avatarInitials: string;
  phone?: string;
}

export interface RolePermission {
  role: UserRole;
  description: string;
  permissions: {
    productCatalog: boolean;
    rfqManagement: boolean;
    orderPlacement: boolean;
    orderTracking: boolean;
    supplierManagement: boolean;
    reportsAnalytics: boolean;
    userManagement: boolean;
    aiAssistant: boolean;
  };
}
