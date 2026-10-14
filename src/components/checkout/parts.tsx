import type { ReactNode, InputHTMLAttributes } from "react";
import { Check, Lock, MessageCircle, SquarePen, Truck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/site/BrandLogo";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export function PixIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("text-[var(--ck-pix)]", className)}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.5 7.6 6.9h1.1c.8 0 1.5.3 2 .8L12 9l1.3-1.3c.5-.5 1.2-.8 2-.8h1.1L12 2.5Zm-6.1 6L2.5 12l3.4 3.4h2.2c.4 0 .8-.2 1.1-.5L11 13.1a1.6 1.6 0 0 0-2.2-2.2L7.1 9c-.3-.3-.7-.5-1.1-.5Zm12.2 0h-2.2c-.4 0-.8.2-1.1.5l-1.8 1.8a1.6 1.6 0 0 0 2.2 2.2l1.8 1.8c.3.3.7.5 1.1.5h.1l3.4-3.4-3.5-3.4ZM12 15l-1.3 1.3c-.5.5-1.2.8-2 .8H7.6l4.4 4.4 4.4-4.4h-1.1c-.8 0-1.5-.3-2-.8L12 15Z" />
    </svg>
  );
}
export { productKitImage as PRODUCT_IMG } from "@/lib/product-images";

export function Card({
  children,
  done,
  muted,
  className,
}: {
  children: ReactNode;
  done?: boolean;
  muted?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-5 md:p-7",
        done
          ? "border-[var(--ck-green)]/40 bg-white"
          : muted
            ? "border-border/60 bg-white/60"
            : "border-border bg-white shadow-[0_8px_30px_-12px_rgba(2,20,26,0.18)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHead({
  title,
  step,
  onEdit,
  sub,
  muted,
}: {
  title: string;
  step?: string;
  onEdit?: () => void;
  sub?: string;
  muted?: boolean;
}) {
  return (
    <div className="mb-1">
      <div className="flex items-center justify-between gap-3">
        <h2 className={cn("flex items-center gap-2.5 text-xl font-light", muted && "text-muted-foreground")}>
          {onEdit && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--ck-green)] text-white">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          )}
          {title}
        </h2>
        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            Editar <SquarePen className="h-4 w-4" />
          </button>
        ) : (
          step && (
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
                muted ? "bg-muted text-muted-foreground" : "bg-[var(--ck-badge)] text-[var(--ck-ok)]",
              )}
            >
              {step}
            </span>
          )
        )}
      </div>
      {sub && <p className="mt-1.5 text-[13px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  ok?: boolean;
  prefix?: string;
  wrap?: string;
};
export function Field({ label, ok, prefix, wrap, className, ...rest }: FieldProps) {
  const filled = Boolean(rest.value);
  return (
    <label className={cn("block", wrap)}>
      <span className="mb-2 block text-[13px] font-medium">{label}</span>
      <span className="relative flex items-center">
        {prefix && <span className="absolute left-3 text-sm text-muted-foreground">{prefix}</span>}
        <input
          {...rest}
          className={cn(
            "h-12 w-full rounded-md border px-3 text-base md:text-sm outline-none transition-colors focus-visible:border-[var(--ck-green)] focus-visible:ring-2 focus-visible:ring-[var(--ck-green)]/25",
            filled ? "border-[var(--ck-green)]/30 bg-[var(--ck-field)]" : "border-border bg-white",
            prefix && "pl-12",
            className,
          )}
        />
        {ok && <Check className="absolute right-3 h-4 w-4 text-[var(--ck-ok)]" />}
      </span>
    </label>
  );
}

export function GreenButton({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        "flex h-14 w-full items-center justify-center gap-2 rounded-md bg-[var(--ck-green)] text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-[#10b98a]/20 transition-colors hover:bg-[var(--ck-green-hover)] disabled:opacity-50 disabled:shadow-none",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Topo do checkout e das páginas do pedido: faixa escura da loja, logo e selo de compra segura. */
export function CheckoutHeader() {
  return (
    <header
      className="relative isolate overflow-hidden text-white"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 20% 30%, rgba(21,120,150,0.35), transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(10,60,80,0.5), transparent 60%), linear-gradient(180deg, #02141a, #04222b)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-4 md:h-20">
        <Link to="/" aria-label="Voltar para a loja">
          <BrandLogo tone="light" className="text-2xl md:text-3xl" />
        </Link>
        <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
          <Lock className="h-4 w-4 text-[var(--ck-green)]" />
          <span className="hidden sm:inline">Compra 100% segura</span>
          <span className="sm:hidden">Seguro</span>
        </span>
      </div>
    </header>
  );
}

/** Selos da loja (mesmos da página do produto). */
export function TrustRow({ className }: { className?: string }) {
  const items = [
    { icon: Truck, title: "Entrega Rápida" },
    { icon: MessageCircle, title: "Suporte Rápido" },
    { icon: Lock, title: "Pagamento Seguro" },
  ];
  return (
    <div className={cn("grid grid-cols-3 gap-4 text-center", className)}>
      {items.map(({ icon: Icon, title }) => (
        <div key={title} className="flex flex-col items-center gap-2">
          <Icon className="h-6 w-6 text-[var(--ck-dark)]" strokeWidth={1.5} />
          <p className="text-[11px] font-medium">{title}</p>
        </div>
      ))}
    </div>
  );
}

export function CheckoutFooter() {
  return (
    <footer className="mt-auto bg-[var(--ck-footer)] px-4 py-10 text-center text-[13px] text-white/70">
      <BrandLogo tone="light" className="text-xl" />
      <p className="mt-4">
        © {new Date().getFullYear()} CGM GS1 · Todos os direitos reservados
        {brand.company.cnpj && <> · CNPJ: {brand.company.cnpj}</>}
        {brand.email && <> · E-mail: {brand.email}</>}
      </p>
      <div className="mt-5 flex items-center justify-center gap-4">
        <span className="flex h-7 items-center justify-center gap-1.5 rounded bg-white px-2.5 text-[11px] font-bold text-[#02141a]">
          <PixIcon className="h-4 w-4" /> PIX
        </span>
        <span className="flex items-center gap-2 text-left text-[11px] uppercase leading-tight tracking-wider text-white/80">
          <Lock className="h-4 w-4 text-[var(--ck-green)]" />
          Pagamento
          <br />
          100% seguro
        </span>
      </div>
    </footer>
  );
}
