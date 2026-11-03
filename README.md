# Rota ENEM — landing page (Vite + React + TypeScript)

1. `npm install`
2. Copie `.env.example` para `.env` e preencha **VITE_CHECKOUT_URL** (link único usado por todos os botões de compra).
3. `npm run dev` / `npm run build`
4. `npm run test:countdown` valida as datas (fuso America/Sao_Paulo).

Sem VITE_CHECKOUT_URL válido (https, não-exemplo), os botões ficam desativados.
Contato e links de políticas só aparecem quando configurados; senão há marcador de configuração.
Prévias do produto: preencha `imageSrc` em `src/components/Previews.tsx` quando tiver os arquivos reais.
Horário de início das provas: `EXAM.startTime` em `src/config.ts` (13:30 BRT assumido; ajuste se necessário).
