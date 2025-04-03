import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const { email, name, company, phone } = await req.json();

    if (!email || !email.includes("@")) {
      return new Response("Invalid email address", { status: 400 });
    }

    console.log(`📬 Signup received: ${email} (${name}, ${company}, ${phone})`);

    const { error } = await supabase.from("users").insert([
      { email, name, company, phone },
    ]);

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return new Response("Database insert failed", { status: 500 });
    }

    return new Response(
      JSON.stringify({ ok: true, message: "Signup saved." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("❌ Signup error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}