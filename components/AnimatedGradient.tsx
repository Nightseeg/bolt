import { motion } from 'framer-motion';

export default function AnimatedGradient() {
  return (
    <motion.div
      className="absolute inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950" />
      
      {/* Mesh pattern overlay */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(600px circle at 0% 0%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
            'radial-gradient(600px circle at 100% 100%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
            'radial-gradient(600px circle at 0% 100%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
            'radial-gradient(600px circle at 100% 0%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
            'radial-gradient(600px circle at 0% 0%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
    </motion.div>
  );
}