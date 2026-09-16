import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Building,
  UserCheck,
  LogOut,
  Sliders
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { initialUsers } from '../../data/users';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileSidebar }) => {
  const navigate = useNavigate();
  const {
    currentUser,
    organization,
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    switchPersona,
    logout,
    toggleSidebar,
    sidebarCollapsed,
    setSearchModalOpen
  } = useAppStore();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(e.target as Node)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGlobalSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/90 shadow-2xs flex items-center justify-between px-4 sm:px-6">
      {/* Left side: Hamburger & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Mobile menu toggle */}
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop sidebar collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Sliders className="w-4 h-4" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleGlobalSearchKeyDown}
            placeholder="Search products, specifications, suppliers..."
            className="w-full pl-9 pr-14 py-2 bg-slate-50 hover:bg-white text-xs text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-2xs"
          />
          <button
            onClick={() => setSearchModalOpen(true)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded shadow-2xs cursor-pointer hover:bg-slate-50"
            title="Open Deep Search"
          >
            Ctrl + K
          </button>
        </div>
      </div>

      {/* Right side: AI Assistant, Notifications, User Persona */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Ask our AI Assistant Button */}
        <button
          onClick={() => navigate('/ai-assistant')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 hover:border-purple-300 text-purple-700 font-medium text-xs shadow-2xs transition-all hover:shadow-xs group"
        >
          <span className="w-5 h-5 rounded-md bg-purple-700 text-white flex items-center justify-center text-[10px] font-bold">
            AI
          </span>
          <Sparkles className="w-3.5 h-3.5 text-purple-600 transition-transform group-hover:rotate-12" />
          <span className="hidden md:inline">Ask our AI Assistant</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative" ref={notifDropdownRef}>
          <button
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Popover */}
          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-slate-800">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationAsRead(n.id);
                        if (n.linkRoute) {
                          navigate(n.linkRoute);
                          setNotifDropdownOpen(false);
                        }
                      }}
                      className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                        !n.read ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0 opacity-0 group-hover:opacity-100" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`text-xs truncate ${!n.read ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>
                            {n.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-slate-100 bg-slate-50/60 text-center">
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setNotifDropdownOpen(false);
                  }}
                  className="text-xs text-slate-600 hover:text-blue-600 font-medium"
                >
                  View All Activity
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Persona & Profile Dropdown */}
        <div className="relative" ref={userDropdownRef}>
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2.5 p-1 sm:px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          >
            {/* Avatar initials in navy/blue circle matching screenshot */}
            <div className="w-8 h-8 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center text-xs font-bold shadow-2xs shrink-0">
              {currentUser.avatarInitials}
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-500 leading-tight mt-0.5">
                {currentUser.role}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* User Persona Popover */}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* Profile Card Header */}
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                    {currentUser.avatarInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</h4>
                    <p className="text-[11px] text-blue-600 font-medium">{currentUser.role}</p>
                    <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                  </div>
                </div>

                <div className="mt-2.5 pt-2.5 border-t border-slate-200/70 flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{organization.name}</span>
                </div>
              </div>

              {/* Demo Switch Persona */}
              <div className="p-2 border-b border-slate-100">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Demo Persona
                </div>
                <div className="space-y-1">
                  {initialUsers.slice(0, 4).map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchPersona(u.id);
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2 py-1.5 text-xs rounded-lg transition-colors text-left ${
                        currentUser.id === u.id
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[9px] font-bold">
                          {u.avatarInitials}
                        </span>
                        <span>{u.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{u.role.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-1">
                <button
                  onClick={() => {
                    navigate('/organization');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg text-left"
                >
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Manage My Organization</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout / Switch Account</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
