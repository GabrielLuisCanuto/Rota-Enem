import { useEffect, useState } from "react";
import { PRICES, configAudit } from "./config";
import { getPhase } from "./countdown";
import { ExamDays } from "./components/ExamDays";
import { Hero } from "./components/Hero";
import { Previews } from "./components/Previews";
import { Benefits, Bump, Faq, FinalCta, Footer, HowItWorks, Pain, Pricing, Trust } from "./components/Sections";
import { CtaButton, useNow } from "./components/ui";

function Header() {
  return (
    <header className="header">
      <div className="container header-in">
        <a href="#topo" className="logo" aria-label="Rota ENEM — início">ROTA <span>ENEM</span></a>
        <nav aria-label="Principal" className="nav">
          <a href="#metodo">Método</a>
          <a href="#kit">O kit</a>
          <a href="#preco">Preço</a>
          <a href="#faq">Dúvidas</a>
        </nav>
        <a className="btn btn-small" href="#preco">Quero o kit</a>
      </div>
    </header>
  );
}

/** Barra fixa só no mobile; some quando o preço/CTA principal já está visível. */
function StickyBar({ after }: { after: boolean }) {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const targets = ["hero-cta", "preco"].map((id) => document.getElementById(id)).filter((n): n is HTMLElement => !!n);
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setHidden(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return (
    <div className={`sticky${hidden ? " is-hidden" : ""}`} aria-hidden={hidden}>
      <div className="sticky-price">
        <strong>{PRICES.main}</strong>
        <span>pagamento único</span>
      </div>
      <div className="sticky-cta" {...(hidden ? { inert: true } : {})}>
        <CtaButton place="sticky">{after ? "Quero começar" : "Quero o kit"}</CtaButton>
      </div>
    </div>
  );
}

export default function App() {
  const now = useNow();
  const after = getPhase(now) === "after";

  useEffect(() => {
    const missing = configAudit();
    if (missing.length) console.warn("[Rota ENEM] Configuração pendente:\n- " + missing.join("\n- "));
  }, []);

  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero now={now} />
        <ExamDays now={now} />
        <Pain />
        <Previews />
        <Benefits />
        <HowItWorks />
        <Bump />
        <Pricing />
        <Trust />
        <Faq />
        <FinalCta now={now} />
      </main>
      <Footer />
      <StickyBar after={after} />
    </>
  );
}
