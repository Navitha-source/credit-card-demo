import { createClient } from '@supabase/supabase-js'

export default async function (context, req) {
  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    context.res = {
      status: 500,
      body: 'Missing Supabase credentials in environment variables.'
    }
    return
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  const { data, error } = await supabase
    .from('credit_cards')
    .select('*')

  if (error) {
    context.res = {
      status: 500,
      body: error.message
    }
  } else {
    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: data
    }
  }
}
