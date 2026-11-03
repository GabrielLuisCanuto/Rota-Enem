/**
 * CONFIGURAÇÃO CENTRAL DA PÁGINA ROTA ENEM
 * ------------------------------------------------------------------
 * Tudo o que depende de integração externa fica aqui (ou em .env).
 * Nada neste arquivo simula pagamento, contato ou política funcional.
 */

// `?? {}` permite rodar os testes de datas fora do Vite (Node).
const env: Record<string, unknown> = import.meta.env ?? {};

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Aceita apenas URLs https válidas e que não sejam domínios de exemplo. */
function validHttpsUrl(value: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    if (/(^|\.)exemplo\.|(^|\.)example\.(com|org|net)$/i.test(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/** Link único de checkout. Defina VITE_CHECKOUT_URL no .env. */
export const CHECKOUT_URL: string | null = validHttpsUrl(clean(env.VITE_CHECKOUT_URL));

export const SUPPORT_EMAIL: string | null = (() => {
  const v = clean(env.VITE_SUPPORT_EMAIL);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? v : null;
})();

export const POLICY_LINKS = {
  privacy: validHttpsUrl(clean(env.VITE_PRIVACY_URL)),
  terms: validHttpsUrl(clean(env.VITE_TERMS_URL)),
  refund: validHttpsUrl(clean(env.VITE_REFUND_URL)),
};

export const PRICES = {
  main: "R$ 19,90",
  bump: "R$ 5,99",
} as const;

/**
 * Datas das provas (horário de Brasília, America/Sao_Paulo).
 * O Brasil não adota horário de verão desde 2019, então UTC-03:00 é fixo.
 * AJUSTE `startTime` se o edital indicar outro horário de início.
 */
export const EXAM = {
  timezone: "America/Sao_Paulo",
  startTime: "13:30:00-03:00",
  day1: "2026-11-08",
  day2: "2026-11-15",
} as const;

/** Auditoria em tempo de execução: lista o que falta configurar. */
export function configAudit(): string[] {
  const missing: string[] = [];
  if (!CHECKOUT_URL) missing.push("VITE_CHECKOUT_URL (todos os botões de compra ficam desativados)");
  if (!SUPPORT_EMAIL) missing.push("VITE_SUPPORT_EMAIL (e-mail de suporte)");
  if (!POLICY_LINKS.privacy) missing.push("VITE_PRIVACY_URL (Política de Privacidade)");
  if (!POLICY_LINKS.terms) missing.push("VITE_TERMS_URL (Termos de Uso)");
  if (!POLICY_LINKS.refund) missing.push("VITE_REFUND_URL (Política de Reembolso)");
  return missing;
}
