import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-6 p-4 bg-red-500/10 rounded-lg flex items-center space-x-2 text-red-400"
    >
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm">{message}</p>
    </motion.div>
  );
}