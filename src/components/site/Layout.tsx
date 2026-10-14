import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-header";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background" style={{ fontFamily: "Inter, sans-serif" }}>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
