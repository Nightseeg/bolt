import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'Nouvel appel',
    message: 'Un nouvel appel a été effectué',
    time: '2 min',
    unread: true,
  },
  {
    id: 2,
    title: 'Rapport généré',
    message: 'Le rapport hebdomadaire est disponible',
    time: '1h',
    unread: false,
  },
];

export default function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-400 rounded-full" />
        )}
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
              className="absolute right-0 mt-2 w-80 bg-dark-800 border border-white/10 rounded-xl shadow-xl z-50"
            >
              <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-white/10 last:border-0 ${
                      notification.unread ? 'bg-white/5' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-white">{notification.title}</h4>
                      <span className="text-xs text-white/40">{notification.time}</span>
                    </div>
                    <p className="text-sm text-white/60">{notification.message}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}