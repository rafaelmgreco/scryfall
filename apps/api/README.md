# HighMarket API

Backend em NestJS + TypeScript para consumir a API oficial da Scryfall sob a marca HighMarket.

## O que este projeto faz

- expõe uma API própria em NestJS para consultar a Scryfall;
- configura os headers obrigatórios `User-Agent` e `Accept`;
- trata erros retornados pela Scryfall no padrão HTTP do Nest;
- já entrega rotas para carta por nome, busca textual e carta aleatória.

## Referências oficiais usadas

- API overview: https://scryfall.com/docs/api
- Cards API: https://scryfall.com/docs/api/cards
- Search cards: https://scryfall.com/docs/api/cards/search
- Named card: https://scryfall.com/docs/api/cards/named
- Random card: https://scryfall.com/docs/api/cards/random
- Rate limits: https://scryfall.com/docs/api/rate-limits
- Errors: https://scryfall.com/docs/api/errors

## Regras importantes da Scryfall

- As requisições para `api.scryfall.com` precisam incluir `User-Agent` e `Accept`.
- `cards/search`, `cards/named` e `cards/random` têm limite de 2 requisições por segundo.
- Os demais endpoints possuem limite de 10 requisições por segundo.
- A Scryfall recomenda cache local e uso de bulk data para cargas maiores.

## Configuração

Crie seu arquivo `.env` com base no `.env.example`.

```env
PORT=3001
WEB_APP_ORIGIN=http://localhost:3000
SCRYFALL_API_BASE_URL=https://api.scryfall.com
SCRYFALL_USER_AGENT=highmarket-api/1.0 (+https://your-app.example)
```

## Instalação

```bash
npm install
```

## Rodando o projeto

```bash
npm run start:dev
```

Servidor padrão:

```text
http://localhost:3001
```

Swagger:

```text
http://localhost:3001/docs
```

## Endpoints disponíveis

### Health / overview

```http
GET /
```

### Buscar carta por nome

Use `exact` ou `fuzzy`.

```http
GET /highmarket/cards/named?exact=Black Lotus
GET /highmarket/cards/named?fuzzy=jac bele
GET /highmarket/cards/named?exact=Lightning Bolt&set=clu
```

### Buscar cartas com query textual

```http
GET /highmarket/cards/search?q=type:dragon
GET /highmarket/cards/search?q=oracle:draw&order=cmc&dir=asc
GET /highmarket/cards/search?q=t:angel&include_extras=true&page=2
```

### Buscar carta aleatória

```http
GET /highmarket/cards/random
GET /highmarket/cards/random?q=t:angel
```

## Scripts úteis

```bash
npm run build
npm run test
npm run test:e2e
npm run lint
```
