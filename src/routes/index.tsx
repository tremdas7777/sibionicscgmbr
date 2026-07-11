import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import heroDark from "@/assets/hero-dark.jpg";
import featuresImg from "@/assets/features-family.webp.asset.json";
import sleepImg from "@/assets/sleep-monitor.webp.asset.json";
import alertsImg from "@/assets/alerts.webp.asset.json";
import glucoseGif from "@/assets/glucose-alert.gif.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SIBIONICS — Monitoramento contínuo de glicose" },
      { name: "description", content: "SIBIONICS CGM GS1: monitoramento contínuo de glicose 24h por dia, sem picadas, com dados em tempo real." },
      { property: "og:title", content: "SIBIONICS — Monitoramento contínuo de glicose" },
      { property: "og:description", content: "Esteja no controle da sua glicose 24 horas por dia." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* HERO — dark */}
      <section className="relative isolate overflow-hidden bg-[#02141a] text-white">
        <SiteHeader variant="dark" />
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 30%, rgba(21,120,150,0.35), transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(10,60,80,0.5), transparent 60%), linear-gradient(180deg, #02141a, #04222b)",
          }}
          aria-hidden
        />
        <img
          src={heroDark}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#02141a]/60 via-[#02141a]/30 to-[#02141a]/90" aria-hidden />
        <div className="mx-auto flex min-h-[620px] max-w-7xl flex-col items-center justify-end px-6 pt-32 pb-16 text-center md:min-h-[760px]">
          <Link
            to="/produto"
            className="mt-10 inline-flex items-center rounded-md bg-[#10b98a] px-10 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#0ea77b]"
          >
            Compre Agora
          </Link>
        </div>
      </section>

      {/* Knowledge block */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2">
          <img src={glucoseGif.url} alt="Alerta de glicose em tempo real" className="w-full rounded-lg" />
          <div>
            <h2
              className="font-display text-4xl font-light leading-tight tracking-tight text-foreground md:text-5xl"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Conhecimento que impulsiona o progresso, percepção que impulsiona a saúde
            </h2>
            <p className="mt-6 max-w-lg text-base text-muted-foreground">
              Esteja no controle da sua glicose 24 horas por dia, com dados atualizados em tempo real.
            </p>
          </div>
        </div>
      </section>

      {/* GS1 CGM feature */}
      <section className="bg-[#f6f7f8]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#10b98a]">GS1 CGM</p>
            <h2
              className="mt-4 font-display text-3xl font-light leading-tight text-foreground md:text-4xl"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Testado e aprovado por milhões de pessoas, o GS1 é preciso, confiável e fácil de usar.
            </h2>
            <ul className="mt-8 space-y-3 text-base text-foreground/80">
              <li>→ Envio de dados instantâneo</li>
              <li>→ Alarmes customizáveis</li>
              <li>→ Dispensa escaneamento</li>
              <li>→ Resistente à água</li>
            </ul>
            <Link
              to="/produto"
              className="mt-10 inline-flex items-center rounded-md border border-foreground px-8 py-3 text-sm font-semibold tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Saiba Mais
            </Link>
          </div>
          <img src={alertsImg.url} alt="GS1 CGM" className="w-full rounded-lg" />
        </div>
      </section>

      {/* App section */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2">
          <img src={sleepImg.url} alt="Aplicativo SIBIONICS" className="w-full rounded-lg" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#10b98a]">Aplicativo SIBIONICS</p>
            <h2
              className="mt-4 font-display text-3xl font-light leading-tight text-foreground md:text-4xl"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Projetado para acompanhar sua saúde.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Visualize tendências, receba alertas e compartilhe relatórios com sua equipe médica em um toque.
            </p>
            <a
              href="#app"
              className="mt-10 inline-flex items-center rounded-md border border-foreground px-8 py-3 text-sm font-semibold tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Mais Informações
            </a>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="bg-[#f6f7f8]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl font-light md:text-4xl" style={{ fontFamily: "Manrope, sans-serif" }}>
              Descubra mais no Blog
            </h2>
            <a href="#" className="text-sm font-semibold text-[#10b98a] hover:underline">Ver tudo →</a>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {posts.map((p) => (
              <article key={p.title} className="group">
                <div className="overflow-hidden rounded-lg bg-muted">
                  <img src={p.img} alt={p.title} className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold" style={{ fontFamily: "Manrope, sans-serif" }}>{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-background">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <h2 className="text-center font-display text-3xl font-light md:text-4xl" style={{ fontFamily: "Manrope, sans-serif" }}>
            Perguntas Frequentes
          </h2>
          <div className="mt-12 divide-y divide-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                  {f.q}
                  <span className="text-2xl leading-none text-[#10b98a] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground">Tire suas dúvidas pelo Whatsapp</p>
            <a
              href="https://wa.me/553123916280"
              className="mt-4 inline-flex items-center rounded-md bg-[#10b98a] px-8 py-3 text-sm font-semibold text-white hover:bg-[#0ea77b]"
            >
              Suporte ao cliente
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

const posts = [
  {
    title: "Vacinação e Diabetes: entenda a relação com a glicose",
    excerpt: "Para pessoas com diabetes, manter a vacinação em dia é uma forma importante de proteção e cuidado com a saúde.",
    img: featuresImg.url,
  },
  {
    title: "Alexander Zverev faz história em Roland Garros",
    excerpt: "O tenista alemão que convive com o diabetes tipo 1 desde os 4 anos inspira pessoas com DM1.",
    img: alertsImg.url,
  },
  {
    title: "SIBIONICS participa do 23º Painel da SBD-DF",
    excerpt: "Evento sobre tecnologia no cuidado à pessoa com diabetes, promovido pela SBD do Distrito Federal.",
    img: sleepImg.url,
  },
];

const faqs = [
  {
    q: "Qual o local adequado para a aplicação do sensor CGM GS1?",
    a: "O sensor CGM GS1 deve ser aplicado na parte posterior do braço. Evite áreas com cicatrizes, manchas, estrias ou caroços.\n\nSelecione uma área da pele que geralmente permaneça plana durante suas atividades diárias.\n\nCUIDADOS: Escolha um local a pelo menos 5 cm de distância do local da injeção de insulina.",
  },
  {
    q: "Qual o período de utilização do sensor CGM GS1 após aplicado?",
    a: "O sensor CGM GS1 tem um período de utilização de 14 dias. Ao final do período, ele deixará de atualizar os dados e deverá ser removido.",
  },
  {
    q: "A aplicação do sensor CGM GS1 é dolorosa?",
    a: "Não. O aplicador adota um design de mola dupla que permite inserir o sensor facilmente, com maior velocidade e sem dor.",
  },
  {
    q: "O sensor pode ser utilizado nas atividades diárias (banho, ducha e/ou natação)?",
    a: "Sim. É à prova d'água. Não deve ser submerso a mais de 1 metro nem por mais de 1 hora.",
  },
  {
    q: "Quantos dados podem ser armazenados no aplicativo?",
    a: "O aplicativo armazena todos os dados dos seus sensores anteriores na nuvem. Você pode gerar relatórios AGP de 7, 14, 30 ou 90 dias.",
  },
  {
    q: "Qual a versão do sistema operacional compatível?",
    a: "Android 8.1 ou superior e iOS 13 ou superior.",
  },
];