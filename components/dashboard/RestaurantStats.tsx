import { motion } from 'framer-motion';
import { Phone, Users, Clock, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';

const stats = [
  {
    icon: Phone,
    label: "Appels traités",
    value: "124",
    change: "+12%",
    trend: "up"
  },
  {
    icon: Users,
    label: "Réservations",
    value: "45",
    change: "+8%",
    trend: "up"
  },
  {
    icon: Clock,
    label: "Temps moyen",
    value: "1:30",
    change: "-25%",
    trend: "down"
  },
  {
    icon: TrendingUp,
    label: "Taux de conversion",
    value: "92%",
    change: "+5%",
    trend: "up"
  }
];

export default function RestaurantStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-400/20 rounded-xl">
                <stat.icon className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-white/60">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className={`text-xs ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change} vs. mois dernier
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}