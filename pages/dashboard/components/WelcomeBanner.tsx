import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

export default function WelcomeBanner() {
  const { user } = useAuthStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary-400/20 to-primary-500/20 rounded-2xl p-8 mb-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-mesh opacity-10" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <ChefHat className="w-6 h-6 text-primary-400" />
              <h1 className="text-3xl font-bold text-white">
                Bienvenue, {user?.name}
              </h1>
            </div>
            <p className="text-lg text-white/60">
              Gérez votre restaurant efficacement avec IA-26
            </p>
          </div>
          <Button size="lg" glowEffect>
            Configurer l'assistant vocal
          </Button>
        </div>
      </div>
    </motion.div>
  );
}