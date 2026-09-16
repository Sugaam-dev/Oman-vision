export interface SubDepartment {
  id: string;
  name: string;
  userCount: number;
  description?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headName: string;
  userCount: number;
  parentDepartment: string;
  location: string;
  description: string;
  subDepartments: SubDepartment[];
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Pending Verification';
  headOffice: string;
  totalUsers: number;
  totalDepartments: number;
  adminCount: number;
  standardUserCount: number;
  activeContracts: number;
}
