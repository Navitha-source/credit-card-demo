import { createClient } from '@supabase/supabase-js';

export default async function (context, req) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    context.res = {
      status: 500,
      body: { error: 'Supabase environment variables missing' }
    };
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // Example: fetch all offers from your 'offers' table
  const { data, error } = await supabase.from('offers').select('*');

  if (error) {
    context.res = {
      status: 500,
      body: { error: error.message }
    };
    return;
  }

  context.res = {
    status: 200,
    body: data
  };
}
