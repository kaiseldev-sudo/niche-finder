import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Niche Finder AI",
  description:
    "Generate validation-ready niche ideas with USP, target audience, and starter moves powered by OpenAI.",
  authors: [{ name: "json.dev" }],
  other: {
    author: "json.dev",
    content: "AI niche ideation companion for founders and creators.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
