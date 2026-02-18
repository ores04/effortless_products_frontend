import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL or Anon Key is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const createSupabaseClient = (token?: string): SupabaseClient => {
    const options = token
        ? {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        }
        : {};

    return createClient(supabaseUrl || '', supabaseAnonKey || '', options);
};
