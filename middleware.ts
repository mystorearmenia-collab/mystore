import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { maintenanceEnabled } from "./lib/maintenance";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  if (maintenanceEnabled) {
    const html = `<!doctype html>
<html lang="hy">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#080808">
<title>MyStore Armenia — Վերականգնման աշխատանքներ / Ведутся работы</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#080808;color:#f5f5f5;font-family:Arial,sans-serif;min-height:100vh;min-height:100svh;display:grid;place-items:center;padding:28px}
main{max-width:700px;text-align:center}.brand{font-size:30px;font-weight:700;letter-spacing:-1px}.brand span{color:#ff7900}
.icon{width:68px;height:68px;margin:44px auto 26px;border:1px solid #343434;border-radius:20px;display:grid;place-items:center;color:#ff7900}
h1{font-size:clamp(25px,5vw,38px);line-height:1.35;margin:0 0 16px}p{color:#aaa;line-height:1.7;font-size:17px;margin:8px 0}.translations{margin-top:32px;padding-top:24px;border-top:1px solid #262626}.translations strong{display:block;color:#eee;font-size:21px;margin-bottom:6px}
</style>
</head>
<body><main>
<div class="brand">MySt<span>⏻</span>re Armenia</div>
<div class="icon" aria-hidden="true"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18a2.1 2.1 0 0 0 3 3l5.3-5.3a5 5 0 0 0 6.4-6.4L14 13l-3-3 3.7-3.7Z"/></svg></div>
<h1>Կայքում տարվում են տեխնիկական աշխատանքներ</h1>
<p>Շուտով կրկին հասանելի կլինենք։ Շնորհակալություն համբերության համար։</p>
<div class="translations" lang="ru"><strong>Ведутся технические работы</strong><p>Скоро сайт снова будет доступен.<br>Спасибо за терпение.</p></div>
<div class="translations" lang="en"><strong>Under maintenance</strong><p>We’ll be back soon. Thank you for your patience.</p></div>
</main></body></html>`;
    return new NextResponse(request.method === "HEAD" ? null : html, {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        "Retry-After": "3600",
      },
    });
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
