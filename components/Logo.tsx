import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export default function Logo() {
  return (
    <motion.div 
      className="relative w-10 h-10"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl opacity-75"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400/50 to-transparent rounded-xl blur-md" />
      
      {/* Logo container */}
      <div className="absolute inset-0.5 bg-dark-800 rounded-lg flex items-center justify-center backdrop-blur-sm">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Bot className="w-6 h-6 text-primary-400" />
        </motion.div>
      </div>
      
      {/* Particle effects */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary-400/50 rounded-full"
          initial={{
            x: "50%",
            y: "50%",
          }}
          animate={{
            x: [
              `${50 + Math.cos(i * (Math.PI * 2) / 3) * 30}%`,
              `${50 + Math.cos((i * (Math.PI * 2) / 3) + Math.PI) * 30}%`,
            ],
            y: [
              `${50 + Math.sin(i * (Math.PI * 2) / 3) * 30}%`,
              `${50 + Math.sin((i * (Math.PI * 2) / 3) + Math.PI) * 30}%`,
            ],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
}