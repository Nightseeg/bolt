import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import DashboardNav from '@/components/dashboard/DashboardNav';
import ReservationForm from '@/components/reservations/ReservationForm';
import ReservationList from '@/components/reservations/ReservationList';
import { reservationService } from '@/services/reservationService';
import type { Reservation } from '@/lib/models/reservation';

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    setIsLoading(true);
    try {
      const data = await reservationService.getReservations();
      setReservations(data);
    } catch (error) {
      console.error('Error loading reservations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateReservation = async (data: any) => {
    setIsLoading(true);
    try {
      const newReservation = await reservationService.createReservation(data);
      setReservations(prevReservations => {
        // Vérifier si la réservation existe déjà
        const exists = prevReservations.some(r => r.id === newReservation.id);
        if (exists) {
          return prevReservations;
        }
        return [...prevReservations, newReservation];
      });
    } catch (error) {
      console.error('Error creating reservation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: Reservation['status']) => {
    try {
      await reservationService.updateReservationStatus(id, status);
      setReservations(prev =>
        prev.map(res =>
          res.id === id ? { ...res, status } : res
        )
      );
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  return (
    <>
      <DashboardNav />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-primary-400/20 rounded-xl">
              <Calendar className="w-6 h-6 text-primary-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Réservations</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <h2 className="text-xl font-bold text-white mb-6">
                Nouvelle réservation
              </h2>
              <ReservationForm
                onSubmit={handleCreateReservation}
                isLoading={isLoading}
              />
            </Card>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">
                Réservations en cours
              </h2>
              <ReservationList
                reservations={reservations}
                onUpdateStatus={handleUpdateStatus}
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </>
  );
}