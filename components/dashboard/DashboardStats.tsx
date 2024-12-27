import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
}

interface DashboardStatsProps {
  stats: Stat[];
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
        >
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
        </motion.div>
      ))}
    </div>
  );
}