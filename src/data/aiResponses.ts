import { AIMessage } from '../types/ai';

export function matchAIResponse(input: string): AIMessage {
  const query = input.toLowerCase().trim();
  const id = 'msg-' + Date.now();
  const timestamp = 'Just now';

  // 1. Order status / check orders
  if (query.includes('order') || query.includes('status') || query.includes('track') || query.includes('shipment')) {
    return {
      id,
      sender: 'assistant',
      timestamp,
      text: 'Here are your active government procurement orders for the Ministry of Infrastructure. Order ORD-2025-00124 is currently in transit near Sohar:',
      intent: 'ORDER_STATUS',
      tableData: {
        headers: ['Order Number', 'Date', 'Supplier', 'Amount (OMR)', 'Status'],
        rows: [
          ['ORD-2025-00124', '12 Aug 2025', 'Al Badr Electronics', 'OMR 37,850', 'In Fulfillment'],
          ['ORD-2025-00123', '10 Aug 2025', 'Gulf Industrial Supplies', 'OMR 18,500', 'Confirmed'],
          ['ORD-2025-00122', '05 Aug 2025', 'Oman Logistics Solutions', 'OMR 125,000', 'In Fulfillment'],
        ]
      },
      actions: [
        { label: 'View Order ORD-2025-00124', route: '/orders/ord-124', actionType: 'navigate', isPrimary: true },
        { label: 'Track All Orders', route: '/orders', actionType: 'navigate' }
      ]
    };
  }

  // 2. Create RFQ
  if (query.includes('rfq') || query.includes('quote') || query.includes('quotation')) {
    return {
      id,
      sender: 'assistant',
      timestamp,
      text: 'I can help you initiate a Request for Quote (RFQ) according to the Tender Board regulations. You currently have 1 draft RFQ (RFQ-2025-0008) in progress.',
      intent: 'CREATE_RFQ',
      actions: [
        { label: 'Start New RFQ Wizard', route: '/rfq', actionType: 'navigate', isPrimary: true },
        { label: 'Resume Draft RFQ-2025-0008', route: '/rfq/rfq-008', actionType: 'navigate' }
      ]
    };
  }

  // 3. Spend / reports
  if (query.includes('spend') || query.includes('report') || query.includes('budget') || query.includes('analytics')) {
    return {
      id,
      sender: 'assistant',
      timestamp,
      text: 'Here is your Year-To-Date procurement spend summary for the Ministry of Infrastructure across core departments:',
      intent: 'SPEND_REPORT',
      tableData: {
        headers: ['Department', 'Spend (OMR)', 'Share %', 'Active Contracts'],
        rows: [
          ['Procurement & General', 'OMR 339,815', '38%', '12'],
          ['Operations & Logistics', 'OMR 196,735', '22%', '8'],
          ['Finance & Administration', 'OMR 134,137', '15%', '5'],
          ['IT & Digital Transformation', 'OMR 116,252', '13%', '6'],
          ['Projects & Planning', 'OMR 107,311', '12%', '4']
        ]
      },
      actions: [
        { label: 'Open Reports & Analytics', route: '/reports', actionType: 'navigate', isPrimary: true },
        { label: 'Generate Custom Audit Report', route: '/reports?action=custom', actionType: 'navigate' }
      ]
    };
  }

  // 4. Compliance / policy / guidelines
  if (query.includes('compliance') || query.includes('policy') || query.includes('guideline') || query.includes('regulation') || query.includes('law')) {
    return {
      id,
      sender: 'assistant',
      timestamp,
      text: 'Under Oman Royal Decree on Government Tenders & Vision 2040 procurement policies:\n\n1. In-Country Value (ICV): At least 15% of annual procurement budget must be awarded to Riyada-certified Omani SMEs.\n2. Competitive Quotations: Requisitions exceeding OMR 5,000 require minimum 3 registered supplier quotes.\n3. Value Added Tax: Standard 5% VAT must be itemized on all purchase orders unless specific ministerial exemption is attached.\n4. Payment Terms: Standard Net 30 Days apply upon verified technical inspection.',
      intent: 'COMPLIANCE',
      actions: [
        { label: 'View Procurement Policy Document', route: '/help', actionType: 'navigate', isPrimary: true },
        { label: 'Check Supplier Certifications', route: '/suppliers', actionType: 'navigate' }
      ]
    };
  }

  // 5. Bulk Order
  if (query.includes('bulk') || query.includes('cart') || query.includes('purchase')) {
    return {
      id,
      sender: 'assistant',
      timestamp,
      text: 'You can consolidate standard catalog products into a single Bulk Order with volume discounts applied automatically.',
      intent: 'BULK_ORDER',
      actions: [
        { label: 'Go to Bulk Order Screen', route: '/bulk-order', actionType: 'navigate', isPrimary: true },
        { label: 'Browse Product Catalog', route: '/products', actionType: 'navigate' }
      ]
    };
  }

  // 6. Laptop / Dell / IT equipment
  if (query.includes('laptop') || query.includes('dell') || query.includes('computer') || query.includes('pc') || query.includes('screen') || query.includes('monitor')) {
    return {
      id,
      sender: 'assistant',
      timestamp,
      text: 'Here are the government-approved enterprise laptops matching your search criteria with OS (Omani Standard) certification:',
      intent: 'PRODUCT_SEARCH',
      productCards: [
        {
          id: 'prod-1',
          name: 'Dell Latitude 7450 Business Laptop',
          price: 425,
          sku: 'IT-LT7450',
          image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&auto=format&fit=crop&q=80',
          category: 'IT & Electronics',
          availability: 'In Stock'
        },
        {
          id: 'prod-2',
          name: 'HP EliteBook 840 G10 Enterprise',
          price: 460,
          sku: 'IT-EB840',
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&auto=format&fit=crop&q=80',
          category: 'IT & Electronics',
          availability: 'In Stock'
        }
      ],
      actions: [
        { label: 'View Dell Latitude 7450 Details', route: '/products/prod-1', actionType: 'navigate', isPrimary: true },
        { label: 'Compare Models', route: '/products/compare', actionType: 'navigate' }
      ]
    };
  }

  // 7. General greeting / fallback
  return {
    id,
    sender: 'assistant',
    timestamp,
    text: `I understood you are looking for assistance with: "${input}".\n\nI can help you search the catalog, review your orders, inspect spend analytics, create RFQs, or explain Oman Vision 2040 procurement rules. How would you like to proceed?`,
    intent: 'GENERAL',
    actions: [
      { label: 'Check Status of Orders', route: '/orders', actionType: 'navigate', isPrimary: true },
      { label: 'Create a new RFQ', route: '/rfq', actionType: 'navigate' },
      { label: 'View Spend Reports', route: '/reports', actionType: 'navigate' }
    ]
  };
}
