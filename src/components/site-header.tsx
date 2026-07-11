import { Link } from "@tanstack/react-router";
import logo from "@/assets/sibionics-logo.png.asset.json";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-center px-6">
        <Link to="/" className="flex items-center">
          <img src={logo.url} alt="Sibionics" className="h-7 w-auto md:h-8" />
        </Link>
        <nav className="absolute right-6 hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link to="/produto" className="transition-colors hover:text-foreground">Produto</Link>
          <a href="/#features" className="transition-colors hover:text-foreground">Recursos</a>
          <a href="/#how" className="transition-colors hover:text-foreground">Como funciona</a>
          <a href="/#faq" className="transition-colors hover:text-foreground">FAQ</a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
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
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">Contato</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>contato@exemplo.com</li>
            <li>SAC: 0800 000 0000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-6 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} — Este é um site de demonstração inspirado no produto CGM GS1.
      </div>
    </footer>
  );
}