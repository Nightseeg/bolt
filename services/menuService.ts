```typescript
import type { MenuItem, MenuCategory } from '@/lib/models/menu';

// Simuler une base de données en mémoire
let menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Tomate, mozzarella, basilic',
    price: 12.90,
    category: 'plat',
    available: true
  },
  {
    id: '2',
    name: 'Tiramisu',
    description: 'Dessert italien traditionnel',
    price: 6.90,
    category: 'dessert',
    available: true
  }
];

export const menuService = {
  async getMenuItems(): Promise<MenuItem[]> {
    return [...menuItems];
  },

  async getMenuCategories(): Promise<MenuCategory[]> {
    const categories = menuItems.reduce((acc, item) => {
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

    return categories;
  },

  async addMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...item
    };
    menuItems = [...menuItems, newItem];
    return newItem;
  },

  async updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem> {
    const item = menuItems.find(i => i.id === id);
    if (!item) throw new Error('Item not found');

    const updatedItem = { ...item, ...updates };
    menuItems = menuItems.map(i => i.id === id ? updatedItem : i);
    return updatedItem;
  },

  async deleteMenuItem(id: string): Promise<void> {
    menuItems = menuItems.filter(i => i.id !== id);
  }
};
```