# WAFA Travel & Tour — Complete Web Application

A premium, 3D-animated travel agency website built with Next.js (frontend) and Laravel 11 (backend).

## 📁 Project Structure

```
wafa-travel/
├── frontend/          # Next.js 16 + React 19 + TypeScript + Tailwind CSS v4
│   ├── src/
│   │   ├── app/              # App Router (pages & layouts)
│   │   │   ├── [locale]/     # i18n dynamic locale route
│   │   │   └── globals.css   # Design system & global styles
│   │   ├── components/       # Reusable components
│   │   │   ├── 3d/           # React Three Fiber 3D scenes
│   │   │   ├── animations/   # Framer Motion variants
│   │   │   ├── home/         # Home page sections
│   │   │   ├── layout/       # Header, Footer, WhatsApp, BackToTop
│   │   │   └── ui/           # Shared UI components
│   │   ├── i18n/             # Internationalization config
│   │   ├── lib/              # Zustand stores, utilities
│   │   ├── messages/         # EN & UR translation files
│   │   └── types/            # TypeScript type definitions
│   ├── .env.example
│   └── next.config.ts
│
└── backend/           # Laravel 11 REST API (Phase 2+)
    ├── app/
    ├── database/
    ├── routes/
    └── .env.example
```

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4, glassmorphism design system
- **Animations:** Framer Motion (all UI), React Three Fiber + Drei (3D scenes)
- **Scrolling:** Lenis smooth scrolling
- **i18n:** next-intl (English / Urdu with RTL)
- **State:** Zustand (theme, global state)
- **Forms:** React Hook Form + Zod
- **Data Fetching:** TanStack Query (ready for Phase 3+)
- **Icons:** React Icons

### Backend (Phase 2+)
- **Framework:** Laravel 11 (PHP 8.2+)
- **Auth:** Laravel Sanctum + Socialite (Google)
- **Roles:** Spatie Laravel Permission
- **Admin:** Filament PHP 3
- **Database:** MySQL 8
- **Queue:** Laravel Queues
- **PDF:** DomPDF (e-tickets)
- **API Docs:** Scribe

## 🎨 Brand & Design

| Element | Value |
|---------|-------|
| Primary Color | Deep Emerald Green (#064e26, #0d7c3e) |
| Accent Color | Gold (#d4af37, #f0d060) |
| Background | White (#fff) / Dark (#0a0f0d) |
| Surface | Cream (#f8faf9) / Dark surface (#111b16) |
| Heading Font | Playfair Display (serif) |
| Body Font | Inter (sans-serif) |
| Urdu Font | Noto Nastaliq Urdu |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PHP 8.2+ (Phase 2+)
- MySQL 8 (Phase 2+)
- Composer (Phase 2+)

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment
cp .env.example .env.local

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

### Backend Setup (Phase 2+)

```bash
cd backend

# Install dependencies
composer install

# Copy environment
cp .env.example .env
php artisan key:generate

# Configure database in .env, then:
php artisan migrate --seed
php artisan storage:link

# Start development server
php artisan serve

# Admin login: admin@wafatravel.com / password
```

## 📋 Build Phases

### ✅ Phase 1 — Foundation (COMPLETE)
- [x] Next.js 16 project with TypeScript & Tailwind CSS v4
- [x] Design system (colors, typography, glassmorphism, buttons)
- [x] i18n with English & Urdu (RTL support)
- [x] Dark mode toggle with system preference detection
- [x] Responsive layout (Header with mobile menu, Footer)
- [x] 3D Globe hero with flight arcs and orbiting airplane
- [x] Quick search widget with tabs
- [x] Services overview section
- [x] Featured packages with animated filters
- [x] Popular destinations grid
- [x] Why Choose Us with animated counters
- [x] Testimonials carousel
- [x] FAQ accordion
- [x] CTA section
- [x] Floating WhatsApp button
- [x] Back to top button
- [x] All animations (Framer Motion variants, scroll reveals, stagger)

### Phase 2 — Laravel Backend (Next)
- [ ] Laravel 11 setup with API structure
- [ ] Database migrations & seeders
- [ ] Auth with Sanctum + Google login
- [ ] Roles & permissions (Spatie)
- [ ] Filament admin panel
- [ ] Core API endpoints

### Phase 3–7 — Features & Polish
See detailed requirements in the project specification.

## 🔧 Placeholders to Replace

| Placeholder | Location |
|-------------|----------|
| `[Logo]` | Header, Footer |
| `[Phone Number]` | Footer, Contact page |
| `[WhatsApp Number]` | WhatsApp button, CTA |
| `[Address]` | Footer, Contact page |
| `[Email]` | Footer, Contact page |
| `[License No.]` | Footer, Overseas Employment |

## 📄 Demo Admin (Phase 2)
- **URL:** /admin
- **Email:** admin@wafatravel.com
- **Password:** password

## 🌐 Deployment

### cPanel (Shared Hosting)
1. Build frontend: `npm run build` → upload `out/` folder
2. Laravel: upload project, set document root to `/public`
3. Configure `.htaccess` for API routing

### VPS (Nginx + PM2)
1. Frontend: `npm run build` → PM2 with `next start`
2. Laravel: Nginx reverse proxy to PHP-FPM
3. See detailed guide in `/docs/deployment.md`

---

**Built with ❤️ for WAFA Travel & Tour**
