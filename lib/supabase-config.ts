import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jxxhkajbteyxdibefuux.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4eGhrYWpidGV5eGRpYmVmdXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwMTA4MjQsImV4cCI6MjA1NDU4NjgyNH0.teCpG6p_-fS5Md2DyRM8SCaD3hE0eEoRG_pn-p5GMzQ';

if (!supabaseUrl) throw new Error('Missing Supabase URL');
if (!supabaseKey) throw new Error('Missing Supabase Key');

export { supabaseUrl, supabaseKey };
export const supabase = createClient(supabaseUrl, supabaseKey);
