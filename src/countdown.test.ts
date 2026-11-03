import { getPhase, dayState, timeLeft } from "./countdown";

let failures = 0;
function check(name: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures++;
  console.log(`${ok ? "OK  " : "FAIL"} ${name}${ok ? "" : ` → ${JSON.stringify(actual)} (esperado ${JSON.stringify(expected)})`}`);
}
const at = (iso: string) => Date.parse(iso);

// Hoje na conversa: 03/11/2026 00:55 em São Paulo
const now = at("2026-11-03T00:55:00-03:00");
check("03/nov → fase day1", getPhase(now), "day1");
check("03/nov → dia 1 upcoming", dayState("day1", now), "upcoming");
check("03/nov → tempo até dia 1", timeLeft("day1", now), { days: 5, hours: 12, minutes: 35, seconds: 0 });

check("08/nov 23:59 → ainda day1", getPhase(at("2026-11-08T23:59:59-03:00")), "day1");
check("08/nov 14:00 → dia 1 today", dayState("day1", at("2026-11-08T14:00:00-03:00")), "today");
check("09/nov 00:00 → fase day2", getPhase(at("2026-11-09T00:00:00-03:00")), "day2");
check("09/nov → dia 1 done", dayState("day1", at("2026-11-09T00:00:00-03:00")), "done");
check("15/nov 23:59 → ainda day2", getPhase(at("2026-11-15T23:59:59-03:00")), "day2");
check("16/nov 00:00 → after", getPhase(at("2026-11-16T00:00:00-03:00")), "after");
check("16/nov → dia 2 done", dayState("day2", at("2026-11-16T00:00:00-03:00")), "done");
check("contagem nunca negativa", timeLeft("day1", at("2026-12-01T00:00:00-03:00")), { days: 0, hours: 0, minutes: 0, seconds: 0 });

// Mesmo instante visto de outro fuso do navegador não muda o resultado (usa instantes absolutos).
check("UTC equivalente a 08/nov 23:30 BRT → day1", getPhase(at("2026-11-09T02:30:00Z")), "day1");
check("UTC equivalente a 09/nov 00:30 BRT → day2", getPhase(at("2026-11-09T03:30:00Z")), "day2");

if (failures) {
  console.error(`\n${failures} teste(s) falharam`);
  process.exit(1);
}
console.log("\nTodos os testes passaram");
