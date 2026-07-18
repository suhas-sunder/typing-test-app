import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeController } from "@/components/theme/theme-controller";
import { ADSENSE_PUBLISHER_ID } from "@/lib/ads/config";
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
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Calm, accuracy-first typing practice with short lessons, a free typing test, focused practice, and progress kept in your browser.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/favicon-196x196.png", sizes: "196x196", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "152x152", type: "image/png" }],
  },
  other: {
    "google-adsense-account": ADSENSE_PUBLISHER_ID,
    "msapplication-TileColor": "#f5efe5",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5efe5",
  colorScheme: "light dark",
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
