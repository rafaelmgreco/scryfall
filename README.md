# HighMarket Monorepo

Monorepo com:

- `apps/api`: backend em NestJS que integra com a API oficial da Scryfall sob a marca HighMarket
- `apps/web`: frontend em Next.js que consome o backend

## Estrutura

```text
apps/
  api/
  web/
```

## Rodando localmente

Instale tudo pela raiz:

```bash
npm install
```

Suba frontend e backend juntos:

```bash
npm run dev
```

Ou use os comandos explicitos:

```bash
npm run start:api
npm run start:web
npm run start:all
```

URLs locais:

```text
Frontend: http://localhost:3000
API: http://localhost:3001
Swagger: http://localhost:3001/docs
```

## Scripts úteis

```bash
npm run dev
npm run dev:api
npm run dev:web
npm run build
npm run lint
npm run test
npm run test:e2e
```

## Deploy sugerido

- `apps/web` na Vercel
- `apps/api` na AWS

Nesse modelo, o frontend consome a URL pública do backend via `NEXT_PUBLIC_API_URL`.
