/*
  # Add Menu Table

  1. New Tables
    - menu
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - price (numeric)
      - category (enum)
      - available (boolean)
      - image (text)
      - restaurant_id (uuid, foreign key)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for restaurant owners
*/

-- Create menu category enum
CREATE TYPE menu_category AS ENUM ('entree', 'plat', 'dessert', 'boisson');

-- Create menu table
CREATE TABLE IF NOT EXISTS menu (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  category menu_category NOT NULL,
  available boolean DEFAULT true,
  image text,
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE menu ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Restaurant owners can manage menu"
  ON menu
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE restaurants.id = menu.restaurant_id
      AND restaurants.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX idx_menu_restaurant_id ON menu(restaurant_id);
CREATE INDEX idx_menu_category ON menu(category);