import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Zap,
  Boxes,
  TrendingUp,
  Bot,
  Building2,
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';
import pmrgLogo from '../../assets/logo_pmrg.png';
import { useAppStore } from '../../store/useAppStore';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAppStore();

  const handleInstantLogin = () => {
    login();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-[#0B1727]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={pmrgLogo} alt="PMRG Solution" className="h-10 w-auto object-contain filter brightness-110" />
            <div className="flex flex-col border-l border-slate-700 pl-3">
              <span className="font-bold text-sm tracking-wider text-white">Oman Vision 2040</span>
              <span className="text-[10px] text-teal-400 font-medium tracking-tight">by PMRG Solution LLP</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#departments" className="hover:text-white transition-colors">Departments</a>
            <a href="#workflow" className="hover:text-white transition-colors">Tender Board Workflow</a>
            <a href="#compliance" className="hover:text-white transition-colors">In-Country Value (ICV)</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <button
              onClick={handleInstantLogin}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition-all"
            >
              <span>Instant Demo Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:py-24 bg-gradient-to-b from-[#0B1727] via-[#0F1E36] to-slate-900">
        {/* Glow & Backdrop lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/30 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>Unified Enterprise Government Portal</span>
                <span className="text-slate-400">|</span>
                <span className="text-teal-300">Sultanate of Oman</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Smart Procurement <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-indigo-300">
                  for a Connected Oman
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Empowering government ministries, public authorities, and vetted regional suppliers with transparent catalog sourcing, instant RFQs, automated bulk ordering, and an intelligent procurement assistant.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleInstantLogin}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 group"
                >
                  <span>Launch Portal as Ahmed Al Maskari</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <Link
                  to="/login"
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors"
                >
                  Select Persona / Sign In
                </Link>
              </div>

              {/* Trust badges / stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">120+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Approved Products</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">6</div>
                  <div className="text-xs text-slate-400 mt-0.5">Core Departments</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">100+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Government Entities</div>
                </div>
              </div>
            </div>

            {/* Right Card / Interactive Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-tr from-slate-800/90 to-slate-800/40 p-1 border border-slate-700 shadow-2xl backdrop-blur-xl">
                <div className="bg-[#0B1727] rounded-xl p-6 space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        MOI
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Ministry of Infrastructure</div>
                        <div className="text-[10px] text-teal-400">Muscat, Sultanate of Oman</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                      Active Portal
                    </span>
                  </div>

                  {/* AI Assistant Quick Card */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/70 to-indigo-950/70 border border-purple-800/50 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                      <Bot className="w-4 h-4 text-purple-400" />
                      <span>PMRG AI Procurement Assistant</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      "Real-time spend forecasting, tender compliance validation, and instant catalog matching for Oman Vision 2040."
                    </p>
                  </div>

                  {/* Quick features checklist */}
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>End-to-End Tender Board Requisition & RFQs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Automated 5% Oman VAT & Dynamic Quantity Discounts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Interactive Logistics Tracking (Muscat, Sohar, Nizwa, Salalah)</span>
                    </div>
                  </div>

                  <button
                    onClick={handleInstantLogin}
                    className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-lg transition-all"
                  >
                    Enter Demo Portal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section id="features" className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Engineered for Sovereign Governance</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Standardized procurement protocols adhering strictly to Oman Tender Board decrees and In-Country Value (ICV) requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-900/50 text-blue-400 flex items-center justify-center mb-4">
                <Boxes className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Catalog & CPQ</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                30+ verified enterprise products with Omani Standard (OS) certifications, volume tier pricing, and technical datasheets.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-900/50 text-purple-400 flex items-center justify-center mb-4">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">AI Assistant</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instant inquiry routing, order tracking diagnostics, compliance checking, and spend breakdown generation.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-teal-900/50 text-teal-400 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Live Analytics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Recharts powered visual spend trend, supplier SLA performance, department quota tracking, and governorate maps.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-900/50 text-amber-400 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Ministry Hierarchy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Multi-tier organizational structure, granular role-based permissions, and complete audit logging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-slate-800 bg-[#070F1E] text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={pmrgLogo} alt="PMRG" className="h-6 w-auto brightness-125" />
            <span>© 2025–2026 PMRG Solution LLP. Smart Procurement for a Connected Oman.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-blue-400 hover:underline">Portal Sign In</Link>
            <span>•</span>
            <Link to="/signup" className="text-blue-400 hover:underline">Register Entity</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
