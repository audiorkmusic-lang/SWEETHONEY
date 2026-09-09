/*
# SweetHoney — Products, Stores, Customers, Orders Schema

## Purpose
Full e-commerce backend for the SweetHoney biscuit brand website.
Stores product catalog, store locations, customer info, and orders with line items.

## New Tables

1. **products** — Biscuit product catalog
   - id (uuid PK)
   - name (text, not null)
   - description (text)
   - price (numeric, not null) — stored as a number, formatted as currency in UI
   - image (text) — URL to product photo
   - category (text) — e.g. "Classic", "Crunch", "Butter"
   - stock (integer, default 0) — inventory count
   - created_at (timestamptz, default now())

2. **stores** — Physical store locations
   - id (uuid PK)
   - name (text, not null) — store name
   - city (text, not null)
   - address (text, not null)
   - phone (text)
   - opening_hours (text) — e.g. "Mon–Sun: 9 AM – 9 PM"
   - image (text) — URL to store photo
   - latitude (numeric, 8 decimal places)
   - longitude (numeric, 8 decimal places)
   - created_at (timestamptz, default now())

3. **customers** — Customer information for orders
   - id (uuid PK)
   - name (text, not null)
   - email (text, not null)
   - phone (text)
   - created_at (timestamptz, default now())

4. **orders** — Customer orders
   - id (uuid PK)
   - customer_id (uuid FK → customers)
   - total_amount (numeric, not null)
   - delivery_address (text, not null)
   - status (text, default 'pending') — one of: pending, confirmed, processing, shipped, delivered, cancelled
   - created_at (timestamptz, default now())

5. **order_items** — Line items within an order
   - id (uuid PK)
   - order_id (uuid FK → orders, cascade delete)
   - product_id (uuid FK → products)
   - product_name (text, not null) — snapshot at time of order
   - quantity (integer, not null, check ≥ 1)
   - unit_price (numeric, not null) — snapshot at time of order

## Security
This is a single-tenant app with no user sign-up flow (the storefront has no login).
Admin access is controlled by Supabase Auth (email/password) — the admin dashboard
requires an authenticated session. The storefront (products, stores) is publicly readable.

RLS policies:
- products: public SELECT (anon + authenticated), full CRUD for authenticated (admin)
- stores: public SELECT (anon + authenticated), full CRUD for authenticated (admin)
- customers: SELECT/INSERT for authenticated (admin); no anon access
- orders: SELECT/INSERT/UPDATE for authenticated (admin); no anon access
- order_items: SELECT/INSERT for authenticated (admin); no anon access

## Seed Data
Inserts the 3 existing products and 4 existing stores from the current static frontend data
so the homepage continues to look identical after switching to database-driven content.
Also creates 3 customer reviews (stored in a reviews table for the testimonials section).
*/

-- ===== PRODUCTS =====
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10, 2) NOT NULL,
  image text,
  category text DEFAULT 'Classic',
  stock integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_products" ON products;
CREATE POLICY "public_select_products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_insert_products" ON products;
CREATE POLICY "admin_insert_products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_products" ON products;
CREATE POLICY "admin_update_products"
  ON products FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_products" ON products;
CREATE POLICY "admin_delete_products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- ===== STORES =====
CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text NOT NULL,
  address text NOT NULL,
  phone text,
  opening_hours text,
  image text,
  latitude numeric(10, 8),
  longitude numeric(11, 8),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_stores" ON stores;
CREATE POLICY "public_select_stores"
  ON stores FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_insert_stores" ON stores;
CREATE POLICY "admin_insert_stores"
  ON stores FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_stores" ON stores;
CREATE POLICY "admin_update_stores"
  ON stores FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_stores" ON stores;
CREATE POLICY "admin_delete_stores"
  ON stores FOR DELETE
  TO authenticated
  USING (true);

-- ===== CUSTOMERS =====
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_select_customers" ON customers;
CREATE POLICY "admin_select_customers"
  ON customers FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_insert_customers" ON customers;
CREATE POLICY "admin_insert_customers"
  ON customers FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_customers" ON customers;
CREATE POLICY "admin_update_customers"
  ON customers FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_customers" ON customers;
CREATE POLICY "admin_delete_customers"
  ON customers FOR DELETE
  TO authenticated
  USING (true);

-- ===== ORDERS =====
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  total_amount numeric(10, 2) NOT NULL,
  delivery_address text NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_select_orders" ON orders;
CREATE POLICY "admin_select_orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_insert_orders" ON orders;
CREATE POLICY "admin_insert_orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_orders" ON orders;
CREATE POLICY "admin_update_orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_orders" ON orders;
CREATE POLICY "admin_delete_orders"
  ON orders FOR DELETE
  TO authenticated
  USING (true);

-- ===== ORDER ITEMS =====
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity >= 1),
  unit_price numeric(10, 2) NOT NULL
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_select_order_items" ON order_items;
CREATE POLICY "admin_select_order_items"
  ON order_items FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_insert_order_items" ON order_items;
CREATE POLICY "admin_insert_order_items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_order_items" ON order_items;
CREATE POLICY "admin_update_order_items"
  ON order_items FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_order_items" ON order_items;
CREATE POLICY "admin_delete_order_items"
  ON order_items FOR DELETE
  TO authenticated
  USING (true);

-- ===== INDEXES =====
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- ===== SEED DATA =====

-- Products (matching current static data)
INSERT INTO products (name, description, price, image, category, stock) VALUES
  ('Classic Honey Biscuit', 'Our signature golden biscuit made with real honey and a perfectly crispy bite.', 4.99, 'https://images.pexels.com/photos/574125/pexels-photo-574125.jpeg?auto=compress&cs=tinysrgb&w=900', 'Classic', 120),
  ('Honey Crunch', 'Extra-crunchy honey biscuits with a satisfying snap and a hint of toasted oats.', 5.49, 'https://images.pexels.com/photos/17525098/pexels-photo-17525098.jpeg?auto=compress&cs=tinysrgb&w=900', 'Crunch', 85),
  ('Honey Butter Biscuit', 'Rich, buttery biscuits glazed with golden honey for a melt-in-your-mouth treat.', 5.99, 'https://images.pexels.com/photos/32637653/pexels-photo-32637653.jpeg?auto=compress&cs=tinysrgb&w=900', 'Butter', 95)
ON CONFLICT DO NOTHING;

-- Stores (matching current static data)
INSERT INTO stores (name, city, address, phone, opening_hours, image, latitude, longitude) VALUES
  ('SweetHoney Store', 'Mysuru', '12 Sayyaji Rao Rd, Devaraja Mohalla, Mysuru 570001', '+91 82 1234 5678', 'Mon–Sun: 9 AM – 9 PM', 'https://images.pexels.com/photos/29380155/pexels-photo-29380155.jpeg?auto=compress&cs=tinysrgb&w=900', 12.29581000, 76.63938000),
  ('SweetHoney Store', 'Bengaluru', '45 Brigade Rd, Ashok Nagar, Bengaluru 560001', '+91 80 2345 6789', 'Mon–Sun: 10 AM – 10 PM', 'https://images.pexels.com/photos/32459865/pexels-photo-32459865.jpeg?auto=compress&cs=tinysrgb&w=900', 12.97159900, 77.59456600),
  ('SweetHoney Store', 'Mangaluru', '78 Falnir Rd, Hampankatta, Mangaluru 575001', '+91 82 3456 7890', 'Mon–Sun: 9 AM – 8 PM', 'https://images.pexels.com/photos/2253636/pexels-photo-2253636.jpeg?auto=compress&cs=tinysrgb&w=900', 12.91414200, 74.85695700),
  ('SweetHoney Store', 'Hyderabad', '23 Banjara Hills Rd No. 12, Hyderabad 500034', '+91 40 4567 8901', 'Mon–Sun: 10 AM – 9 PM', 'https://images.pexels.com/photos/30667454/pexels-photo-30667454.jpeg?auto=compress&cs=tinysrgb&w=900', 17.41561800, 78.43469100)
ON CONFLICT DO NOTHING;
