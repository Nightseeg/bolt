import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import Container from '@/components/ui/Container';
import DashboardNav from '@/components/dashboard/DashboardNav';

export default function Calls() {
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
              <Phone className="w-6 h-6 text-primary-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Appels</h1>
          </div>

          {/* Add your calls content here */}
        </motion.div>
      </Container>
    </>
  );
}