import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscriptionStore } from '@/store/subscriptionStore';
import Button from './ui/Button';

interface FeaturePreviewProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  requiredPlan: 'starter' | 'pro' | 'enterprise';
  children: React.ReactNode;
}

export default function FeaturePreview({
  title,
  description,
  icon,
  requiredPlan,
  children
}: FeaturePreviewProps) {
  const { plan, isTrialActive } = useSubscriptionStore();
  const hasAccess = plan === requiredPlan || plan === 'enterprise' || isTrialActive;

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-dark-800/50 backdrop-blur-sm rounded-2xl z-10" />
      
      <div className="relative pointer-events-none">
        {children}
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8"
        >
          <div className="w-16 h-16 bg-primary-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/60 mb-6">{description}</p>
          <Link to="/dashboard/subscription">
            <Button variant="primary">
              Débloquer cette fonctionnalité
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}