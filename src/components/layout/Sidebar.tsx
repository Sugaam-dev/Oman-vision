import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Boxes,
  FileText,
  ShoppingCart,
  Package,
  Users2,
  Building2,
  BarChart3,
  Bot,
  HelpCircle,
  X
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import pmrgLogo from '../../assets/logo_pmrg.png';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const sidebarCollapsed = useAppStore(state => state.sidebarCollapsed);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Product Catalog', path: '/products', icon: <Boxes className="w-4 h-4" /> },
    { name: 'Request for Quote (RFQ)', path: '/rfq', icon: <FileText className="w-4 h-4" /> },
    { name: 'Bulk Order', path: '/bulk-order', icon: <ShoppingCart className="w-4 h-4" /> },
    { name: 'My Orders', path: '/orders', icon: <Package className="w-4 h-4" /> },
    { name: 'Suppliers', path: '/suppliers', icon: <Users2 className="w-4 h-4" /> },
    { name: 'Organization & Users', path: '/organization', icon: <Building2 className="w-4 h-4" /> },
    { name: 'Reports & Analytics', path: '/reports', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'AI Assistant', path: '/ai-assistant', icon: <Bot className="w-4 h-4" /> },
    { name: 'Help & Support', path: '/help', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/70 z-40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#0F1E36] text-slate-300 transition-all duration-300 ease-in-out border-r border-slate-800/80
          ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
          ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
        `}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-800/80 bg-[#0B1727]/60">
          <NavLink to="/dashboard" className="flex items-center gap-3 overflow-hidden" onClick={onCloseMobile}>
            <img
              src={pmrgLogo}
              alt="PMRG Solution"
              className="h-11 w-auto object-contain shrink-0 filter brightness-110 drop-shadow-md"
            />
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="text-white font-bold text-xs tracking-wider uppercase leading-none">
                  Oman Vision 2040
                </span>
                <span className="text-[10px] text-[#C69214] font-medium tracking-tight mt-0.5">
                  by PMRG Solution LLP
                </span>
              </div>
            )}
          </NavLink>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group relative
                ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-xs shadow-blue-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }
                ${sidebarCollapsed ? 'justify-center' : ''}
              `}
              title={sidebarCollapsed ? item.name : undefined}
            >
              <span className="shrink-0 transition-transform group-hover:scale-110">{item.icon}</span>
              {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
            </NavLink>
          ))}
        </div>

        {/* Oman Vision 2040 & Graphic Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-slate-800/80 bg-gradient-to-b from-[#0F1E36] to-[#070F1E] relative overflow-hidden">
            {/* Ambient map constellation effect */}
            <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="30" r="2" fill="#38BDF8" />
                <circle cx="50" cy="40" r="3" fill="#38BDF8" />
                <circle cx="70" cy="70" r="2" fill="#38BDF8" />
                <circle cx="40" cy="80" r="2.5" fill="#38BDF8" />
                <line x1="20" y1="30" x2="50" y2="40" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="50" y1="40" x2="70" y2="70" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="70" y1="70" x2="40" y2="80" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="2 2" />
              </svg>
            </div>

            <div className="relative z-10 space-y-2">
              <div className="text-[11px] font-semibold text-slate-200 leading-tight">
                Innovative Procurement<br />for a Smarter Oman
              </div>

              {/* Oman Vision 2040 branding badge */}
              <div className="pt-2 flex items-center gap-2 border-t border-slate-800/60">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 via-purple-500 to-teal-400 p-0.5 shrink-0 flex items-center justify-center shadow-inner">
                  <div className="w-full h-full bg-[#0F1E36] rounded-full flex items-center justify-center text-[9px] font-bold text-teal-300">
                    2040
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-white tracking-wide">
                    Oman Vision 2040
                  </span>
                  <span className="text-[9px] text-teal-400 font-medium">
                    رؤية عمان 2040
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
