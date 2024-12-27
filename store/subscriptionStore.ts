import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SubscriptionState {
  plan: 'free' | 'starter' | 'pro' | 'enterprise' | null;
  isTrialActive: boolean;
  trialEndsAt: Date | null;
  paymentMethod: {
    type: 'card';
    last4: string;
    expiryMonth: number;
    expiryYear: number;
  } | null;
  nextBillingDate: Date | null;
  setPlan: (plan: 'free' | 'starter' | 'pro' | 'enterprise' | null) => void;
  setPaymentMethod: (method: SubscriptionState['paymentMethod']) => void;
  startTrial: () => void;
  endTrial: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      plan: null,
      isTrialActive: false,
      trialEndsAt: null,
      paymentMethod: null,
      nextBillingDate: null,
      setPlan: (plan) => set({ plan }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      startTrial: () => set({
        isTrialActive: true,
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days
      }),
      endTrial: () => set({
        isTrialActive: false,
        trialEndsAt: null
      })
    }),
    {
      name: 'subscription-storage'
    }
  )
);