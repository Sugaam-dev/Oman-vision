import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  BookOpen,
  FileText,
  ShieldCheck,
  PhoneCall,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  Download,
  Send,
  MessageSquare,
  ExternalLink,
  LifeBuoy
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useAppStore } from '../../store/useAppStore';

interface FAQItem {
  id: string;
  question: string;
  category: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Regulations & Compliance',
    question: 'What is the In-Country Value (ICV) requirement for Sultanate government procurement?',
    answer: 'Under Oman Vision 2040 national initiatives and Royal Decree guidelines, public entities prioritize suppliers with an ICV score exceeding 60%. Tier-1 suppliers with active Riyada SME certifications or localized Oman assembly receive preferential evaluation weighting in competitive tenders.'
  },
  {
    id: 'faq-2',
    category: 'Orders & Payments',
    question: 'How is the 5% Oman Value Added Tax (VAT) applied and reported on Purchase Orders?',
    answer: 'A standard 5% VAT is dynamically calculated across all taxable line items upon order placement or RFQ finalization. Every purchase order generates an integrated Zakat and Tax Authority compliant Tax Invoice referencing the supplier’s Oman VAT Registration Number.'
  },
  {
    id: 'faq-3',
    category: 'Orders & Payments',
    question: 'What are standard payment terms and settlement procedures for public entities?',
    answer: 'Standard government procurement contracts operate under Net 30 or Net 60 payment terms following three-way matching (Purchase Order, Delivery Note / Inspection GRN, and Tax Invoice). Payments are processed through the Ministry of Finance Treasury gateway.'
  },
  {
    id: 'faq-4',
    category: 'RFQ & Tendering',
    question: 'How do I submit an expedited or single-source Request for Quotation (RFQ)?',
    answer: 'When initiating an RFQ in the portal, select the "Urgent Procurement" tag in the wizard. Single-source or direct award requisitions require pre-approval attachment signed by the General Director or Undersecretary as mandated by Article 24 of the Government Procurement By-laws.'
  },
  {
    id: 'faq-5',
    category: 'Portal & Access',
    question: 'How do department spending limits and multi-tier approval thresholds work?',
    answer: 'Each user role is assigned specific fiscal thresholds in Organization Settings. Requisitions below OMR 5,000 require Department Manager approval; orders between OMR 5,000 and OMR 25,000 require Financial Director authorization; requests exceeding OMR 25,000 are escalated to the Secretary General / Tender Committee.'
  },
  {
    id: 'faq-6',
    category: 'Logistics & Deliveries',
    question: 'Can shipments be routed directly to regional ministry warehouses outside Muscat?',
    answer: 'Yes. During checkout or RFQ creation, choose regional delivery hubs including Sohar Port Logistics Depot, Nizwa Regional Office, Salalah Industrial Warehouse, or Duqm SEZ Facility with real-time GPS transit tracking.'
  }
];

const GUIDES = [
  {
    title: 'Sultanate of Oman Procurement Framework 2025',
    desc: 'Royal Decree 84/2020 regulatory bylaws, tender thresholds, and public procurement standards.',
    size: '2.4 MB',
    type: 'PDF Document'
  },
  {
    title: 'In-Country Value (ICV) Supplier Audit Manual',
    desc: 'Detailed scoring matrix, workforce nationalization indices, and local content verification guidelines.',
    size: '1.8 MB',
    type: 'PDF Document'
  },
  {
    title: 'Digital Procurement Portal User Manual v3.2',
    desc: 'Step-by-step operating instructions for RFQ wizards, bulk purchase workflows, and role permissions.',
    size: '4.1 MB',
    type: 'PDF Document'
  }
];

export const HelpSupportPage: React.FC = () => {
  const { showToast } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');

  // Support ticket state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketPriority, setTicketPriority] = useState('Medium');
  const [ticketCategory, setTicketCategory] = useState('Technical Issue');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['All', 'Regulations & Compliance', 'Orders & Payments', 'RFQ & Tendering', 'Portal & Access', 'Logistics & Deliveries'];

  const filteredFaqs = FAQS.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      showToast('Please complete all required fields for the support ticket.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = `TKT-2025-${Math.floor(1000 + Math.random() * 9000)}`;
      showToast(`Support ticket #${ticketId} registered. Our liaison officer will respond within 2 hours.`, 'success');
      setTicketSubject('');
      setTicketMessage('');
      setIsSubmitting(false);
    }, 600);
  };

  const handleDownloadGuide = (title: string) => {
    showToast(`Downloading "${title}"...`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#0F1E36] via-[#1A2E4D] to-[#1E3A8A] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg border border-[#1E3A8A]">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#C69214]/20 border border-[#C69214]/40 text-[#F59E0B] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <LifeBuoy className="w-3.5 h-3.5" /> Support & Knowledge Base
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            How can we support your procurement operations today?
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Access official Oman Vision 2040 procurement policies, statutory decrees, video walkthroughs, or connect directly with our technical and procurement support desk.
          </p>

          {/* Search bar */}
          <div className="relative pt-2">
            <Search className="w-5 h-5 absolute left-3.5 top-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles, ICV regulations, RFQ workflows, payment guidelines..."
              className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C69214] transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5 hover:border-[#1E3A8A] hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                Interactive Portal Guides
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Step-by-step documentation for requisitioning, RFQ comparisons, and approval chains.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 mt-3 group-hover:underline">
                Read documentation <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-5 hover:border-[#00875A] hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base group-hover:text-[#00875A] transition-colors">
                ICV & Compliance Portal
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Guidelines for supplier localization certification, Riyada SME quotas, and audit trails.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#00875A] mt-3 group-hover:underline">
                View ICV criteria <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-5 hover:border-[#C69214] hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base group-hover:text-amber-600 transition-colors">
                Direct Liaison Desk
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Contact our dedicated government procurement specialists in Muscat and Sohar hubs.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 mt-3 group-hover:underline">
                Call +968 2450 8000 <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Grid: FAQs & Downloads on Left, Support Ticket Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 cols: FAQs & Downloads */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* FAQ Accordion */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
              </div>
              <Badge variant="outline" className="text-xs">
                {filteredFaqs.length} Answers
              </Badge>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5 mb-5 pb-3 border-b border-slate-100">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#0F1E36] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Accordion list */}
            <div className="space-y-3">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">
                  No matching help articles found for "{searchQuery}".
                </div>
              ) : (
                filteredFaqs.map((faq) => {
                  const isOpen = expandedFaq === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`border rounded-xl transition-colors overflow-hidden ${
                        isOpen ? 'border-blue-200 bg-blue-50/20' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left font-medium text-slate-900 text-sm gap-4"
                      >
                        <span className="flex-1 font-semibold">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-blue-100/60 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </Card>

          {/* Official Decrees & Downloadable Resources */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-[#C69214]" />
              <h2 className="text-lg font-bold text-slate-900">Official Decrees & Compliance Documents</h2>
            </div>
            <div className="space-y-3">
              {GUIDES.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs border border-red-200">
                      PDF
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">{doc.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{doc.desc}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1.5 text-xs font-semibold ml-2"
                    onClick={() => handleDownloadGuide(doc.title)}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{doc.size}</span>
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right 5 cols: Support Ticket & Helpdesk Contacts */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Submit Support Ticket Form */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-1">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-base">Submit an Inquiry or Ticket</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Directly routed to the PMRG Technical Support & Tender Operations Unit.
            </p>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Inquiry Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g., Expedited RFQ Approval for Project Al Khuwair"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option>Technical Issue</option>
                    <option>RFQ / Tender Approval</option>
                    <option>Order & Logistics Delay</option>
                    <option>ICV Supplier Verification</option>
                    <option>Billing & VAT Statement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent (Tender Deadline)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detailed Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Describe your inquiry, order/RFQ reference number, and necessary deliverables..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0F1E36] hover:bg-[#1A2E4D] text-white flex items-center justify-center gap-2 py-2.5 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Registering Ticket...' : 'Submit Support Ticket'}</span>
              </Button>
            </form>
          </Card>

          {/* Contact Details Card */}
          <Card className="p-6 bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-3">Official Help Desk Contacts</h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Support Hotline (Toll-Free)</div>
                  <div>800-7674 / +968 2450 8000</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Support Email</div>
                  <div>support@vision2040.pmrg.om</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Operational Hours</div>
                  <div>Sunday – Thursday: 07:30 – 14:30 GST (Oman Time)</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] text-slate-500">
              Technical operations powered by <strong className="text-slate-700">PMRG Solution LLP</strong> in alignment with Oman Vision 2040 e-Governance Standards.
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};
