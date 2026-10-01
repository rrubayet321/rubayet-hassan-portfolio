import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AppShell } from "@/components/AppShell";
import { MotionProvider } from "@/components/MotionProvider";
import { profile, siteUrl } from "@/lib/profile";
import { motionCss } from "@/lib/motion";
import "./globals.css";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const creationFont = localFont({
  src: "../assets/fonts/Creation.ttf",
  variable: "--font-creation",
  weight: "700",
  display: "swap",
  adjustFontFallback: false,
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rubayet Hassan — AI Software Engineer",
    template: "%s — Rubayet Hassan",
  },
  description:
    profile.introduction +
    " AI Software Engineer building StorageAtlas, based in Dhaka.",
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
  openGraph: {
    title: "Rubayet Hassan — AI Software Engineer",
    description: profile.introduction,
    type: "website",
    url: siteUrl,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rubayet Hassan — AI Software Engineer",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={
        GeistSans.variable +
        " " +
        GeistMono.variable +
        " " +
        creationFont.variable
      }
    >
      <body style={motionCss}>
        {GA_ID && (
          <>
            <Script
              src={"https://www.googletagmanager.com/gtag/js?id=" + GA_ID}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
            >{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`}</Script>
          </>
        )}
        <MotionProvider>
          <AppShell>{children}</AppShell>
        </MotionProvider>
      </body>
    </html>
  );
}
