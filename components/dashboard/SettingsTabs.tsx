import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Lock } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const tabs = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Sécurité', icon: Lock },
];

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <Card>
      <div className="flex space-x-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === tab.id
                ? 'text-primary-400'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeSettingsTab"
                className="absolute inset-0 bg-primary-400/10 rounded-lg -z-10"
              />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Nom
              </label>
              <Input defaultValue="John Doe" />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <Input type="email" defaultValue="john@example.com" />
            </div>

            <Button>
              Sauvegarder les modifications
            </Button>
          </motion.div>
        )}

        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-white/60">Paramètres des notifications</p>
          </motion.div>
        )}

        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-white/60">Paramètres de sécurité</p>
          </motion.div>
        )}
      </div>
    </Card>
  );
}