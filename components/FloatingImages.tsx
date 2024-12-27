import React from 'react';
import { motion } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1551434678-bf396e01e84e?auto=format&fit=crop&w=300&q=80',
];

export default function FloatingImages() {
  return (
    <div className="relative w-full h-full">
      {images.map((src, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1, 1, 0.8],
            y: [50, 0, 0, 50],
            rotateZ: [0, 5, -5, 0],
          }}
          transition={{
            duration: 10,
            delay: index * 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{
            top: `${20 + index * 20}%`,
            left: `${20 + index * 20}%`,
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 blur-xl rounded-2xl" />
            <img
              src={src}
              alt=""
              className="relative w-48 h-32 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}