import { PRICES } from "../config";
import { dayState, formatExamDate, getPhase, type DayId } from "../countdown";
import { CtaButton, Timer } from "./ui";

function KitIllustration() {
  return (
    <figure className="kit" aria-label="Ilustração do Kit Reta Final Rota ENEM">
      <div className="kit-stage" aria-hidden="true">
        <div className="kit-sheet kit-sheet-back" />
        <div className="kit-sheet kit-sheet-mid">
          <i /><i /><i className="short" />
        </div>
        <div className="kit-tablet">
          <div className="kit-tablet-bar" />
          <div className="kit-tablet-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <b key={i} className={i === 1 || i === 4 ? "on" : ""} />
            ))}
          </div>
          <div className="kit-tablet-lines"><i /><i /><i className="short" /></div>
        </div>
        <div className="kit-phone">
          <div className="kit-phone-notch" />
          <i /><i /><i className="short" />
          <span className="kit-phone-pill" />
        </div>
      </div>
      <figcaption>Imagem ilustrativa</figcaption>
    </figure>
  );
}

export function Hero({ now }: { now: number }) {
  const phase = getPhase(now);
  const priority: DayId = phase === "day2" ? "day2" : "day1";
  const state = dayState(priority, now);

  const copy =
    phase === "after"
      ? {
          title: "O PRÓXIMO ENEM COMEÇA NA SUA ROTINA DE HOJE.",
          text: "Quem se organiza com antecedência estuda com mais clareza. Comece a montar um caminho de estudos sem correria de última hora.",
          cta: "Quero organizar minha preparação",
        }
      : {
          title: "FALTAM POUCOS DIAS. E VOCÊ AINDA NÃO SABE O QUE PRIORIZAR NOS ESTUDOS?",
          text: "Não tente revisar tudo de uma vez. Tenha um caminho organizado para aproveitar melhor os dias que restam até o ENEM.",
          cta: "Quero organizar minha revisão",
        };

  return (
    <section className="hero" id="topo" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">ROTA ENEM • EDIÇÃO 2026</p>
          <h1 id="hero-title">{copy.title}</h1>
          <p className="lead">{copy.text}</p>

          <div className="price-box" id="hero-cta">
            <div className="price-line">
              <span className="price-big">{PRICES.main}</span>
              <span className="price-note">pagamento único<br />sem mensalidade</span>
            </div>
            <CtaButton full place="hero">{copy.cta}</CtaButton>
            <p className="micro">Material 100% digital • Acesso após confirmação do pagamento</p>
          </div>

          {phase !== "after" && (
            <div className="hero-urgency">
              <p>
                {state === "today"
                  ? `É HOJE: ${priority === "day1" ? "1º" : "2º"} dia de prova`
                  : `Próxima prova: ${priority === "day1" ? "1º" : "2º"} dia · ${formatExamDate(priority)}`}
              </p>
              {state === "upcoming" && <Timer day={priority} now={now} compact />}
            </div>
          )}
        </div>
        <KitIllustration />
      </div>
    </section>
  );
}
