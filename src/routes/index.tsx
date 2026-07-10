import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import heroImg from "@/assets/hero-product.webp.asset.json";
import featuresImg from "@/assets/features-family.webp.asset.json";
import sleepImg from "@/assets/sleep-monitor.webp.asset.json";
import alertsImg from "@/assets/alerts.webp.asset.json";
import glucoseGif from "@/assets/glucose-alert.gif.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen font-body text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-soft)" }}
          aria-hidden
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-deep">
              <span className="h-2 w-2 rounded-full bg-brand" /> Novo · CGM GS1
            </span>
            <h1
              className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Sua glicose em <span className="text-brand-deep">tempo real</span>, sem picadas.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              O sensor de monitoramento contínuo dura 14 dias, dispensa calibração e envia leituras direto para o seu celular — dia e noite.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/produto"
                className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] transition-transform hover:scale-[1.02]"
                style={{ background: "var(--gradient-brand)" }}
              >
                Comprar agora
              </Link>
              <a
                href="#how"
                className="inline-flex items-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Como funciona
              </a>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 text-center">
              <Stat value="14" label="dias de uso" />
              <Stat value="0" label="calibrações" />
              <Stat value="24/7" label="leituras" />
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute -inset-6 -z-10 rounded-[3rem] blur-3xl"
              style={{ background: "var(--gradient-brand)", opacity: 0.25 }}
              aria-hidden
            />
            <img
              src={heroImg.url}
              alt="Sensor CGM GS1 no braço com aplicativo mostrando glicose em tempo real"
              className="w-full rounded-3xl shadow-[var(--shadow-card)]"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section id="features" className="border-y border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">Recursos</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl" style={{ fontFamily: "Manrope, sans-serif" }}>
              Tudo o que você precisa para controlar sua glicose.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-3xl border border-border/60 bg-card p-7 transition-shadow hover:shadow-[var(--shadow-card)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand-deep">
                  {f.icon}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold" style={{ fontFamily: "Manrope, sans-serif" }}>{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALERTS BLOCK */}
      <section className="bg-muted/40">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <img src={alertsImg.url} alt="Alerta de glicose baixa no aplicativo" className="rounded-3xl shadow-[var(--shadow-card)]" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">Alertas em tempo real</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl" style={{ fontFamily: "Manrope, sans-serif" }}>
              Durma tranquilo. O sensor avisa antes.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Notificações instantâneas para hipo e hiperglicemia. Compartilhe leituras com familiares e sua equipe médica com um toque.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Alertas configuráveis de alta e baixa", "Compartilhamento com até 5 contatos", "Relatórios AGP prontos para o médico"].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-primary-foreground text-xs">✓</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">Passo a passo</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl" style={{ fontFamily: "Manrope, sans-serif" }}>
              Comece em menos de 5 minutos.
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-3xl border border-border/60 bg-card p-7">
                <div className="font-display text-5xl font-extrabold text-brand/30" style={{ fontFamily: "Manrope, sans-serif" }}>0{i + 1}</div>
                <h3 className="mt-2 font-display text-lg font-bold" style={{ fontFamily: "Manrope, sans-serif" }}>{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NIGHT MONITORING */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "oklch(0.75 0.14 180)" }}>24 horas por dia</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl" style={{ fontFamily: "Manrope, sans-serif" }}>
              Monitoramento contínuo por 14 dias.
            </h2>
            <p className="mt-4 text-background/70">
              Sem interrupções, sem escaneamentos manuais. Leituras automáticas a cada minuto, mesmo enquanto você dorme.
            </p>
            <Link
              to="/produto"
              className="mt-8 inline-flex items-center rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-[1.02]"
            >
              Ver produto
            </Link>
          </div>
          <img src={sleepImg.url} alt="Monitoramento durante o sono" className="rounded-3xl" />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-background">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-brand-deep">Dúvidas frequentes</p>
          <h2 className="mt-2 text-center font-display text-3xl font-extrabold md:text-4xl" style={{ fontFamily: "Manrope, sans-serif" }}>
            Perguntas frequentes
          </h2>
          <div className="mt-12 divide-y divide-border/60 rounded-3xl border border-border/60 bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold">
                  {f.q}
                  <span className="text-brand transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-extrabold text-brand-deep" style={{ fontFamily: "Manrope, sans-serif" }}>{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

const features = [
  { title: "Sem picadas", desc: "Sensor discreto no braço substitui os testes de dedo tradicionais.", icon: <IconDrop /> },
  { title: "Sem calibração", desc: "Pronto para uso desde a aplicação, sem testes adicionais.", icon: <IconCheck /> },
  { title: "14 dias contínuos", desc: "Duas semanas de leituras automáticas sem interrupções.", icon: <IconClock /> },
  { title: "Resistente à água", desc: "Tome banho, nade e pratique esportes tranquilamente.", icon: <IconDroplet /> },
  { title: "Alertas inteligentes", desc: "Notificações de hipo e hiperglicemia direto no celular.", icon: <IconBell /> },
  { title: "Compartilhamento", desc: "Familiares e médicos acompanham suas leituras em tempo real.", icon: <IconShare /> },
];

const steps = [
  { title: "Aplique o sensor", desc: "Aplicador indolor no braço em segundos." },
  { title: "Conecte o app", desc: "Pareie via Bluetooth com o aplicativo gratuito." },
  { title: "Acompanhe 24/7", desc: "Leituras contínuas por 14 dias direto no celular." },
];

const faqs = [
  { q: "O sensor é doloroso na aplicação?", a: "Não. O aplicador foi desenvolvido para ser praticamente indolor, com filamento ultrafino." },
  { q: "Preciso calibrar com testes de dedo?", a: "Não é necessário. O sensor sai calibrado de fábrica." },
  { q: "Posso usar na água?", a: "Sim, o sensor é resistente à água e pode ser usado no banho, piscina e mar." },
  { q: "Quanto tempo dura cada sensor?", a: "Cada sensor tem duração de até 14 dias de uso contínuo." },
  { q: "Como recebo alertas?", a: "Via app: notificações push para leituras críticas e tendências." },
];

function IconDrop() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12z"/></svg>; }
function IconCheck() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>; }
function IconClock() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>; }
function IconDroplet() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 8a7 7 0 1 1-14 0l7-8z"/></svg>; }
function IconBell() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>; }
function IconShare() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>; }
