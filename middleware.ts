import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supabaseUrl = 'https://jxxhkajbteyxdibefuux.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4eGhrYWpidGV5eGRpYmVmdXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwMTA4MjQsImV4cCI6MjA1NDU4NjgyNH0.teCpG6p_-fS5Md2DyRM8SCaD3hE0eEoRG_pn-p5GMzQ';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient(
    { req, res },
    {
      supabaseUrl,
      supabaseKey,
    }
  );
  await supabase.auth.getSession();
  return res;
}
