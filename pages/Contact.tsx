import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const contactMethods = [
  {
    icon: Phone,
    title: "Téléphone",
    value: "01 23 45 67 89",
    description: "Du lundi au vendredi, 9h-18h"
  },
  {
    icon: Mail,
    title: "Email",
    value: "contact@ia-26.com",
    description: "Réponse sous 24h"
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: "Paris, France",
    description: "Sur rendez-vous uniquement"
  }
];

export default function Contact() {
  return (
    <div className="relative min-h-screen bg-dark-900">
      <AnimatedBackground />
      
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-primary-500/20 px-4 py-2 rounded-full text-primary-400 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-semibold">Contactez-nous</span>
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Comment pouvons-nous vous aider ?
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                      <method.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {method.title}
                      </h3>
                      <p className="text-white font-medium mb-1">{method.value}</p>
                      <p className="text-white/60 text-sm">{method.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-primary-400 text-dark-800 py-4 px-6 rounded-xl font-semibold hover:bg-primary-300 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                <span>Envoyer le message</span>
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}