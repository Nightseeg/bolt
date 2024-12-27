import { useState } from 'react';
import { vapiService } from '@/services/vapiService';
import { useVapiStore } from '@/store/vapiStore';

export function useVapiCall() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setCallId, setCallActive } = useVapiStore();

  const initiateCall = async (phoneNumber: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await vapiService.initiateCall(phoneNumber);
      
      if (response.success && response.callId) {
        setCallId(response.callId);
        setCallActive(true);
        return true;
      }
      
      setError(response.error || 'Une erreur est survenue lors de l\'appel');
      return false;
    } catch (err) {
      setError('Une erreur est survenue lors de l\'appel');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initiateCall,
    isLoading,
    error
  };
}