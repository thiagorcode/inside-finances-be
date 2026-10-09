<h1 align="center">💰 Inside Finances API</h1>

<h3 align="center">API REST para gestão de finanças pessoais — receitas, despesas, categorias e saldo mensal — construída com NestJS, TypeScript, TypeORM e MySQL, containerizada com Docker e com deploy automatizado via CI/CD.</h3>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-9-E0234E?logo=nestjs&logoColor=white" alt="NestJS 9" />
  <img src="https://img.shields.io/badge/TypeScript-4.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-16-339933?logo=nodedotjs&logoColor=white" alt="Node.js 16" />
  <img src="https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?logo=githubactions&logoColor=white" alt="GitHub Actions CI/CD" />
  <img src="https://img.shields.io/github/last-commit/thiagorcode/inside-finances-be" alt="Last commit" />
</p>

<p align="center">
  🇺🇸 <a href="./README.md"><strong>Read this README in English</strong></a>
</p>

## 📖 Sobre o projeto

O **Inside Finances** é um backend para **controle de finanças pessoais**: cada usuário registra suas **receitas e despesas** organizadas por **categoria**, e a API fornece **totalizadores mensais e saldo** com filtros por período, categoria, tipo e status de pagamento.

Este projeto nasceu de um caso de uso real: ele substitui uma planilha que eu usava há anos para controlar meus gastos pessoais — a pasta [`script/`](./script/) contém um script em Node.js que lê essa planilha (`.xlsx`) e importa todo o histórico para a API, com checagens de consistência antes da importação.

Foi construído como estudo de um backend em **nível de produção**: autenticação com **JWT**, validação de requisições com **DTOs**, modelagem relacional com **TypeORM**, documentação com **Swagger/OpenAPI**, imagens **multi-stage no Docker** e deploy automatizado com **GitHub Actions**.

## ✨ Funcionalidades

- 🔐 **Autenticação** — login com e-mail/usuário + senha (estratégia local do Passport) emitindo **token de acesso JWT**, com estratégia e guard JWT implementados para as rotas protegidas
- 👥 **Usuários** — cadastro, listagem, atualização e exclusão (senha armazenada com hash e mascarada nas consultas)
- 💸 **Transações** — CRUD completo de receitas e despesas, com descrição, valor, data, status de pagamento, banco e especificação
- 🏷 **Categorias** — categorias de receita/despesa com ícones, populadas via **migrations do TypeORM**
- 📊 **Totalizadores** — receitas, despesas e saldo disponível por usuário: geral, por mês, por categoria ou apenas entradas pagas
- 📃 **Documentação da API** — interativa com **Swagger / OpenAPI**
- 🚦 **Rate limiting** — proteção contra brute force na API
- 🐳 **Docker** — imagens multi-stage (desenvolvimento com hot-reload e produção) + orquestração com `docker-compose`
- 🚀 **CI/CD** — pipeline no GitHub Actions com build e deploy automatizado (rsync via SSH)

## 🛠 Stack e palavras-chave

**Backend / API:** Node.js 16, TypeScript, NestJS 9, API REST, TypeORM (repositories, migrations, entities, relações), MySQL
**Segurança:** Passport, autenticação JWT, hash de senha, rate limiting
**Validação e documentação:** class-validator, class-transformer, DTOs, Swagger, OpenAPI
**Infra e ferramentas:** Docker (build multi-stage), docker-compose, GitHub Actions (CI/CD, deploy), Jest (testes unitários e e2e), ESLint, Prettier

## 📂 Estrutura do projeto

```
.
├── docker-compose.yml          # Orquestração da API + MySQL
├── server/src
│   ├── app/                    # Módulo raiz (TypeORM + módulos de feature)
│   ├── migrations/             # Migrations TypeORM (seed das categorias padrão)
│   ├── shared/                 # SharedModule + ApiConfigService (validação de env, fail-fast)
│   └── modules/
│       ├── auth/               # Login, estratégias JWT e local, guards
│       ├── users/              # CRUD de usuários, entidade com senha com hash/mascarada
│       ├── transactions/         # CRUD de transações, filtros e totalizadores
│       └── transactionsCategory/ # CRUD de categorias de receita/despesa
└── script/                     # Script que importa uma planilha do Excel para a API
```

## 🔌 Endpoints da API

Base: **`/api`** — a documentação completa e interativa é servida pelo Swagger em **`/doc`** com a aplicação rodando.

| Método | Rota | Descrição |
| ------ | ---- | --------- |
| `POST` | `/api/auth/login` | Autentica e retorna um token de acesso JWT |
| `GET` | `/api/users` | Lista usuários |
| `POST` | `/api/users` | Cria um usuário |
| `GET` `PATCH` `DELETE` | `/api/users/:id` | Busca, atualiza ou remove um usuário |
| `GET` | `/api/transactions/user/:userId` | Lista as transações do usuário. Filtros via query: `categoryId`, `date=YYYY-MM`, `type` (`+` ou `-`), `isPaid` |
| `GET` | `/api/transactions/user/:userId/last` | 10 transações pagas mais recentes |
| `GET` | `/api/transactions/user/:userId/totalizers` | Total de receitas, despesas e saldo até hoje |
| `GET` | `/api/transactions/user/:userId/totalizer` | Totalizadores filtrando por `categoryId`, `date` e `type` (somente pagas) |
| `GET` `PATCH` `DELETE` | `/api/transactions/:id` | Busca, atualiza ou remove uma transação |
| `POST` | `/api/transactions` | Cria uma transação |
| `GET` | `/api/category` | Lista categorias (ordenadas) |
| `POST` | `/api/category` | Cria uma categoria |
| `PATCH` `DELETE` | `/api/category/:id` | Atualiza ou remove uma categoria |

## 🚀 Como rodar

### 1. Clone o repositório

```bash
git clone https://github.com/thiagorcode/inside-finances-be.git
cd inside-finances-be
```

### 2. Rodando com Docker (recomendado)

A imagem `local` lê `server/.env.docker`, então crie-o primeiro:

```bash
cp server/.env.docker.example server/.env.docker
```

Valores sugeridos (casam com o `docker-compose.yml`):

```env
DB_HOST=mysql
DB_USERNAME=finances
DB_PASSWORD=finances
DB_DATABASE=finances
DB_PORT=3306
PORT=8080
ENVIRONMENT=local
ENABLE_ORM_LOGS=false
```

Depois suba toda a stack:

```bash
docker-compose up -d --build
```

- API: [http://localhost:3333/api](http://localhost:3333/api)
- Documentação Swagger: [http://localhost:3333/doc](http://localhost:3333/doc)
- MySQL disponível em `localhost:3099` (usuário `finances`, senha `finances`, banco `finances`)

### 3. Ou rode localmente

Pré-requisitos: Node.js 16, Yarn e uma instância do MySQL.

```bash
cd server
cp .env.example .env # preencha DB_*, PORT, ENVIRONMENT=local, ENABLE_ORM_LOGS e JWT_KEY
yarn
yarn typeorm migration:run -d ormconfig.ts # opcional: popula as categorias padrão
yarn start:dev
```

### Scripts úteis (`server/`)

```bash
yarn start:dev # modo watch
yarn lint     # ESLint (com --fix)
yarn format   # Prettier
yarn test     # testes unitários (Jest)
yarn test:e2e # testes e2e (Jest)
```

## 🗺 Roadmap

- 🔐 Ativar o **guard JWT** em todas as rotas protegidas, obtendo o id do usuário pelo token em vez de parâmetro de rota
- 🔑 Migrar o hash de senha de SHA-256 para **bcrypt**
- 📧 Fluxo de recuperação/troca de senha (senha temporária por e-mail)
- ✅ **Pipe de validação global** de requisições com whitelist de DTOs
- 📄 Paginação na listagem de transações
- 📊 Endpoint de relatório/resumo mensal

## 👨‍💻 Autor

**Thiago Rodrigues** — desenvolvedor backend

[![GitHub](https://img.shields.io/badge/@thiagorcode-181717?logo=github&logoColor=white)](https://github.com/thiagorcode) [![E-mail](https://img.shields.io/badge/Email-ti.thiago.rodrigues@outlook.com-EA4335?logo=maildotru&logoColor=white)](mailto:ti.thiago.rodrigues@outlook.com)
