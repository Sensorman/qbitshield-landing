export const runtime = "edge"

export async function GET(req: Request) {
  const apiKey = req.headers.get("api-key")

  if (!apiKey) {
    return new Response("Missing API key", { status: 401 })
  }

  try {
    const res = await fetch("https://theqbitshield-api-258062438248.us-central1.run.app/usage", {
      headers: {
        "api-key": apiKey,
      },
    })

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Edge usage error:", err)
    return new Response("Usage fetch failed", { status: 500 })
  }
}