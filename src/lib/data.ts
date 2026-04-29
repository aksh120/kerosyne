import { supabase } from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data;
}

export async function getReviews() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
  return data;
}

export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  return data;
}

export async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  return data;
}
