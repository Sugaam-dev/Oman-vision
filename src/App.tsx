import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/Auth/LandingPage';
import { LoginPage } from './pages/Auth/LoginPage';
import { SignupPage } from './pages/Auth/SignupPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { ProductCatalogPage } from './pages/ProductCatalog/ProductCatalogPage';
import { ProductDetailsPage } from './pages/ProductDetails/ProductDetailsPage';
import { ProductComparePage } from './pages/ProductCatalog/ProductComparePage';
import { BulkOrderPage } from './pages/BulkOrder/BulkOrderPage';
import { RFQPage } from './pages/RFQ/RFQPage';
import { OrdersPage } from './pages/Orders/OrdersPage';
import { OrderDetailsPage } from './pages/Orders/OrderDetailsPage';
import { SuppliersPage } from './pages/Suppliers/SuppliersPage';
import { OrganizationUsersPage } from './pages/OrganizationUsers/OrganizationUsersPage';
import { ReportsAnalyticsPage } from './pages/ReportsAnalytics/ReportsAnalyticsPage';
import { AIAssistantPage } from './pages/AIAssistant/AIAssistantPage';
import { HelpSupportPage } from './pages/HelpSupport/HelpSupportPage';

// Scroll to top helper on route transition
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public / Landing & Auth Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Authenticated Portal Routes wrapped in AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductCatalogPage />} />
          <Route path="/products/compare" element={<ProductComparePage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/bulk-order" element={<BulkOrderPage />} />
          <Route path="/rfq" element={<RFQPage />} />
          <Route path="/rfq/:rfqId" element={<RFQPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/organization" element={<OrganizationUsersPage />} />
          <Route path="/reports" element={<ReportsAnalyticsPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/help" element={<HelpSupportPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
