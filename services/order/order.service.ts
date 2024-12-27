```typescript
import { supabase } from '@/lib/supabase/client';
import type { Order, OrderStatus } from './types';

class OrderService {
  async getOrders(timeRange?: 'day' | 'week' | 'month', status?: OrderStatus | 'all'): Promise<Order[]> {
    let query = supabase.from('orders').select('*');

    // Apply status filter
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    // Apply time range filter
    if (timeRange) {
      const now = new Date();
      let startDate: Date;

      switch (timeRange) {
        case 'day':
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
      }

      query = query.gte('created_at', startDate.toISOString());
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }

    return data.map(order => ({
      ...order,
      createdAt: new Date(order.created_at),
      updatedAt: new Date(order.updated_at)
    })) as Order[];
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  async addOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        customer_name: order.customerName,
        phone_number: order.phoneNumber,
        address: order.address,
        items: order.items,
        total: order.total,
        status: order.status,
        delivery_notes: order.deliveryNotes,
        call_id: order.callId
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }

    return {
      ...data,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    } as Order;
  }

  getPopularItems(orders: Order[]): Array<{ name: string; count: number }> {
    const itemCounts = orders.flatMap(order => order.items)
      .reduce((acc, item) => {
        acc[item.name] = (acc[item.name] || 0) + item.quantity;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(itemCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }
}

export const orderService = new OrderService();
```