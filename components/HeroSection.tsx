import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import FloatingImages from './FloatingImages';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
            >
              <motion.span
                className="px-2 py-1 bg-primary-400 text-dark-800 rounded-full text-xs font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Nouveau
              </motion.span>
              <span className="text-light">Intelligence Artificielle de pointe</span>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-6xl font-bold leading-tight text-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Automatisez vos appels avec{' '}
              <motion.span
                className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                IA-26
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-light/80 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Solution professionnelle d'automatisation d'appels par intelligence artificielle.
              Optimisez votre communication client avec notre technologie de pointe.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Link to="/signup">
                <motion.button
                  className="inline-flex items-center space-x-2 bg-primary-400 text-dark-800 px-8 py-4 rounded-full font-semibold hover:bg-primary-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Commencer maintenant</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:h-[600px] relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <FloatingImages />
          </motion.div>
        </div>
      </div>
    </section>
  );
}