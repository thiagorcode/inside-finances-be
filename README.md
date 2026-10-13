<h1 align="center">💰 Inside Finances API</h1>

<h3 align="center">Personal finance management REST API — income, expenses, categories and monthly balances — built with NestJS, TypeScript, TypeORM and MySQL, containerized with Docker and deployed with CI/CD.</h3>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white" alt="NestJS 11" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs&logoColor=white" alt="Node.js 20" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?logo=githubactions&logoColor=white" alt="GitHub Actions CI/CD" />
  <img src="https://img.shields.io/github/last-commit/thiagorcode/inside-finances-be" alt="Last commit" />
</p>

<p align="center">
  🇧🇷 <a href="./README.pt-BR.md"><strong>Read this README in Portuguese (pt-BR)</strong></a>
</p>

## 📖 About the project

**Inside Finances** is a backend for tracking **personal finances**: each user registers their **income and expenses** organized by **category**, and the API provides **totalizers and monthly summaries** with filters by period, category, type and payment status.

This project was born from a real use case: it replaces an Excel spreadsheet I used for years to control my own expenses — the [`script/`](./script/) folder contains a Node.js script that reads that spreadsheet (`.xlsx`) and imports the history into the API, with consistency checks before importing.

It was built as a study of a **production-grade backend**: authentication with **JWT**, request validation with **DTOs**, relational modeling with **TypeORM**, documentation with **Swagger/OpenAPI**, **multi-stage Docker** images and automated deployment with **GitHub Actions**.

The codebase is also midway through an **architecture evolution**: the transactions module is being migrated to **DDD** (domain entities, factory and **domain events published with `@nestjs/cqrs`**), while authentication, users, categories and summary keep the classic NestJS + TypeORM modules. The **monthly summary tables are kept consistent by MySQL triggers** (see [`server/sql/`](./server/sql/)).

## ✨ Features

- 🔐 **Authentication** — login by username + password (Passport local strategy) issuing a **JWT access token** (expires in 1 day), with JWT strategy and guard implemented for protected routes
- 👥 **Users** — registration, listing, update and soft delete (`isActive = false`); password stored with SHA-256 hash and masked on queries
- 💸 **Transactions** — CRUD over **DDD domain entities**, with description, value, date, category and paid status
- 🧩 **Installments** — installment transactions generate the following ones with **progressive monthly due dates**, through **domain events (CQRS/@nestjs/cqrs)**
- 🏷 **Categories** — income/expense categories with icons, seeded via **TypeORM migrations**
- 📊 **Totalizers** — income, expenses and available balance per user with filters by category, period and type (paid only)
- 📈 **Monthly summary** — per user, read from a pre-aggregated table (`summary_transactions_month`) kept up to date by **SQL triggers**
- 📃 **API documentation** — interactive with **Swagger / OpenAPI**
- 🚦 **Rate limiting** — brute-force protection on the API (express-rate-limit)
- 🐳 **Docker** — multi-stage images (development, production and local with hot-reload) + orchestration with `docker-compose`
- 🚀 **CI/CD** — GitHub Actions pipeline: build on `develop`/PRs, deploy via rsync (SSH) on push to `prod`

## 🛠 Tech stack

**Backend / API:** Node.js 20, TypeScript 5.x, NestJS 11, REST API, DDD (domain entities, factory, domain events with `@nestjs/cqrs`), TypeORM (repositories, migrations, entities, relations), MySQL (+ SQL triggers)
**Security:** Passport (local + JWT), hashed and masked passwords, rate limiting
**Validation & docs:** class-validator, class-transformer, DTOs, Swagger, OpenAPI
**Infra & tooling:** Docker (multi-stage build), docker-compose, GitHub Actions (CI/CD, rsync deploy), Jest (unit and e2e), ESLint, Prettier

## 📂 Project structure

```
.
├── docker-compose.yml              # API + MySQL orchestration
├── script/                         # Node.js script: imports the Excel (.xlsx) history into the API
└── server
    ├── sql/                        # MySQL triggers that keep the summary tables up to date
    ├── test/                       # e2e tests (Jest)
    └── src
        ├── app/                    # Root module (TypeORM, CQRS + feature modules)
        ├── domain/                 # DDD core: domain entities, events and building blocks
        │   ├── common/             # Entity, AggregateRoot, DomainEvent, UniqueEntityID
        │   ├── entities/           # Transaction domain entity (getters + installment event)
        │   └── events/             # Domain events (e.g. InstallmentsGenerated)
        ├── enums/                  # Shared enums (transaction type: + / -)
        ├── migrations/             # TypeORM migrations: tables, category seed, summary tables, installments
        ├── shared/                 # SharedModule + ApiConfigService (env validation, fail-fast)
        └── modules/
            ├── auth/               # Login, local + JWT strategies, guards
            ├── users/              # Users CRUD (hashed and masked password)
            ├── summary/            # Monthly summary per user (pre-aggregated table)
            ├── transactions/       # CRUD, filters and totalizers + factory and event handler (CQRS, in migration)
            └── transactionsCategory/ # Income/expense categories CRUD
```

## 🔌 API endpoints

Base path: **`/api`** — the full, interactive documentation is served by Swagger at **`/doc`** once the app is running.

| Method | Route | Description |
| ------ | ----- | ----------- |
| `POST` | `/api/auth/login` | Authenticates (fields `login` + `password`) and returns a JWT access token (expires in 1 day) |
| `GET` | `/api/users` | Lists users |
| `POST` | `/api/users` | Creates a user (unique email and username) |
| `GET` `PATCH` `DELETE` | `/api/users/:id` | Fetches, updates or logically removes a user (`isActive = false`) |
| `GET` | `/api/transactions/user/:userId` | Lists the user's transactions. Filters via query: `categoryId`, `date=YYYY-MM`, `type` (`+` or `-`), `isPaid` |
| `GET` | `/api/transactions/user/:userId/last` | 10 most recent paid transactions |
| `GET` | `/api/transactions/user/:userId/totalizer` | Totalizers filtered by `categoryId`, `date` and `type` (paid only) |
| `GET` `PATCH` `DELETE` | `/api/transactions/:id` | Fetches, updates or removes a transaction |
| `POST` | `/api/transactions` | Creates a transaction and returns the created object |
| `GET` | `/api/category` | Lists categories (ordered) |
| `POST` | `/api/category` | Creates a category |
| `PATCH` `DELETE` | `/api/category/:id` | Updates or removes a category |
| `GET` | `/api/summary/month/:userId` | Monthly summary per user (recipe, expense, total), from most recent |
| `PATCH` | `/api/summary/:id` | Placeholder — update still to be implemented |

> ⚠️ **Architecture migration in progress:** the **transactions** module is being migrated to **DDD/CQRS** and, during the transition, operates on an in-memory repository — create, listing (with all filters and totalizers), `update` and `delete` work fully in memory, with installments generated through domain events. Reconnecting persistence via a DDD repository (TypeORM) is the next Roadmap step.

## 🚀 Getting started

### 1. Clone the repository

```bash
git clone https://github.com/thiagorcode/inside-finances-be.git
cd inside-finances-be
```

### 2. Run with Docker (recommended)

The `local` image reads `server/.env.docker` (it requires a **non-empty `JWT_KEY`** for token signing — the app fails fast without it), so create it first:

```bash
cp server/.env.docker.example server/.env.docker
```

Suggested values (they match `docker-compose.yml`):

```env
DB_HOST=mysql
DB_USERNAME=finances
DB_PASSWORD=finances
DB_DATABASE=finances
DB_PORT=3306
PORT=8080
ENVIRONMENT=local
ENABLE_ORM_LOGS=false
JWT_KEY=my-secret-key
```

Then start the whole stack:

```bash
docker-compose up -d --build
```

- API: [http://localhost:3333/api](http://localhost:3333/api)
- Swagger documentation: [http://localhost:3333/doc](http://localhost:3333/doc)
- MySQL available at `localhost:3099` (user `finances`, password `finances`, database `finances`)

### 3. Or run locally

Prerequisites: Node.js 20 (NestJS 11 requires ≥ 20), Yarn and a MySQL instance.

```bash
cd server
cp .env.example .env # set DB_*, PORT, ENVIRONMENT=local, ENABLE_ORM_LOGS and JWT_KEY
yarn
yarn typeorm migration:run -d ormconfig.ts # optional: creates the tables and seeds the default categories
yarn start:dev
```

### Useful scripts (`server/`)

```bash
yarn start:dev # watch mode
yarn lint     # ESLint (with --fix)
yarn format   # Prettier
yarn test     # Jest unit tests
yarn test:e2e # Jest e2e tests
```

## 🗺 Roadmap

- 🔌 **Reconnect persistence** to the new domain model: DDD repository for transactions (TypeORM) and domain↔entity mapping (the in-memory service keeps the same API)
- 🔀 **Unify the type enums**: `TypeEnum` (`+`/`-`) and `TypeTransactionEnum` (`RECIPE`/`EXPENSE`) + data migration
- 🔐 Activate the **JWT guard** on all protected routes, taking the user id from the token instead of route params
- 🔑 Migrate password hashing from SHA-256 to **bcrypt** + forgot/reset password flow (scaffolding already in the code)
- 🧪 Restore the test suite (transactions, summary, e2e) and run it in the CI pipeline
- 📄 Pagination on transaction listings

## 👨‍💻 Author

**Thiago Rodrigues** — backend developer

[![GitHub](https://img.shields.io/badge/@thiagorcode-181717?logo=github&logoColor=white)](https://github.com/thiagorcode) [![E-mail](https://img.shields.io/badge/Email-ti.thiago.rodrigues@outlook.com-EA4335?logo=maildotru&logoColor=white)](mailto:ti.thiago.rodrigues@outlook.com)
