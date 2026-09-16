import { RFQ } from '../types/rfq';

export const initialRFQs: RFQ[] = [
  {
    id: 'rfq-008',
    rfqNumber: 'RFQ-2025-0008',
    title: 'Executive IT & Office Infrastructure Refresh',
    status: 'Draft',
    createdOn: '2025-08-18',
    createdBy: 'Ahmed Al Maskari',
    organization: 'Ministry of Infrastructure',
    department: 'Procurement',
    purpose: 'Standard Procurement',
    projectReference: 'PRJ-MOI-2025-Q3',
    requiredDeliveryDate: '2025-09-30',
    notesToSuppliers: 'Please include onsite warranty and initial configuration in the proposal. All items must comply with Omani Standard specifications.',
    attachments: [
      { name: 'Technical_Requirements_IT_2025.pdf', size: '2.4 MB', type: 'application/pdf' },
      { name: 'Site_Delivery_Schedule.xlsx', size: '480 KB', type: 'application/vnd.ms-excel' }
    ],
    selectedSuppliers: ['sup-1', 'sup-3', 'sup-4'],
    estimatedTotal: 42750,
    items: [
      {
        id: 'rfqi-1',
        productId: 'prod-1',
        productName: 'Dell Latitude 7450 Business Laptop',
        category: 'IT & Electronics',
        specification: 'Intel i7, 16GB, 512GB SSD, Windows 11 Pro',
        estimatedQuantity: 50,
        unit: 'Nos',
        estimatedUnitPrice: 425,
        estimatedSubtotal: 21250,
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&auto=format&fit=crop&q=80'
      },
      {
        id: 'rfqi-2',
        productId: 'prod-7',
        productName: 'Ergonomic Office Chair',
        category: 'Office & Furniture',
        specification: 'Adjustable, Lumbar Support, Breathable Mesh',
        estimatedQuantity: 100,
        unit: 'Nos',
        estimatedUnitPrice: 85,
        estimatedSubtotal: 8500,
        image: 'https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=200&auto=format&fit=crop&q=80'
      },
      {
        id: 'rfqi-3',
        productId: 'prod-12',
        productName: 'Split AC Unit 2 Ton',
        category: 'Facility Management',
        specification: 'Inverter, Energy Efficient, R410A',
        estimatedQuantity: 30,
        unit: 'Nos',
        estimatedUnitPrice: 210,
        estimatedSubtotal: 6300,
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'rfq-007',
    rfqNumber: 'RFQ-2025-0007',
    title: 'Backup Diesel Generators for Muscat Depots',
    status: 'Quotes Received',
    createdOn: '2025-08-10',
    createdBy: 'Omar Al Balushi',
    organization: 'Ministry of Infrastructure',
    department: 'Operations',
    purpose: 'Standard Procurement',
    projectReference: 'EMERGENCY-PWR-25',
    requiredDeliveryDate: '2025-09-15',
    notesToSuppliers: 'Must include ATS panels and installation commissioning at 3 separate municipal sites.',
    attachments: [
      { name: 'Electrical_Single_Line_Diagram.pdf', size: '3.1 MB', type: 'application/pdf' }
    ],
    selectedSuppliers: ['sup-2', 'sup-7'],
    estimatedTotal: 17100,
    items: [
      {
        id: 'rfqi-4',
        productId: 'prod-22',
        productName: 'Diesel Generator 100 kVA',
        category: 'Industrial Equipment',
        specification: 'Silent Type, 3 Phase, Auto Start',
        estimatedQuantity: 6,
        unit: 'Nos',
        estimatedUnitPrice: 2850,
        estimatedSubtotal: 17100,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'rfq-006',
    rfqNumber: 'RFQ-2025-0006',
    title: 'Warehouse Material Handling Equipment Upgrade',
    status: 'Awarded',
    createdOn: '2025-07-28',
    createdBy: 'Fatima Al Rashid',
    organization: 'Ministry of Infrastructure',
    department: 'Procurement',
    purpose: 'Capital Asset Acquisition',
    projectReference: 'WH-PORT-2025',
    requiredDeliveryDate: '2025-08-25',
    notesToSuppliers: 'Awarded to Oman Logistics Solutions under Framework Contract GOV-2025-11.',
    selectedSuppliers: ['sup-1', 'sup-10'],
    estimatedTotal: 80000,
    items: [
      {
        id: 'rfqi-5',
        productId: 'prod-27',
        productName: 'Forklift 3 Ton Diesel',
        category: 'Logistics & Transport',
        specification: 'Isuzu Engine, 4.5m mast, pneumatic tires',
        estimatedQuantity: 25,
        unit: 'Nos',
        estimatedUnitPrice: 3200,
        estimatedSubtotal: 80000
      }
    ]
  },
  {
    id: 'rfq-005',
    rfqNumber: 'RFQ-2025-0005',
    title: 'Annual Ministry Personal Protective Equipment Supply',
    status: 'Closed',
    createdOn: '2025-07-15',
    createdBy: 'Sara Khan',
    organization: 'Ministry of Infrastructure',
    department: 'Safety & Security',
    purpose: 'Standard Procurement',
    projectReference: 'HSE-ANNUAL-2025',
    requiredDeliveryDate: '2025-08-10',
    selectedSuppliers: ['sup-5'],
    estimatedTotal: 7800,
    items: [
      {
        id: 'rfqi-6',
        productId: 'prod-17',
        productName: 'Safety Helmet with Chin Strap',
        category: 'Safety & Security',
        specification: 'ISO Certified, High-visibility yellow',
        estimatedQuantity: 400,
        unit: 'Nos',
        estimatedUnitPrice: 12,
        estimatedSubtotal: 4800,
        image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=200&auto=format&fit=crop&q=80'
      },
      {
        id: 'rfqi-7',
        productId: 'prod-18',
        productName: 'Heavy Duty Steel-Toe Safety Boots S3',
        category: 'Safety & Security',
        specification: 'EN ISO 20345:2011 S3 SRC',
        estimatedQuantity: 100,
        unit: 'Pairs',
        estimatedUnitPrice: 28,
        estimatedSubtotal: 2800,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'rfq-004',
    rfqNumber: 'RFQ-2025-0004',
    title: 'Enterprise Core Networking Switches',
    status: 'Under Review',
    createdOn: '2025-08-01',
    createdBy: 'Sultan Al Maawali',
    organization: 'Ministry of Infrastructure',
    department: 'IT & Digital Transformation',
    purpose: 'Infrastructure Modernization',
    projectReference: 'NET-CORE-4K',
    requiredDeliveryDate: '2025-09-20',
    selectedSuppliers: ['sup-3', 'sup-8'],
    estimatedTotal: 18500,
    items: [
      {
        id: 'rfqi-8',
        productId: 'prod-4',
        productName: 'Cisco Catalyst 9300 48-Port PoE+ Switch',
        category: 'IT & Electronics',
        specification: '48 Port PoE+, Network Advantage license',
        estimatedQuantity: 10,
        unit: 'Nos',
        estimatedUnitPrice: 1850,
        estimatedSubtotal: 18500
      }
    ]
  },
  {
    id: 'rfq-003',
    rfqNumber: 'RFQ-2025-0003',
    title: 'Government Service Hall Ergonomic Desks',
    status: 'Quotes Received',
    createdOn: '2025-07-20',
    createdBy: 'Ahmed Al Maskari',
    organization: 'Ministry of Infrastructure',
    department: 'Procurement',
    purpose: 'Standard Procurement',
    projectReference: 'CITIZEN-CTR-25',
    requiredDeliveryDate: '2025-09-05',
    selectedSuppliers: ['sup-4'],
    estimatedTotal: 8750,
    items: [
      {
        id: 'rfqi-9',
        productId: 'prod-8',
        productName: 'Motorized Dual-Motor Height Adjustable Desk',
        category: 'Office & Furniture',
        specification: 'Dual motor, anti-collision, 160x80cm oak top',
        estimatedQuantity: 50,
        unit: 'Nos',
        estimatedUnitPrice: 175,
        estimatedSubtotal: 8750
      }
    ]
  },
  {
    id: 'rfq-002',
    rfqNumber: 'RFQ-2025-0002',
    title: 'Salalah Port Submersible Slurry Pumps',
    status: 'Awarded',
    createdOn: '2025-07-05',
    createdBy: 'Omar Al Balushi',
    organization: 'Ministry of Infrastructure',
    department: 'Operations',
    purpose: 'Emergency Order',
    projectReference: 'PORT-DRAIN-SAL',
    requiredDeliveryDate: '2025-07-25',
    selectedSuppliers: ['sup-7'],
    estimatedTotal: 7100,
    items: [
      {
        id: 'rfqi-10',
        productId: 'prod-25',
        productName: 'Heavy Duty Submersible Slurry Pump 15 kW',
        category: 'Industrial Equipment',
        specification: '15 kW, 180 m3/h, solid handling 45mm',
        estimatedQuantity: 5,
        unit: 'Nos',
        estimatedUnitPrice: 1420,
        estimatedSubtotal: 7100
      }
    ]
  },
  {
    id: 'rfq-001',
    rfqNumber: 'RFQ-2025-0001',
    title: 'High-Bay Depots LED Retrofit',
    status: 'Closed',
    createdOn: '2025-06-10',
    createdBy: 'Ahmed Al Maskari',
    organization: 'Ministry of Infrastructure',
    department: 'Facility Management',
    purpose: 'Energy Efficiency Drive',
    projectReference: 'GREEN-OMAN-2025',
    requiredDeliveryDate: '2025-06-30',
    selectedSuppliers: ['sup-6'],
    estimatedTotal: 13300,
    items: [
      {
        id: 'rfqi-11',
        productId: 'prod-16',
        productName: 'LED High-Bay Industrial Fixture 150W',
        category: 'Facility Management',
        specification: '150W, IP65, 21000 lm, 5000K',
        estimatedQuantity: 350,
        unit: 'Nos',
        estimatedUnitPrice: 38,
        estimatedSubtotal: 13300
      }
    ]
  }
];
