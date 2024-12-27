import type { Order } from '@/lib/models/order';

// Simuler une base de données en mémoire
let orders: Order[] = [];

export const orderService = {
  async getOrders(timeRange?: 'day' | 'week' | 'month', status?: Order['status'] | 'all'): Promise<Order[]> {
    let filteredOrders = [...orders];

    if (status && status !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.status === status);
    }

    // Filter by time range
    const now = new Date();
    if (timeRange === 'day') {
      filteredOrders = filteredOrders.filter(order => 
        order.createdAt.getDate() === now.getDate()
      );
    } else if (timeRange === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filteredOrders = filteredOrders.filter(order => 
        order.createdAt >= weekAgo
      );
    } else if (timeRange === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filteredOrders = filteredOrders.filter(order => 
        order.createdAt >= monthAgo
      );
    }

    return filteredOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    orders = orders.map(order =>
      order.id === orderId
        ? { ...order, status, updatedAt: new Date() }
        : order
    );
  },

  async addOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...order
    };

    orders = [...orders, newOrder];
    return newOrder;
  },

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
};