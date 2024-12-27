import type { Database } from '@/lib/supabase/types';

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: 'entree' | 'plat' | 'dessert' | 'boisson';
  available: boolean;
  image?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export type MenuRow = Database['public']['Tables']['menu']['Row'];
export type MenuInsert = Database['public']['Tables']['menu']['Insert'];
export type MenuUpdate = Database['public']['Tables']['menu']['Update'];