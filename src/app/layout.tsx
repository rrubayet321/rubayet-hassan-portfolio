import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { AppShell } from "@/components/AppShell";
import { ThemeProviders } from "@/components/ThemeProviders";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  title: "Rubayet Hassan — Product engineer & builder",
  description:
    "A minimal portfolio: background, selected work, and a clear way to get in touch.",
  openGraph: {
    title: "Rubayet Hassan — Product engineer & builder",
    description:
      "A minimal portfolio: background, selected work, and a clear way to get in touch.",
    type: "website",
    url: "https://rubayethassan.com",
  },
  twitter: {
    card: "summary",
    title: "Rubayet Hassan — Product engineer & builder",
    description:
      "A minimal portfolio: background, selected work, and a clear way to get in touch.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans" suppressHydrationWarning>
        <ThemeProviders>
          <AppShell>{children}</AppShell>
        </ThemeProviders>
      </body>
    </html>
  );
}
