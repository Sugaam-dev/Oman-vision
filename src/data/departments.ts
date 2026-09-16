import { Department, Organization } from '../types/organization';

export const initialOrganization: Organization = {
  id: 'org-moi',
  name: 'Ministry of Infrastructure',
  type: 'Government Entity',
  status: 'Active',
  headOffice: 'Head Office, Al Khuwair, Muscat',
  totalUsers: 56,
  totalDepartments: 8,
  adminCount: 12,
  standardUserCount: 44,
  activeContracts: 3
};

export const initialDepartments: Department[] = [
  {
    id: 'dept-proc',
    name: 'Procurement Department',
    code: 'MOI-PROC',
    headName: 'Fatima Al Rashid',
    userCount: 12,
    parentDepartment: 'Ministry of Infrastructure',
    location: 'Muscat, Oman',
    description: 'Handles procurement planning, vendor management, contract negotiation and purchasing for all ministry requirements in alignment with Oman Vision 2040.',
    subDepartments: [
      { id: 'sub-1', name: 'Strategic Sourcing', userCount: 5, description: 'Vendor qualification and RFQ analysis' },
      { id: 'sub-2', name: 'Contract Management', userCount: 7, description: 'Government tender tracking and SLA governance' }
    ]
  },
  {
    id: 'dept-ops',
    name: 'Operations Department',
    code: 'MOI-OPS',
    headName: 'Khamis Al Harthy',
    userCount: 14,
    parentDepartment: 'Ministry of Infrastructure',
    location: 'Muscat & Sohar',
    description: 'Oversees site execution, equipment mobilization, inventory maintenance, and logistical fulfillment for civil projects.',
    subDepartments: [
      { id: 'sub-3', name: 'Logistics Operations', userCount: 8, description: 'Fleet and freight movements' },
      { id: 'sub-4', name: 'Warehouse Management', userCount: 6, description: 'Central stores and inventory receipt' }
    ]
  },
  {
    id: 'dept-fin',
    name: 'Finance Department',
    code: 'MOI-FIN',
    headName: 'Nasser Al Habsi',
    userCount: 8,
    parentDepartment: 'Ministry of Infrastructure',
    location: 'Muscat, Oman',
    description: 'Manages ministry budget allocation, procurement payments, VAT compliance, and fiscal auditing under Oman financial regulations.',
    subDepartments: [
      { id: 'sub-5', name: 'Accounts Payable', userCount: 5, description: 'Supplier invoice clearance and Net 30 terms' },
      { id: 'sub-6', name: 'Budget & Audit', userCount: 3, description: 'Budgetary compliance and forecast' }
    ]
  },
  {
    id: 'dept-it',
    name: 'IT & Digital Transformation',
    code: 'MOI-ITD',
    headName: 'Sultan Al Maawali',
    userCount: 10,
    parentDepartment: 'Ministry of Infrastructure',
    location: 'Muscat, Oman',
    description: 'Leads digital modernization, procurement portal integrations, network security, and infrastructure automation.',
    subDepartments: [
      { id: 'sub-7', name: 'Platform Management', userCount: 6, description: 'Enterprise software and portal ops' },
      { id: 'sub-8', name: 'Support & Maintenance', userCount: 4, description: 'Hardware deployment and technical helpdesk' }
    ]
  },
  {
    id: 'dept-proj',
    name: 'Projects & Planning Department',
    code: 'MOI-PPD',
    headName: 'Dr. Tariq Al Busaidi',
    userCount: 12,
    parentDepartment: 'Ministry of Infrastructure',
    location: 'Muscat, Oman',
    description: 'Drives national capital works, infrastructure feasibility studies, and master plan execution across governorates.',
    subDepartments: [
      { id: 'sub-9', name: 'Capital Works', userCount: 7, description: 'Roads, harbors, and public works' },
      { id: 'sub-10', name: 'Quality Assurance', userCount: 5, description: 'Engineering standards verification' }
    ]
  }
];
