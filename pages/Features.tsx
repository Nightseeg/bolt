import React from 'react';
import { motion } from 'framer-motion';
import FeaturesComponent from '../components/Features';

export default function Features() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-[#1a237e] mb-4">
            Nos Fonctionnalités
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez comment notre IA révolutionne la communication client
          </p>
        </motion.div>
        <FeaturesComponent />
      </div>
    </div>
  );
}