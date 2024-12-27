import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import Button from './ui/Button';

export default function DashboardHeader() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated()) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 right-4 z-50"
    >
      <Link to="/dashboard">
        <Button variant="secondary" className="backdrop-blur-md">
          Dashboard
        </Button>
      </Link>
    </motion.div>
  );
}