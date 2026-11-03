import type { ReactNode } from "react";
import { CtaButton, SectionHead } from "./ui";

/**
 * PRÉVIAS DO PRODUTO
 * Enquanto `imageSrc` estiver vazio, o quadro mostra uma ilustração
 * identificada como ILUSTRATIVA (não é captura de tela do material real).
 * Quando tiver o arquivo real, informe `imageSrc` (ex.: "/previews/planner.webp")
 * junto com width/height para evitar salto de layout.
 */
interface PreviewItem {
  id: string;
  title: string;
  caption: string;
  imageSrc?: string;
  imageAlt?: string;
  width?: number;
  height?: number;
  mock: ReactNode;
}

const Lines = ({ n = 3 }: { n?: number }) => (
  <div className="m-lines">
    {Array.from({ length: n }).map((_, i) => (
      <i key={i} className={i === n - 1 ? "short" : ""} />
    ))}
  </div>
);

const ITEMS: PreviewItem[] = [
  {
    id: "planner",
    title: "Planner de revisão",
    caption: "Organize seus dias e acompanhe o progresso.",
    mock: (
      <div className="m-planner">
        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d, i) => (
          <div key={d} className="m-day">
            <b>{d}</b>
            <span className={i % 2 === 0 ? "tick on" : "tick"} />
            <Lines n={2} />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "resumos",
    title: "Resumos por disciplina",
    caption: "Pontos principais de cada tema, direto ao ponto.",
    mock: (
      <div className="m-summary">
        <div className="m-chips"><span /><span /><span /></div>
        <div className="m-heading" />
        <Lines n={4} />
        <div className="m-callout"><Lines n={2} /></div>
      </div>
    ),
  },
  {
    id: "redacao",
    title: "Guia de redação",
    caption: "Estrutura, repertório e orientações de escrita.",
    mock: (
      <div className="m-essay">
        <div className="m-block"><b>Introdução</b><Lines n={2} /></div>
        <div className="m-block"><b>Desenvolvimento</b><Lines n={3} /></div>
        <div className="m-block"><b>Conclusão</b><Lines n={2} /></div>
      </div>
    ),
  },
  {
    id: "matematica",
    title: "Fichas de Matemática",
    caption: "Fichas de revisão para consultar rápido.",
    mock: (
      <div className="m-math">
        {["fx", "%", "△", "∑"].map((s) => (
          <div key={s} className="m-card">
            <strong aria-hidden="true">{s}</strong>
            <Lines n={2} />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "exercicios",
    title: "Exercícios de fixação",
    caption: "Pratique o que acabou de revisar.",
    mock: (
      <div className="m-quiz">
        <Lines n={3} />
        {["A", "B", "C", "D", "E"].map((l, i) => (
          <div key={l} className={`m-opt${i === 2 ? " on" : ""}`}>
            <b>{l}</b>
            <i />
          </div>
        ))}
      </div>
    ),
  },
];

export function Previews() {
  return (
    <section className="section section-alt" id="previa" aria-labelledby="previa-title">
      <div className="container">
        <SectionHead eyebrow="Conheça o kit" id="previa-title" title="Veja como o material é organizado." />
        <p className="section-sub">
          Os quadros abaixo são <strong>ilustrações demonstrativas</strong> do tipo de conteúdo do kit. Não são capturas de tela do material final.
        </p>

        <ul className="previews">
          {ITEMS.map((it) => (
            <li key={it.id} className="preview">
              <div className="frame">
                <span className="frame-badge">{it.imageSrc ? "Prévia do material" : "Ilustrativo"}</span>
                {it.imageSrc ? (
                  <img src={it.imageSrc} alt={it.imageAlt ?? it.title} width={it.width} height={it.height} loading="lazy" decoding="async" />
                ) : (
                  <div className="frame-art" role="img" aria-label={`Ilustração demonstrativa: ${it.title}`}>
                    {it.mock}
                  </div>
                )}
              </div>
              <h3>{it.title}</h3>
              <p>{it.caption}</p>
            </li>
          ))}
        </ul>

        <p className="foot-note">Espaços reservados até a inclusão das prévias reais do produto.</p>
        <div className="cta-center">
          <CtaButton variant="subtle" place="after-preview">Quero meu Kit Reta Final</CtaButton>
        </div>
      </div>
    </section>
  );
}
