import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, User, Mail, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import pmrgLogo from '../../assets/logo_pmrg.png';
import { useAppStore } from '../../store/useAppStore';
import { useOrganizationStore } from '../../store/useOrganizationStore';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, showToast } = useAppStore();
  const addUser = useOrganizationStore(state => state.addUser);

  const [formData, setFormData] = useState({
    name: 'Sultan Al Qasmi',
    email: 'sultan.qasmi@moi.gov.om',
    phone: '+968 9482 1199',
    department: 'Procurement',
    role: 'Procurement Manager' as const,
    entityName: 'Ministry of Infrastructure',
    crNumber: 'CR-9048210'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addUser({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: formData.department,
      status: 'Active',
      phone: formData.phone
    });

    login();
    showToast(`Registered successfully as ${formData.name}`, 'success');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-600/25 blur-[140px] rounded-full" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link to="/" className="inline-flex items-center gap-3 mb-4">
          <img src={pmrgLogo} alt="PMRG Solution" className="h-12 w-auto object-contain filter brightness-110" />
        </Link>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Government Entity Registration
        </h2>
        <p className="mt-1 text-xs text-teal-400 font-medium">
          Oman Vision 2040 by PMRG Solution LLP
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="bg-[#0B1727] py-8 px-6 sm:px-10 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Representative Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Official Government Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Ministry / Public Authority
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={formData.entityName}
                    onChange={(e) => setFormData({ ...formData, entityName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Commercial Registration / Code
                </label>
                <input
                  type="text"
                  required
                  value={formData.crNumber}
                  onChange={(e) => setFormData({ ...formData, crNumber: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Procurement">Procurement Department</option>
                  <option value="Operations">Operations Department</option>
                  <option value="Finance">Finance Department</option>
                  <option value="IT & Digital Transformation">IT & Digital Transformation</option>
                  <option value="Projects & Planning">Projects & Planning</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Requested Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Procurement Manager">Procurement Manager</option>
                  <option value="Buyer">Buyer</option>
                  <option value="Department Admin">Department Admin</option>
                  <option value="Viewer">Viewer (Audit)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 font-bold text-xs text-white shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Register & Launch Enterprise Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
            Already registered?{' '}
            <Link to="/login" className="text-blue-400 hover:underline font-semibold">
              Sign In to Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
