import axios from 'axios';
import { config } from '@/config';
import { orderService } from './orderService';
import type { CallResponse, CallStatusResponse } from '@/lib/types/api';

export const vapiService = {
  initiateCall: async (phoneNumber: string): Promise<CallResponse> => {
    try {
      const formattedNumber = phoneNumber.replace(/\s/g, '');
      const fullNumber = formattedNumber.startsWith('+33') ? 
        formattedNumber : 
        `+33${formattedNumber.startsWith('0') ? formattedNumber.slice(1) : formattedNumber}`;

      const response = await axios.post(`${config.VAPI_API_URL}/conversation`, {
        phone_number: fullNumber,
        assistant_id: '2baee94b-2ab5-44f8-a0e3-1c5275c196a0',
        language: 'fr-FR',
        first_message: "Bonjour, je suis l'assistant vocal IA-26. Je vous appelle pour prendre votre commande.",
        webhook_url: `${window.location.origin}/api/vapi-webhook`
      }, {
        headers: {
          'Authorization': `Bearer ${config.VAPI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.conversation_id) {
        return {
          success: true,
          callId: response.data.conversation_id
        };
      }

      return {
        success: false,
        error: 'Erreur lors de l\'initialisation de l\'appel'
      };
    } catch (error: any) {
      console.error('VAPI call error:', error.response?.data || error.message);
      return {
        success: false,
        error: 'Impossible d\'initier l\'appel. Veuillez réessayer.'
      };
    }
  },

  getCallStatus: async (callId: string): Promise<CallStatusResponse> => {
    try {
      const response = await axios.get(`${config.VAPI_API_URL}/conversation/${callId}`, {
        headers: {
          'Authorization': `Bearer ${config.VAPI_API_KEY}`
        }
      });

      // Si l'appel est terminé et contient une commande, créer la commande
      if (response.data.status === 'completed' && response.data.order) {
        await orderService.addOrder({
          customerName: response.data.customer_name,
          phoneNumber: response.data.phone_number,
          address: response.data.delivery_address,
          items: response.data.order.items.map((item: any) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          total: response.data.order.total,
          status: 'pending',
          callId: callId
        });
      }

      return {
        status: response.data.status,
        duration: response.data.duration
      };
    } catch (error) {
      console.error('Error getting call status:', error);
      throw error;
    }
  }
};