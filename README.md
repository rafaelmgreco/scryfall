# HighMarket

HighMarket é uma aplicação para explorar cartas de **Magic: The Gathering**. A interface permite pesquisar cartas, navegar por temas e consultar detalhes e edições. Os dados são obtidos sob demanda da [API da Scryfall](https://scryfall.com/docs/api): este projeto não mantém uma cópia local do catálogo.

## Como funciona

Este repositório é um monorepo npm com dois aplicativos:

- **`apps/web`** — interface em Next.js e React, com páginas inicial, de descoberta, resultados de busca e detalhes da carta. A página de detalhes também lista outras impressões da mesma carta, preços disponíveis e legalidades em formatos selecionados.
- **`apps/api`** — API em NestJS que encaminha consultas à Scryfall, valida parâmetros, configura CORS e apresenta a documentação Swagger. Ela também traduz erros da Scryfall para respostas HTTP.

O fluxo de dados é `navegador → interface web → API HighMarket → API Scryfall`.

## Requisitos

- Node.js e npm
- Acesso à internet para consultar os dados da Scryfall

## Executar localmente

Na raiz do repositório, instale as dependências:

```bash
npm install
```

Copie `apps/api/.env.example` para `apps/api/.env`. Os valores padrão já atendem ao desenvolvimento local; ajuste-os se necessário:

```env
PORT=3001
WEB_APP_ORIGIN=http://localhost:3000
SCRYFALL_API_BASE_URL=https://api.scryfall.com
SCRYFALL_USER_AGENT=highmarket-api/1.0 (+https://your-app.example)
```

Inicie os dois aplicativos juntos:

```bash
npm run dev
```

Acesse:

- Web: <http://localhost:3000>
- API: <http://localhost:3001>
- Swagger: <http://localhost:3001/docs>

A interface usa `http://localhost:3001` como padrão para a API. Para apontá-la a outro endereço, defina `NEXT_PUBLIC_API_URL` no ambiente do app web, por exemplo em `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Para iniciar cada app separadamente, use os comandos na raiz:

```bash
npm run dev:api
npm run dev:web
```

## O que você pode fazer

- Pesquisar pelo nome da carta, por texto de regras ou pela sintaxe de busca da Scryfall, como `t:dragon` ou `game:paper`.
- Explorar temas prontos, como anjos, dragões, artefatos e terrenos.
- Abrir uma carta para ver sua edição, imagem, texto, preços e formatos selecionados.
- Percorrer outras impressões da mesma carta e abrir a edição escolhida.

## API

As rotas da aplicação ficam sob `/highmarket`:

| Método e rota | Descrição | Exemplo |
| --- | --- | --- |
| `GET /highmarket/cards/search` | Busca paginada por query textual | `/highmarket/cards/search?q=t%3Adragon&page=1` |
| `GET /highmarket/cards/named` | Busca uma carta por nome exato ou aproximado | `/highmarket/cards/named?exact=Black%20Lotus` |
| `GET /highmarket/cards/random` | Retorna uma carta aleatória, opcionalmente filtrada | `/highmarket/cards/random?q=t%3Aangel` |
| `GET /highmarket/cards/:id` | Consulta uma carta pelo ID | `/highmarket/cards/ID_DA_CARTA` |
| `GET /highmarket/sets/:code` | Consulta uma coleção pelo código | `/highmarket/sets/clu` |

Na busca por nome, informe exatamente um dos parâmetros `exact` ou `fuzzy`; `set` pode limitar a busca a uma coleção. A rota de busca também aceita opções como `unique`, `order`, `dir`, `page`, `include_extras`, `include_multilingual` e `include_variations`. Consulte `/docs` para os parâmetros e modelos detalhados.

## Comandos disponíveis

Na raiz do monorepo:

```bash
npm run build       # compila API e interface
npm run lint        # verifica API e interface
npm test            # executa os testes da API
npm run test:e2e    # executa os testes end-to-end da API
```

Os comandos de desenvolvimento e verificação de cada app também podem ser executados no respectivo workspace, por exemplo `npm run build --workspace @highmarket/api` ou `npm run lint --workspace @highmarket/web`.

## Estrutura

```text
apps/
  api/   # API NestJS, integração Scryfall e testes
  web/   # interface Next.js
```

## Deploy

O frontend pode ser hospedado na Vercel e a API em um serviço Node.js, por exemplo na AWS. Configure `NEXT_PUBLIC_API_URL` com o endereço público da API e `WEB_APP_ORIGIN` com a origem pública do frontend. Para outros ambientes, atualize `PORT` e `SCRYFALL_API_BASE_URL` conforme necessário.

## Referências

- [Documentação da API Scryfall](https://scryfall.com/docs/api)
- [Cartas e busca na Scryfall](https://scryfall.com/docs/api/cards)
- [Limites de requisição da Scryfall](https://scryfall.com/docs/api/rate-limits)
