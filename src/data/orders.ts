import { Order } from '../types/order';

export const initialOrders: Order[] = [
  {
    id: 'ord-124',
    orderNumber: 'ORD-2025-00124',
    orderDate: '2025-08-12',
    expectedDelivery: '2025-08-22',
    organization: 'Ministry of Infrastructure',
    department: 'Procurement',
    contract: 'GOV-2025-17',
    orderType: 'Standard Order',
    status: 'In Fulfillment',
    supplierId: 'sup-3',
    supplierName: 'Al Badr Electronics',
    shippingAddress: 'Al Khuwair, Muscat 133, Sultanate of Oman',
    paymentTerms: 'Net 30 Days',
    subtotal: 36050,
    tax: 1800,
    totalAmount: 37850,
    trackingCity: 'Sohar',
    trackingEstimatedDate: '22 Aug 2025',
    items: [
      {
        id: 'oi-1',
        productId: 'prod-1',
        productName: 'Dell Latitude 7450 Business Laptop',
        sku: 'IT-LT7450',
        category: 'IT & Electronics',
        unitPrice: 425,
        quantity: 50,
        totalPrice: 21250,
        status: 'In Fulfillment',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&auto=format&fit=crop&q=80'
      },
      {
        id: 'oi-2',
        productId: 'prod-7',
        productName: 'Ergonomic Office Chair',
        sku: 'OF-CH-001',
        category: 'Office & Furniture',
        unitPrice: 85,
        quantity: 100,
        totalPrice: 8500,
        status: 'Packed',
        image: 'https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=200&auto=format&fit=crop&q=80'
      },
      {
        id: 'oi-3',
        productId: 'prod-12',
        productName: 'Split AC Unit 2 Ton',
        sku: 'FM-AC-002',
        category: 'Facility Management',
        unitPrice: 210,
        quantity: 30,
        totalPrice: 6300,
        status: 'Awaiting Dispatch',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=80'
      }
    ],
    timeline: [
      { status: 'Confirmed', label: 'Order Confirmed', date: '13 Aug 2025', completed: true, current: false },
      { status: 'Confirmed', label: 'Procurement', date: '14 Aug 2025', completed: true, current: false },
      { status: 'In Fulfillment', label: 'In Fulfillment', date: '16 Aug 2025', completed: true, current: true },
      { status: 'Out for Delivery', label: 'Out for Delivery', date: undefined, completed: false, current: false },
      { status: 'Delivered', label: 'Delivered', date: undefined, completed: false, current: false }
    ],
    activities: [
      { id: 'act-1', timestamp: '16 Aug 2025, 09:20 AM', title: 'Shipment in transit', description: 'Departed Muscat warehouse en route to Sohar regional depot', iconType: 'transit' },
      { id: 'act-2', timestamp: '15 Aug 2025, 04:30 PM', title: 'Items packed', description: 'All 3 items packed and ready for dispatch', iconType: 'pack' },
      { id: 'act-3', timestamp: '14 Aug 2025, 10:15 AM', title: 'Order processing', description: 'Procurement team verified documents and tax exemptions', iconType: 'process' },
      { id: 'act-4', timestamp: '13 Aug 2025, 11:20 AM', title: 'Order confirmed', description: 'Purchase order GOV-2025-17 issued to suppliers', iconType: 'confirm' },
      { id: 'act-5', timestamp: '12 Aug 2025, 04:45 PM', title: 'Order placed', description: 'Created by Ahmed Al Maskari via Bulk Order', iconType: 'create' }
    ],
    relatedRFQId: 'rfq-008'
  },
  {
    id: 'ord-123',
    orderNumber: 'ORD-2025-00123',
    orderDate: '2025-08-10',
    expectedDelivery: '2025-08-20',
    organization: 'Ministry of Infrastructure',
    department: 'Operations',
    contract: 'GOV-2025-14',
    orderType: 'Standard Order',
    status: 'Confirmed',
    supplierId: 'sup-2',
    supplierName: 'Gulf Industrial Supplies',
    shippingAddress: 'Sohar Port Compound, Gate 4, Sohar',
    paymentTerms: 'Net 30 Days',
    subtotal: 17619,
    tax: 881,
    totalAmount: 18500,
    trackingCity: 'Muscat',
    trackingEstimatedDate: '20 Aug 2025',
    items: [
      {
        id: 'oi-4',
        productId: 'prod-22',
        productName: 'Diesel Generator 100 kVA',
        sku: 'IE-DG-100',
        category: 'Industrial Equipment',
        unitPrice: 2850,
        quantity: 6,
        totalPrice: 17100,
        status: 'Processing',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=80'
      }
    ],
    timeline: [
      { status: 'Confirmed', label: 'Order Confirmed', date: '11 Aug 2025', completed: true, current: true },
      { status: 'Confirmed', label: 'Procurement', date: undefined, completed: false, current: false },
      { status: 'In Fulfillment', label: 'In Fulfillment', date: undefined, completed: false, current: false },
      { status: 'Out for Delivery', label: 'Out for Delivery', date: undefined, completed: false, current: false },
      { status: 'Delivered', label: 'Delivered', date: undefined, completed: false, current: false }
    ],
    activities: [
      { id: 'act-6', timestamp: '11 Aug 2025, 02:00 PM', title: 'Order confirmed', description: 'Vendor accepted procurement terms', iconType: 'confirm' },
      { id: 'act-7', timestamp: '10 Aug 2025, 09:30 AM', title: 'Order placed', description: 'Requisition submitted for backup power units', iconType: 'create' }
    ]
  },
  {
    id: 'ord-122',
    orderNumber: 'ORD-2025-00122',
    orderDate: '2025-08-05',
    expectedDelivery: '2025-08-18',
    organization: 'Ministry of Infrastructure',
    department: 'Projects & Planning',
    contract: 'GOV-2025-11',
    orderType: 'Bulk Purchase',
    status: 'In Fulfillment',
    supplierId: 'sup-1',
    supplierName: 'Oman Logistics Solutions',
    shippingAddress: 'Duqm Special Economic Zone, Site B',
    paymentTerms: 'Milestone 50/50',
    subtotal: 119048,
    tax: 5952,
    totalAmount: 125000,
    trackingCity: 'Sohar',
    trackingEstimatedDate: '18 Aug 2025',
    items: [
      {
        id: 'oi-5',
        productId: 'prod-27',
        productName: 'Forklift 3 Ton Diesel',
        sku: 'LT-FL-003',
        category: 'Logistics & Transport',
        unitPrice: 3200,
        quantity: 25,
        totalPrice: 80000,
        status: 'In Fulfillment',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&auto=format&fit=crop&q=80'
      },
      {
        id: 'oi-6',
        productId: 'prod-29',
        productName: 'Standard ISO Shipping Container 20ft',
        sku: 'LT-CNT-20FT',
        category: 'Logistics & Transport',
        unitPrice: 1250,
        quantity: 30,
        totalPrice: 37500,
        status: 'Packed',
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=200&auto=format&fit=crop&q=80'
      }
    ],
    timeline: [
      { status: 'Confirmed', label: 'Order Confirmed', date: '06 Aug 2025', completed: true, current: false },
      { status: 'Confirmed', label: 'Procurement', date: '08 Aug 2025', completed: true, current: false },
      { status: 'In Fulfillment', label: 'In Fulfillment', date: '12 Aug 2025', completed: true, current: true },
      { status: 'Out for Delivery', label: 'Out for Delivery', date: undefined, completed: false, current: false },
      { status: 'Delivered', label: 'Delivered', date: undefined, completed: false, current: false }
    ],
    activities: [
      { id: 'act-8', timestamp: '12 Aug 2025, 08:00 AM', title: 'Heavy transit mobilization', description: 'Flatbed transporters dispatched', iconType: 'transit' }
    ]
  },
  {
    id: 'ord-121',
    orderNumber: 'ORD-2025-00121',
    orderDate: '2025-08-01',
    expectedDelivery: '2025-08-09',
    organization: 'Ministry of Infrastructure',
    department: 'Procurement',
    contract: 'GOV-2025-09',
    orderType: 'Standard Order',
    status: 'Delivered',
    supplierId: 'sup-4',
    supplierName: 'Muscat Office Solutions',
    shippingAddress: 'Ministry HQ, Al Khuwair, 3rd Floor',
    paymentTerms: 'Net 30 Days',
    subtotal: 8333,
    tax: 417,
    totalAmount: 8750,
    trackingCity: 'Nizwa',
    trackingEstimatedDate: '09 Aug 2025',
    items: [
      {
        id: 'oi-7',
        productId: 'prod-7',
        productName: 'Ergonomic Office Chair',
        sku: 'OF-CH-001',
        category: 'Office & Furniture',
        unitPrice: 85,
        quantity: 98,
        totalPrice: 8330,
        status: 'Delivered',
        image: 'https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=200&auto=format&fit=crop&q=80'
      }
    ],
    timeline: [
      { status: 'Confirmed', label: 'Order Confirmed', date: '01 Aug 2025', completed: true, current: false },
      { status: 'Confirmed', label: 'Procurement', date: '03 Aug 2025', completed: true, current: false },
      { status: 'In Fulfillment', label: 'In Fulfillment', date: '05 Aug 2025', completed: true, current: false },
      { status: 'Out for Delivery', label: 'Out for Delivery', date: '08 Aug 2025', completed: true, current: false },
      { status: 'Delivered', label: 'Delivered', date: '09 Aug 2025', completed: true, current: true }
    ],
    activities: [
      { id: 'act-9', timestamp: '09 Aug 2025, 03:30 PM', title: 'Delivered & signed', description: 'Received and inspected by Stores Manager Salim Al Rawahi', iconType: 'deliver' }
    ]
  },
  {
    id: 'ord-120',
    orderNumber: 'ORD-2025-00120',
    orderDate: '2025-07-28',
    expectedDelivery: '2025-08-08',
    organization: 'Ministry of Infrastructure',
    department: 'Safety & Security',
    contract: 'GOV-2025-07',
    orderType: 'Standard Order',
    status: 'Delivered',
    supplierId: 'sup-5',
    supplierName: 'National Safety Co.',
    shippingAddress: 'Central Depots, Rusayl Industrial Area',
    paymentTerms: 'Net 30 Days',
    subtotal: 5120,
    tax: 256,
    totalAmount: 5376,
    trackingCity: 'Muscat',
    items: [
      {
        id: 'oi-8',
        productId: 'prod-17',
        productName: 'Safety Helmet with Chin Strap',
        sku: 'SS-HE-001',
        category: 'Safety & Security',
        unitPrice: 12,
        quantity: 200,
        totalPrice: 2400,
        status: 'Delivered',
        image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=200&auto=format&fit=crop&q=80'
      },
      {
        id: 'oi-9',
        productId: 'prod-18',
        productName: 'Heavy Duty Steel-Toe Safety Boots S3',
        sku: 'SS-BT-002',
        category: 'Safety & Security',
        unitPrice: 28,
        quantity: 95,
        totalPrice: 2660,
        status: 'Delivered',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=80'
      }
    ],
    timeline: [
      { status: 'Delivered', label: 'Delivered', date: '07 Aug 2025', completed: true, current: true }
    ],
    activities: [
      { id: 'act-10', timestamp: '07 Aug 2025, 01:15 PM', title: 'Delivered', description: 'Stocked into central PPE inventory', iconType: 'deliver' }
    ]
  },
  {
    id: 'ord-119',
    orderNumber: 'ORD-2025-00119',
    orderDate: '2025-07-25',
    expectedDelivery: '2025-08-15',
    organization: 'Ministry of Infrastructure',
    department: 'IT & Digital Transformation',
    contract: 'GOV-2025-05',
    orderType: 'Standard Order',
    status: 'Delivered',
    supplierId: 'sup-3',
    supplierName: 'Al Badr Electronics',
    shippingAddress: 'Ministry HQ, Data Center Level B1',
    paymentTerms: 'Net 30 Days',
    subtotal: 21500,
    tax: 1075,
    totalAmount: 22575,
    trackingCity: 'Muscat',
    items: [
      {
        id: 'oi-10',
        productId: 'prod-4',
        productName: 'Cisco Catalyst 9300 48-Port PoE+ Switch',
        sku: 'IT-CS9300-48P',
        category: 'IT & Electronics',
        unitPrice: 1850,
        quantity: 10,
        totalPrice: 18500,
        status: 'Delivered'
      }
    ],
    timeline: [
      { status: 'Delivered', label: 'Delivered', date: '14 Aug 2025', completed: true, current: true }
    ],
    activities: [
      { id: 'act-11', timestamp: '14 Aug 2025, 04:00 PM', title: 'Delivered & racked', description: 'Network team signed acceptance testing', iconType: 'deliver' }
    ]
  },
  {
    id: 'ord-118',
    orderNumber: 'ORD-2025-00118',
    orderDate: '2025-07-20',
    expectedDelivery: '2025-08-05',
    organization: 'Ministry of Infrastructure',
    department: 'Facility Management',
    contract: 'GOV-2025-04',
    orderType: 'Standard Order',
    status: 'Delivered',
    supplierId: 'sup-6',
    supplierName: 'Oman Cooling & HVAC Tech',
    shippingAddress: 'Regional Governance Complex, Nizwa',
    paymentTerms: 'Net 30 Days',
    subtotal: 10500,
    tax: 525,
    totalAmount: 11025,
    trackingCity: 'Nizwa',
    items: [
      {
        id: 'oi-11',
        productId: 'prod-12',
        productName: 'Split AC Unit 2 Ton',
        sku: 'FM-AC-002',
        category: 'Facility Management',
        unitPrice: 210,
        quantity: 50,
        totalPrice: 10500,
        status: 'Delivered'
      }
    ],
    timeline: [
      { status: 'Delivered', label: 'Delivered', date: '04 Aug 2025', completed: true, current: true }
    ],
    activities: [
      { id: 'act-12', timestamp: '04 Aug 2025, 11:30 AM', title: 'Delivered', description: 'Installation scheduled with facility technicians', iconType: 'deliver' }
    ]
  },
  {
    id: 'ord-117',
    orderNumber: 'ORD-2025-00117',
    orderDate: '2025-07-15',
    expectedDelivery: '2025-07-30',
    organization: 'Ministry of Infrastructure',
    department: 'Operations',
    contract: 'GOV-2025-02',
    orderType: 'Emergency Order',
    status: 'Delivered',
    supplierId: 'sup-7',
    supplierName: 'Dhofar Engineering Supplies',
    shippingAddress: 'Salalah Port Civil Works Depot',
    paymentTerms: 'Immediate 100%',
    subtotal: 7100,
    tax: 355,
    totalAmount: 7455,
    trackingCity: 'Salalah',
    items: [
      {
        id: 'oi-12',
        productId: 'prod-25',
        productName: 'Heavy Duty Submersible Slurry Pump 15 kW',
        sku: 'IE-SP-15KW',
        category: 'Industrial Equipment',
        unitPrice: 1420,
        quantity: 5,
        totalPrice: 7100,
        status: 'Delivered'
      }
    ],
    timeline: [
      { status: 'Delivered', label: 'Delivered', date: '28 Jul 2025', completed: true, current: true }
    ],
    activities: [
      { id: 'act-13', timestamp: '28 Jul 2025, 05:00 PM', title: 'Emergency dispatch delivered', description: 'Deployed for canal clearance', iconType: 'deliver' }
    ]
  },
  {
    id: 'ord-116',
    orderNumber: 'ORD-2025-00116',
    orderDate: '2025-07-10',
    expectedDelivery: '2025-07-25',
    organization: 'Ministry of Infrastructure',
    department: 'Procurement',
    contract: 'GOV-2025-01',
    orderType: 'Standard Order',
    status: 'Delivered',
    supplierId: 'sup-4',
    supplierName: 'Muscat Office Solutions',
    shippingAddress: 'Ministry HQ, Muscat',
    paymentTerms: 'Net 30 Days',
    subtotal: 9500,
    tax: 475,
    totalAmount: 9975,
    trackingCity: 'Muscat',
    items: [
      {
        id: 'oi-13',
        productId: 'prod-10',
        productName: 'Executive Conference Table 12-Seater',
        sku: 'OF-CONF-12',
        category: 'Office & Furniture',
        unitPrice: 950,
        quantity: 10,
        totalPrice: 9500,
        status: 'Delivered'
      }
    ],
    timeline: [
      { status: 'Delivered', label: 'Delivered', date: '24 Jul 2025', completed: true, current: true }
    ],
    activities: [
      { id: 'act-14', timestamp: '24 Jul 2025, 02:00 PM', title: 'Assembled and handed over', description: 'Completed room fitout', iconType: 'deliver' }
    ]
  },
  {
    id: 'ord-115',
    orderNumber: 'ORD-2025-00115',
    orderDate: '2025-07-02',
    expectedDelivery: '2025-07-20',
    organization: 'Ministry of Infrastructure',
    department: 'Safety & Security',
    contract: 'GOV-2024-99',
    orderType: 'Standard Order',
    status: 'Delivered',
    supplierId: 'sup-5',
    supplierName: 'National Safety Co.',
    shippingAddress: 'All Ministry Regional Branches',
    paymentTerms: 'Net 30 Days',
    subtotal: 14500,
    tax: 725,
    totalAmount: 15225,
    trackingCity: 'Muscat',
    items: [
      {
        id: 'oi-14',
        productId: 'prod-20',
        productName: 'IP Security CCTV Bullet Camera 4K AI',
        sku: 'SS-CAM-4K',
        category: 'Safety & Security',
        unitPrice: 145,
        quantity: 100,
        totalPrice: 14500,
        status: 'Delivered'
      }
    ],
    timeline: [
      { status: 'Delivered', label: 'Delivered', date: '18 Jul 2025', completed: true, current: true }
    ],
    activities: [
      { id: 'act-15', timestamp: '18 Jul 2025, 10:00 AM', title: 'Delivered', description: 'Surveillance hardware delivered for perimeter upgrade', iconType: 'deliver' }
    ]
  },
  {
    id: 'ord-114',
    orderNumber: 'ORD-2025-00114',
    orderDate: '2025-06-25',
    expectedDelivery: '2025-07-10',
    organization: 'Ministry of Infrastructure',
    department: 'IT & Digital Transformation',
    contract: 'GOV-2024-95',
    orderType: 'Bulk Purchase',
    status: 'Delivered',
    supplierId: 'sup-3',
    supplierName: 'Al Badr Electronics',
    shippingAddress: 'Ministry HQ, Al Khuwair',
    paymentTerms: 'Net 30 Days',
    subtotal: 42500,
    tax: 2125,
    totalAmount: 44625,
    trackingCity: 'Muscat',
    items: [
      {
        id: 'oi-15',
        productId: 'prod-1',
        productName: 'Dell Latitude 7450 Business Laptop',
        sku: 'IT-LT7450',
        category: 'IT & Electronics',
        unitPrice: 425,
        quantity: 100,
        totalPrice: 42500,
        status: 'Delivered'
      }
    ],
    timeline: [
      { status: 'Delivered', label: 'Delivered', date: '08 Jul 2025', completed: true, current: true }
    ],
    activities: [
      { id: 'act-16', timestamp: '08 Jul 2025, 03:00 PM', title: 'Delivered', description: 'Batch 1 laptop deployment accepted', iconType: 'deliver' }
    ]
  },
  {
    id: 'ord-113',
    orderNumber: 'ORD-2025-00113',
    orderDate: '2025-06-15',
    expectedDelivery: '2025-06-30',
    organization: 'Ministry of Infrastructure',
    department: 'Facility Management',
    contract: 'GOV-2024-91',
    orderType: 'Standard Order',
    status: 'Delivered',
    supplierId: 'sup-6',
    supplierName: 'Oman Cooling & HVAC Tech',
    shippingAddress: 'Sohar Municipal Depot',
    paymentTerms: 'Net 30 Days',
    subtotal: 13300,
    tax: 665,
    totalAmount: 13965,
    trackingCity: 'Sohar',
    items: [
      {
        id: 'oi-16',
        productId: 'prod-16',
        productName: 'LED High-Bay Industrial Fixture 150W',
        sku: 'FM-LED-150W',
        category: 'Facility Management',
        unitPrice: 38,
        quantity: 350,
        totalPrice: 13300,
        status: 'Delivered'
      }
    ],
    timeline: [
      { status: 'Delivered', label: 'Delivered', date: '29 Jun 2025', completed: true, current: true }
    ],
    activities: [
      { id: 'act-17', timestamp: '29 Jun 2025, 09:30 AM', title: 'Delivered', description: 'Warehouse lighting upgrade materials verified', iconType: 'deliver' }
    ]
  },
  {
    id: 'ord-112',
    orderNumber: 'ORD-2025-00112',
    orderDate: '2025-06-05',
    expectedDelivery: '2025-06-20',
    organization: 'Ministry of Infrastructure',
    department: 'Projects & Planning',
    contract: 'GOV-2024-87',
    orderType: 'Standard Order',
    status: 'Cancelled',
    supplierId: 'sup-2',
    supplierName: 'Gulf Industrial Supplies',
    shippingAddress: 'Nizwa Highway Project Office',
    paymentTerms: 'Net 30 Days',
    subtotal: 9200,
    tax: 460,
    totalAmount: 9660,
    trackingCity: 'Muscat',
    items: [
      {
        id: 'oi-17',
        productId: 'prod-24',
        productName: 'Industrial Screw Air Compressor 50 HP',
        sku: 'IE-AC-50HP',
        category: 'Industrial Equipment',
        unitPrice: 4600,
        quantity: 2,
        totalPrice: 9200,
        status: 'Processing'
      }
    ],
    timeline: [
      { status: 'Cancelled', label: 'Order Cancelled', date: '08 Jun 2025', completed: true, current: true }
    ],
    activities: [
      { id: 'act-18', timestamp: '08 Jun 2025, 11:00 AM', title: 'Cancelled', description: 'Specification revised by engineering committee', iconType: 'confirm' }
    ]
  },
  {
    id: 'ord-111',
    orderNumber: 'ORD-2025-00111',
    orderDate: '2025-05-20',
    expectedDelivery: '2025-06-05',
    organization: 'Ministry of Infrastructure',
    department: 'Logistics & Transport',
    contract: 'GOV-2024-82',
    orderType: 'Standard Order',
    status: 'Delivered',
    supplierId: 'sup-1',
    supplierName: 'Oman Logistics Solutions',
    shippingAddress: 'Port Sultan Qaboos, Muscat',
    paymentTerms: 'Net 30 Days',
    subtotal: 16000,
    tax: 800,
    totalAmount: 16800,
    trackingCity: 'Muscat',
    items: [
      {
        id: 'oi-18',
        productId: 'prod-27',
        productName: 'Forklift 3 Ton Diesel',
        sku: 'LT-FL-003',
        category: 'Logistics & Transport',
        unitPrice: 3200,
        quantity: 5,
        totalPrice: 16000,
        status: 'Delivered'
      }
    ],
    timeline: [
      { status: 'Delivered', label: 'Delivered', date: '03 Jun 2025', completed: true, current: true }
    ],
    activities: [
      { id: 'act-19', timestamp: '03 Jun 2025, 01:00 PM', title: 'Delivered', description: 'Port operational team cleared receipt', iconType: 'deliver' }
    ]
  },
  {
    id: 'ord-110',
    orderNumber: 'ORD-2025-00110',
    orderDate: '2025-05-10',
    expectedDelivery: '2025-05-25',
    organization: 'Ministry of Infrastructure',
    department: 'Office & Furniture',
    contract: 'GOV-2024-78',
    orderType: 'Standard Order',
    status: 'Delivered',
    supplierId: 'sup-4',
    supplierName: 'Muscat Office Solutions',
    shippingAddress: 'Ministry HQ, Al Khuwair',
    paymentTerms: 'Net 30 Days',
    subtotal: 12800,
    tax: 640,
    totalAmount: 13440,
    trackingCity: 'Muscat',
    items: [
      {
        id: 'oi-19',
        productId: 'prod-9',
        productName: 'Modular 4-Person Collaboration Workstation',
        sku: 'OF-WS-4P',
        category: 'Office & Furniture',
        unitPrice: 640,
        quantity: 20,
        totalPrice: 12800,
        status: 'Delivered'
      }
    ],
    timeline: [
      { status: 'Delivered', label: 'Delivered', date: '22 May 2025', completed: true, current: true }
    ],
    activities: [
      { id: 'act-20', timestamp: '22 May 2025, 04:30 PM', title: 'Installed', description: 'Floor 2 workstations installed and tested', iconType: 'deliver' }
    ]
  }
];
