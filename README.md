# SvelteKit Dashboard Application

A modern, type-safe SvelteKit application featuring a comprehensive dashboard with authentication, data visualization,
and interactive components built with shadcn/ui components.

## 🚀 Features

- **Authentication System**: Google OAuth integration with Better Auth
- **Interactive Dashboard**: Data tables with drag-and-drop functionality
- **Data Visualization**: Interactive charts with LayerChart and D3.js
- **Responsive UI**: Mobile-first design with shadcn/ui components
- **Type Safety**: Full TypeScript support throughout the application
- **Database Integration**: PostgreSQL with Prisma ORM
- **Modern Styling**: Tailwind CSS with custom themes

## 🛠️ Technology Stack

### Core Framework

- **SvelteKit 2.50.1** - Full-stack framework for Svelte applications
- **Svelte 5.48.2** - Next-generation reactive frontend framework
- **TypeScript 5.9.3** - Static type checking for JavaScript

### Backend & Database

- **Prisma 7.3.0** - Next-generation ORM for Node.js and TypeScript
- **PostgreSQL** - Relational database management system
- **Better Auth 1.4.18** - Authentication library with social providers

### UI Components & Styling

- **shadcn/ui** - Reusable component library
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **@tailwindcss/typography** - Typography plugin

### Data Visualization

- **LayerChart** - Charting library for Svelte
- **D3.js** - Data-driven documents library
- **@tanstack/table-core** - Headless UI for building powerful tables

### Utilities

- **Zod 4.1.13** - TypeScript-first schema declaration and validation
- **clsx** - Utility for constructing className strings
- **tailwind-merge** - Merge Tailwind CSS classes efficiently
- **svelte-sonner** - Toast notifications for Svelte

## 📁 Project Structure

```
src/
├── features/
│   ├── accounts/           # Authentication related components
│   │   └── ui/
│   │       └── login-form.svelte
│   └── dashboard-template/ # Dashboard components
│       ├── chart-area-interactive.svelte
│       ├── data-table.svelte
│       ├── data-table-cell-viewer.svelte
│       ├── data-table-checkbox.svelte
│       ├── data-table-reviewer.svelte
│       ├── schemas.ts
│       └── section-cards.svelte
├── lib/
│   ├── components/
│   │   ├── app/            # Application layout components
│   │   │   ├── app-sidebar.svelte
│   │   │   ├── mode-switcher.svelte
│   │   │   ├── nav-main.svelte
│   │   │   ├── sidebar-opt-in-form.svelte
│   │   │   └── site-header.svelte
│   │   └── ui/             # shadcn/ui components
│   │       ├── avatar/
│   │       ├── badge/
│   │       ├── button/
│   │       ├── card/
│   │       ├── chart/
│   │       ├── checkbox/
│   │       ├── data-table/
│   │       ├── drawer/
│   │       ├── dropdown-menu/
│   │       ├── field/
│   │       ├── input/
│   │       ├── label/
│   │       ├── select/
│   │       ├── sidebar/
│   │       ├── table/
│   │       ├── tabs/
│   │       └── ...
│   ├── hooks/
│   │   └── is-mobile.svelte.ts
│   ├── styles/
│   │   ├── layout-arcade.css
│   │   ├── layout-default.css
│   │   └── layout-mono.css
│   ├── auth-client.ts      # Client-side authentication
│   ├── auth.ts            # Server-side authentication configuration
│   ├── environment.ts     # Environment constants
│   ├── prisma.ts          # Prisma client configuration
│   └── utils.ts           # Utility functions
├── routes/
│   ├── (global)/
│   │   ├── (private)/dashboard/  # Protected dashboard routes
│   │   │   ├── +page.svelte
│   │   │   └── data.ts
│   │   ├── (public)/             # Public landing page
│   │   │   └── +page.svelte
│   │   ├── +layout.server.ts
│   │   └── +layout.svelte
│   ├── (simple)/
│   │   ├── auth/login/           # Authentication routes
│   │   │   ├── +page.server.ts
│   │   │   └── +page.svelte
│   │   └── +layout.svelte
│   └── layout.css
├── app.d.ts
├── app.html
└── hooks.server.ts        # Server hooks for authentication middleware
```

## 🔧 Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd my-app
```

2. **Install dependencies:**

```bash
bun install
# or
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Better Auth
BETTER_AUTH_URL="http://localhost:5173"
BETTER_AUTH_SECRET="your-secret-key-here"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. **Set up the database:**

```bash
npx prisma migrate dev
npx prisma generate
```

## 🏃 Development

Start the development server:

```bash
bun run dev
# or
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`.

## 📦 Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build locally
- `check` - Run type checking
- `check:watch` - Run type checking in watch mode
- `lint` - Check code formatting with Prettier
- `format` - Format code with Prettier

## 🔐 Authentication System

The application uses Better Auth for authentication with the following features:

- **Social Login**: Google OAuth integration
- **Session Management**: Secure session handling with cookies
- **Route Protection**: Automatic redirection for protected routes
- **User Context**: Access to user and session data throughout the application

### Protected Routes

Routes under `(private)` group require authentication. Unauthenticated users will be redirected to `/auth/login`.

## 🗄️ Database Schema

The Prisma schema includes the following models:

- **User**: User accounts with email, name, and profile information
- **Session**: User sessions with expiration and device information
- **Account**: Connected accounts (social providers)
- **Verification**: Email verification tokens

## 🎨 Component Library

This project uses shadcn/ui components with custom styling:

- **Data Tables**: Interactive tables with sorting, filtering, and drag-and-drop
- **Charts**: Responsive data visualizations with LayerChart
- **Forms**: Accessible form components with validation
- **Navigation**: Sidebar navigation with collapsible sections
- **Layout**: Responsive grid systems and containers

## 🌐 Deployment

The application uses `@sveltejs/adapter-node` which automatically adapts to Node.js servers

For production deployment:

```bash
bun run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the excellent component library
- [SvelteKit](https://kit.svelte.dev/) for the amazing framework
- [Prisma](https://www.prisma.io/) for the powerful ORM
- [Better Auth](https://www.better-auth.com/) for simplified authentication
