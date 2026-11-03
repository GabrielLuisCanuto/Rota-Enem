import type { ReactNode } from "react";
import { dayState, formatExamDate, getPhase, type DayId } from "../countdown";
import { SectionHead, Timer } from "./ui";

const BookIcon = () => (
  <svg aria-hidden="true" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5v-15z" />
    <path d="M4 20.5A2.5 2.5 0 006.5 23H20v-5M9 8h7M9 12h5" />
  </svg>
);
const AtomIcon = () => (
  <svg aria-hidden="true" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1.6" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
  </svg>
);

interface DayCard {
  id: DayId;
  tag: string;
  title: string;
  icon: ReactNode;
  blocks: { name: string; items: string[] }[];
}

const DAYS: DayCard[] = [
  {
    id: "day1",
    tag: "PRIMEIRO DIA",
    title: "Linguagens, Ciências Humanas e Redação",
    icon: <BookIcon />,
    blocks: [
      { name: "Leitura e texto", items: ["Linguagens e interpretação de textos", "Literatura e leitura"] },
      { name: "Humanas", items: ["Ciências Humanas"] },
      { name: "Redação", items: ["Orientações para redação", "Estrutura dissertativo-argumentativa"] },
    ],
  },
  {
    id: "day2",
    tag: "SEGUNDO DIA",
    title: "Matemática e Ciências da Natureza",
    icon: <AtomIcon />,
    blocks: [
      { name: "Matemática", items: ["Matemática básica", "Porcentagem e proporção", "Geometria e gráficos"] },
      { name: "Natureza", items: ["Física", "Química", "Biologia"] },
    ],
  },
];

export function ExamDays({ now }: { now: number }) {
  const phase = getPhase(now);
  return (
    <section className="section" id="metodo" aria-labelledby="dias-title">
      <div className="container">
        <SectionHead
          eyebrow="Método Rota ENEM"
          id="dias-title"
          title="Uma revisão organizada para os dois dias de prova."
        />
        <p className="section-sub">
          O conteúdo é dividido pelos dias de prova, para que você saiba o que priorizar em cada etapa da revisão.
        </p>

        <div className="days">
          {DAYS.map((d) => {
            const state = dayState(d.id, now);
            const isPriority = phase !== "after" && ((phase === "day1" && d.id === "day1") || (phase === "day2" && d.id === "day2"));
            return (
              <article key={d.id} className={`day day-${d.id}${isPriority ? " is-priority" : ""}${state === "done" ? " is-done" : ""}`}>
                <div className="day-top">
                  <span className="day-icon">{d.icon}</span>
                  <div>
                    <p className="day-tag">{d.tag}{isPriority && <em>Prioridade agora</em>}</p>
                    <h3>{d.title}</h3>
                  </div>
                </div>

                <div className="day-time">
                  <p className="day-date">{formatExamDate(d.id)}</p>
                  {state === "upcoming" && <Timer day={d.id} now={now} />}
                  {state === "today" && <p className="day-status">É hoje. Boa prova!</p>}
                  {state === "done" && <p className="day-status muted">Prova realizada</p>}
                </div>

                <div className="day-blocks">
                  {d.blocks.map((b) => (
                    <div key={b.name} className="day-block">
                      <h4>{b.name}</h4>
                      <ul>
                        {b.items.map((i) => (
                          <li key={i}>{i}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <p className="foot-note">
          {phase === "after"
            ? "As provas de 2026 já aconteceram. Aproveite para planejar sua próxima preparação com antecedência."
            : "Provas em 8 e 15 de novembro de 2026 • horário de Brasília. Categorias de estudo propostas pela Rota ENEM."}
        </p>
      </div>
    </section>
  );
}
