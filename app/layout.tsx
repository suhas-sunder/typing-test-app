import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: {
    default: "Free Typing Camp",
    template: "%s | Free Typing Camp",
  },
  description: "A calm, focused typing-practice app for speed, accuracy, lessons, and progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
