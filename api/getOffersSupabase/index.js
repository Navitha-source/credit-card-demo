const fetch = require("node-fetch");

module.exports = async function (context, req) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    context.res = {
      status: 500,
      body: { error: "Missing Supabase configuration" },
    };
    return;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/credit_cards`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Supabase API Error: ${response.status}`);
    }

    const data = await response.json();
    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: data,
    };
  } catch (err) {
    context.log("Error fetching Supabase data:", err.message);
    context.res = {
      status: 500,
      body: { error: err.message },
    };
  }
};
