export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return new Response("Invalid email address", { status: 400 });
    }

    // ✅ Log to Vercel server logs for debugging
    console.log(`📬 Magic link requested for: ${email}`);

    // TODO: Integrate with your email service here (e.g. Resend, Mailgun, or SendGrid)
    // Example placeholder:
    // await sendMagicLink(email);

    return new Response(
      JSON.stringify({ ok: true, message: "Magic link sent." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("❌ Email login error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}