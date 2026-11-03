import { CHECKOUT_URL, POLICY_LINKS, PRICES, SUPPORT_EMAIL } from "../config";
import { getPhase } from "../countdown";
import { Check, CtaButton, SectionHead } from "./ui";

/** Marcador visível de configuração pendente (não é dado real). */
const Placeholder = ({ children }: { children: string }) => (
  <span className="placeholder" title="Configuração pendente — defina no arquivo .env">⚙ {children}</span>
);

export function Pain() {
  return (
    <section className="section section-alt" aria-labelledby="pain-title">
      <div className="container narrow">
        <SectionHead eyebrow="Você se identifica?" id="pain-title" title="Estudar muito não significa estudar com direção." />
        <ol className="pain">
          {[
            "“Não sei por onde começar.”",
            "“Tenho pouco tempo e muitos conteúdos para revisar.”",
            "“Acabo estudando sem conseguir organizar minha rotina.”",
          ].map((t, i) => (
            <li key={t}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <p>{t}</p>
            </li>
          ))}
        </ol>
        <p className="section-sub center">
          Quando a prova está próxima, ter clareza sobre o que revisar pode ajudar você a aproveitar melhor o tempo disponível.
        </p>
      </div>
    </section>
  );
}

const BENEFITS: [string, string][] = [
  ["Plano de revisão para os dois dias", "Uma sequência clara do que revisar até cada prova."],
  ["Conteúdos organizados por disciplina", "Tudo separado por área para facilitar a consulta."],
  ["Resumos de estudo", "Pontos principais de cada tema, direto ao ponto."],
  ["Guia prático de redação", "Estrutura, repertório e orientações de escrita."],
  ["Exercícios de fixação", "Pratique o que acabou de revisar."],
  ["Planner de revisão", "Organize seus dias e acompanhe o progresso."],
  ["Checklist de preparação", "Para não esquecer nada antes da prova."],
];

export function Benefits() {
  return (
    <section className="section" id="kit" aria-labelledby="kit-title">
      <div className="container">
        <SectionHead eyebrow="O Kit Reta Final" id="kit-title" title="Tudo o que você precisa para organizar sua revisão em um só lugar." />
        <ul className="benefits">
          {BENEFITS.map(([t, d]) => (
            <li key={t}>
              <Check />
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="cta-center">
          <CtaButton variant="subtle" place="after-benefits">Quero organizar minha revisão</CtaButton>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = ["Escolha seu material.", "Finalize sua compra.", "Receba o acesso digital.", "Organize sua revisão e comece a estudar."];
  return (
    <section className="section section-alt" aria-labelledby="how-title">
      <div className="container narrow">
        <SectionHead eyebrow="Simples assim" id="how-title" title="Como funciona a Rota ENEM?" />
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Order bump informativo: sem checkbox, sem simular adição ao carrinho. */
export function Bump() {
  return (
    <section className="section" aria-labelledby="bump-title">
      <div className="container narrow">
        <div className="bump">
          <p className="bump-tag">OPCIONAL • ADICIONADO SOMENTE NO CHECKOUT</p>
          <h2 id="bump-title">BÔNUS ESPECIAL — KIT DE REVISÃO EXPRESSA</h2>
          <p>Materiais rápidos para consultar durante sua revisão.</p>
          <p className="bump-price">+ {PRICES.bump}</p>
          <ul>
            {["Fórmulas de matemática e física", "Conectivos para redação", "Mapas visuais de revisão", "Checklist para o dia da prova"].map((i) => (
              <li key={i}><Check />{i}</li>
            ))}
          </ul>
          <p className="bump-note">
            <strong>Não está incluso</strong> no preço do kit principal ({PRICES.main}). Você decide se quer adicioná-lo na tela de pagamento, ao finalizar a compra. Comprar só o kit principal é totalmente possível.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const items = ["Plano de revisão para os dois dias", "Conteúdos organizados por disciplina", "Resumos de estudo", "Guia de redação", "Exercícios", "Planner", "Checklist"];
  return (
    <section className="section section-alt" id="preco" aria-labelledby="preco-title">
      <div className="container narrow">
        <SectionHead eyebrow="Preço" id="preco-title" title="Comece sua revisão com mais organização." />
        <div className="offer">
          <p className="offer-name">ROTA ENEM — KIT RETA FINAL</p>
          <p className="offer-price">{PRICES.main}</p>
          <p className="offer-sub">Pagamento único • sem mensalidade</p>
          <ul>
            {items.map((i) => (
              <li key={i}><Check />{i}</li>
            ))}
          </ul>
          <CtaButton full place="pricing">Quero meu Kit Reta Final</CtaButton>
          <p className="micro dark">Material digital. Acesso após a confirmação do pagamento.</p>
          <p className="offer-bump">
            Quer ir além? Na tela de pagamento você poderá, se desejar, adicionar o Kit de Revisão Expressa por {PRICES.bump}. É opcional.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Trust() {
  return (
    <section className="section" aria-labelledby="trust-title">
      <div className="container">
        <SectionHead eyebrow="Compra tranquila" id="trust-title" title="Transparência do começo ao fim." />
        <ul className="trust">
          <li><h3>Produto digital</h3><p>Acesse pelo celular ou computador, sem envio físico.</p></li>
          <li><h3>Pagamento seguro</h3><p>Processado pela plataforma de pagamento parceira.</p></li>
          <li><h3>Instruções de acesso</h3><p>Enviadas após a confirmação do pagamento.</p></li>
          <li>
            <h3>Suporte</h3>
            <p>{SUPPORT_EMAIL ? <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> : <Placeholder>Configurar e-mail de suporte</Placeholder>}</p>
          </li>
          <li><h3>Garantia de 7 dias</h3><p>Conforme os termos de compra e o Código de Defesa do Consumidor.</p></li>
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  const supportTxt = SUPPORT_EMAIL ? ` ou pelo e-mail ${SUPPORT_EMAIL}` : " ou pelo canal de suporte informado na página";
  const qa: [string, string][] = [
    ["Como recebo o material?", "O material é 100% digital. Após a confirmação do pagamento, você recebe as instruções de acesso pelo e-mail cadastrado, enviadas pela plataforma de pagamento."],
    ["Posso acessar pelo celular?", "Sim. Os arquivos foram pensados para leitura no celular e também podem ser acessados em computadores compatíveis."],
    ["O material serve para os dois dias do ENEM?", "Sim. O kit principal é organizado em torno das áreas cobradas nos dois dias de prova: Linguagens, Humanas e Redação no primeiro, Matemática e Natureza no segundo."],
    ["Preciso pagar mensalidade?", `Não. O produto tem pagamento único de ${PRICES.main}.`],
    ["O Kit de Revisão Expressa é obrigatório?", `Não. É um produto adicional opcional de ${PRICES.bump}, que você pode incluir somente na tela de pagamento, ao finalizar a compra.`],
    ["Posso pedir reembolso?", `Sim. Você tem 7 dias de garantia a partir da compra, conforme os termos aplicáveis. Basta solicitar pela plataforma de pagamento${supportTxt}.`],
    ["O material é oficial do INEP?", "Não. A Rota ENEM é uma marca educacional independente, sem vínculo com o INEP ou o MEC."],
  ];
  return (
    <section className="section section-alt" id="faq" aria-labelledby="faq-title">
      <div className="container narrow">
        <SectionHead eyebrow="Dúvidas" id="faq-title" title="Perguntas frequentes" />
        <div className="faq">
          {qa.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ now }: { now: number }) {
  const after = getPhase(now) === "after";
  return (
    <section className="final" aria-labelledby="final-title">
      <div className="container narrow center">
        <h2 id="final-title">{after ? "Comece sua próxima preparação com antecedência." : "Não deixe os últimos dias passarem sem direção."}</h2>
        <p>{after ? "Organize sua rotina, defina prioridades e estude com mais clareza." : "Organize sua revisão, priorize seus estudos e aproveite melhor o tempo até a prova."}</p>
        <CtaButton place="final">{after ? "Quero começar minha preparação" : "Quero começar minha revisão"}</CtaButton>
        <p className="final-price">{PRICES.main} pagamento único</p>
      </div>
    </section>
  );
}

export function Footer() {
  const links: [string, string | null][] = [
    ["Política de Privacidade", POLICY_LINKS.privacy],
    ["Termos de Uso", POLICY_LINKS.terms],
    ["Política de Reembolso", POLICY_LINKS.refund],
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="logo">ROTA <span>ENEM</span></p>
            <p>Materiais de revisão organizados para estudantes que querem se preparar com mais clareza para o ENEM.</p>
          </div>
          <div>
            <h3>Contato</h3>
            <p>{SUPPORT_EMAIL ? <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> : <Placeholder>Configurar e-mail de suporte</Placeholder>}</p>
            <ul className="footer-links">
              {links.map(([label, href]) => (
                <li key={label}>{href ? <a href={href} rel="noopener noreferrer">{label}</a> : <Placeholder>{`Configurar: ${label}`}</Placeholder>}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="disclaimer">
          A Rota ENEM é uma iniciativa educacional independente, sem vínculo oficial com o INEP ou o Ministério da Educação (MEC). O material é complementar e não representa garantia de desempenho ou aprovação.
        </p>
        {!CHECKOUT_URL && (
          <p className="config-alert" role="note">
            Atenção (apenas para o responsável pelo site): o checkout ainda não foi configurado. Defina <code>VITE_CHECKOUT_URL</code> no arquivo .env.
          </p>
        )}
      </div>
    </footer>
  );
}
