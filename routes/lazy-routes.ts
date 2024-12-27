import { createChunkLoader } from '@/lib/utils/chunk-loader';

// Core routes
export const Home = createChunkLoader(() => import('@/pages/Home'), 'home');
export const Login = createChunkLoader(() => import('@/pages/Login'), 'auth');
export const Register = createChunkLoader(() => import('@/pages/Register'), 'auth');

// Dashboard routes
export const Dashboard = createChunkLoader(() => import('@/pages/Dashboard'), 'dashboard');
export const Orders = createChunkLoader(() => import('@/pages/Orders'), 'dashboard-features');
export const Reservations = createChunkLoader(() => import('@/pages/Reservations'), 'dashboard-features');
export const Settings = createChunkLoader(() => import('@/pages/dashboard/Settings'), 'dashboard-features');