import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '@/components/Loading';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { lazyImport } from '@/lib/utils/lazyImport';

// Lazy load pages with proper error boundaries
const Home = lazyImport(() => import('@/pages/Home'));
const Login = lazyImport(() => import('@/pages/Login'));
const Register = lazyImport(() => import('@/pages/Register'));
const Dashboard = lazyImport(() => import('@/pages/Dashboard'));
const Orders = lazyImport(() => import('@/pages/Orders'));
const Reservations = lazyImport(() => import('@/pages/Reservations'));
const Settings = lazyImport(() => import('@/pages/dashboard/Settings'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}