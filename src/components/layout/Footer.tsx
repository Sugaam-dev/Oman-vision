import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-5 px-6 border-t border-slate-200/80 bg-white text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div>
        © 2025–2026 PMRG Solution LLP. All rights reserved. • Oman Vision 2040 Smart Procurement Portal
      </div>
      <div className="flex items-center gap-4 text-slate-400">
        <span>People</span>
        <span>•</span>
        <span>Technology</span>
        <span>•</span>
        <span>Sustainable Growth</span>
      </div>
    </footer>
  );
};
