-- Create order status enum
CREATE TYPE order_status AS ENUM (
  'pending',
  'confirmed',
  'preparing',
  'delivering',
  'delivered',
  'cancelled'
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone_number text NOT NULL,
  address text NOT NULL,
  items jsonb NOT NULL,
  total numeric(10,2) NOT NULL,
  status order_status DEFAULT 'pending',
  delivery_notes text,
  call_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Restaurant owners can manage orders"
  ON orders
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE restaurants.id = orders.restaurant_id
      AND restaurants.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX idx_orders_restaurant_id ON orders(restaurant_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);