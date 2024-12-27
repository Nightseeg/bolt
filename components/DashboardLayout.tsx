import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bot, LayoutDashboard, Phone, Settings, LogOut } from 'lucide-react';
import Logo from './Logo';
import { useAuthStore } from '@/store/authStore';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Phone, label: 'Appels', href: '/dashboard/calls' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/settings' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 280 }}
        className="fixed top-0 left-0 h-full bg-dark-800/80 backdrop-blur-lg border-r border-white/5 z-50"
      >
        <div className="p-4">
          <Link to="/" className="flex items-center space-x-3">
            <Logo />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent"
              >
                IA-26
              </motion.span>
            )}
          </Link>
        </div>

        <nav className="mt-8 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-colors ${
                  isActive
                    ? 'bg-primary-400/20 text-primary-400'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-6 h-6 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-white/60 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className={`pt-8 pb-16 transition-all ${isCollapsed ? 'ml-20' : 'ml-[280px]'}`}>
        {children}
      </main>
    </div>
  );
}