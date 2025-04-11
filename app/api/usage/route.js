// File: app/api/usage/route.js

export async function GET(req) {
  return new Response(
    JSON.stringify({
      tier: "Free",
      usage_count: 3,
      limit: 1000,
      remaining: 997,
      api_key: "test-api-key"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}