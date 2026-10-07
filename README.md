# 🌍 WAFA Travel & Tour — Premium 3D Animated Website

**Complete full-stack travel agency website with Next.js 16 frontend + Laravel 11 backend.**

🔗 **Live Repository:** https://github.com/sastishoppingstore/wafa-travel-tour

---

## 📋 Project Status

| Phase | Description | Status |
|-------|-------------|--------|
| ✅ Phase 1 | Project setup, design system, Home page + 3D Globe hero | **Complete** |
| ✅ Phase 2 | Laravel backend skeleton — 17 models, 4 migrations, 14 controllers, seeders | **Complete** |
| ✅ Phase 3 | Hajj & Umrah, Tours pages | **Complete** |
| ✅ Phase 4 | Flight ticket booking page | **Complete** |
| ✅ Phase 5 | Overseas Employment page | **Complete** |
| ✅ Phase 6 | Visa, Hotels, About, Blog, Gallery, Contact, FAQ | **Complete** |
| ✅ Phase 7 | User Dashboard (bookings, job applications, profile), Auth pages | **Complete** |

---

## 🗂 Project Structure

```
wafa-travel/
├── frontend/                    # Next.js 16 + TypeScript + Tailwind v4
│   ├── src/
│   │   ├── app/[locale]/       # 13 pages with i18n routing
│   │   │   ├── page.tsx                # Home (3D Globe hero)
│   │   │   ├── hajj-umrah/page.tsx     # Hajj & Umrah packages
│   │   │   ├── flights/page.tsx        # Flight search & results
│   │   │   ├── tours/page.tsx          # International & domestic tours
│   │   │   ├── overseas-jobs/page.tsx  # Overseas employment
│   │   │   ├── visa/page.tsx           # Visa services
│   │   │   ├── hotels/page.tsx         # Hotel bookings
│   │   │   ├── about/page.tsx          # About us
│   │   │   ├── blog/page.tsx           # Travel blog
│   │   │   ├── gallery/page.tsx        # Photo gallery
│   │   │   ├── contact/page.tsx        # Contact form
│   │   │   ├── dashboard/page.tsx      # User dashboard
│   │   │   └── auth/{login,signup}/    # Authentication pages
│   │   ├── components/
│   │   │   ├── 3d/Globe.tsx            # Interactive 3D globe (Three.js)
│   │   │   ├── animations/variants.ts  # Reusable Framer Motion variants
│   │   │   ├── home/                   # 8 home page sections
│   │   │   ├── layout/                 # Header, Footer, WhatsApp, BackToTop
│   │   │   └── ui/                     # Shared UI components
│   │   ├── i18n/                       # English/Urdu translations
│   │   ├── lib/store.ts                # Zustand theme store
│   │   └── messages/{en,ur}.json       # Full translations
│   └── next.config.ts
│
└── backend/                     # Laravel 11 REST API
    ├── app/
    │   ├── Http/Controllers/Api/V1/  # 14 API controllers
    │   ├── Models/                    # 17 Eloquent models
    │   └── Services/                  # FlightSearchService (mock)
    ├── database/
    │   ├── migrations/                # 4 migration files (all tables)
    │   └── seeders/DatabaseSeeder.php # Realistic demo data
    ├── routes/api.php                 # 35+ API endpoints
    └── composer.json
```

---

## 🚀 How to Run

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev          # → http://localhost:3000
```

### Backend (needs PHP 8.2+, MySQL, Composer)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configure database in .env
php artisan migrate --seed
php artisan storage:link
php artisan serve    # → http://localhost:8000
```

**Demo admin login:** `admin@wafatravel.com` / `password`

---

## 🎨 Tech Stack

**Frontend:** Next.js 16 • TypeScript • Tailwind CSS v4 • Framer Motion • React Three Fiber + Drei • next-intl • Zustand • Lenis • React Hook Form + Zod • TanStack Query (ready)

**Backend:** Laravel 11 • PHP 8.2 • MySQL • Sanctum • Spatie Permission • Socialite • Filament (ready) • DomPDF (ready) • Laravel Queues

---

## 🎯 Features Built

### Frontend (13 Pages)
- ✅ **Home** — 3D globe hero, quick search, services, packages, destinations, stats, testimonials, FAQ, CTA
- ✅ **Hajj & Umrah** — Package tiers, step-by-step timeline, enquiry form
- ✅ **Flights** — Search (one-way/round-trip), airline filters, sorting, animated results
- ✅ **Tours** — 12 packages, category/search filters, destination cards
- ✅ **Overseas Jobs** — Country grid, job listings, apply modal, process timeline
- ✅ **Visa Services** — 8 countries, document checklists, processing times
- ✅ **Hotels** — Featured properties worldwide
- ✅ **About** — Story timeline, team cards, certifications
- ✅ **Blog** — Articles with category filters
- ✅ **Gallery** — Masonry grid with lightbox
- ✅ **Contact** — Form, info cards, social links, map placeholder
- ✅ **Dashboard** — Bookings tracker, job applications stepper, profile editor
- ✅ **Auth** — Login + Signup with Google

### Global Features
- ✅ Dark mode toggle (system preference detection)
- ✅ i18n (English / Urdu with RTL)
- ✅ Glassmorphism design system
- ✅ Animated 3D globe (React Three Fiber)
- ✅ Framer Motion (scroll reveals, stagger, hover, page transitions)
- ✅ Floating WhatsApp button
- ✅ Back-to-top button
- ✅ Responsive design (mobile-first)
- ✅ `prefers-reduced-motion` support

### Backend (API Skeleton)
- ✅ 17 Eloquent models with relationships
- ✅ 4 migration files covering all tables
- ✅ 14 API controllers
- ✅ 35+ REST endpoints (public, authenticated, admin)
- ✅ DatabaseSeeder with realistic demo data
- ✅ FlightSearchService (mock provider — swap with Amadeus/Sabre/GDS)
- ✅ Job application tracking with status logs
- ✅ File upload handling (CV, passport, payment proofs)
- ✅ Payment approval workflow

---

## 🔧 Placeholders to Replace

Search for these in the codebase and replace with your actual data:

| Placeholder | Location |
|-------------|----------|
| `[Logo]` | Header, Footer |
| `[Phone Number]` / `+92-300-1234567` | Footer, Contact, WhatsApp |
| `[WhatsApp Number]` / `92XXXXXXXXXX` | WhatsApp button, CTA |
| `[Address]` / `123 Main Boulevard` | Footer, Contact |
| `[Email]` / `info@wafatravel.com` | Footer, Contact |
| `[License No.]` / `BEOE-LHR-2024-XXXX` | Footer, Overseas Employment |

---

## 📦 Deployment

### cPanel (Shared Hosting)
1. **Frontend:** `npm run build` → upload `out/` folder (static export)
2. **Backend:** Upload via FTP, set document root to `/public`
3. Run `composer install --optimize-autoloader --no-dev`
4. Set `APP_ENV=production`, `APP_DEBUG=false`

### VPS (Nginx + PM2)
```bash
# Frontend (PM2)
cd frontend && npm run build
pm2 start npm --name "wafa-frontend" -- start

# Backend (Nginx + PHP-FPM)
cd backend
composer install --optimize-autoloader --no-dev
php artisan config:cache route:cache
# Configure Nginx to point root to /public
```

---

## 📄 License

Built for **WAFA Travel & Tour** — Your Trusted Journey Partner ✈️
