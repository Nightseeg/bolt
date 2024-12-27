import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, CreditCard, Lock } from 'lucide-react';

const plans = {
  starter: {
    name: 'Starter',
    price: '850',
    minutes: '3000',
    robots: '1-5'
  },
  pro: {
    name: 'Pro',
    price: '1400',
    minutes: '6000',
    robots: '1-10'
  },
  enterprise: {
    name: 'Enterprise',
    price: '2000',
    minutes: '15000',
    robots: '1-50'
  }
};

export default function Checkout() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const plan = plans[planId as keyof typeof plans];
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);

  if (!plan) {
    return <Navigate to="/pricing" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simuler le paiement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Rediriger vers le dashboard après paiement
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-[#1a237e]/5 to-transparent">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Bot className="w-6 h-6 text-[#1a237e]" />
            <h1 className="text-xl font-semibold text-gray-900">Finaliser votre abonnement</h1>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="font-medium text-gray-900 mb-2">Plan {plan.name}</h2>
            <p className="text-2xl font-bold text-[#1a237e] mb-1">{plan.price}€<span className="text-sm text-gray-600">/mois</span></p>
            <p className="text-sm text-gray-600">{plan.minutes} minutes • {plan.robots} robots</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de carte
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#1a237e] focus:border-[#1a237e]"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date d'expiration
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#1a237e] focus:border-[#1a237e]"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#1a237e] focus:border-[#1a237e]"
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 bg-[#1a237e] text-white py-3 px-4 rounded-lg font-medium text-sm hover:bg-[#0d47a1] transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? 'Traitement...' : 'Payer ' + plan.price + '€'}</span>
            </motion.button>
          </form>

          <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
            <CreditCard className="w-4 h-4 mr-1" />
            <span>Paiement sécurisé par Stripe</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}