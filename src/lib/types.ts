export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export const ORDER_STATUSES: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: string | null;
  stock: number;
  created_at: string;
}

export interface Store {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string | null;
  opening_hours: string | null;
  image: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
}

export interface OrderWithItems {
  id: string;
  customer_id: string | null;
  total_amount: number;
  delivery_address: string;
  status: OrderStatus;
  created_at: string;
  customer?: Customer | null;
  order_items?: OrderItem[];
}

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  stock?: number;
}

export interface StoreInput {
  name: string;
  city: string;
  address: string;
  phone?: string;
  opening_hours?: string;
  image?: string;
  latitude?: number;
  longitude?: number;
}

export interface CustomerInput {
  name: string;
  email: string;
  phone?: string;
}

export interface OrderInput {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  delivery_address: string;
  items: { product_id: string; product_name: string; quantity: number; unit_price: number }[];
}
