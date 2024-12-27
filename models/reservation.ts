export interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

export interface CreateReservationData {
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  notes?: string;
}