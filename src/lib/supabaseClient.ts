import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL");
}
if (!supabaseAnonKey) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Create a single Supabase client instance
// We can specify the schema where our tables reside (default is 'public')
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    db: {
        schema: 'public', // Specify the schema if it's not 'public'
    }
});

// Optional: Define types based on your database schema (generated via Supabase CLI or manually)
// This provides type safety when interacting with Supabase
// Example (you'll need to generate these, potentially using `npx supabase gen types typescript > src/types/supabase.ts`):
/*
import { Database } from '../types/supabase'; // Adjust path as needed

export const typedSupabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    db: {
        schema: 'public',
    }
});
*/ 