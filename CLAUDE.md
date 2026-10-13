# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Inside Finances API** — personal finance REST API (income/expenses, categories, totalizers, monthly summary) built with NestJS 11, TypeScript 5, TypeORM, MySQL and Docker. Documentation is bilingual: `README.md` (English) and `README.pt-BR.md` (Portuguese) — keep both in sync when documenting user-facing changes. The `script/` folder holds a standalone Node.js importer for the author's Excel history.

## Environment constraints

The WSL shell used to develop this repo has **no Node.js, npm, yarn or Docker installed**. Do not attempt to install dependencies, build, lint, or run tests — verify changes by static analysis (compilation correctness, imports, types, conventions). Also, no lockfile is committed to the repo.

## Commands

All commands run from `server/` (package manager: **yarn**):

```bash
yarn start:dev                          # dev server (watch mode)
yarn build                              # nest build
yarn lint                               # eslint (with --fix)
yarn format                             # prettier
yarn test                               # jest unit tests (*.spec.ts in src/)
yarn test transactions.service          # single test file (name pattern)
yarn test -t "test name"                # single test case
yarn test:e2e                           # e2e tests (server/test/, separate jest config)
yarn typeorm migration:run -d ormconfig.ts   # run TypeORM migrations
```

Local stack (Docker, when available): `docker-compose up -d --build` — requires `server/.env.docker` first (copy from `.env.docker.example`; needs `DB_*`, `PORT`, `ENVIRONMENT=local`, `ENABLE_ORM_LOGS`, `JWT_KEY`). API at `http://localhost:3333/api`, Swagger at `/doc`.

## Architecture

The codebase is **mid-migration from classic NestJS+TypeORM modules to DDD/CQRS**. Only the `transactions` module has started the migration; `auth`, `users`, `transactionsCategory` and `summary` still follow the classic pattern (controller → service → TypeORM entity/repository).

### Two Transaction entities coexist

- `src/domain/entities/transaction.entity.ts` — DDD entity (extends `AggregateRoot`, props hidden behind getters, created via `Transaction.create()`). Also defines `TypeTransactionEnum` (`RECIPE`/`EXPENSE`) and `TypeExpenseEnum`.
- `src/modules/transactions/entities/transaction.entity.ts` — legacy TypeORM entity, still the one wired to the DB (migrations, summary triggers).

A second, simpler enum `TypeEnum` (`+`/`-`) lives in `src/enums/`; unifying both is a known roadmap item.

### DDD layer (`src/domain/`)

- `common/` — building blocks: `Entity`, `AggregateRoot` (collects `_domainEvents`), `DomainEvent`, `UniqueEntityID`.
- `entities/` — domain models; `events/` — domain events.
- `modules/transactions/factory/transaction.factory.ts` — builds the domain entity from the DTO (watch out: `type`, `expenseType`, `year` and `monthYear` are currently hardcoded placeholders there).

### Installments flow via CQRS domain events

`TransactionsService.create()` → `TransactionFactory.create()` → `Transaction.generateInstallments()` records an `InstallmentsGeneratedEvent` on the aggregate → the service publishes `domainEvents` to the `EventBus` (`@nestjs/cqrs`) → `InstallmentsGeneratedHandler` creates the remaining installments.

**Both the service and the event handler currently use in-memory `Transaction[]` "repositories"** (marked with TODOs) — persistence is intentionally disconnected during the migration. List filters, `update` and `delete` are unimplemented stubs, and `create` does not return the created object. Reconnecting a TypeORM DDD repository is the top roadmap item.

### Monthly summary is kept consistent by MySQL triggers, not app code

`server/sql/CreateTrigger*.sql` update `summary_transactions` and `summary_transactions_month` on transaction changes. The summary module only reads. Changing transaction persistence semantics requires accounting for these triggers.

### TypeORM & configuration

- `synchronize: false` — all schema changes must go through migrations in `src/migrations/` (`yarn typeorm migration:run -d ormconfig.ts`). `ormconfig.ts` is a standalone DataSource used only by the CLI.
- Entity autoload glob is `src/modules/**/*.entity` (set in `ApiConfigService.ormConfig`) — domain entities are intentionally NOT registered as TypeORM entities.
- Env vars are read through `SharedModule`/`ApiConfigService` and are **fail-fast**: any missing var crashes the app at boot, so always add new vars to `.env.example` and `.env.docker.example`.

### Bootstrap (`src/main.ts`)

Global prefix `/api`; Swagger at `/doc` (version string mirrors `server/package.json` version — update both together); global `ValidationPipe` with `whitelist + forbidNonWhitelisted`, so DTOs must declare every accepted field; global rate limiting; JWT guard exists but is not yet applied to protected routes.

## Git workflow & conventions

- Branches: work on `develop`, merge into `prod` (the default branch) via PRs.
- The GitHub Actions workflow still triggers on `main`, a branch that no longer exists — updating it to the current flow is a known pending item.
- Commits follow conventional-commit style (`feat:`, `fix:`, `chore:`).
- Comments and user-facing error messages mix Portuguese and English (both are acceptable; match the surrounding file).
- Migrations are named `<timestamp>-<PascalCaseName>.ts`.

## Roadmap

The README carries an authoritative Roadmap section (reconnect persistence to the DDD model, unify type enums, activate the JWT guard, bcrypt migration, restore the test suite). Consult it before planning refactors — some quirks in the code (hardcoded values, stubs, stale `main` trigger in CI) are known transition artifacts, not oversights.
