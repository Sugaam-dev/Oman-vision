export interface Announcement {
  id: string;
  title: string;
  date: string;
  description: string;
  category: 'Policy' | 'Product' | 'System' | 'Contract';
  iconType: 'megaphone' | 'document' | 'info' | 'shield';
  isImportant?: boolean;
}

export const initialAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'New Products Added',
    date: '10 Aug 2025',
    description: 'Explore our latest range of energy-efficient industrial lighting solutions and eco-friendly cooling equipment.',
    category: 'Product',
    iconType: 'megaphone'
  },
  {
    id: 'ann-2',
    title: 'Updated Procurement Guidelines',
    date: '05 Aug 2025',
    description: 'Please review the revised Sultanate government procurement policy regarding mandatory local value addition (ICV) thresholds.',
    category: 'Policy',
    iconType: 'document',
    isImportant: true
  },
  {
    id: 'ann-3',
    title: 'New Sustainable Procurement Guidelines',
    date: '28 Jul 2026',
    description: 'Focus on environmentally friendly products and vendors with verified carbon neutrality roadmaps.',
    category: 'Policy',
    iconType: 'shield'
  },
  {
    id: 'ann-4',
    title: 'Scheduled System Maintenance',
    date: '20 Jul 2026',
    description: 'Scheduled maintenance on 22 Jul 2026, 10:00 PM – 2:00 AM (OMT) for high-availability database replication.',
    category: 'System',
    iconType: 'info'
  },
  {
    id: 'ann-5',
    title: 'Quarterly Vendor Compliance Audit Complete',
    date: '15 Jul 2025',
    description: 'All 198 registered suppliers have submitted updated tax certificates and commercial registrations.',
    category: 'Contract',
    iconType: 'document'
  },
  {
    id: 'ann-6',
    title: 'Oman Vision 2040 SME Quota Achieved',
    date: '01 Jul 2025',
    description: 'Ministry of Infrastructure exceeded 15% procurement spend with certified Omani SME enterprises this quarter.',
    category: 'Policy',
    iconType: 'megaphone'
  }
];
