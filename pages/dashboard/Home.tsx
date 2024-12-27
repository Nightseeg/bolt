import { motion } from 'framer-motion';
import { LayoutDashboard, TrendingUp, Users, Phone } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import DashboardStats from '@/components/dashboard/DashboardStats';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import RecentCalls from '@/components/dashboard/RecentCalls';
import Chart from '@/components/dashboard/Chart';

const stats = [
  {
    label: "Réservations",
    value: "124",
    change: "+12%",
    trend: "up",
    icon: Users
  },
  {
    label: "Appels",
    value: "45",
    change: "+8%",
    trend: "up",
    icon: Phone
  },
  {
    label: "Taux de conversion",
    value: "68%",
    change: "+5%",
    trend: "up",
    icon: TrendingUp
  }
];

export default function DashboardHome() {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8"
      >
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-primary-400/20 rounded-xl">
            <LayoutDashboard className="w-6 h-6 text-primary-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
        </div>

        <div className="grid gap-8">
          {/* Stats Section */}
          <DashboardStats stats={stats} />

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <h2 className="text-xl font-bold text-white mb-6">
                Réservations par jour
              </h2>
              <Chart />
            </Card>

            <Card>
              <h2 className="text-xl font-bold text-white mb-6">
                Performance des appels
              </h2>
              <Chart />
            </Card>
          </div>

          {/* Activity Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <h2 className="text-xl font-bold text-white mb-6">
                Activité récente
              </h2>
              <ActivityFeed />
            </Card>

            <Card>
              <h2 className="text-xl font-bold text-white mb-6">
                Derniers appels
              </h2>
              <RecentCalls />
            </Card>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}