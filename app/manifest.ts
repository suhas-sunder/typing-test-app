import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: "Calm, accuracy-first typing practice with short lessons and browser-local progress.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5efe5",
    theme_color: "#f5efe5",
    icons: [
      { src: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { src: "/icons/favicon-196x196.png", sizes: "196x196", type: "image/png" },
    ],
  };
}
