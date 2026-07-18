import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-links";

export const SITE_NAME = "Free Typing Camp";

export function buildPageMetadata({
  description,
  index = true,
  path,
  title,
}: {
  description: string;
  index?: boolean;
  path: `/${string}` | "/";
  title: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: path,
      siteName: SITE_NAME,
    },
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: siteUrl,
  description: "Calm, accuracy-first typing practice with staged lessons, focused practice, a typing test, and browser-local progress.",
} as const;
export const WEB_APPLICATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: siteUrl,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any modern web browser",
  browserRequirements: "Requires JavaScript and a modern web browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "A free browser-based typing program focused on accuracy, short lessons, and clear local progress.",
} as const;
