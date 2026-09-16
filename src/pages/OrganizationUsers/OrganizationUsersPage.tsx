import React, { useState, useMemo } from 'react';
import {
  Building2,
  Users2,
  ShieldCheck,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Minus,
  Maximize2,
  Edit2,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  Unlock,
  Building,
  UserCheck,
  UserX
} from 'lucide-react';
import { useOrganizationStore } from '../../store/useOrganizationStore';
import { useAppStore } from '../../store/useAppStore';
import { User, UserRole, UserStatus } from '../../types/user';
import { StatusBadge } from '../../components/common/Badge';
import { Pagination } from '../../components/common/Pagination';

export const OrganizationUsersPage: React.FC = () => {
  const {
    departments,
    users,
    rolePermissions,
    selectedDepartmentId,
    setSelectedDepartment,
    addUser,
    editUser,
    toggleUserStatus,
    updateRolePermission
  } = useOrganizationStore();

  const { organization, showToast } = useAppStore();

  // Tabs: Organization Structure, Users, Roles & Permissions, Activity Log
  const [activeTab, setActiveTab] = useState<'structure' | 'users' | 'roles' | 'activity'>('structure');

  // Search & Filters for Users table
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Modals
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form State
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'Buyer' as UserRole,
    department: 'Procurement',
    phone: ''
  });

  // Current active department data
  const selectedDept = departments.find(d => d.id === selectedDepartmentId) || departments[0];

  // Filtered users
  const departmentUsers = useMemo(() => {
    return users.filter(u => {
      // If we are on structure tab, filter to selected department; if on Users tab, show across ministry
      if (activeTab === 'structure' && !u.department.toLowerCase().includes(selectedDept.name.toLowerCase().split(' ')[0])) {
        return false;
      }
      if (roleFilter !== 'All' && u.role !== roleFilter) return false;
      if (statusFilter !== 'All' && u.status !== statusFilter) return false;
      if (userSearch.trim()) {
        const q = userSearch.toLowerCase();
        return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
      }
      return true;
    });
  }, [users, activeTab, selectedDept, roleFilter, statusFilter, userSearch]);

  const totalPages = Math.max(1, Math.ceil(departmentUsers.length / pageSize));
  const paginatedUsers = departmentUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email) {
      showToast('Name and email are required', 'error');
      return;
    }

    addUser({
      name: userForm.name,
      email: userForm.email,
      role: userForm.role,
      department: userForm.department,
      status: 'Active',
      phone: userForm.phone
    });

    showToast(`Added ${userForm.name} to ${userForm.department}`, 'success');
    setAddUserModalOpen(false);
    setUserForm({ name: '', email: '', role: 'Buyer', department: 'Procurement', phone: '' });
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    editUser(editingUser.id, {
      name: editingUser.name,
      email: editingUser.email,
      role: editingUser.role,
      department: editingUser.department
    });

    showToast(`Updated user profile for ${editingUser.name}`, 'success');
    setEditingUser(null);
  };

  const handleToggleStatus = (id: string, name: string) => {
    toggleUserStatus(id);
    showToast(`Status toggled for ${name}`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Organization & Users
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your organization structure, teams and user access permissions.
          </p>
        </div>

        <button
          onClick={() => showToast('Add Department wizard initialized', 'info')}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Tabs Row matching screenshot 1_7 */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-bold text-slate-500">
        {[
          { key: 'structure', label: 'Organization Structure' },
          { key: 'users', label: 'Users' },
          { key: 'roles', label: 'Roles & Permissions' },
          { key: 'activity', label: 'Activity Log' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === tab.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top 5 Stat Cards matching screenshot 1_7 */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">{organization.name}</h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              Active
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">{departments.length}</div>
            <span className="text-[11px] text-slate-400">Departments</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center shrink-0">
            <Users2 className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">{users.length}</div>
            <span className="text-[11px] text-slate-400">Total Users</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">12</div>
            <span className="text-[11px] text-slate-400">Administrators</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Users2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">44</div>
            <span className="text-[11px] text-slate-400">Standard Users</span>
          </div>
        </div>
      </div>

      {/* TAB 1: STRUCTURE & MAIN WORKFLOW */}
      {activeTab === 'structure' && (
        <div className="space-y-6">
          {/* Visual Org Structure Tree Diagram matching screenshot 1_7 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Organization Structure</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <button className="p-1.5 border border-slate-200 rounded hover:bg-slate-50"><Minus className="w-3.5 h-3.5" /></button>
                <span className="px-2 font-mono">100%</span>
                <button className="p-1.5 border border-slate-200 rounded hover:bg-slate-50"><Plus className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 border border-slate-200 rounded hover:bg-slate-50"><Maximize2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            {/* Tree Nodes Diagram */}
            <div className="flex flex-col items-center space-y-8 overflow-x-auto py-4">
              {/* Root Node: Ministry of Infrastructure */}
              <div className="p-3.5 px-6 rounded-xl bg-blue-600 text-white shadow-md flex items-center gap-3 border border-blue-700">
                <Building className="w-5 h-5 text-teal-300" />
                <div className="text-left">
                  <h4 className="font-bold text-xs">{organization.name}</h4>
                  <span className="text-[10px] text-blue-100">Head Office • {users.length} Users</span>
                </div>
              </div>

              {/* Department Nodes Row */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full max-w-5xl">
                {departments.map((dept) => {
                  const isSelected = selectedDept.id === dept.id;
                  return (
                    <div
                      key={dept.id}
                      onClick={() => setSelectedDepartment(dept.id)}
                      className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 shadow-sm ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/40 hover:bg-white'
                      }`}
                    >
                      <h5 className="font-bold text-slate-900 text-xs truncate">{dept.name}</h5>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{dept.userCount} Users</span>

                      {/* Sub-departments pills */}
                      {dept.subDepartments && dept.subDepartments.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-200/60 space-y-1">
                          {dept.subDepartments.map(sub => (
                            <div key={sub.id} className="text-[9px] text-slate-600 bg-white p-1 rounded border border-slate-100 truncate">
                              {sub.name} ({sub.userCount})
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Department Details and Users Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left 8 cols: Users in Selected Department */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Users in {selectedDept.name} ({departmentUsers.length})
                </h3>

                <button
                  onClick={() => setAddUserModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Add User</span>
                </button>
              </div>

              {/* Search & Role Filters */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search users by name, email or role..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
                >
                  <option value="All">All Roles</option>
                  <option value="Department Admin">Department Admin</option>
                  <option value="Procurement Manager">Procurement Manager</option>
                  <option value="Buyer">Buyer</option>
                  <option value="Viewer">Viewer</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
                >
                  <option value="All">Status: All</option>
                  <option value="Active">Status: Active</option>
                  <option value="Inactive">Status: Inactive</option>
                </select>
              </div>

              {/* Users Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px]">
                    <tr>
                      <th className="p-3 w-8 text-center">
                        <input type="checkbox" className="rounded text-blue-600 w-3.5 h-3.5 border-slate-300" />
                      </th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Department</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Last Login</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {paginatedUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/70">
                        <td className="p-3 text-center">
                          <input type="checkbox" className="rounded text-blue-600 w-3.5 h-3.5 border-slate-300" />
                        </td>

                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-[10px]">
                              {u.avatarInitials}
                            </div>
                            <span className="font-bold text-slate-900">{u.name}</span>
                          </div>
                        </td>

                        <td className="p-3 text-slate-500">{u.email}</td>

                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            u.role === 'Department Admin'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : u.role === 'Procurement Manager'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : u.role === 'Buyer'
                              ? 'bg-teal-50 text-teal-700 border border-teal-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {u.role}
                          </span>
                        </td>

                        <td className="p-3 text-slate-600">{u.department}</td>

                        <td className="p-3">
                          <StatusBadge status={u.status} size="sm" />
                        </td>

                        <td className="p-3 text-slate-500 text-[11px]">{u.lastLogin}</td>

                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingUser(u)}
                              className="p-1 text-slate-400 hover:text-blue-600 rounded"
                              title="Edit user"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleToggleStatus(u.id, u.name)}
                              className={`p-1 rounded ${u.status === 'Active' ? 'text-slate-400 hover:text-rose-600' : 'text-slate-400 hover:text-emerald-600'}`}
                              title={u.status === 'Active' ? 'Deactivate user' : 'Activate user'}
                            >
                              {u.status === 'Active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {departmentUsers.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={departmentUsers.length}
                  pageSize={pageSize}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={(size) => {
                    setPageSize(size);
                    setCurrentPage(1);
                  }}
                  pageSizeOptions={[5, 10, 20]}
                />
              )}
            </div>

            {/* Right 4 cols: Department Details Card + Recent Activity matching screenshot 1_7 */}
            <div className="lg:col-span-4 space-y-4">
              {/* Department Details Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Department Details
                  </h3>
                  <button
                    onClick={() => showToast('Edit department dialog opened', 'info')}
                    className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900">{selectedDept.name}</h4>
                    <span className="text-[10px] text-slate-400">Strategic sourcing and vendor management</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs border-y border-slate-100 py-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Department Head:</span>
                    <span className="font-bold text-slate-900">{selectedDept.headName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Users:</span>
                    <span className="font-semibold text-slate-800">{selectedDept.userCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Parent Department:</span>
                    <span className="font-semibold text-slate-800">{selectedDept.parentDepartment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-semibold text-slate-800">{selectedDept.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Description:</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{selectedDept.description}</p>
                  </div>
                </div>

                {/* Quick Actions List matching screenshot */}
                <div className="space-y-1.5 pt-1">
                  <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Quick Actions
                  </h5>
                  <button
                    onClick={() => showToast('Add Sub-Department form ready', 'info')}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="w-3.5 h-3.5 text-blue-600" />
                      <span>Add Sub-Department</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={() => setAddUserModalOpen(true)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-3.5 h-3.5 text-blue-600" />
                      <span>Add User</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={() => setActiveTab('roles')}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-700"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                      <span>Manage Roles & Permissions</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Recent Activity Panel matching screenshot 1_7 */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Recent Activity
                  </h3>
                  <span className="text-xs text-blue-600 font-semibold cursor-pointer">View All</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <UserPlus className="w-3 h-3" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900">New user added</h5>
                      <p className="text-[11px] text-slate-500 leading-tight">Ali Al Mahrouqi joined Procurement Department</p>
                      <span className="text-[9px] text-slate-400">2 hours ago</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-3 h-3" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900">Role updated</h5>
                      <p className="text-[11px] text-slate-500 leading-tight">Sara Khan assigned as Buyer</p>
                      <span className="text-[9px] text-slate-400">5 hours ago</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Building className="w-3 h-3" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900">Department updated</h5>
                      <p className="text-[11px] text-slate-500 leading-tight">Department details modified</p>
                      <span className="text-[9px] text-slate-400">1 day ago</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                      <UserX className="w-3 h-3" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900">User deactivated</h5>
                      <p className="text-[11px] text-slate-500 leading-tight">Khalid Al Zadjali's account deactivated</p>
                      <span className="text-[9px] text-slate-400">3 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ALL USERS DIRECTORY */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Ministry Staff Directory ({users.length} Users)</h3>
            <button
              onClick={() => setAddUserModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-xs shadow-xs flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Staff Member</span>
            </button>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center text-[10px]">
                        {u.avatarInitials}
                      </div>
                      <span>{u.name}</span>
                    </td>
                    <td className="p-3 text-slate-600">{u.email}</td>
                    <td className="p-3">{u.department}</td>
                    <td className="p-3">{u.role}</td>
                    <td className="p-3"><StatusBadge status={u.status} size="sm" /></td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleToggleStatus(u.id, u.name)}
                        className="text-xs text-blue-600 hover:underline font-medium"
                      >
                        {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ROLES & PERMISSIONS MATRIX */}
      {activeTab === 'roles' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Roles & Access Control Matrix</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure sovereign procurement authorities and module access rules.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="p-3">Role</th>
                  <th className="p-3 text-center">Product Catalog</th>
                  <th className="p-3 text-center">RFQ Management</th>
                  <th className="p-3 text-center">Order Placement</th>
                  <th className="p-3 text-center">Order Tracking</th>
                  <th className="p-3 text-center">Suppliers</th>
                  <th className="p-3 text-center">Reports & Analytics</th>
                  <th className="p-3 text-center">User Management</th>
                  <th className="p-3 text-center">AI Assistant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rolePermissions.map((rp) => (
                  <tr key={rp.role} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">
                      <div>{rp.role}</div>
                      <span className="text-[10px] text-slate-400 font-normal">{rp.description}</span>
                    </td>
                    {(Object.keys(rp.permissions) as (keyof typeof rp.permissions)[]).map(key => (
                      <td key={key} className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={rp.permissions[key]}
                          onChange={(e) => updateRolePermission(rp.role, key, e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: ACTIVITY LOG */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Ministry Audit Activity Trail</h3>
          <div className="space-y-3">
            {[
              { title: 'User account created', desc: 'Ali Al Mahrouqi added by Ahmed Al Maskari', time: '2 hours ago', icon: <UserPlus className="w-4 h-4 text-emerald-600" /> },
              { title: 'Permission updated', desc: 'Sara Khan assigned Buyer rights on IT Catalog', time: '5 hours ago', icon: <ShieldCheck className="w-4 h-4 text-blue-600" /> },
              { title: 'Department updated', desc: 'Department details modified by Organization Admin', time: '1 day ago', icon: <Building className="w-4 h-4 text-purple-600" /> },
              { title: 'Account deactivated', desc: 'Khalid Al Zadjali account suspended pending transfer', time: '3 days ago', icon: <UserX className="w-4 h-4 text-rose-600" /> },
              { title: 'Bulk Order approved', desc: 'Purchase requisition #ORD-2025-00124 approved', time: '4 days ago', icon: <CheckCircle2 className="w-4 h-4 text-teal-600" /> },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="p-2 rounded-lg bg-white shadow-2xs shrink-0">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-slate-900">{item.title}</h5>
                    <span className="text-[10px] text-slate-400">{item.time}</span>
                  </div>
                  <p className="text-slate-600 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {addUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900">Add New Organization User</h3>
              <button onClick={() => setAddUserModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Salim Al Rawahi"
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Government Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@moi.gov.om"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={userForm.department}
                    onChange={(e) => setUserForm({ ...userForm, department: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Procurement">Procurement</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
                    <option value="IT & Digital Transformation">IT & Digital</option>
                    <option value="Projects & Planning">Projects & Planning</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Role</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Buyer">Buyer</option>
                    <option value="Procurement Manager">Procurement Manager</option>
                    <option value="Department Admin">Department Admin</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setAddUserModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-bold shadow-xs"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900">Edit User: {editingUser.name}</h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={editingUser.department}
                    onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Procurement">Procurement</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
                    <option value="IT & Digital Transformation">IT & Digital</option>
                    <option value="Projects & Planning">Projects & Planning</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Organization Admin">Organization Admin</option>
                    <option value="Department Admin">Department Admin</option>
                    <option value="Procurement Manager">Procurement Manager</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-bold shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
