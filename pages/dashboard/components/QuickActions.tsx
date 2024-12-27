import { motion } from 'framer-motion';
import { Phone, Bot, FileSpreadsheet, Settings } from 'lucide-react';
import Card from '@/components/ui/Card';

const actions = [
  {
    icon: Phone,
    label: "Gérer les réservations",
    description: "Voir et modifier les réservations"
  },
  {
    icon: Bot,
    label: "Assistant vocal",
    description: "Paramètres et statistiques"
  },
  {
    icon: FileSpreadsheet,
    label: "Rapports",
    description: "Analyses et performances"
  },
  {
    icon: Settings,
    label: "Paramètres",
    description: "Configuration du restaurant"
  }
];

export default function QuickActions() {
  return (
    <Card>
      <h2 className="text-xl font-bold text-white mb-6">
        Actions rapides
      </h2>
      <div className="space-y-4">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            className="w-full flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-2 bg-primary-400/20 rounded-lg">
              <action.icon className="w-5 h-5 text-primary-400" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white">{action.label}</h3>
              <p className="text-sm text-white/60">{action.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </Card>
  );
}