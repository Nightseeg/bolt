```typescript
import express from 'express';
import cors from 'cors';
import { orderRoutes } from './routes/orders';
import { vapiWebhookRoutes } from './routes/vapi-webhook';
import { errorHandler } from './middleware/error';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/vapi-webhook', vapiWebhookRoutes);

// Error handling
app.use(errorHandler);

export { app };
```