import { useEffect, useState } from 'react';
import { supabase } from './client';
import type { User } from '@/lib/models/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

export function useRestaurant(userId: string | undefined) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const loadRestaurant = async () => {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error loading restaurant:', error);
      } else {
        setRestaurant(data);
      }
      setLoading(false);
    };

    loadRestaurant();
  }, [userId]);

  return { restaurant, loading };
}