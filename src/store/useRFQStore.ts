import { create } from 'zustand';
import { RFQ, RFQItem } from '../types/rfq';
import { initialRFQs } from '../data/rfqs';
import { storage } from '../utils/storage';
import { formatDate } from '../utils/date';
import { initialProducts } from '../data/products';

interface RFQDraftState {
  step: number;
  purpose: string;
  projectReference: string;
  requiredDeliveryDate: string;
  notesToSuppliers: string;
  selectedSuppliers: string[];
  attachments: { name: string; size: string; type: string }[];
  items: RFQItem[];
}

interface RFQState {
  rfqs: RFQ[];
  draft: RFQDraftState;

  // Actions
  setDraftStep: (step: number) => void;
  updateDraftField: <K extends keyof RFQDraftState>(field: K, value: RFQDraftState[K]) => void;
  addDraftItem: (item: Partial<RFQItem>) => void;
  updateDraftItemQuantity: (itemId: string, quantity: number) => void;
  removeDraftItem: (itemId: string) => void;
  submitRFQ: () => RFQ;
  saveDraftAsRFQ: () => RFQ;
  resetDraft: () => void;
  getRFQById: (id: string) => RFQ | undefined;
}

const defaultInitialDraftItems: RFQItem[] = [
  {
    id: 'draft-item-1',
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
    id: 'draft-item-2',
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
    id: 'draft-item-3',
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
];

const initialDraft: RFQDraftState = {
  step: 1,
  purpose: 'Standard Procurement',
  projectReference: '',
  requiredDeliveryDate: '2026-09-30',
  notesToSuppliers: '',
  selectedSuppliers: ['sup-1', 'sup-3'],
  attachments: [],
  items: defaultInitialDraftItems
};

export const useRFQStore = create<RFQState>((set, get) => {
  const savedRFQs = storage.get<RFQ[]>('rfqs_list', initialRFQs);
  const savedDraft = storage.get<RFQDraftState>('rfq_current_draft', initialDraft);

  return {
    rfqs: savedRFQs,
    draft: savedDraft,

    getRFQById: (id: string) => {
      return get().rfqs.find(r => r.id === id || r.rfqNumber.toLowerCase() === id.toLowerCase());
    },

    setDraftStep: (step) => {
      const updatedDraft = { ...get().draft, step };
      storage.set('rfq_current_draft', updatedDraft);
      set({ draft: updatedDraft });
    },

    updateDraftField: (field, value) => {
      const updatedDraft = { ...get().draft, [field]: value };
      storage.set('rfq_current_draft', updatedDraft);
      set({ draft: updatedDraft });
    },

    addDraftItem: (item) => {
      const prod = initialProducts.find(p => p.id === item.productId);
      const unitPrice = item.estimatedUnitPrice || prod?.price || 100;
      const qty = item.estimatedQuantity || 10;
      const newItem: RFQItem = {
        id: 'draft-item-' + Date.now(),
        productId: item.productId || 'prod-custom',
        productName: item.productName || prod?.name || 'Custom Specification Item',
        category: item.category || prod?.category || 'General',
        specification: item.specification || 'Standard Government Specification',
        estimatedQuantity: qty,
        unit: item.unit || 'Nos',
        estimatedUnitPrice: unitPrice,
        estimatedSubtotal: unitPrice * qty,
        image: prod?.image
      };

      const updatedItems = [...get().draft.items, newItem];
      const updatedDraft = { ...get().draft, items: updatedItems };
      storage.set('rfq_current_draft', updatedDraft);
      set({ draft: updatedDraft });
    },

    updateDraftItemQuantity: (itemId, quantity) => {
      const q = Math.max(1, quantity);
      const updatedItems = get().draft.items.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            estimatedQuantity: q,
            estimatedSubtotal: item.estimatedUnitPrice * q
          };
        }
        return item;
      });

      const updatedDraft = { ...get().draft, items: updatedItems };
      storage.set('rfq_current_draft', updatedDraft);
      set({ draft: updatedDraft });
    },

    removeDraftItem: (itemId) => {
      const updatedItems = get().draft.items.filter(item => item.id !== itemId);
      const updatedDraft = { ...get().draft, items: updatedItems };
      storage.set('rfq_current_draft', updatedDraft);
      set({ draft: updatedDraft });
    },

    submitRFQ: () => {
      const { draft, rfqs } = get();
      const nextNum = 9 + (rfqs.length - initialRFQs.length);
      const rfqNumber = `RFQ-2026-00${nextNum < 10 ? '0' + nextNum : nextNum}`;
      const today = formatDate(new Date());

      const estimatedTotal = draft.items.reduce((sum, item) => sum + item.estimatedSubtotal, 0);

      const newRFQ: RFQ = {
        id: `rfq-2026-${nextNum}`,
        rfqNumber,
        title: draft.projectReference ? `Procurement for ${draft.projectReference}` : 'General Ministry Requisition',
        status: 'Submitted',
        createdOn: today,
        createdBy: 'Ahmed Al Maskari',
        organization: 'Ministry of Infrastructure',
        department: 'Procurement',
        purpose: draft.purpose,
        projectReference: draft.projectReference,
        requiredDeliveryDate: draft.requiredDeliveryDate,
        notesToSuppliers: draft.notesToSuppliers,
        attachments: draft.attachments,
        selectedSuppliers: draft.selectedSuppliers,
        items: [...draft.items],
        estimatedTotal
      };

      const updated = [newRFQ, ...rfqs];
      storage.set('rfqs_list', updated);
      set({ rfqs: updated });
      get().resetDraft();
      return newRFQ;
    },

    saveDraftAsRFQ: () => {
      const { draft, rfqs } = get();
      const rfqNumber = 'RFQ-2025-0008';
      const estimatedTotal = draft.items.reduce((sum, item) => sum + item.estimatedSubtotal, 0);

      const draftRFQ: RFQ = {
        id: 'rfq-008',
        rfqNumber,
        title: 'Executive IT & Office Infrastructure Refresh',
        status: 'Draft',
        createdOn: '18 Aug 2025',
        createdBy: 'Ahmed Al Maskari',
        organization: 'Ministry of Infrastructure',
        department: 'Procurement',
        purpose: draft.purpose,
        projectReference: draft.projectReference || 'PRJ-MOI-2025-Q3',
        requiredDeliveryDate: draft.requiredDeliveryDate,
        notesToSuppliers: draft.notesToSuppliers,
        attachments: draft.attachments,
        selectedSuppliers: draft.selectedSuppliers,
        items: [...draft.items],
        estimatedTotal
      };

      const existingIndex = rfqs.findIndex(r => r.id === 'rfq-008');
      let updated: RFQ[];
      if (existingIndex >= 0) {
        updated = [...rfqs];
        updated[existingIndex] = draftRFQ;
      } else {
        updated = [draftRFQ, ...rfqs];
      }

      storage.set('rfqs_list', updated);
      set({ rfqs: updated });
      return draftRFQ;
    },

    resetDraft: () => {
      storage.set('rfq_current_draft', initialDraft);
      set({ draft: initialDraft });
    }
  };
});
