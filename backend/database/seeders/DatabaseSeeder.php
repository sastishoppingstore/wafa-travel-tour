<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Package;
use App\Models\Job;
use App\Models\Testimonial;
use App\Models\Faq;
use App\Models\BlogPost;
use App\Models\VisaService;
use App\Models\Hotel;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles
        $adminRole = Role::create(['name' => 'admin']);
        $staffRole = Role::create(['name' => 'staff']);
        $userRole = Role::create(['name' => 'user']);

        // Create admin user
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@wafatravel.com',
            'password' => Hash::make('password'),
            'phone' => '+92-300-1234567',
        ]);
        $admin->assignRole($adminRole);

        // Create staff user
        $staff = User::create([
            'name' => 'Staff Member',
            'email' => 'staff@wafatravel.com',
            'password' => Hash::make('password'),
        ]);
        $staff->assignRole($staffRole);

        // Create demo user
        $user = User::create([
            'name' => 'Ahmed Khan',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'phone' => '+92-321-9876543',
        ]);
        $user->assignRole($userRole);

        // Seed packages
        $this->seedPackages();

        // Seed jobs
        $this->seedJobs();

        // Seed testimonials
        $this->seedTestimonials();

        // Seed FAQs
        $this->seedFaqs();

        // Seed blog posts
        $this->seedBlogPosts();

        // Seed visa services
        $this->seedVisaServices();

        // Seed hotels
        $this->seedHotels();

        // Seed settings
        $this->seedSettings();
    }

    private function seedPackages(): void
    {
        $packages = [
            [
                'title' => 'Umrah Economy Package',
                'description' => 'Affordable Umrah package with comfortable accommodation 2km from Haram. Includes return flights from Lahore, visa processing, and guided Ziyarat.',
                'category' => 'umrah',
                'tier' => 'economy',
                'destination' => 'Makkah & Madinah',
                'duration_days' => 14,
                'duration_nights' => 12,
                'price' => 285000,
                'hotel_name' => 'Al Safwah Royal Inn',
                'hotel_distance_from_haram' => '2 km',
                'flights_included' => true,
                'visa_included' => true,
                'transport_included' => true,
                'ziyarat_included' => true,
                'is_featured' => true,
                'inclusions' => ['Return flights', 'Umrah visa', 'Hotel accommodation', 'Transport in KSA', 'Ziyarat tour', 'Guidance'],
                'exclusions' => ['Personal expenses', 'Extra meals', 'Laundry'],
            ],
            [
                'title' => 'Umrah Premium Package',
                'description' => 'Luxury Umrah experience with 5-star hotel overlooking Haram. Private transport, premium visa processing, and exclusive Ziyarat tours.',
                'category' => 'umrah',
                'tier' => 'premium',
                'destination' => 'Makkah & Madinah',
                'duration_days' => 14,
                'duration_nights' => 12,
                'price' => 550000,
                'hotel_name' => 'Swissotel Al Maqam',
                'hotel_distance_from_haram' => '200m',
                'flights_included' => true,
                'visa_included' => true,
                'transport_included' => true,
                'ziyarat_included' => true,
                'is_featured' => true,
            ],
            [
                'title' => 'Hajj Premium Package 2026',
                'description' => 'Complete Hajj package with Mina/Arafat tent accommodation, premium Makkah hotel, all meals, and experienced Mutawwif.',
                'category' => 'hajj',
                'tier' => 'premium',
                'destination' => 'Makkah, Madinah & Mina',
                'duration_days' => 21,
                'duration_nights' => 20,
                'price' => 850000,
                'hotel_name' => 'Hilton Suites Makkah',
                'hotel_distance_from_haram' => '350m',
                'is_featured' => true,
            ],
            [
                'title' => 'Dubai Adventure 5 Days',
                'description' => 'Explore the city of gold — Burj Khalifa, Desert Safari, Dubai Mall, Marina Cruise, and more.',
                'category' => 'international',
                'tier' => 'standard',
                'destination' => 'Dubai, UAE',
                'duration_days' => 5,
                'duration_nights' => 4,
                'price' => 125000,
                'is_featured' => true,
            ],
            [
                'title' => 'Turkey Explorer — Istanbul & Cappadocia',
                'description' => '7-day tour covering Istanbul\'s historic sites, Bosphorus cruise, and Cappadocia hot air balloon experience.',
                'category' => 'international',
                'tier' => 'standard',
                'destination' => 'Turkey',
                'duration_days' => 7,
                'duration_nights' => 6,
                'price' => 185000,
                'is_featured' => true,
            ],
            [
                'title' => 'Hunza Valley Paradise',
                'description' => 'Discover the magical valleys of Hunza — Altit Fort, Attabad Lake, Khunjerab Pass, and stunning Karakoram views.',
                'category' => 'domestic',
                'tier' => 'standard',
                'destination' => 'Hunza, Pakistan',
                'duration_days' => 5,
                'duration_nights' => 4,
                'price' => 45000,
                'is_featured' => true,
            ],
            [
                'title' => 'Malaysia Getaway',
                'description' => 'Explore Kuala Lumpur, Genting Highlands, Langkawi Island, and Batu Caves in this exciting 6-day package.',
                'category' => 'international',
                'tier' => 'standard',
                'destination' => 'Malaysia',
                'duration_days' => 6,
                'duration_nights' => 5,
                'price' => 165000,
            ],
            [
                'title' => 'Skardu Expedition',
                'description' => 'Adventure to the heart of Karakoram — Shangrila Resort, Deosai Plains, Shigar Fort, and cold desert.',
                'category' => 'domestic',
                'tier' => 'standard',
                'destination' => 'Skardu, Pakistan',
                'duration_days' => 6,
                'duration_nights' => 5,
                'price' => 55000,
            ],
        ];

        foreach ($packages as $pkg) {
            $pkg['slug'] = str()->slug($pkg['title']);
            Package::create($pkg);
        }
    }

    private function seedJobs(): void
    {
        $jobs = [
            ['title' => 'Construction Worker', 'country' => 'Saudi Arabia', 'category' => 'Construction', 'salary_min' => 600, 'salary_max' => 900, 'positions_available' => 50],
            ['title' => 'Hotel Receptionist', 'country' => 'UAE', 'category' => 'Hospitality', 'salary_min' => 800, 'salary_max' => 1200, 'positions_available' => 10],
            ['title' => 'Heavy Driver (License Required)', 'country' => 'Qatar', 'category' => 'Drivers', 'salary_min' => 700, 'salary_max' => 1000, 'positions_available' => 20],
            ['title' => 'Electrician Technician', 'country' => 'Kuwait', 'category' => 'Technicians', 'salary_min' => 500, 'salary_max' => 800, 'positions_available' => 15],
            ['title' => 'Security Guard', 'country' => 'Oman', 'category' => 'Security', 'salary_min' => 400, 'salary_max' => 600, 'positions_available' => 30],
            ['title' => 'Office Assistant', 'country' => 'Malaysia', 'category' => 'Office/IT', 'salary_min' => 500, 'salary_max' => 700, 'positions_available' => 5],
            ['title' => 'Cleaner / Housekeeping', 'country' => 'Bahrain', 'category' => 'Hospitality', 'salary_min' => 350, 'salary_max' => 500, 'positions_available' => 40],
            ['title' => 'Nurse (Female)', 'country' => 'Saudi Arabia', 'category' => 'Healthcare', 'salary_min' => 1200, 'salary_max' => 2000, 'positions_available' => 8],
        ];

        foreach ($jobs as $job) {
            $job['slug'] = str()->slug($job['title'] . '-' . $job['country']);
            $job['description'] = "We are looking for experienced {$job['title']}s to work in {$job['country']}. Good salary, accommodation provided, and 2-year contract.";
            $job['salary_currency'] = 'USD';
            $job['requirements'] = "Minimum 1 year experience\nValid passport\nAge 21-45\nMedical fitness";
            $job['benefits'] = "Free accommodation\nFree transportation\nMedical insurance\nAnnual air ticket\nOvertime allowance";
            $job['is_active'] = true;
            Job::create($job);
        }
    }

    private function seedTestimonials(): void
    {
        $testimonials = [
            ['name' => 'Ahmed Khan', 'location' => 'Lahore', 'content' => 'WAFA Travel made our Umrah journey truly memorable. From visa processing to hotel arrangements near Haram, everything was perfect.', 'rating' => 5, 'service_type' => 'Umrah Package', 'is_approved' => true],
            ['name' => 'Fatima Zahra', 'location' => 'Karachi', 'content' => 'Our family trip to Turkey was flawlessly organized. The itinerary was well-planned, hotels were excellent.', 'rating' => 5, 'service_type' => 'Turkey Tour', 'is_approved' => true],
            ['name' => 'Muhammad Ali', 'location' => 'Islamabad', 'content' => 'Got my Dubai visa in just 3 days! The team is professional and responsive.', 'rating' => 5, 'service_type' => 'Visa Service', 'is_approved' => true],
            ['name' => 'Saira Bibi', 'location' => 'Faisalabad', 'content' => 'Applied for overseas employment through WAFA and they handled everything. Now working in Dubai, Alhamdulillah!', 'rating' => 5, 'service_type' => 'Overseas Employment', 'is_approved' => true],
        ];

        foreach ($testimonials as $t) {
            Testimonial::create($t);
        }
    }

    private function seedFaqs(): void
    {
        $faqs = [
            ['question' => 'How do I book a Hajj or Umrah package?', 'answer' => 'You can book through our website, visit our office, or contact us via WhatsApp. Our team will guide you through the complete process.', 'category' => 'hajj-umrah'],
            ['question' => 'What documents are required for visa processing?', 'answer' => 'Requirements vary by country but generally include a valid passport (6+ months), CNIC, photographs, bank statements, and employment letter.', 'category' => 'visa'],
            ['question' => 'Do you offer group discounts?', 'answer' => 'Yes! We offer special rates for group bookings on flights, tours, and Umrah packages.', 'category' => 'general'],
            ['question' => 'What payment methods do you accept?', 'answer' => 'We accept bank transfers, JazzCash, Easypaisa, and credit/debit cards. Payment plans are available for select packages.', 'category' => 'payments'],
            ['question' => 'How can I apply for overseas employment?', 'answer' => 'Browse our job listings, submit your application with required documents, and our team will guide you through the process.', 'category' => 'employment'],
        ];

        foreach ($faqs as $i => $faq) {
            $faq['sort_order'] = $i;
            Faq::create($faq);
        }
    }

    private function seedBlogPosts(): void
    {
        $posts = [
            ['title' => 'Complete Guide to Umrah 2026', 'excerpt' => 'Everything you need to know before performing Umrah this year.', 'content' => 'Detailed guide covering visa requirements, best time to go, hotel recommendations, and step-by-step Umrah rituals.', 'category' => 'Hajj & Umrah'],
            ['title' => 'Top 10 Places to Visit in Turkey', 'excerpt' => 'From Istanbul to Cappadocia, discover Turkey\'s most stunning destinations.', 'content' => 'A comprehensive travel guide to Turkey\'s must-visit destinations.', 'category' => 'Travel Guide'],
            ['title' => 'Working in the Gulf: What to Expect', 'excerpt' => 'A guide for Pakistani workers planning to work in Gulf countries.', 'content' => 'Information about working conditions, salary expectations, rights, and preparation tips.', 'category' => 'Employment'],
        ];

        foreach ($posts as $post) {
            $post['slug'] = str()->slug($post['title']);
            $post['is_published'] = true;
            $post['published_at'] = now();
            $post['author_id'] = 1;
            BlogPost::create($post);
        }
    }

    private function seedVisaServices(): void
    {
        $services = [
            ['country' => 'UAE', 'visa_type' => 'Tourist', 'processing_time' => '3-5 days', 'service_fee' => 15000, 'required_documents' => ['Passport (6+ months)', 'CNIC copy', 'Photograph', 'Bank statement']],
            ['country' => 'Saudi Arabia', 'visa_type' => 'Umrah', 'processing_time' => '5-7 days', 'service_fee' => 25000, 'required_documents' => ['Passport (6+ months)', 'CNIC copy', 'Photographs', 'Mahram proof (for women)', 'Vaccination certificates']],
            ['country' => 'Turkey', 'visa_type' => 'Tourist (E-Visa)', 'processing_time' => '1-2 days', 'service_fee' => 12000, 'required_documents' => ['Passport (6+ months)', 'CNIC copy', 'Photograph', 'Hotel booking', 'Return ticket']],
            ['country' => 'Malaysia', 'visa_type' => 'Tourist (eVISA)', 'processing_time' => '3-5 days', 'service_fee' => 10000, 'required_documents' => ['Passport (6+ months)', 'CNIC copy', 'Photograph', 'Hotel booking', 'Flight itinerary']],
            ['country' => 'UK', 'visa_type' => 'Tourist', 'processing_time' => '15-20 days', 'service_fee' => 35000, 'required_documents' => ['Passport', 'CNIC', 'Bank statements (6 months)', 'Employment letter', 'Hotel booking', 'Travel itinerary']],
        ];

        foreach ($services as $service) {
            VisaService::create($service);
        }
    }

    private function seedHotels(): void
    {
        $hotels = [
            ['name' => 'Swissotel Al Maqam Makkah', 'slug' => 'swissotel-al-maqam-makkah', 'city' => 'Makkah', 'country' => 'Saudi Arabia', 'star_rating' => 5, 'price_per_night' => 45000],
            ['name' => 'Oberoi Madinah', 'slug' => 'oberoi-madinah', 'city' => 'Madinah', 'country' => 'Saudi Arabia', 'star_rating' => 5, 'price_per_night' => 38000],
            ['name' => 'Burj Al Arab Dubai', 'slug' => 'burj-al-arab-dubai', 'city' => 'Dubai', 'country' => 'UAE', 'star_rating' => 5, 'price_per_night' => 120000],
            ['name' => 'Hilton Istanbul Bosphorus', 'slug' => 'hilton-istanbul-bosphorus', 'city' => 'Istanbul', 'country' => 'Turkey', 'star_rating' => 5, 'price_per_night' => 28000],
            ['name' => 'Serena Hotel Islamabad', 'slug' => 'serena-hotel-islamabad', 'city' => 'Islamabad', 'country' => 'Pakistan', 'star_rating' => 5, 'price_per_night' => 22000],
        ];

        foreach ($hotels as $hotel) {
            $hotel['description'] = "Luxury accommodation in {$hotel['city']}, {$hotel['country']}.";
            Hotel::create($hotel);
        }
    }

    private function seedSettings(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'WAFA Travel & Tour'],
            ['key' => 'tagline', 'value' => 'Your Trusted Journey Partner'],
            ['key' => 'phone', 'value' => '+92-300-1234567'],
            ['key' => 'whatsapp', 'value' => '+92-300-1234567'],
            ['key' => 'email', 'value' => 'info@wafatravel.com'],
            ['key' => 'address', 'value' => '123 Main Boulevard, Gulberg III, Lahore, Pakistan'],
            ['key' => 'license_no', 'value' => 'BEOE-LHR-2024-XXXX'],
            ['key' => 'years_experience', 'value' => '15'],
            ['key' => 'happy_travelers', 'value' => '50000'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
