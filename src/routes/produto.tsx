import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import heroImg from "@/assets/hero-product.webp.asset.json";
import featuresImg from "@/assets/features-family.webp.asset.json";
import alertsImg from "@/assets/alerts.webp.asset.json";
import glucoseGif from "@/assets/glucose-alert.gif.asset.json";

export const Route = createFileRoute("/produto")({
  head: () => ({
    meta: [
      { title: "CGM GS1 — Sensor de Monitoramento Contínuo | 14 dias" },
      { name: "description", content: "Sensor CGM GS1: monitoramento contínuo de glicose por 14 dias, sem picadas nem calibração. Aplicativo com alertas em tempo real." },
      { property: "og:title", content: "CGM GS1 — Sensor de Monitoramento Contínuo" },
      { property: "og:description", content: "14 dias de monitoramento contínuo, sem picadas, com alertas em tempo real." },
      { property: "og:url", content: "/produto" },
    ],
    links: [{ rel: "canonical", href: "/produto" }],
  }),
  component: Product,
});

const gallery = [heroImg.url, featuresImg.url, alertsImg.url, glucoseGif.url];

function Product() {
  const [active, setActive] = useState(0);
  const [pack, setPack] = useState<"1" | "2" | "3">("1");
  const prices = { "1": 289, "2": 497, "3": 697 } as const;
  const price = prices[pack];
  const original = 289 * Number(pack);
  const hasDiscount = price < original;

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <nav className="mb-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Início</Link> <span className="mx-2">/</span> <span className="text-foreground">CGM GS1</span>
        </nav>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-muted/40">
              <img src={gallery[active]} alt="CGM GS1" className="aspect-square w-full object-cover" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActive(i)}
                  className={`overflow-hidden rounded-xl border-2 transition-all ${active === i ? "border-brand" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <img src={src} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-deep">
              Em estoque
            </span>
            <h1
              className="mt-4 font-display text-3xl font-extrabold tracking-tight md:text-4xl"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              SIBIONICS CGM GS1
            </h1>
            <p className="mt-1 text-base font-medium text-foreground/80">
              Sistema de monitoramento contínuo de glicose
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Monitoramento contínuo de glicose · 14 dias · sem calibração
            </p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
                R$ {price.toFixed(2).replace(".", ",")}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  R$ {original.toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">ou em até 10x sem juros no cartão</p>

            <div className="mt-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Pacote</p>
              <div className="grid grid-cols-3 gap-3">
                {(["1", "2", "3"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPack(p)}
                    className={`rounded-2xl border-2 p-4 text-left transition-all ${pack === p ? "border-brand bg-brand/5" : "border-border hover:border-brand/40"}`}
                  >
                    <div className="font-display text-lg font-bold" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {p} {p === "1" ? "unidade" : "unidades"}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-foreground">
                      R$ {prices[p].toFixed(2).replace(".", ",")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {p === "1" ? "14 dias de uso" : `${Number(p) * 14} dias de uso`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <button
                className="flex-1 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] transition-transform hover:scale-[1.01]"
                style={{ background: "var(--gradient-brand)" }}
              >
                Adicionar ao carrinho
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-border/60 bg-muted/30 p-5 text-xs">
              <Perk title="Frete grátis" desc="Todo o Brasil" />
              <Perk title="Envio em 24h" desc="Dias úteis" />
              <Perk title="Garantia" desc="12 meses" />
              <Perk title="Suporte" desc="Atendimento clínico" />
            </div>

            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Sensor + aplicador incluídos na caixa",
                "Sem picadas no dedo, sem calibração",
                "Resistente à água (banho, piscina, mar)",
                "Compatível com iOS e Android",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-primary-foreground text-xs">✓</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Specs */}
        <section className="mt-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">Especificações</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold" style={{ fontFamily: "Manrope, sans-serif" }}>Ficha técnica</h2>
          <div className="mt-8 overflow-hidden rounded-3xl border border-border/60">
            <dl className="divide-y divide-border/60">
              {specs.map((s) => (
                <div key={s.label} className="grid grid-cols-3 gap-4 bg-card px-6 py-4 text-sm">
                  <dt className="font-semibold text-foreground">{s.label}</dt>
                  <dd className="col-span-2 text-muted-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Big image block */}
        <section className="mt-24 grid gap-10 md:grid-cols-2 md:items-center">
          <img src={featuresImg.url} alt="Família aproveitando com o CGM" className="rounded-3xl" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">Liberdade real</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold" style={{ fontFamily: "Manrope, sans-serif" }}>
              Feito para o seu dia a dia.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Indolor, sem calibração, com alarmes de glicose e compartilhamento instantâneo. Para pessoas com diabetes a partir dos 3 anos.
            </p>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}

function Perk({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <div className="font-semibold text-foreground">{title}</div>
      <div className="text-muted-foreground">{desc}</div>
    </div>
  );
}

const specs = [
  { label: "Duração", value: "Até 14 dias de uso contínuo" },
  { label: "Calibração", value: "Não requer calibração com testes de dedo" },
  { label: "Conectividade", value: "Bluetooth 5.0 · iOS 13+ e Android 8+" },
  { label: "Resistência à água", value: "IP28 — até 2,5m por 24h" },
  { label: "Intervalo de leitura", value: "1 leitura por minuto" },
  { label: "Aplicação", value: "Braço · aplicador descartável incluído" },
  { label: "Indicação", value: "Pessoas com diabetes a partir de 3 anos" },
];