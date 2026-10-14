import { cn } from "@/lib/utils";

/** Logo em texto da loja CGM GS1 (troque por uma imagem quando houver o arquivo do logo). */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-2 font-light leading-none tracking-tight text-[#02141a] whitespace-nowrap",
        className,
      )}
      style={{ fontFamily: "Manrope, system-ui, sans-serif" }}
      aria-label="CGM GS1"
    >
      CGM <span className="font-semibold text-[#10b98a]">GS1</span>
    </span>
  );
}
