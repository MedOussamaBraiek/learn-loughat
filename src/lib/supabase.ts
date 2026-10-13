import { createClient } from '@supabase/supabase-js';

// Keys come from .env.local (see .env.example). Without them the app still works offline,
// the daily challenge just can't save scores or show rankings.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
