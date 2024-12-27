export interface Call {
  id: string;
  userId: string;
  phoneNumber: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  duration?: number;
  startedAt: Date;
  endedAt?: Date;
  result?: string;
  notes?: string;
}

export interface CreateCallData {
  phoneNumber: string;
  userId: string;
}