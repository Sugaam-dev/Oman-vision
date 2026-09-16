export interface ProcurementInsight {
  id: string;
  title: string;
  tag?: string;
  description: string;
  type: 'recommendation' | 'predictive' | 'spend' | 'risk' | 'sustainability';
  actionText: string;
  actionRoute: string;
}

export const initialInsights: ProcurementInsight[] = [
  {
    id: 'ins-1',
    title: 'Recommended for You',
    tag: 'Beta',
    description: 'Based on your past orders, we recommend restocking Office Supplies (A4 Paper, Toner) and Ergonomic Chairs before Q4 projects start.',
    type: 'recommendation',
    actionText: 'View Products',
    actionRoute: '/products?category=Office%20%26%20Furniture'
  },
  {
    id: 'ins-2',
    title: 'Predictive Demand',
    tag: 'Forecast',
    description: 'Your organization’s inventory for Safety Equipment is likely to run low in 4 weeks based on civil engineering expansion in Sohar.',
    type: 'predictive',
    actionText: 'Create Bulk Order',
    actionRoute: '/bulk-order'
  },
  {
    id: 'ins-3',
    title: 'Spend Analysis',
    tag: 'Spend',
    description: 'Procurement spend increased by 12% this quarter. IT & Electronics represents 38% of total expenditure. Consider consolidating orders.',
    type: 'spend',
    actionText: 'View Details',
    actionRoute: '/reports'
  },
  {
    id: 'ins-4',
    title: 'Delivery Risk Alert',
    tag: 'Alert',
    description: '2 key orders have potential delivery delays in the next 30 days due to port congestion. Alternative routing available via Sohar highway.',
    type: 'risk',
    actionText: 'Check Orders',
    actionRoute: '/orders'
  },
  {
    id: 'ins-5',
    title: 'Sustainability Opportunity',
    tag: 'Eco',
    description: '15% of your procurements can be sourced from eco-friendly alternatives with verified energy-star certifications.',
    type: 'sustainability',
    actionText: 'Explore Options',
    actionRoute: '/products?category=Facility%20Management'
  }
];
