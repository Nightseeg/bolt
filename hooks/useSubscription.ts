import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscriptionStore } from '@/store/subscriptionStore';

export function useSubscription(requiredPlan: 'starter' | 'pro' | 'enterprise') {
  const navigate = useNavigate();
  const { plan, isTrialActive } = useSubscriptionStore();

  const hasAccess = plan === requiredPlan || plan === 'enterprise' || isTrialActive;

  useEffect(() => {
    if (!hasAccess) {
      navigate('/dashboard/subscription');
    }
  }, [hasAccess, navigate]);

  return { hasAccess };
}