import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function DashboardNav() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-dark-800/80 backdrop-blur-lg border-b border-white/5"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="max-w-7xl mx-auto px-4 h-20">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center space-x-3">
            <Logo />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent"
            >
              IA-26
            </motion.div>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}