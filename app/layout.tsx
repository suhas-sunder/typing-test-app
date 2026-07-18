import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeController } from "@/components/theme/theme-controller";
import { buildThemeBootstrapScript } from "@/lib/themes/bootstrap";
import { serializeJsonLd, SITE_NAME, WEBSITE_JSON_LD } from "@/lib/seo";
import { siteUrl } from "@/lib/site-links";

const lato = localFont({
  src: "../client/src/assets/fonts/Lato-Regular.woff2",
  variable: "--font-body",
  display: "swap",
});

const nunito = localFont({
  src: "../client/src/assets/fonts/Nunito-Bold.woff2",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Calm, accuracy-first typing practice with short lessons, a free typing test, focused practice, and progress kept in your browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: buildThemeBootstrapScript() }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(WEBSITE_JSON_LD) }} />
      </head>
      <body className={`${lato.variable} ${nunito.variable} antialiased`}>
        <ThemeController />
        {children}
      </body>
    </html>
  );
}
