# PMRG Solution LLP - Digital Procurement Portal (Oman Vision 2040)

A modern, institutional B2B and governmental procurement marketplace platform built for public sector ministries, tender authorities, and registered vendors in the Sultanate of Oman.

---

## 🌟 Key Features

- **Executive Dashboard**
  - Institutional KPIs (Total Orders, Spend Volume in OMR, Active Vendors, Pending Requisitions).
  - High-priority circulars and official tender announcements.
  - Category catalog showcase and recent purchase order tracking.

- **Enterprise Product Catalog**
  - Multi-category catalog spanning:
    - *IT & Electronics*
    - *Office & Furniture*
    - *Facility Management*
    - *Safety & Security*
    - *Industrial Equipment*
    - *Logistics & Transport*
  - Instant full-text search, multi-tier facet filters (In-Country Value certifications, availability, price ranges, Omani SME vendor status).
  - Side-by-side product comparison matrix.
  - Interactive right-side detail preview flyout and dedicated product detail views.

- **Bulk Ordering Workflow**
  - 4-step streamlined purchasing wizard:
    1. *Select & Filter Products*
    2. *Review & Confirm Quantities*
    3. *Shipping & Billing Details (Oman delivery depots)*
    4. *Order Acknowledgement & Voucher Generation*
  - Automatic 5% Oman Value Added Tax (VAT) and currency formatting in OMR.

- **Request for Quote (RFQ) & Tendering**
  - 4-step tender requisition builder with specification authoring.
  - Vendor invitation matrix with In-Country Value (ICV) score weighting.
  - Tender board bid evaluation and award recording.

- **Order Management & Logistics Telematics**
  - Live shipment route visualization across Oman Governorates (Muscat → Sohar → Nizwa).
  - Step-by-step delivery milestones and real-time carrier status.
  - Dedicated multi-tab interface:
    - **Overview**: Executive summary, order parameters, and chronological activity logs.
    - **Items**: Detailed line-item breakdown with catalog links.
    - **Tracking**: Live GPS telematics, carrier details, and site delivery instructions.
    - **Documents**: Downloadable official Purchase Orders, OTA Tax Invoices, Consignment Waybills, and ICV Quality Certificates.
    - **Communications**: Direct messaging log between procurement officers, vendor liaisons, and fleet dispatchers.
    - **Related RFQs**: Originating tender details, bid comparison matrix, and evaluation scores.
  - Built-in PDF generation and printable purchase order modal.

- **Suppliers Directory & ICV Scorecards**
  - Directory of verified national and international suppliers.
  - In-Country Value (ICV) scorecards, Riyada SME classification, and on-time delivery SLA tracking.

- **Organization & Role-Based Access Control (RBAC)**
  - Interactive departmental hierarchy diagram (Ministry of Infrastructure).
  - Approval authorization thresholds (Department Manager, Financial Director, Tender Committee).
  - User and audit activity logs.

- **Reports & Analytics**
  - Domain-specific analytics tabs: *Overview*, *Procurement*, *Suppliers*, *Orders & Fulfillment*, *Product Insights*, and *Usage & Adoption*.
  - Monthly procurement spend trends, departmental budget consumption, geographic delivery velocity, and custom exportable reports.

- **AI Procurement Assistant**
  - Natural language querying for procurement regulations, order status, catalog items, and tender guidelines.

- **Help & Regulatory Knowledge Base**
  - Royal Decree 84/2020 procurement regulatory FAQs, downloadable standard manuals, and support ticket submission.

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Bundler**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with automated `localStorage` persistence and image URL sanitization
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts & Data Visualization**: [Recharts](https://recharts.org/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` or your preferred package manager (`pnpm`, `yarn`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ecom_market
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 📦 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Vite local development server with HMR. |
| `npm run build` | Type-checks with `tsc` and bundles production assets into `dist/`. |
| `npm run preview` | Locally serves the production build from `dist/`. |
| `npm run lint` | Runs the high-performance Oxlint linter. |

---

## 📁 Project Structure

```text
ecom_market/
├── public/                 # Static assets, SVG icons & favicons
├── src/
│   ├── assets/             # Brand logos & local graphics
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Buttons, Badges, Modals, Cards, Search inputs
│   │   └── layout/         # Header, Sidebar, AppLayout, Global Search modal
│   ├── data/               # Mock datasets (products, suppliers, orders, RFQs)
│   ├── pages/              # Route views
│   │   ├── AIAssistant/    # Contextual procurement chatbot
│   │   ├── Auth/           # Landing, Login & Signup pages
│   │   ├── BulkOrder/      # Multi-step bulk purchase order wizard
│   │   ├── Dashboard/      # Main ministerial overview dashboard
│   │   ├── HelpSupport/    # Support tickets & procurement knowledge base
│   │   ├── Orders/         # Order tracking & multi-tab order details
│   │   ├── OrganizationUsers/ # Org tree, roles & user management
│   │   ├── ProductCatalog/ # Catalog search, filtering & product compare
│   │   ├── ProductDetails/ # Detailed product specifications & gallery
│   │   ├── RFQ/            # Request for Quote creation & vendor evaluation
│   │   ├── ReportsAnalytics/ # Interactive charts & analytics dashboards
│   │   └── Suppliers/      # Supplier directory & ICV scorecard
│   ├── store/              # Zustand stores (Cart, Orders, RFQs, Compare, AI)
│   ├── types/              # TypeScript interfaces and domain models
│   ├── utils/              # Image sanitization, currency formatting, date helpers
│   ├── App.tsx             # Application router and layout configuration
│   └── main.tsx            # Application entry point
├── .gitignore              # Production deployment ignore rules
├── package.json            # Project dependencies & npm scripts
└── vite.config.ts          # Vite bundler configuration
```

---

## 🔒 Deployment Best Practices

- Ensure environment variables are configured in your deployment platform (`Vercel`, `Netlify`, `Cloudflare Pages`, `AWS S3/CloudFront`, etc.).
- The included `.gitignore` protects sensitive `.env` files and prevents build artifacts (`dist/`, caches) from polluting git history.
- Run `npm run build` prior to committing to verify type safety and asset compilation.

---

## 📄 License

Private & Proprietary — Developed for PMRG Solution LLP.
