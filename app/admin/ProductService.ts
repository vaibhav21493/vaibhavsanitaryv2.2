import { supabase } from "../auth/supabaseClient";

export interface Product {
  id: string;
  nav_id: string;
  title: string;
  description: string | null;
  image: string | null;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

export class ProductService {
  static async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  static async create(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async update(nav_id: string, updates: Partial<Omit<Product, 'id' | 'nav_id' | 'created_at' | 'updated_at'>>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('nav_id', nav_id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async delete(nav_id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('nav_id', nav_id);
    
    if (error) throw error;
  }
}
