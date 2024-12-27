import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import Loading from './Loading';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isInitialized, isLoading } = useAuthStore();

  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);

  if (!isInitialized || isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}