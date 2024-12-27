```typescript
import { z } from 'zod';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: 'entree' | 'plat' | 'dessert' | 'boisson';
  available: boolean;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const menuItemSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  price: z.number().min(0, "Le prix doit être positif"),
  category: z.enum(['entree', 'plat', 'dessert', 'boisson']),
  available: z.boolean().default(true),
  image: z.string().optional()
});
```