import type { Reservation, CreateReservationData } from '@/lib/models/reservation';

// Stocker les réservations en mémoire
let reservations: Reservation[] = [
  {
    id: '1',
    customerName: 'Jean Dupont',
    email: 'jean@example.com',
    phone: '06 12 34 56 78',
    date: '2024-02-20',
    time: '19:30',
    partySize: 4,
    status: 'confirmed',
    createdAt: new Date()
  },
  {
    id: '2',
    customerName: 'Marie Martin',
    email: 'marie@example.com',
    phone: '06 98 76 54 32',
    date: '2024-02-20',
    time: '20:00',
    partySize: 2,
    status: 'pending',
    createdAt: new Date()
  }
];

export const reservationService = {
  async getReservations(): Promise<Reservation[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [...reservations];
  },

  async createReservation(data: CreateReservationData): Promise<Reservation> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newReservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: 'pending',
      createdAt: new Date()
    };

    reservations = [...reservations, newReservation];
    return newReservation;
  },

  async updateReservationStatus(id: string, status: Reservation['status']): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    reservations = reservations.map(reservation =>
      reservation.id === id ? { ...reservation, status } : reservation
    );
  }
};