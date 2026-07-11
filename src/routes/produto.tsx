import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import heroImg from "@/assets/hero-product.webp.asset.json";
import featuresImg from "@/assets/features-family.webp.asset.json";
import alertsImg from "@/assets/alerts.webp.asset.json";
import sleepImg from "@/assets/sleep-monitor.webp.asset.json";
import glucoseGif from "@/assets/glucose-alert.gif.asset.json";

export const Route = createFileRoute("/produto")({
  head: () => ({
    meta: [
      { title: "SIBIONICS CGM GS1 — Sistema de monitoramento contínuo de glicose" },
      { name: "description", content: "Sensor SIBIONICS CGM GS1: 14 dias de monitoramento contínuo de glicose, sem picadas nem calibração." },
      { property: "og:title", content: "SIBIONICS CGM GS1 — Monitoramento contínuo de glicose" },
      { property: "og:description", content: "14 dias de monitoramento contínuo, sem picadas, com alertas em tempo real." },
    ],
  }),
  component: Product,
});

const gallery = [heroImg.url, featuresImg.url, alertsImg.url, sleepImg.url, glucoseGif.url];

function Product() {
  const [active, setActive] = useState(0);
  const [pack, setPack] = useState<"1" | "2" | "3">("1");
  const [qty, setQty] = useState(1);
  const prices = { "1": 289, "2": 497, "3": 697 } as const;
  const price = prices[pack];

  return (
    <div className="min-h-screen bg-background font-body text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 md:py-12">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          {/* Gallery */}
          <div>
            <div className="overflow-hidden rounded-lg bg-muted/40">
              <img src={gallery[active]} alt="SIBIONICS CGM GS1" className="aspect-square w-full object-cover" />
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all ${active === i ? "border-foreground" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1
              className="font-display text-2xl font-light leading-tight sm:text-3xl md:text-4xl"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              SIBIONICS CGM GS1 - Sistema de monitoramento contínuo de glicose
            </h1>

            <div className="mt-6">
              <span className="font-display text-2xl font-medium" style={{ fontFamily: "Manrope, sans-serif" }}>
                R$ {price.toFixed(2).replace(".", ",")} BRL
              </span>
              <p className="mt-1 text-xs text-muted-foreground">
                <span className="underline">Frete</span> calculado no checkout.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium text-foreground">Unidade</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {(["1", "2", "3"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={pack === p}
                    onClick={() => setPack(p)}
                    className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:px-6 sm:py-2.5 sm:text-sm ${
                      pack === p
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-foreground hover:border-foreground"
                    }`}
                  >
                    {p} {p === "1" ? "Unidade" : "Unidades"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium text-foreground">Quantidade</p>
              <div className="mt-3 inline-flex items-center overflow-hidden rounded-md border border-border">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2 text-lg hover:bg-muted">−</button>
                <input value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} className="w-14 border-x border-border bg-transparent py-2 text-center text-sm outline-none" />
                <button type="button" onClick={() => setQty((q) => q + 1)} className="px-4 py-2 text-lg hover:bg-muted">+</button>
              </div>
            </div>

            <button
              type="button"
              className="mt-8 w-full rounded-md bg-[#10b98a] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#0ea77b]"
            >
              Comprar Agora
            </button>

            <div className="mt-8 divide-y divide-border border-y border-border">
              {details.map((d) => (
                <details key={d.title} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-medium">
                    {d.title}
                    <span className="text-xl leading-none text-muted-foreground transition-transform group-open:rotate-180">⌄</span>
                  </summary>
                  <div className="mt-4 whitespace-pre-line text-sm text-muted-foreground">{d.content}</div>
                </details>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 text-center">
              <Trust icon={<TruckIcon />} title="Entrega Rápida" />
              <Trust icon={<ChatIcon />} title="Suporte Rápido" />
              <Trust icon={<LockIcon />} title="Pagamento Seguro" />
            </div>
          </div>
        </div>

        {/* Linha de diabetes */}
        <section className="mt-24">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Linha de Diabetes</p>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[heroImg.url, featuresImg.url, alertsImg.url, sleepImg.url].map((src, i) => (
              <Link key={i} to="/produto" className="group overflow-hidden rounded-lg bg-muted/30">
                <img src={src} alt="" className="aspect-square w-full object-cover transition-transform group-hover:scale-105" />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}

function Trust({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-foreground">{icon}</div>
      <p className="text-xs font-medium text-foreground">{title}</p>
    </div>
  );
}

function TruckIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h11v10H3z"/><path d="M14 10h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>; }
function ChatIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>; }
function LockIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/></svg>; }

const details = [
  {
    title: "Descrição do Produto",
    content:
      "Sistema de monitoramento contínuo de glicose com sensor de 14 dias, dispensa calibração e envia leituras em tempo real ao aplicativo SIBIONICS. Alertas configuráveis, compartilhamento com familiares e relatórios AGP prontos para o médico.",
  },
  {
    title: "Informações Importantes de Segurança",
    content:
      "Consulte seu médico antes do uso. Não utilize em áreas com cicatrizes, manchas, estrias ou caroços. Mantenha distância de pelo menos 5 cm do local da injeção de insulina. Indicado para pessoas com diabetes a partir de 3 anos.",
  },
  {
    title: "Descrição da Embalagem",
    content:
      "Cada caixa contém: 1 sensor CGM GS1 + 1 aplicador descartável + guia rápido de uso. Aplicativo SIBIONICS gratuito para iOS 13+ e Android 8.1+.",
  },
];