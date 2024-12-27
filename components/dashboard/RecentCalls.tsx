import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const calls = [
  {
    id: 1,
    phoneNumber: '06 12 34 56 78',
    duration: '2:30',
    status: 'completed',
    time: '2 min',
  },
  {
    id: 2,
    phoneNumber: '06 98 76 54 32',
    duration: '1:45',
    status: 'completed',
    time: '5 min',
  },
];

export default function RecentCalls() {
  return (
    <div className="space-y-4">
      {calls.map((call, index) => (
        <motion.div
          key={call.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl"
        >
          <div className="p-2 bg-primary-400/20 rounded-lg">
            <Phone className="w-4 h-4 text-primary-400" />
          </div>
          <div className="flex-grow">
            <p className="text-white">{call.phoneNumber}</p>
            <div className="flex items-center space-x-2 text-sm text-white/40">
              <span>{call.duration}</span>
              <span>•</span>
              <span>{call.time}</span>
            </div>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-green-400/20 text-green-400">
            {call.status}
          </span>
        </motion.div>
      ))}
    </div>
  );
}