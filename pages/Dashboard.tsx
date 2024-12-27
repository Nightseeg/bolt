import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RestaurantStats from '@/components/dashboard/RestaurantStats';
import ReservationsList from '@/components/dashboard/ReservationsList';
import WelcomeBanner from './dashboard/components/WelcomeBanner';
import QuickActions from './dashboard/components/QuickActions';
import RestaurantStatus from './dashboard/components/RestaurantStatus';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Container>
        <WelcomeBanner />

        {/* Statistics */}
        <div className="mb-8">
          <RestaurantStats />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Reservations List */}
          <div className="lg:col-span-2">
            <ReservationsList />
          </div>

          {/* Quick Actions & Status */}
          <div className="space-y-8">
            <QuickActions />
            <RestaurantStatus />
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
}