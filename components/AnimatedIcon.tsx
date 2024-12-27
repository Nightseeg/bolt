import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
}

export default function AnimatedIcon({ icon: Icon, className }: AnimatedIconProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <Icon className="w-full h-full" />
    </motion.div>
  );
}