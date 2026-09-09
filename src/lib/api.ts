import { supabase } from './supabase';
import type {
  Product,
  ProductInput,
  Store,
  StoreInput,
  Customer,
  CustomerInput,
  OrderWithItems,
  OrderInput,
  OrderStatus,
  OrderItem,
} from './types';

// ===================== PRODUCTS =====================

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert({
      name: input.name,
      description: input.description ?? null,
      price: input.price,
      image: input.image ?? null,
      category: input.category ?? 'Classic',
      stock: input.stock ?? 0,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, input: Partial<ProductInput>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update({
      name: input.name,
      description: input.description,
      price: input.price,
      image: input.image,
      category: input.category,
      stock: input.stock,
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

// ===================== STORES =====================

export async function getStores(): Promise<Store[]> {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getStore(id: string): Promise<Store | null> {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createStore(input: StoreInput): Promise<Store> {
  const { data, error } = await supabase
    .from('stores')
    .insert({
      name: input.name,
      city: input.city,
      address: input.address,
      phone: input.phone ?? null,
      opening_hours: input.opening_hours ?? null,
      image: input.image ?? null,
      latitude: input.latitude ?? null,
      longitude: input.longitude ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateStore(id: string, input: Partial<StoreInput>): Promise<Store> {
  const { data, error } = await supabase
    .from('stores')
    .update({
      name: input.name,
      city: input.city,
      address: input.address,
      phone: input.phone,
      opening_hours: input.opening_hours,
      image: input.image,
      latitude: input.latitude,
      longitude: input.longitude,
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteStore(id: string): Promise<void> {
  const { error } = await supabase.from('stores').delete().eq('id', id);
  if (error) throw error;
}

// ===================== CUSTOMERS =====================

export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createCustomer(input: CustomerInput): Promise<Customer> {
  const { data, error } = await supabase
    .from('customers')
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ===================== ORDERS =====================

export async function getOrders(): Promise<OrderWithItems[]> {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      *,
      customer:customers(*),
      order_items(*)
    `,
    )
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as OrderWithItems[];
}

export async function getOrder(id: string): Promise<OrderWithItems | null> {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      *,
      customer:customers(*),
      order_items(*)
    `,
    )
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data as OrderWithItems | null;
}

export async function createOrder(input: OrderInput): Promise<OrderWithItems> {
  // Step 1: Create or find customer
  const { data: existingCustomer } = await supabase
    .from('customers')
    .select('id')
    .eq('email', input.customer_email)
    .maybeSingle();

  let customerId: string;

  if (existingCustomer) {
    customerId = existingCustomer.id;
  } else {
    const { data: newCustomer, error: custError } = await supabase
      .from('customers')
      .insert({
        name: input.customer_name,
        email: input.customer_email,
        phone: input.customer_phone ?? null,
      })
      .select()
      .single();
    if (custError) throw custError;
    customerId = newCustomer.id;
  }

  // Step 2: Calculate total
  const totalAmount = input.items.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0,
  );

  // Step 3: Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_id: customerId,
      total_amount: totalAmount,
      delivery_address: input.delivery_address,
      status: 'pending',
    })
    .select()
    .single();
  if (orderError) throw orderError;

  // Step 4: Create order items
  const orderItems = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product_name,
    quantity: item.quantity,
    unit_price: item.unit_price,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
  if (itemsError) throw itemsError;

  // Step 5: Return full order with relations
  const { data: fullOrder, error: fetchError } = await supabase
    .from('orders')
    .select(
      `
      *,
      customer:customers(*),
      order_items(*)
    `,
    )
    .eq('id', order.id)
    .maybeSingle();
  if (fetchError) throw fetchError;

  return fullOrder as OrderWithItems;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteOrder(id: string): Promise<void> {
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) throw error;
}

export type { Product, Store, Customer, OrderWithItems, OrderItem, OrderStatus };
