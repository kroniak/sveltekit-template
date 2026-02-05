# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

## Development Commands

### Package Manager

This project uses **Bun** as the primary package manager (as evidenced by `bun.lock`). Use `bun` commands:

- `bun install` - Install dependencies
- `bun run dev` - Start development server at http://localhost:5173
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run check` - Run type checking with svelte-check
- `bun run check:watch` - Run type checking in watch mode
- `bun run lint` - Check code formatting with Prettier
- `bun run format` - Format code with Prettier

### Database Commands

- `npx prisma migrate dev` - Run database migrations in development
- `npx prisma generate` - Generate Prisma client (outputs to `src/generated/prisma`)
- `npx prisma studio` - Open Prisma Studio to view/edit database

## Architecture Overview

### Framework & Core Technologies

- **SvelteKit 2.50.1** with **Svelte 5** (using new runes API)
- **TypeScript** with strict mode enabled
- **Adapter**: `@sveltejs/adapter-node` for Node.js deployment
- **Vite 7** with Tailwind CSS 4 plugin

### Authentication System

The application uses **Better Auth** with Google OAuth:

- Server-side auth configuration: `src/lib/auth.ts`
- Client-side auth: `src/lib/auth-client.ts`
- Protected routes are handled via `src/hooks.server.ts`
- Routes containing `(private)` in their path require authentication
- Unauthenticated users are redirected to `/auth/login?redirect=<original-path>`

**Environment Variables Required:**

```
DATABASE_URL - PostgreSQL connection string
BETTER_AUTH_URL - Application URL (e.g., http://localhost:5173)
BETTER_AUTH_SECRET - Secret key for auth
GOOGLE_CLIENT_ID - Google OAuth client ID
GOOGLE_CLIENT_SECRET - Google OAuth client secret
```

### Database Architecture

- **PostgreSQL** database with **Prisma ORM**
- Uses `@prisma/adapter-pg` for native PostgreSQL connection
- Prisma schema: `prisma/schema.prisma`
- Generated client outputs to: `src/generated/prisma/client.js`
- Configuration: `prisma.config.ts`

**Database Models:**

- `User` - User accounts with email, name, profile image
- `Session` - User sessions with expiration, IP, user agent
- `Account` - Connected social provider accounts (Google OAuth)
- `Verification` - Email verification tokens

### Routing Structure

Routes follow SvelteKit's file-based routing with grouped layouts:

```
routes/
├── (global)/                    # Main application layout
│   ├── (private)/dashboard/    # Protected: requires authentication
│   ├── (public)/               # Public landing page
│   ├── +layout.server.ts       # Server-side layout logic
│   └── +layout.svelte          # Global layout with sidebar
└── (simple)/                    # Simplified layout
    └── auth/login/             # Authentication pages
```

**Route Protection**: Any route under a directory containing `(private)` requires authentication. This is enforced in
`src/hooks.server.ts`.

### Path Aliases

- `$lib` → `src/lib` (SvelteKit default)
- `$features` → `src/features` (defined in `svelte.config.js`)
- `$app/*` → SvelteKit app modules
- `$env/*` → Environment variables

### Project Structure

**Features-based Organization:**

- `src/features/` - Feature modules with UI components
  - `accounts/` - Authentication-related components
  - `dashboard-template/` - Dashboard components (tables, charts, etc.)

**Library Structure:**

- `src/lib/components/app/` - Application-level components (sidebar, header, nav)
- `src/lib/components/ui/` - Reusable shadcn/ui components
- `src/lib/hooks/` - Svelte hooks/utilities
- `src/lib/styles/` - Global CSS and layout styles
- `src/lib/auth.ts` - Server-side Better Auth configuration
- `src/lib/auth-client.ts` - Client-side auth utilities
- `src/lib/prisma.ts` - Prisma client singleton
- `src/lib/environment.ts` - App constants (cookie prefixes, keys)
- `src/lib/utils.ts` - General utility functions

### UI Component Library

The project uses **shadcn/ui** components adapted for Svelte with:

- **Tailwind CSS 4** for styling
- **bits-ui** as the headless component foundation
- **mode-watcher** for dark/light theme switching
- **svelte-sonner** for toast notifications
- Configuration: `components.json`

### Data Visualization

- **LayerChart** - Primary charting library for Svelte
- **D3.js** (`d3-scale`, `d3-shape`) - Low-level data visualization
- **@tanstack/table-core** - Headless table functionality
- **@dnd-kit** - Drag-and-drop functionality

### Type Safety

- TypeScript strict mode enabled
- Svelte 5 with type-safe runes
- Zod for runtime schema validation
- Generated Prisma types from database schema

## Important Development Notes

### Prisma Client Location

The Prisma client is generated to a **non-standard location**: `src/generated/prisma/client.js`. Always import from:

```typescript
import { PrismaClient } from "../generated/prisma/client.js";
```

### Better Auth Session Access

In server-side code (layout.server.ts, page.server.ts, hooks):

- Access session via `event.locals.session`
- Access user via `event.locals.user`
- These are populated by the auth middleware in `hooks.server.ts`

### Svelte 5 Runes

This project uses Svelte 5's new runes API:

- Use `$state()`, `$derived()`, `$effect()` instead of stores in components
- Props are declared with `let { propName } = $props()`

### Cookie Prefixes

The app uses custom cookie prefixes defined in `src/lib/environment.ts`:

- `APP_COOKIE_PREFIX = "acc"`
- Cookie names: `acc.session`, `acc.sidebar`, `acc.last_login_method`, etc.
