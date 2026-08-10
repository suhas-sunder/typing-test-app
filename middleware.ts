import { NextRequest, NextResponse } from "next/server";
import { resolveLegacyRoute } from "@/lib/seo/legacy-routes";

const GONE_PAGE = (reason: string) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,follow">
    <title>Page retired | Free Typing Camp</title>
  </head>
  <body style="margin:0;background:#f5efe5;color:#172033;font-family:system-ui,sans-serif">
    <main style="max-width:44rem;margin:0 auto;padding:5rem 1.5rem">
      <p style="color:#cf5d3f;font-weight:800;letter-spacing:.08em;text-transform:uppercase">410 Gone</p>
      <h1>This old page has been retired.</h1>
      <p style="line-height:1.7">${reason}</p>
      <p style="line-height:1.7">You can continue with the <a href="/lessons" style="color:#9f3f2b;font-weight:700">current lessons</a> or start a <a href="/typing-test" style="color:#9f3f2b;font-weight:700">typing test</a>.</p>
    </main>
  </body>
</html>`;

export function middleware(request: NextRequest) {
  const resolution = resolveLegacyRoute(request.nextUrl.pathname);
  if (!resolution) return NextResponse.next();

  if (resolution.action === "redirect") {
    const response = NextResponse.redirect(
      new URL(resolution.destination, request.url),
      resolution.status,
    );
    response.headers.set("X-FTC-Legacy-Route", "redirect");
    return response;
  }

  if (resolution.kind === "api") {
    return NextResponse.json(
      {
        error: "Gone",
        message: resolution.reason,
        status: resolution.status,
      },
      {
        status: resolution.status,
        headers: {
          "X-FTC-Legacy-Route": "gone",
          "X-Robots-Tag": "noindex, follow",
        },
      },
    );
  }

  return new NextResponse(GONE_PAGE(resolution.reason), {
    status: resolution.status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-FTC-Legacy-Route": "gone",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}

export const config = {
  matcher: [
    "/cookiespolicy",
    "/privacypolicy",
    "/termsofservice",
    "/Learn",
    "/login",
    "/register",
    "/verify-email",
    "/forgot-password",
    "/profile/:path*",
    "/lessons/lesson/:path*",
    "/lessons/quotes",
    "/lessons/common-english-words",
    "/lessons/graduation",
    "/lessons/animal-facts",
    "/lessons/bird-facts",
    "/lessons/insect-facts",
    "/lessons/prehistoric-facts",
    "/lessons/reptile-facts",
    "/lessons/fantasy-facts",
    "/lessons/sea-life-facts",
    "/lessons/dog-facts",
    "/lessons/flower-facts",
    "/v1/api/:path*",
  ],
};
