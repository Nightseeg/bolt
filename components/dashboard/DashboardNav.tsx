import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Calendar, ShoppingBag } from 'lucide-react';

const navItems = [
  {
    icon: ShoppingBag,
    label: 'Commandes',
    href: '/orders'
  },
  {
    icon: Calendar,
    label: 'Réservations',
    href: '/reservations'
  },
  {
    icon: Phone,
    label: 'Appels',
    href: '/calls'
  }
];

export default function DashboardNav() {
  const location = useLocation();

  return (
    <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 mb-8">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-4 py-4 flex items-center space-x-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-primary-400'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}