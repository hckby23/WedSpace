import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl) throw new Error('Missing Supabase URL');
if (!supabaseKey) throw new Error('Missing Supabase Key');

export { supabaseUrl, supabaseKey };
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
