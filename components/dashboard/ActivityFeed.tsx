import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'reservation',
    message: 'Nouvelle réservation pour 4 personnes',
    time: '2 min',
  },
  {
    id: 2,
    type: 'call',
    message: 'Appel traité avec succès',
    time: '5 min',
  },
  {
    id: 3,
    type: 'update',
    message: 'Mise à jour du statut de réservation',
    time: '10 min',
  },
];

export default function ActivityFeed() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl"
        >
          <div className="p-2 bg-primary-400/20 rounded-lg">
            {activity.type === 'reservation' ? (
              <Calendar className="w-4 h-4 text-primary-400" />
            ) : activity.type === 'call' ? (
              <Clock className="w-4 h-4 text-primary-400" />
            ) : (
              <Users className="w-4 h-4 text-primary-400" />
            )}
          </div>
          <div className="flex-grow">
            <p className="text-white">{activity.message}</p>
            <p className="text-sm text-white/40">{activity.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}