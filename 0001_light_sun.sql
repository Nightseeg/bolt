/*
  # Initial Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - name (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
      - is_premium (boolean)
      - is_trial_active (boolean)
      - trial_ends_at (timestamptz)
    
    - restaurants
      - id (uuid, primary key)
      - name (text)
      - user_id (uuid, foreign key)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - reservations
      - id (uuid, primary key)
      - restaurant_id (uuid, foreign key)
      - customer_name (text)
      - email (text)
      - phone (text)
      - date (date)
      - time (time)
      - party_size (integer)
      - status (enum)
      - notes (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create custom types
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'cancelled');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_premium boolean DEFAULT false,
  is_trial_active boolean DEFAULT true,
  trial_ends_at timestamptz DEFAULT (now() + interval '14 days')
);

-- Create restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  party_size integer NOT NULL,
  status reservation_status DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own restaurants" ON restaurants
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own restaurants" ON restaurants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own restaurants" ON restaurants
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can read restaurant reservations" ON reservations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM restaurants 
      WHERE restaurants.id = restaurant_id 
      AND restaurants.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage restaurant reservations" ON reservations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM restaurants 
      WHERE restaurants.id = restaurant_id 
      AND restaurants.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_restaurants_user_id ON restaurants(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_restaurant_id ON reservations(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date);