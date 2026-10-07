"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { User } from "@supabase/supabase-js";
import { accountClient } from "@/lib/account-client";
import { normalizePhone, validName } from "@/lib/account-validation";

export default function AccountForm({ enabled }: { enabled: boolean }) {
  const t = useTranslations("account");
  const [mode, setMode] = useState<"register" | "login">("register");
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    const client = accountClient();
    if (!enabled || !client) return;
    let active = true;
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (active) setUser(session?.user ?? null);
      if (session) {
        // Notify only after Supabase has verified the email; API derives details from that user.
        void fetch("/api/registration-notification", { method: "POST", headers: { Authorization: `Bearer ${session.access_token}` } }).catch(() => {});
      }
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, [enabled]);
  useEffect(() => {
    if (!cooldown) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);
  const inputClass = "mt-2 w-full rounded-xl border border-line bg-background px-4 py-3 text-ink outline-none focus:border-orange";
  async function sendCode() {
    const client = accountClient();
    if (!enabled || !client || busy || cooldown) return;
    const contactPhone = normalizePhone(phone);
    if (mode === "register" && (!validName(firstName) || !validName(lastName) || !contactPhone)) { setMessage(t("invalid")); return; }
    setBusy(true); setMessage("");
    try {
      const { error } = await client.auth.signInWithOtp({ email: email.trim(), options: {
        shouldCreateUser: mode === "register",
        ...(mode === "register" ? { data: { first_name: firstName.trim(), last_name: lastName.trim(), contact_phone: contactPhone } } : {}),
      } });
      if (error) { setMessage(t("sendError")); return; }
      setEmail(email.trim()); setSent(true); setCooldown(60);
    } catch { setMessage(t("sendError")); } finally { setBusy(false); }
  }
  async function verifyCode() {
    const client = accountClient();
    if (!enabled || !client || busy) return;
    setBusy(true); setMessage("");
    try {
      const { error } = await client.auth.verifyOtp({ email, token: code.trim(), type: "email" });
      if (error) setMessage(t("codeError"));
    } catch { setMessage(t("codeError")); } finally { setBusy(false); }
  }
  if (user) return (
    <section className="mt-8 max-w-xl rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <h2 className="text-xl font-semibold">{t("welcome")}</h2>
      <dl className="mt-5 space-y-3">
        {[[t("firstName"), user.user_metadata.first_name], [t("lastName"), user.user_metadata.last_name], [t("email"), user.email], [t("phone"), user.user_metadata.contact_phone]].map(([label, value]) => <div key={label}><dt className="text-sm text-muted">{label}</dt><dd>{String(value ?? "")}</dd></div>)}
      </dl>
      <button className="btn btn-secondary mt-6" disabled={busy} onClick={async () => {
        setBusy(true); const { error } = await accountClient()!.auth.signOut(); setBusy(false);
        if (error) setMessage(t("sendError")); else { setSent(false); setCode(""); }
      }}>{t("logout")}</button>
      {message && <p className="mt-4" role="alert">{message}</p>}
    </section>
  );
  return (
    <section className="mt-8 max-w-xl rounded-2xl border border-line bg-surface p-6 sm:p-8">
      {!enabled && <p className="mb-6 text-muted" role="status">{t("unavailable")}</p>}
      <div className="mb-6 flex gap-4">
        {(["register", "login"] as const).map((item) => <button key={item} type="button" aria-pressed={mode === item} className={mode === item ? "text-orange" : "text-muted"} onClick={() => { setMode(item); setSent(false); setCode(""); setMessage(""); }}>{t(item)}</button>)}
      </div>
      <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); if (sent) void verifyCode(); else void sendCode(); }}>
        {sent ? <>
          <p className="text-muted">{t("sent", { email })}</p>
          <label className="block">{t("code")}<input autoFocus required inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(event) => setCode(event.target.value)} className={inputClass} /></label>
          <button className="btn btn-primary" disabled={busy}>{busy ? t("busy") : t("verify")}</button>
          <button type="button" className="ml-4 text-sm text-muted" disabled={busy || cooldown > 0} onClick={() => void sendCode()}>{cooldown > 0 ? t("resendWait", { seconds: cooldown }) : t("resend")}</button>
          <button type="button" className="block text-sm text-muted" onClick={() => { setSent(false); setCode(""); setMessage(""); }}>{t("changeEmail")}</button>
        </> : <>
          {mode === "register" && <>
            <label className="block">{t("firstName")}<input required autoComplete="given-name" maxLength={80} value={firstName} onChange={(event) => setFirstName(event.target.value)} className={inputClass} /></label>
            <label className="block">{t("lastName")}<input required autoComplete="family-name" maxLength={80} value={lastName} onChange={(event) => setLastName(event.target.value)} className={inputClass} /></label>
          </>}
          <label className="block">{t("email")}<input type="email" required autoComplete="email" maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} /></label>
          {mode === "register" && <label className="block">{t("phone")}<input type="tel" required autoComplete="tel" placeholder="+374 93 80 80 11" maxLength={30} value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClass} /></label>}
          <p className="text-sm leading-relaxed text-muted">{t("note")}</p>
          <button className="btn btn-primary" disabled={!enabled || busy || cooldown > 0}>{busy ? t("busy") : cooldown > 0 ? t("resendWait", { seconds: cooldown }) : t("send")}</button>
        </>}
        {message && <p role="alert" className="text-orange">{message}</p>}
      </form>
    </section>
  );
}
