import { EXAM } from "./config";

export type DayId = "day1" | "day2";
export type DayState = "upcoming" | "today" | "done";
export type Phase = "day1" | "day2" | "after";

export interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const startOf = (date: string) => Date.parse(`${date}T${EXAM.startTime}`);
/** Primeiro instante do dia seguinte à prova, em Brasília (UTC-03:00). */
const endOfDay = (date: string) => {
  const d = new Date(`${date}T00:00:00-03:00`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.getTime();
};

export const DAY_DATES: Record<DayId, string> = { day1: EXAM.day1, day2: EXAM.day2 };

export function dayStart(id: DayId): number {
  return startOf(DAY_DATES[id]);
}

export function dayState(id: DayId, now: number): DayState {
  if (now < dayStart(id)) return "upcoming";
  if (now < endOfDay(DAY_DATES[id])) return "today";
  return "done";
}

/** Depois de 8/nov prioriza o 2º dia; depois de 15/nov entra em campanha futura. */
export function getPhase(now: number): Phase {
  if (now < endOfDay(EXAM.day1)) return "day1";
  if (now < endOfDay(EXAM.day2)) return "day2";
  return "after";
}

export function timeLeft(id: DayId, now: number): TimeParts {
  const diff = Math.max(0, dayStart(id) - now);
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const longDate = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: EXAM.timezone,
});

export function formatExamDate(id: DayId): string {
  return longDate.format(new Date(dayStart(id)));
}

export const pad = (n: number) => String(n).padStart(2, "0");
