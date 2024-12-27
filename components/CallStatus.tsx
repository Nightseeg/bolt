import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { useVapiStore } from '@/store/vapiStore';
import { vapiService } from '@/services/vapiService';
import type { CallStatusResponse } from '@/lib/types/api';

export default function CallStatus() {
  const { callId, isCallActive, setCallActive } = useVapiStore();

  useEffect(() => {
    if (!callId || !isCallActive) return;

    const checkStatus = async () => {
      try {
        const status: CallStatusResponse = await vapiService.getCallStatus(callId);
        
        if (status.status === 'completed' || status.status === 'failed') {
          setCallActive(false);
        }
      } catch (error) {
        console.error('Error checking call status:', error);
        setCallActive(false);
      }
    };

    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [callId, isCallActive, setCallActive]);

  if (!isCallActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary-400 text-dark-800 px-6 py-3 rounded-full shadow-lg"
    >
      <div className="flex items-center space-x-3">
        <Phone className="w-5 h-5 animate-pulse" />
        <span className="font-medium">Appel en cours...</span>
        <button
          onClick={() => setCallActive(false)}
          className="p-1 hover:bg-primary-300 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}