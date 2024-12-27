import { supabase } from '@/lib/supabase/client';
import type { MenuItem, MenuCategory } from './types';

class MenuService {
  async getMenuItems(): Promise<MenuItem[]> {
    const { data, error } = await supabase
      .from('menu')
      .select('*')
      .order('category', { ascending: true });

    if (error) {
      console.error('Error fetching menu items:', error);
      return [];
    }

    return data as MenuItem[];
  }

  async getMenuCategories(): Promise<MenuCategory[]> {
    const items = await this.getMenuItems();
    
    return items.reduce((acc, item) => {
      const category = acc.find(c => c.id === item.category);
      if (category) {
        category.items.push(item);
      } else {
        acc.push({
          id: item.category,
          name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
          items: [item]
        });
      }
      return acc;
    }, [] as MenuCategory[]);
  }

  async addMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem | null> {
    const { data, error } = await supabase
      .from('menu')
      .insert([item])
      .select()
      .single();

    if (error) {
      console.error('Error adding menu item:', error);
      return null;
    }

    return data as MenuItem;
  }

  async updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem | null> {
    const { data, error } = await supabase
      .from('menu')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating menu item:', error);
      return null;
    }

    return data as MenuItem;
  }

  async deleteMenuItem(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('menu')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting menu item:', error);
      return false;
    }

    return true;
  }
}

export const menuService = new MenuService();