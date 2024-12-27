import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

export default function RestaurantStatus() {
  return (
    <Card>
      <h2 className="text-xl font-bold text-white mb-6">
        État du restaurant
      </h2>
      <div className="space-y-4">
        <div className="p-4 bg-green-400/20 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-400 font-semibold">Ouvert</span>
            <span className="text-sm text-white/60">Jusqu'à 23:00</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-green-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-sm text-white/60 mt-2">
            75% de capacité
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-xl">
            <p className="text-sm text-white/60 mb-1">Tables libres</p>
            <p className="text-2xl font-bold text-white">8/12</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <p className="text-sm text-white/60 mb-1">Réservations</p>
            <p className="text-2xl font-bold text-white">15</p>
          </div>
        </div>
      </div>
    </Card>
  );
}