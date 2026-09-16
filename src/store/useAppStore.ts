import { create } from 'zustand';
import { User } from '../types/user';
import { Organization } from '../types/organization';
import { initialUsers } from '../data/users';
import { initialOrganization } from '../data/departments';
import { storage } from '../utils/storage';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'RFQ' | 'Order' | 'Policy' | 'Supplier' | 'Approval';
  read: boolean;
  linkRoute?: string;
}

export interface ToastMessage {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'RFQ Response Received',
    message: 'Al Badr Electronics submitted a technical proposal for RFQ-2025-0007.',
    timestamp: '10 minutes ago',
    category: 'RFQ',
    read: false,
    linkRoute: '/rfq/rfq-007'
  },
  {
    id: 'notif-2',
    title: 'Order Status Changed',
    message: 'Order ORD-2025-00124 is now Out for Delivery towards Sohar warehouse.',
    timestamp: '1 hour ago',
    category: 'Order',
    read: false,
    linkRoute: '/orders/ord-124'
  },
  {
    id: 'notif-3',
    title: 'New Procurement Policy',
    message: 'Ministry of Finance released updated local ICV weighting rules for tenders.',
    timestamp: '4 hours ago',
    category: 'Policy',
    read: false,
    linkRoute: '/help'
  },
  {
    id: 'notif-4',
    title: 'Supplier Quotation Received',
    message: 'Gulf Industrial Supplies sent revised pricing for Diesel Generators.',
    timestamp: 'Yesterday',
    category: 'Supplier',
    read: true,
    linkRoute: '/rfq/rfq-008'
  },
  {
    id: 'notif-5',
    title: 'Approval Required',
    message: 'Bulk purchase requisition #883 requires Procurement Manager sign-off.',
    timestamp: '2 days ago',
    category: 'Approval',
    read: true,
    linkRoute: '/bulk-order'
  }
];

interface AppState {
  currentUser: User;
  organization: Organization;
  isAuthenticated: boolean;
  sidebarCollapsed: boolean;
  notifications: AppNotification[];
  toasts: ToastMessage[];
  searchModalOpen: boolean;

  // Actions
  login: (user?: User) => void;
  logout: () => void;
  switchPersona: (userId: string) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning', title?: string) => void;
  removeToast: (id: string) => void;
  setSearchModalOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => {
  const savedUser = storage.get<User>('current_user', initialUsers[0]);
  const savedAuth = storage.get<boolean>('is_authenticated', true);
  const savedNotifications = storage.get<AppNotification[]>('notifications', initialNotifications);

  return {
    currentUser: savedUser,
    organization: initialOrganization,
    isAuthenticated: savedAuth,
    sidebarCollapsed: false,
    notifications: savedNotifications,
    toasts: [],
    searchModalOpen: false,

    login: (user) => {
      const u = user || initialUsers[0];
      storage.set('current_user', u);
      storage.set('is_authenticated', true);
      set({ currentUser: u, isAuthenticated: true });
    },

    logout: () => {
      storage.set('is_authenticated', false);
      set({ isAuthenticated: false });
    },

    switchPersona: (userId) => {
      const found = initialUsers.find(u => u.id === userId) || initialUsers[0];
      storage.set('current_user', found);
      set({ currentUser: found });
      get().showToast(`Switched active user to ${found.name} (${found.role})`, 'info');
    },

    toggleSidebar: () => set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

    markNotificationAsRead: (id) => {
      const updated = get().notifications.map(n => n.id === id ? { ...n, read: true } : n);
      storage.set('notifications', updated);
      set({ notifications: updated });
    },

    markAllNotificationsRead: () => {
      const updated = get().notifications.map(n => ({ ...n, read: true }));
      storage.set('notifications', updated);
      set({ notifications: updated });
    },

    showToast: (message, type = 'success', title) => {
      const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 5);
      const newToast: ToastMessage = { id, message, type, title };
      set(state => ({ toasts: [...state.toasts, newToast] }));
      setTimeout(() => {
        get().removeToast(id);
      }, 4000);
    },

    removeToast: (id) => {
      set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }));
    },

    setSearchModalOpen: (open) => set({ searchModalOpen: open }),
  };
});
