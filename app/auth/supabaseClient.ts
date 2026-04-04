import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Check if we have valid Supabase configuration
const hasValidConfig = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith("https://") && 
  supabaseUrl.includes(".supabase.co");

// Create a mock client for development without Supabase
const createMockClient = (): SupabaseClient => {
  const mockSession = { data: { session: null } };
  const mockSubscription = { 
    subscription: { 
      unsubscribe: () => {} 
    } 
  };
  
  return {
    auth: {
      getSession: () => Promise.resolve(mockSession),
      onAuthStateChange: () => mockSubscription,
      signOut: () => Promise.resolve({ error: null }),
      signInWithOtp: () => Promise.resolve({ data: {}, error: null }),
      signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: "Supabase not configured" } }),
    },
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
    }),
  } as unknown as SupabaseClient;
};

export const supabase: SupabaseClient = hasValidConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

export const isSupabaseConfigured = hasValidConfig;
