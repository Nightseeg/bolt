import React from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, Phone, Bot, Cpu, Globe, Shield } from 'lucide-react';

const icons = [
  { Icon: Bot, delay: 0, scale: 1.2 },
  { Icon: Phone, delay: 0.2, scale: 1 },
  { Icon: FileSpreadsheet, delay: 0.4, scale: 1.1 },
  { Icon: Cpu, delay: 0.6, scale: 0.9 },
  { Icon: Globe, delay: 0.8, scale: 1 },
  { Icon: Shield, delay: 1, scale: 0.8 },
];

export default function FloatingIcons() {
  return (
    <div className="relative w-full h-full">
      {icons.map(({ Icon, delay, scale }, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [-20, 0, 0, 20],
            x: [0, 10, -10, 0],
            scale: [scale * 0.8, scale, scale, scale * 0.8],
          }}
          transition={{
            duration: 4,
            delay: delay,
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full" />
            <Icon className="w-12 h-12 text-white relative z-10" />
          </div>
        </motion.div>
      ))}
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary-400/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
}