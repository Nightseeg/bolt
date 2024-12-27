import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import type { CreateUserData } from '@/lib/models/user';

export function useAuth() {
  const { 
    user,
    isLoading,
    error,
    isAuthenticated,
    setError,
    setLoading
  } = useAuthStore();

  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.login(email, password);
    } catch (error: any) {
      setError(error.message || 'Error logging in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, userData: Omit<CreateUserData, 'email'>) => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.register(email, password, userData);
    } catch (error: any) {
      setError(error.message || 'Error registering');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.logout();
    } catch (error: any) {
      setError(error.message || 'Error logging out');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout
  };
}