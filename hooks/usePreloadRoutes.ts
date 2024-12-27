import { useEffect } from 'react';

const routes = [
  () => import('@/pages/Home'),
  () => import('@/pages/Login'),
  () => import('@/pages/Register'),
  () => import('@/pages/Dashboard'),
  () => import('@/pages/Pricing'),
  () => import('@/pages/FAQ')
];

export function usePreloadRoutes() {
  useEffect(() => {
    const preloadRoutes = () => {
      routes.forEach(route => {
        try {
          route();
        } catch (error) {
          console.error('Error preloading route:', error);
        }
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadRoutes);
    } else {
      setTimeout(preloadRoutes, 1000);
    }
  }, []);
}