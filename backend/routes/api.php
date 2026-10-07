<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\PackageController;
use App\Http\Controllers\Api\V1\FlightController;
use App\Http\Controllers\Api\V1\FlightBookingController;
use App\Http\Controllers\Api\V1\JobController;
use App\Http\Controllers\Api\V1\JobApplicationController;
use App\Http\Controllers\Api\V1\VisaController;
use App\Http\Controllers\Api\V1\HotelController;
use App\Http\Controllers\Api\V1\BlogController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\TestimonialController;
use App\Http\Controllers\Api\V1\FaqController;
use App\Http\Controllers\Api\V1\DashboardController;

/*
|--------------------------------------------------------------------------
| API V1 Routes — WAFA Travel & Tour
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // ========================================
    // PUBLIC ROUTES (No Auth Required)
    // ========================================

    // Auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
    Route::get('/auth/google/redirect', [AuthController::class, 'googleRedirect']);
    Route::get('/auth/google/callback', [AuthController::class, 'googleCallback']);

    // Packages & Tours
    Route::get('/packages', [PackageController::class, 'index']);
    Route::get('/packages/{slug}', [PackageController::class, 'show']);

    // Flights
    Route::post('/flights/search', [FlightController::class, 'search']);

    // Jobs
    Route::get('/jobs', [JobController::class, 'index']);
    Route::get('/jobs/{slug}', [JobController::class, 'show']);
    Route::post('/jobs/apply', [JobApplicationController::class, 'store']);

    // Visa
    Route::get('/visa-services', [VisaController::class, 'index']);
    Route::post('/visa/apply', [VisaController::class, 'apply']);

    // Hotels
    Route::get('/hotels', [HotelController::class, 'index']);
    Route::get('/hotels/{slug}', [HotelController::class, 'show']);
    Route::post('/hotels/enquire', [HotelController::class, 'enquire']);

    // Blog
    Route::get('/blog', [BlogController::class, 'index']);
    Route::get('/blog/{slug}', [BlogController::class, 'show']);

    // Testimonials
    Route::get('/testimonials', [TestimonialController::class, 'index']);

    // FAQ
    Route::get('/faqs', [FaqController::class, 'index']);

    // Contact
    Route::post('/contact', [ContactController::class, 'store']);
    Route::post('/newsletter/subscribe', [ContactController::class, 'newsletter']);

    // ========================================
    // AUTHENTICATED ROUTES
    // ========================================
    Route::middleware('auth:sanctum')->group(function () {

        // Auth
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/user', [AuthController::class, 'user']);
        Route::put('/auth/profile', [AuthController::class, 'updateProfile']);

        // Flight Bookings
        Route::post('/flights/book', [FlightBookingController::class, 'store']);
        Route::get('/my/bookings', [FlightBookingController::class, 'myBookings']);
        Route::get('/my/bookings/{reference}', [FlightBookingController::class, 'show']);

        // Job Applications
        Route::get('/my/applications', [JobApplicationController::class, 'myApplications']);
        Route::get('/my/applications/{id}', [JobApplicationController::class, 'showApplication']);

        // Payments
        Route::post('/payments/upload-proof', [FlightBookingController::class, 'uploadPaymentProof']);

        // Package Enquiry/Booking
        Route::post('/packages/enquire', [PackageController::class, 'enquire']);
        Route::post('/packages/book', [PackageController::class, 'book']);
    });

    // ========================================
    // ADMIN ROUTES
    // ========================================
    Route::middleware(['auth:sanctum', 'role:admin|staff'])->prefix('admin')->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'stats']);

        // Bookings Management
        Route::get('/bookings', [FlightBookingController::class, 'adminIndex']);
        Route::put('/bookings/{id}/status', [FlightBookingController::class, 'updateStatus']);

        // Payments Approval
        Route::get('/payments', [FlightBookingController::class, 'paymentsIndex']);
        Route::put('/payments/{id}/approve', [FlightBookingController::class, 'approvePayment']);
        Route::put('/payments/{id}/reject', [FlightBookingController::class, 'rejectPayment']);

        // Job Applications
        Route::get('/applications', [JobApplicationController::class, 'adminIndex']);
        Route::put('/applications/{id}/status', [JobApplicationController::class, 'updateStatus']);

        // CRUD endpoints
        Route::apiResource('/packages', PackageController::class)->except(['index', 'show']);
        Route::apiResource('/jobs', JobController::class)->except(['index', 'show']);

        // Testimonials, Blog, FAQ, Settings management
        // ... (expanded in implementation)
    });
});
