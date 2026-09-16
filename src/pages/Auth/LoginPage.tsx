import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, UserCheck, ShieldCheck, Building } from 'lucide-react';
import pmrgLogo from '../../assets/logo_pmrg.png';
import { useAppStore } from '../../store/useAppStore';
import { initialUsers } from '../../data/users';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchPersona, showToast } = useAppStore();

  const [email, setEmail] = useState('ahmed.maskari@moi.gov.om');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedPersonaId, setSelectedPersonaId] = useState('user-ahmed');

  const handleInstantLogin = (personaId = 'user-ahmed') => {
    switchPersona(personaId);
    login();
    showToast('Logged in successfully as demo user', 'success');
    navigate('/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleInstantLogin(selectedPersonaId);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/30 blur-[120px] rounded-full" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link to="/" className="inline-flex items-center gap-3 mb-4">
          <img src={pmrgLogo} alt="PMRG Solution" className="h-12 w-auto object-contain filter brightness-110" />
        </Link>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Government Procurement Portal
        </h2>
        <p className="mt-1 text-xs text-teal-400 font-medium">
          Oman Vision 2040 by PMRG Solution LLP
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        <div className="bg-[#0B1727] py-8 px-6 sm:px-10 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
          {/* Instant 1-Click Demo Login Highlight Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-500/40 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Instant Demo Access
              </span>
              <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-semibold border border-teal-500/30">
                1-Click Ready
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Launch directly as <span className="font-bold text-white">Ahmed Al Maskari</span> (Procurement Manager, Ministry of Infrastructure).
            </p>
            <button
              type="button"
              onClick={() => handleInstantLogin('user-ahmed')}
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Instant Demo Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Persona Switcher Buttons */}
          <div className="space-y-2 text-left">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Or Choose Another Demo Persona:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {initialUsers.slice(0, 4).map(user => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => {
                    setSelectedPersonaId(user.id);
                    setEmail(user.email);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                    selectedPersonaId === user.id
                      ? 'border-blue-500 bg-blue-950/40 text-white shadow-xs'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-blue-400 flex items-center justify-center font-bold text-[10px]">
                      {user.avatarInitials}
                    </span>
                    <span className="font-semibold text-slate-200 text-xs truncate">{user.name}</span>
                  </div>
                  <span className="text-[10px] text-teal-400">{user.role}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left border-t border-slate-800/80 pt-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Government Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Access Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-400">
                <input type="checkbox" defaultChecked className="rounded text-blue-600 bg-slate-900 border-slate-700" />
                <span>Remember this terminal</span>
              </label>
              <a href="#" className="text-blue-400 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Sign In with Credentials</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2">
            Don't have an organization account?{' '}
            <Link to="/signup" className="text-teal-400 hover:underline font-medium">
              Register Government Entity
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
