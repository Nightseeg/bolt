import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const reservations = [
  {
    id: '1',
    customerName: 'Jean Dupont',
    date: '2024-02-20',
    time: '19:30',
    partySize: 4,
    status: 'confirmed'
  },
  {
    id: '2',
    customerName: 'Marie Martin',
    date: '2024-02-20',
    time: '20:00',
    partySize: 2,
    status: 'pending'
  }
];

export default function ReservationsList() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Réservations du jour</h2>
        <Button variant="secondary" size="sm">
          Voir tout
        </Button>
      </div>

      <div className="space-y-4">
        {reservations.map((reservation, index) => (
          <motion.div
            key={reservation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-white/5 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white mb-2">
                  {reservation.customerName}
                </h3>
                <div className="flex items-center space-x-4 text-white/60 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(reservation.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{reservation.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{reservation.partySize} personnes</span>
                  </div>
                </div>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  reservation.status === 'confirmed' 
                    ? 'bg-green-400/20 text-green-400'
                    : 'bg-yellow-400/20 text-yellow-400'
                }`}>
                  {reservation.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}