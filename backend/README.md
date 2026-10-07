# WAFA Travel & Tour — Laravel Backend API

## Requirements
- PHP 8.2+
- Composer
- MySQL 8+
- Node.js 18+ (for Scribe docs)

## Setup

```bash
# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create MySQL database
mysql -u root -p -e "CREATE DATABASE wafa_travel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Configure .env with your database credentials:
# DB_DATABASE=wafa_travel
# DB_USERNAME=root
# DB_PASSWORD=your_password

# Run migrations with seed data
php artisan migrate --seed

# Create storage symlink
php artisan storage:link

# Start development server
php artisan serve
```

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@wafatravel.com | password |
| Staff | staff@wafatravel.com | password |
| User | user@example.com | password |

## API Endpoints

### Public
- `POST /api/v1/auth/register` — Register new user
- `POST /api/v1/auth/login` — Login
- `GET /api/v1/packages` — List packages (filter: category, search, tier, featured)
- `GET /api/v1/packages/{slug}` — Package detail
- `POST /api/v1/flights/search` — Search flights (mock)
- `GET /api/v1/jobs` — List jobs (filter: country, category, search)
- `GET /api/v1/jobs/{slug}` — Job detail
- `POST /api/v1/jobs/apply` — Apply for job
- `GET /api/v1/visa-services` — List visa services
- `GET /api/v1/hotels` — List hotels
- `GET /api/v1/blog` — Blog posts
- `GET /api/v1/testimonials` — Approved testimonials
- `GET /api/v1/faqs` — Active FAQs
- `POST /api/v1/contact` — Submit enquiry
- `POST /api/v1/newsletter/subscribe` — Subscribe to newsletter

### Authenticated
- `GET /api/v1/auth/user` — Current user profile
- `PUT /api/v1/auth/profile` — Update profile
- `POST /api/v1/auth/logout` — Logout
- `POST /api/v1/flights/book` — Create flight booking
- `GET /api/v1/my/bookings` — My bookings
- `GET /api/v1/my/applications` — My job applications

### Admin
- `GET /api/v1/admin/dashboard` — Dashboard stats
- `GET /api/v1/admin/bookings` — All bookings
- `PUT /api/v1/admin/bookings/{id}/status` — Update booking status
- `GET /api/v1/admin/applications` — All job applications
- `PUT /api/v1/admin/applications/{id}/status` — Update application status
- `PUT /api/v1/admin/payments/{id}/approve` — Approve payment
- `PUT /api/v1/admin/payments/{id}/reject` — Reject payment

## Architecture

### Key Services
- `FlightSearchService` — Mock flight search (replace with Amadeus/Sabre/GDS)
- `PaymentService` — Handle payment proof uploads and approval
- `NotificationService` — Email/SMS/WhatsApp notifications on status changes

### File Upload Paths
- `applications/cv/` — Job applicant CVs
- `applications/passports/` — Passport copies
- `applications/documents/` — Other documents
- `payments/proofs/` — Payment proof uploads
- `blog/` — Blog featured images
- `packages/` — Package images
- `gallery/` — Gallery images

### Security
- Laravel Sanctum token authentication
- Spatie roles & permissions
- Form Request validation on all endpoints
- Rate limiting (configurable in RouteServiceProvider)
- CORS restricted to frontend domain
- XSS sanitization via middleware
- Secure file upload validation (type, size)

## Production Deployment

### cPanel (Shared Hosting)
1. Upload project via FTP/Git
2. Set document root to `/public`
3. Configure `.htaccess` for clean URLs
4. Set `APP_ENV=production`, `APP_DEBUG=false`
5. Run `php artisan config:cache`, `php artisan route:cache`
6. Set up cron: `* * * * * php /path/to/artisan schedule:run`
7. Set up queue worker via cPanel's Node.js/Supervisor

### VPS (Ubuntu + Nginx)
```bash
# Install PHP 8.2, Nginx, MySQL
sudo apt install php8.2-fpm php8.2-mysql php8.2-xml php8.2-mbstring php8.2-curl php8.2-zip

# Configure Nginx
# Point root to /path/to/project/public

# Install Composer dependencies
composer install --optimize-autoloader --no-dev

# Set permissions
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# Optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Queue worker (Supervisor)
[program:laravel-worker]
command=php /path/to/artisan queue:work --sleep=3 --tries=3
numprocs=2
autostart=true
autorestart=true
```
