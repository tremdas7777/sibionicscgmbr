import logo from "@/assets/sibionics-logo.png.asset.json";
import { cn } from "@/lib/utils";

/** Logo oficial SIBIONICS. Em fundo escuro (`tone="light"`) fica branco. */
export function BrandLogo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <img
      src={logo.url}
      alt="Sibionics"
      className={cn("h-6 w-auto", tone === "light" && "brightness-0 invert", className)}
    />
  );
}
