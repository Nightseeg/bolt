import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import OrderChart from '@/components/orders/OrderChart';
import DateRangePicker from '@/components/dashboard/DateRangePicker';
import { orderService } from '@/services/orderService';
import type { Order } from '@/lib/models/order';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');
  const [orders, setOrders] = useState<Order[]>([]);

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-400/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-primary-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Analytics</h1>
          </div>
          
          <DateRangePicker />
        </div>

        <div className="grid gap-8">
          <Card>
            <h2 className="text-xl font-bold text-white mb-6">
              Évolution des commandes
            </h2>
            <OrderChart orders={orders} timeRange={timeRange} />
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <h2 className="text-xl font-bold text-white mb-6">
                Taux de conversion
              </h2>
              <div className="h-[300px] flex items-center justify-center text-white/60">
                Graphique en cours de développement...
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold text-white mb-6">
                Performance des appels
              </h2>
              <div className="h-[300px] flex items-center justify-center text-white/60">
                Graphique en cours de développement...
              </div>
            </Card>
          </div>

          <Card>
            <h2 className="text-xl font-bold text-white mb-6">
              Performance par période
            </h2>
            <div className="h-[300px] flex items-center justify-center text-white/60">
              Graphique en cours de développement...
            </div>
          </Card>
        </div>
      </motion.div>
    </Container>
  );
}