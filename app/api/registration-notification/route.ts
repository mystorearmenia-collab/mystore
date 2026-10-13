import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { store } from "@/lib/catalog";
import { normalizePhone, validName } from "@/lib/account-validation";

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const mailKey = process.env.RESEND_API_KEY;
  const sender = process.env.REGISTRATION_EMAIL_FROM;
  if (!url || !key || !mailKey || !sender) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const authorization = request.headers.get("authorization") ?? "";
  if (!authorization.startsWith("Bearer ") || authorization.length > 8192) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const auth = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: { user }, error } = await auth.auth.getUser(authorization.slice(7));
    if (error || !user?.email_confirmed_at || !user.email) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    // Resend keeps idempotency keys for 24 hours. Older accounts cannot trigger new registration mail.
    const age = Date.now() - Date.parse(user.created_at);
    if (!Number.isFinite(age) || age < 0 || age >= 23 * 60 * 60 * 1000) return NextResponse.json({ ok: true });
    const { first_name, last_name, contact_phone } = user.user_metadata;
    if (typeof first_name !== "string" || typeof last_name !== "string" || typeof contact_phone !== "string" || !validName(first_name) || !validName(last_name) || !normalizePhone(contact_phone)) return NextResponse.json({ error: "profile" }, { status: 400 });
    const text = ["Новая подтверждённая регистрация MyStore", `Имя: ${first_name}`, `Фамилия: ${last_name}`, `Email: ${user.email}`, `Телефон: ${normalizePhone(contact_phone)}`, `Дата регистрации: ${user.created_at}`].join("\n");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${mailKey}`, "Content-Type": "application/json", "Idempotency-Key": `registration-${user.id}` },
      body: JSON.stringify({ from: sender, to: [store.email], subject: "Новый клиент MyStore", text }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      console.error("Registration notification delivery failed", response.status);
      return NextResponse.json({ error: "delivery" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "delivery" }, { status: 502 });
  }
}
