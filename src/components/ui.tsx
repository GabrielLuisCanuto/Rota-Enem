import { useEffect, useState, type ReactNode } from "react";
import { CHECKOUT_URL } from "../config";
import { DAY_DATES, dayStart, pad, timeLeft, type DayId } from "../countdown";

/** Relógio compartilhado: atualiza a cada segundo e ao voltar para a aba. */
export function useNow(): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const id = window.setInterval(tick, 1000);
    const onVisible = () => document.visibilityState === "visible" && tick();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
  return now;
}

interface CtaProps {
  children: ReactNode;
  variant?: "primary" | "subtle";
  full?: boolean;
  place: string;
}

/** Único componente de compra: todos os botões usam CHECKOUT_URL. */
export function CtaButton({ children, variant = "primary", full, place }: CtaProps) {
  const cls = `btn btn-${variant}${full ? " btn-full" : ""}`;
  if (!CHECKOUT_URL) {
    return (
      <span className="cta-wrap">
        <button type="button" className={`${cls} is-disabled`} disabled aria-disabled="true" data-cta={place}>
          Checkout em configuração
        </button>
      </span>
    );
  }
  return (
    <a className={cls} href={CHECKOUT_URL} rel="noopener noreferrer" data-cta={place}>
      {children}
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

interface TimerProps {
  day: DayId;
  now: number;
  compact?: boolean;
}

/** Contagem com largura fixa (tabular-nums) para não gerar salto de layout. */
export function Timer({ day, now, compact }: TimerProps) {
  const t = timeLeft(day, now);
  const cells: [string, string][] = [
    [String(t.days), "dias"],
    [pad(t.hours), "horas"],
    [pad(t.minutes), "min"],
    [pad(t.seconds), "seg"],
  ];
  const label = `Faltam ${t.days} dias, ${t.hours} horas e ${t.minutes} minutos`;
  return (
    <div className={`timer${compact ? " timer-compact" : ""}`} role="timer" aria-live="off" aria-label={label} data-target={new Date(dayStart(day)).toISOString()} data-date={DAY_DATES[day]}>
      {cells.map(([value, unit]) => (
        <div className="timer-cell" key={unit} aria-hidden="true">
          <strong>{value}</strong>
          <span>{unit}</span>
        </div>
      ))}
    </div>
  );
}

export function SectionHead({ eyebrow, title, id }: { eyebrow?: string; title: ReactNode; id?: string }) {
  return (
    <header className="section-head">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
    </header>
  );
}

export function Check() {
  return (
    <svg className="check" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}
