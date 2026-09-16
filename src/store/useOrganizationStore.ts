import { create } from 'zustand';
import { User, UserRole, UserStatus, RolePermission } from '../types/user';
import { Department } from '../types/organization';
import { initialUsers, initialRolePermissions } from '../data/users';
import { initialDepartments } from '../data/departments';
import { storage } from '../utils/storage';

interface OrganizationState {
  departments: Department[];
  users: User[];
  rolePermissions: RolePermission[];
  selectedDepartmentId: string;

  // Actions
  setSelectedDepartment: (deptId: string) => void;
  addUser: (userData: Omit<User, 'id' | 'avatarInitials' | 'lastLogin'>) => User;
  editUser: (id: string, updates: Partial<User>) => void;
  toggleUserStatus: (id: string) => void;
  updateRolePermission: (role: UserRole, permKey: keyof RolePermission['permissions'], value: boolean) => void;
}

export const useOrganizationStore = create<OrganizationState>((set, get) => {
  const savedUsers = storage.get<User[]>('org_users', initialUsers);
  const savedPerms = storage.get<RolePermission[]>('org_role_permissions', initialRolePermissions);

  return {
    departments: initialDepartments,
    users: savedUsers,
    rolePermissions: savedPerms,
    selectedDepartmentId: 'dept-proc',

    setSelectedDepartment: (deptId: string) => set({ selectedDepartmentId: deptId }),

    addUser: (userData) => {
      const initials = userData.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

      const newUser: User = {
        id: 'user-' + Date.now(),
        ...userData,
        avatarInitials: initials,
        lastLogin: 'Just registered'
      };

      const updated = [newUser, ...get().users];
      storage.set('org_users', updated);
      set({ users: updated });
      return newUser;
    },

    editUser: (id, updates) => {
      const updated = get().users.map(u => u.id === id ? { ...u, ...updates } : u);
      storage.set('org_users', updated);
      set({ users: updated });
    },

    toggleUserStatus: (id) => {
      const updated = get().users.map(u => {
        if (u.id === id) {
          const nextStatus: UserStatus = u.status === 'Active' ? 'Inactive' : 'Active';
          return { ...u, status: nextStatus };
        }
        return u;
      });
      storage.set('org_users', updated);
      set({ users: updated });
    },

    updateRolePermission: (role, permKey, value) => {
      const updated = get().rolePermissions.map(rp => {
        if (rp.role === role) {
          return {
            ...rp,
            permissions: {
              ...rp.permissions,
              [permKey]: value
            }
          };
        }
        return rp;
      });
      storage.set('org_role_permissions', updated);
      set({ rolePermissions: updated });
    }
  };
});
