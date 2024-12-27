import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus } from 'lucide-react';
import Container from '@/components/ui/Container';
import DashboardNav from '@/components/dashboard/DashboardNav';
import OrderList from '@/components/orders/OrderList';
import OrderStats from '@/components/orders/OrderStats';
import OrderFilters from '@/components/orders/OrderFilters';
import CreateOrderModal from '@/components/orders/CreateOrderModal';
import Button from '@/components/ui/Button';
import { orderService } from '@/services/order';
import { menuService } from '@/services/menu';
import type { Order, OrderStatus } from '@/services/order/types';
import type { MenuItem } from '@/services/menu/types';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    loadOrders();
    loadMenuItems();
  }, [timeRange, filterStatus]);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await orderService.getOrders(timeRange, filterStatus);
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMenuItems = async () => {
    try {
      const items = await menuService.getMenuItems();
      setMenuItems(items);
    } catch (error) {
      console.error('Error loading menu items:', error);
    }
  };

  const handleCreateOrder = async (orderData: any) => {
    try {
      const total = orderData.items.reduce(
        (sum: number, item: any) => sum + (item.price * item.quantity),
        0
      );

      const newOrder = await orderService.addOrder({
        ...orderData,
        status: 'pending',
        total
      });

      setOrders(prev => [newOrder, ...prev]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, status);
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId
            ? { ...order, status, updatedAt: new Date() }
            : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    averageOrderValue: orders.length > 0 
      ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length 
      : 0,
    popularItems: orderService.getPopularItems(orders)
  };

  return (
    <>
      <DashboardNav />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-400/20 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-primary-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">Commandes</h1>
            </div>

            <div className="flex items-center space-x-4">
              <OrderFilters
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
                status={filterStatus}
                onStatusChange={setFilterStatus}
              />

              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="w-5 h-5 mr-2" />
                Nouvelle commande
              </Button>
            </div>
          </div>

          <div className="grid gap-8">
            <OrderStats stats={stats} />
            <OrderList
              orders={orders}
              onUpdateStatus={handleUpdateStatus}
              isLoading={isLoading}
            />
          </div>
        </motion.div>
      </Container>

      <CreateOrderModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrder}
        menuItems={menuItems}
      />
    </>
  );
}