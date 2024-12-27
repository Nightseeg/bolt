import { lazy } from 'react';
import { loadable } from '@/lib/utils/loadable';

// Core pages
export const Home = loadable(lazy(() => import('@/pages/Home')));
export const Login = loadable(lazy(() => import('@/pages/Login')));
export const Register = loadable(lazy(() => import('@/pages/Register')));
export const Dashboard = loadable(lazy(() => import('@/pages/Dashboard')));

// Feature pages
export const Orders = loadable(lazy(() => import('@/pages/Orders')));
export const Reservations = loadable(lazy(() => import('@/pages/Reservations')));
export const Settings = loadable(lazy(() => import('@/pages/dashboard/Settings')));