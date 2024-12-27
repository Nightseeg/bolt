export interface User {
  id: string;
  email: string;
  name: string;
  restaurant?: {
    name: string;
    role: 'owner' | 'manager' | 'staff';
  };
  isPremium: boolean;
  isTrialActive: boolean;
  trialEndsAt?: Date;
}

export interface CreateUserData {
  email: string;
  name: string;
  restaurant?: {
    name: string;
    role: 'owner' | 'manager' | 'staff';
  };
}