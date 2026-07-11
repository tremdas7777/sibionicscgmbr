import { Link } from "@tanstack/react-router";
import logo from "@/assets/sibionics-logo.png.asset.json";

export function SiteHeader({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  const base = isDark
    ? "absolute inset-x-0 top-0 z-40 bg-transparent text-white"
    : "sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl text-foreground";
  const linkCls = isDark
    ? "transition-colors hover:text-white/80 text-white/95"
    : "transition-colors hover:text-foreground text-muted-foreground";
  return (
    <header className={base}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-6">
        <Link to="/" className="flex items-center" aria-label="Sibionics">
          <img
            src={logo.url}
            alt="Sibionics"
            className={`h-5 w-auto sm:h-7 ${isDark ? "brightness-0 invert" : ""}`}
          />
        </Link>
        <nav className="hidden items-center gap-7 text-[13px] font-semibold uppercase tracking-wider md:flex">
          <Link to="/produto" className={linkCls}>Produto</Link>
          <a href="/#suporte" className={linkCls}>Suporte</a>
          <a href="/#programas" className={linkCls}>Programas</a>
          <a href="/#blog" className={linkCls}>Blog</a>
          <a href="/#sobre" className={linkCls}>Sobre nós</a>
          <a href="/#profissionais" className={linkCls}>Profissionais da saúde</a>
        </nav>
        <div className={`hidden items-center gap-4 md:flex ${isDark ? "text-white" : "text-foreground"}`} aria-hidden>
          <IconSearch />
          <IconUser />
          <IconBag />
        </div>
        <button className="md:hidden" aria-label="Menu">
          <span className={isDark ? "text-white" : "text-foreground"}>☰</span>
        </button>
      </div>
    </header>
  );
}

function IconSearch() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>; }
function IconUser() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>; }
function IconBag() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7h12l-1 13H7z"/><path d="M9 7a3 3 0 1 1 6 0"/></svg>; }

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div className="md:col-span-2">
          <img src={logo.url} alt="Sibionics" className="h-7 w-auto" />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Tecnologia de monitoramento contínuo de glicose para uma vida com mais liberdade e menos picadas.
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">Produto</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/produto" className="hover:text-foreground">CGM GS1</Link></li>
            <li><a href="/#features" className="hover:text-foreground">Recursos</a></li>
            <li><a href="/#faq" className="hover:text-foreground">Dúvidas</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-6 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} — Este é um site de demonstração inspirado no produto CGM GS1.
      </div>
    </footer>
  );
}