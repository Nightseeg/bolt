```typescript
import { Router } from 'express';
import { orderService } from '../../services/orderService';
import type { VapiWebhookPayload } from '../../lib/types/api';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const payload = req.body as VapiWebhookPayload;

    // Vérifier que c'est bien un webhook VAPI
    if (!payload.conversation_id || !payload.status) {
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }

    // Si l'appel est terminé et contient une commande
    if (payload.status === 'completed' && payload.order) {
      const order = await orderService.addOrder({
        customerName: payload.customer_name,
        phoneNumber: payload.phone_number,
        address: payload.delivery_address,
        items: payload.order.items.map(item => ({
          id: Math.random().toString(36).substr(2, 9),
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: payload.order.total,
        status: 'pending',
        callId: payload.conversation_id
      });

      return res.json({ success: true, order });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const vapiWebhookRoutes = router;
```