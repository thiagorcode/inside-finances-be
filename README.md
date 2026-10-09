<h1 align="center">💰 Inside Finances API</h1>

<h3 align="center">Personal finance management REST API — income, expenses, categories and monthly balances — built with NestJS, TypeScript, TypeORM and MySQL, containerized with Docker and deployed with CI/CD.</h3>

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
  🇧🇷 <a href="./README.pt-BR.md"><strong>Read this README in Portuguese (pt-BR)</strong></a>
</p>

## 📖 About the project

**Inside Finances** is a backend for tracking **personal finances**: each user registers their **income and expenses**organized by **category**, and the API provides **monthly totals and balance** with filters by period, category, type and payment status.

This project was born from a real use case: it replaces an Excel spreadsheet I used for years to control my own expenses — the [`script/`](./script/) folder contains a Node.js script that reads that spreadsheet (`.xlsx`) and imports the history into the API, with consistency checks before importing.

It was built as a study of a **production-grade backend**: authentication with **JWT**, request validation with **DTOs**, relational modeling with **TypeORM**, documentation with **Swagger/OpenAPI**, **multi-stage Docker** images and automated deployment with **GitHub Actions**.

## ✨ Features

- 🔐 **Authentication** — login with email/username + password (Passport local strategy) issuing a **JWT access token**, with JWT strategy and guard implemented for protected routes
- 👥 **Users** — registration, listing, update and delete (password stored hashed and masked in queries)
- 💸 **Transactions** — full CRUD of incomes and expenses, with description, value, date, paid status, bank and specification
- 🏷 **Categories** — income/expense categories with icons, seeded via **TypeORM migrations**
- 📊 **Totalizers** — income, expenses and available balance per user: overall, by month, by category, or only paid entries
- 📃 **API documentation** — interactive with **Swagger / OpenAPI**
- 🚦 **Rate limiting** — brute-force protection on the API
- 🐳 **Docker** — multi-stage images (development with hot-reload and production) + orchestration with `docker-compose`
- 🚀 **CI/CD** — GitHub Actions pipeline with build and automated deployment

## 🛠 Tech stack

**Backend / API:** Node.js 16, TypeScript, NestJS 9, REST API, TypeORM (repositories, migrations, entities, relations), MySQL
**Security:** Passport, JWT authentication, hashed passwords, rate limiting
**Validation & docs:** class-validator, class-transformer, DTOs, Swagger, OpenAPI
**Infra & tooling:** Docker (multi-stage build), docker-compose, GitHub Actions (CI/CD, rsync deploy), Jest (unit and e2e), ESLint, Prettier

## 📂 Project structure

```
.
├── docker-compose.yml          # API + MySQL orchestration
├── server/src
│   ├── app/                    # Root module (TypeORM + feature modules)
│   ├── migrations/             # TypeORM migrations (seed of default categories)
│   ├── shared/                 # SharedModule + ApiConfigService (env validation, fail-fast)
│   └── modules/
│       ├── auth/               # Login, JWT and local strategies, guards
│       ├── users/              # Users CRUD, entity with hashed/masked password
│       ├── transactions/         # Transactions CRUD, filters and totalizers
│       └── transactionsCategory/ # Income/expense categories CRUD
└── script/                     # Script that imports an Excel spreadsheet into the API
```

## 🔌 API endpoints

Base path: **`/api`** — the full, interactive documentation is served by Swagger at **`/doc`** once the app is running.

| Method | Route | Description |
| ------ | ----- | ----------- |
| `POST` | `/api/auth/login` | Authenticates and returns a JWT access token |
| `GET` | `/api/users` | Lists users |
| `POST` | `/api/users` | Creates a user |
| `GET` `PATCH` `DELETE` | `/api/users/:id` | Fetches, updates or removes a user |
| `GET` | `/api/transactions/user/:userId` | Lists the user's transactions. Filters via query: `categoryId`, `date=YYYY-MM`, `type` (`+` or `-`), `isPaid` |
| `GET` | `/api/transactions/user/:userId/last` | 10 most recent paid transactions |
| `GET` | `/api/transactions/user/:userId/totalizers` | Total income, expenses and balance up to today |
| `GET` | `/api/transactions/user/:userId/totalizer` | Totalizers filtered by `categoryId`, `date` and `type` (paid only) |
| `GET` `PATCH` `DELETE` | `/api/transactions/:id` | Fetches, updates or removes a transaction |
| `POST` | `/api/transactions` | Creates a transaction |
| `GET` | `/api/category` | Lists categories (ordered) |
| `POST` | `/api/category` | Creates a category |
| `PATCH` `DELETE` | `/api/category/:id` | Updates or removes a category |

## 🚀 Getting started

### 1. Clone the repository

```bash
git clone https://github.com/thiagorcode/inside-finances-be.git
cd inside-finances-be
```

### 2. Run with Docker (recommended)

The `local` image reads `server/.env.docker`, so create it first:

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
```

Then start the whole stack:

```bash
docker-compose up -d --build
```

- API: [http://localhost:3333/api](http://localhost:3333/api)
- Swagger documentation: [http://localhost:3333/doc](http://localhost:3333/doc)
- MySQL available at `localhost:3099` (user `finances`, password `finances`, database `finances`)

### 3. Or run locally

Prerequisites: Node.js 16, Yarn and a MySQL instance.

```bash
cd server
cp .env.example .env # set DB_*, PORT, ENVIRONMENT=local, ENABLE_ORM_LOGS and JWT_KEY
yarn
yarn typeorm migration:run -d ormconfig.ts # optional: seeds the default categories
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

- 🔐 Activate the **JWT guard** on all protected routes, taking the user id from the token instead of route params
- 🔑 Migrate password hashing from SHA-256 to **bcrypt**
- 📧 Forgot / reset password flow (temporary password by email)
- ✅ Global request **validation pipe** with DTO whitelist
- 📄 Pagination on transaction listings
- 📊 Monthly summary report endpoint

## 👨‍💻 Author

**Thiago Rodrigues** — backend developer

[![GitHub](https://img.shields.io/badge/@thiagorcode-181717?logo=github&logoColor=white)](https://github.com/thiagorcode) [![E-mail](https://img.shields.io/badge/Email-ti.thiago.rodrigues@outlook.com-EA4335?logo=maildotru&logoColor=white)](mailto:ti.thiago.rodrigues@outlook.com)
