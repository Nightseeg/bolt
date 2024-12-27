import type { User } from './user';

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  deliveryNotes?: string;
  callId?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}