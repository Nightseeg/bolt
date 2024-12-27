```typescript
// Ajouter ces types à votre fichier existant

export interface VapiWebhookPayload {
  conversation_id: string;
  status: 'started' | 'in_progress' | 'completed' | 'failed';
  customer_name?: string;
  phone_number?: string;
  delivery_address?: string;
  order?: {
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
  };
}

export interface VapiOrderResponse {
  success: boolean;
  order?: {
    id: string;
    status: string;
  };
  error?: string;
}
```