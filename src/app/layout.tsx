import type { Metadata } from "next";
import Script from "next/script";
import { Manrope } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { AppShell } from "@/components/AppShell";
import { ThemeProviders } from "@/components/ThemeProviders";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rubayethassan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  title: "Rubayet Hassan — Product engineer & builder",
  description:
    "Full-stack engineer who ships AI products. Based in Dhaka. Thesis in multimodal ML. Fast replies.",
  openGraph: {
    title: "Rubayet Hassan — Product engineer & builder",
    description:
      "Full-stack engineer who ships AI products. Based in Dhaka. Thesis in multimodal ML. Fast replies.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rubayet Hassan — Product engineer & builder",
    description:
      "Full-stack engineer who ships AI products. Based in Dhaka. Thesis in multimodal ML. Fast replies.",
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
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <ThemeProviders>
          <AppShell>{children}</AppShell>
        </ThemeProviders>
      </body>
    </html>
  );
}
