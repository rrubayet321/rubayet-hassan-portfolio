"use client";

import { CommandPalette } from "@/components/CommandPalette";
import { KeyboardHints } from "@/components/KeyboardHints";
import { PageTransition } from "@/components/PageTransition";
import { Sidebar } from "@/components/Sidebar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteTopBar } from "@/components/SiteTopBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <SiteTopBar />
      <CommandPalette />
      <KeyboardHints />
      <div className="flex min-h-screen flex-col pt-14 md:ml-16 md:pt-11">
        <main className="flex flex-1 flex-col">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
