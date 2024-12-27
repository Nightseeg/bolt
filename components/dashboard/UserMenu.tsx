import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5"
      >
        <div className="w-8 h-8 bg-primary-400/20 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-primary-400" />
        </div>
        <span className="hidden md:inline">{user?.name}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-48 bg-dark-800 border border-white/10 rounded-xl shadow-xl z-50"
            >
              <div className="p-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/dashboard/settings');
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg"
                >
                  <Settings className="w-4 h-4" />
                  <span>Paramètres</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-red-400/10 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}