import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface UserModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UserModal({ open, onClose }: UserModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-dark-800 rounded-2xl p-6 z-50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Ajouter un utilisateur</h2>
              <button
                onClick={onClose}
                className="p-2 text-white/40 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Nom
                </label>
                <Input />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <Input type="email" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Rôle
                </label>
                <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="secondary" onClick={onClose}>
                  Annuler
                </Button>
                <Button type="submit">
                  Ajouter
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}