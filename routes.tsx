import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from './components/Loading';
import DashboardLayout from './components/dashboard/DashboardLayout';

// Lazy load pages with prefetch
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Pricing = lazy(() => import('./pages/Pricing'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Demo = lazy(() => import('./pages/Demo'));

// Dashboard pages
const DashboardHome = lazy(() => import('./pages/dashboard/Home'));
const Orders = lazy(() => import('./pages/Orders'));
const Reservations = lazy(() => import('./pages/Reservations'));
const Calls = lazy(() => import('./pages/Calls'));
const Analytics = lazy(() => import('./pages/dashboard/Analytics'));
const Users = lazy(() => import('./pages/dashboard/Users'));
const Settings = lazy(() => import('./pages/dashboard/Settings'));

// Prefetch dashboard pages
const prefetchDashboardPages = () => {
  const pages = [DashboardHome, Orders, Reservations, Calls, Analytics, Users, Settings];
  pages.forEach(page => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = page.toString();
    document.head.appendChild(link);
  });
};

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<Loading />}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/demo" element={<Demo />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="calls" element={<Calls />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}