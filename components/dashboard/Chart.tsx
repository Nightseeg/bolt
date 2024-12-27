import { motion } from 'framer-motion';

export default function Chart() {
  return (
    <div className="h-64 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white/40"
      >
        Graphique en cours de chargement...
      </motion.div>
    </div>
  );
}