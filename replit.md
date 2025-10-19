# Sistema de Gerenciamento de Indicadores de Inspeção

## Overview
Aplicação web full‑stack para gestão de indicadores de inspeção (ASTEC ‑ CORREPOL).

## Arquitetura
- Frontend: React 18 + Vite + TypeScript
- Backend: Express.js + TypeScript
- Banco: PostgreSQL + Drizzle ORM
- Estilos: Tailwind + shadcn/ui
- State: React Query

## Autenticação
- Login baseado em sessão (cookie HttpOnly)
- Senhas com hash PBKDF2
- Senha administrativa via variável `ADMIN_PASSWORD`
- Usuário admin inicial via `DEFAULT_ADMIN_USER`/`DEFAULT_ADMIN_PASS`

## Build
- `npm run dev` – modo desenvolvimento
- `npm run build` – build frontend + bundle backend
- `npm run start` – produção
- `npm run db:push` – aplicar schema

## Deploy
- `DATABASE_URL` obrigatório
- Servidor expõe API e SPA na porta `PORT` (padrão 5000)

## Notas
- Evitamos logar payloads de resposta
- Uploads de planilha validados no backend

