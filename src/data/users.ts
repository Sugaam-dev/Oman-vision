import { User, RolePermission } from '../types/user';

export const initialUsers: User[] = [
  {
    id: 'user-ahmed',
    name: 'Ahmed Al Maskari',
    email: 'ahmed.maskari@moi.gov.om',
    role: 'Procurement Manager',
    department: 'Procurement',
    subDepartment: 'Strategic Sourcing',
    status: 'Active',
    lastLogin: 'Today, 11:30 AM',
    avatarInitials: 'AM',
    phone: '+968 9123 4567'
  },
  {
    id: 'user-fatima',
    name: 'Fatima Al Rashid',
    email: 'fatima.rashid@moi.gov.om',
    role: 'Department Admin',
    department: 'Procurement',
    subDepartment: 'Contract Management',
    status: 'Active',
    lastLogin: 'Today, 10:24 AM',
    avatarInitials: 'FA',
    phone: '+968 9234 5678'
  },
  {
    id: 'user-omar',
    name: 'Omar Al Balushi',
    email: 'omar.balushi@moi.gov.om',
    role: 'Procurement Manager',
    department: 'Procurement',
    subDepartment: 'Strategic Sourcing',
    status: 'Active',
    lastLogin: 'Today, 09:15 AM',
    avatarInitials: 'OM',
    phone: '+968 9345 6789'
  },
  {
    id: 'user-sara',
    name: 'Sara Khan',
    email: 'sara.khan@moi.gov.om',
    role: 'Buyer',
    department: 'Procurement',
    subDepartment: 'Strategic Sourcing',
    status: 'Active',
    lastLogin: 'Yesterday, 04:32 PM',
    avatarInitials: 'SK',
    phone: '+968 9456 7890'
  },
  {
    id: 'user-yousuf',
    name: 'Yousuf Al Hinai',
    email: 'yousuf.hinai@moi.gov.om',
    role: 'Viewer',
    department: 'Procurement',
    subDepartment: 'Contract Management',
    status: 'Active',
    lastLogin: '12 Aug 2025',
    avatarInitials: 'YA',
    phone: '+968 9567 8901'
  },
  {
    id: 'user-nada',
    name: 'Nada Al Siyabi',
    email: 'nada.siyabi@moi.gov.om',
    role: 'Buyer',
    department: 'Procurement',
    subDepartment: 'Strategic Sourcing',
    status: 'Inactive',
    lastLogin: '08 Aug 2025',
    avatarInitials: 'NA',
    phone: '+968 9678 9012'
  },
  {
    id: 'user-khalid',
    name: 'Khalid Al Zadjali',
    email: 'khalid.zadjali@moi.gov.om',
    role: 'Buyer',
    department: 'Procurement',
    subDepartment: 'Contract Management',
    status: 'Inactive',
    lastLogin: '03 Aug 2025',
    avatarInitials: 'KZ',
    phone: '+968 9789 0123'
  },
  {
    id: 'user-ali',
    name: 'Ali Al Mahrouqi',
    email: 'ali.mahrouqi@moi.gov.om',
    role: 'Buyer',
    department: 'Procurement',
    subDepartment: 'Strategic Sourcing',
    status: 'Active',
    lastLogin: 'Today, 08:30 AM',
    avatarInitials: 'AM',
    phone: '+968 9890 1234'
  },
  {
    id: 'user-khamis',
    name: 'Khamis Al Harthy',
    email: 'khamis.harthy@moi.gov.om',
    role: 'Department Admin',
    department: 'Operations',
    subDepartment: 'Logistics Operations',
    status: 'Active',
    lastLogin: 'Yesterday, 02:15 PM',
    avatarInitials: 'KH',
    phone: '+968 9901 2345'
  },
  {
    id: 'user-salim-ops',
    name: 'Salim Al Rawahi',
    email: 'salim.rawahi@moi.gov.om',
    role: 'Procurement Manager',
    department: 'Operations',
    subDepartment: 'Warehouse Management',
    status: 'Active',
    lastLogin: '14 Aug 2025',
    avatarInitials: 'SR',
    phone: '+968 9012 3456'
  },
  {
    id: 'user-nasser-fin',
    name: 'Nasser Al Habsi',
    email: 'nasser.habsi@moi.gov.om',
    role: 'Organization Admin',
    department: 'Finance',
    subDepartment: 'Budget & Audit',
    status: 'Active',
    lastLogin: 'Today, 08:45 AM',
    avatarInitials: 'NH',
    phone: '+968 9123 7654'
  },
  {
    id: 'user-zahra',
    name: 'Zahra Al Lawati',
    email: 'zahra.lawati@moi.gov.om',
    role: 'Buyer',
    department: 'Finance',
    subDepartment: 'Accounts Payable',
    status: 'Active',
    lastLogin: '15 Aug 2025',
    avatarInitials: 'ZL',
    phone: '+968 9234 8765'
  },
  {
    id: 'user-sultan-it',
    name: 'Sultan Al Maawali',
    email: 'sultan.maawali@moi.gov.om',
    role: 'Department Admin',
    department: 'IT & Digital Transformation',
    subDepartment: 'Platform Management',
    status: 'Active',
    lastLogin: 'Today, 11:00 AM',
    avatarInitials: 'SM',
    phone: '+968 9345 9876'
  },
  {
    id: 'user-maryam',
    name: 'Maryam Al Ghafri',
    email: 'maryam.ghafri@moi.gov.om',
    role: 'Buyer',
    department: 'IT & Digital Transformation',
    subDepartment: 'Support & Maintenance',
    status: 'Active',
    lastLogin: 'Yesterday, 11:20 AM',
    avatarInitials: 'MG',
    phone: '+968 9456 0987'
  },
  {
    id: 'user-tariq-proj',
    name: 'Dr. Tariq Al Busaidi',
    email: 'tariq.busaidi@moi.gov.om',
    role: 'Department Admin',
    department: 'Projects & Planning',
    subDepartment: 'Capital Works',
    status: 'Active',
    lastLogin: '13 Aug 2025',
    avatarInitials: 'TB',
    phone: '+968 9567 1098'
  },
  {
    id: 'user-hilal',
    name: 'Hilal Al Mamari',
    email: 'hilal.mamari@moi.gov.om',
    role: 'Viewer',
    department: 'Projects & Planning',
    subDepartment: 'Quality Assurance',
    status: 'Active',
    lastLogin: '11 Aug 2025',
    avatarInitials: 'HM',
    phone: '+968 9678 2109'
  },
  {
    id: 'user-laila',
    name: 'Laila Al Balushi',
    email: 'laila.balushi@moi.gov.om',
    role: 'Buyer',
    department: 'Procurement',
    subDepartment: 'Strategic Sourcing',
    status: 'Active',
    lastLogin: '10 Aug 2025',
    avatarInitials: 'LB',
    phone: '+968 9789 3210'
  },
  {
    id: 'user-badar',
    name: 'Badar Al Barwani',
    email: 'badar.barwani@moi.gov.om',
    role: 'Procurement Manager',
    department: 'Procurement',
    subDepartment: 'Contract Management',
    status: 'Active',
    lastLogin: '09 Aug 2025',
    avatarInitials: 'BB',
    phone: '+968 9890 4321'
  },
  {
    id: 'user-asma',
    name: 'Asma Al Riyami',
    email: 'asma.riyami@moi.gov.om',
    role: 'Viewer',
    department: 'Finance',
    subDepartment: 'Accounts Payable',
    status: 'Active',
    lastLogin: '07 Aug 2025',
    avatarInitials: 'AR',
    phone: '+968 9901 5432'
  },
  {
    id: 'user-qassim',
    name: 'Qassim Al Farsi',
    email: 'qassim.farsi@moi.gov.om',
    role: 'Buyer',
    department: 'Operations',
    subDepartment: 'Logistics Operations',
    status: 'Active',
    lastLogin: '06 Aug 2025',
    avatarInitials: 'QF',
    phone: '+968 9012 6543'
  }
];

export const initialRolePermissions: RolePermission[] = [
  {
    role: 'Organization Admin',
    description: 'Full administrative access across all government departments, contracts, and user permissions.',
    permissions: {
      productCatalog: true,
      rfqManagement: true,
      orderPlacement: true,
      orderTracking: true,
      supplierManagement: true,
      reportsAnalytics: true,
      userManagement: true,
      aiAssistant: true,
    }
  },
  {
    role: 'Department Admin',
    description: 'Department level control over orders, requisitions, budgets, and departmental members.',
    permissions: {
      productCatalog: true,
      rfqManagement: true,
      orderPlacement: true,
      orderTracking: true,
      supplierManagement: true,
      reportsAnalytics: true,
      userManagement: true,
      aiAssistant: true,
    }
  },
  {
    role: 'Procurement Manager',
    description: 'Lead sourcing authority, approval of RFQs and bulk purchasing, vendor evaluation.',
    permissions: {
      productCatalog: true,
      rfqManagement: true,
      orderPlacement: true,
      orderTracking: true,
      supplierManagement: true,
      reportsAnalytics: true,
      userManagement: false,
      aiAssistant: true,
    }
  },
  {
    role: 'Buyer',
    description: 'Requisition drafting, catalog search, bulk order preparation, and tracking.',
    permissions: {
      productCatalog: true,
      rfqManagement: true,
      orderPlacement: true,
      orderTracking: true,
      supplierManagement: false,
      reportsAnalytics: false,
      userManagement: false,
      aiAssistant: true,
    }
  },
  {
    role: 'Viewer',
    description: 'Read-only audit visibility into order status, catalogs, and ministry procurement history.',
    permissions: {
      productCatalog: true,
      rfqManagement: false,
      orderPlacement: false,
      orderTracking: true,
      supplierManagement: false,
      reportsAnalytics: true,
      userManagement: false,
      aiAssistant: true,
    }
  }
];
