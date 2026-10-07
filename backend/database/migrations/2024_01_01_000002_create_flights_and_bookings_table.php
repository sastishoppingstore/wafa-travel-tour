<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Flight searches cache
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->string('flight_number');
            $table->string('airline');
            $table->string('airline_logo')->nullable();
            $table->string('departure_airport', 10);
            $table->string('arrival_airport', 10);
            $table->string('departure_city');
            $table->string('arrival_city');
            $table->dateTime('departure_time');
            $table->dateTime('arrival_time');
            $table->string('duration');
            $table->integer('stops')->default(0);
            $table->json('layovers')->nullable();
            $table->enum('cabin_class', ['economy', 'business', 'first'])->default('economy');
            $table->decimal('price', 10, 2);
            $table->string('currency', 3)->default('PKR');
            $table->integer('available_seats')->default(0);
            $table->boolean('is_refundable')->default(false);
            $table->string('provider')->nullable(); // amadeus, sabre, mock
            $table->string('provider_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // Flight bookings
        Schema::create('flight_bookings', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique(); // WAFA-2026-XXXXX
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('flight_id')->constrained()->cascadeOnDelete();
            $table->enum('trip_type', ['one_way', 'round_trip', 'multi_city'])->default('one_way');
            $table->foreignId('return_flight_id')->nullable()->constrained('flights')->nullOnDelete();
            $table->decimal('total_price', 12, 2);
            $table->string('currency', 3)->default('PKR');
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending');
            $table->enum('payment_status', ['pending', 'paid', 'refunded', 'failed'])->default('pending');
            $table->string('payment_method')->nullable();
            $table->string('payment_proof')->nullable();
            $table->text('notes')->nullable();
            $table->json('passengers')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('passengers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('flight_booking_id')->constrained()->cascadeOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('passport_number')->nullable();
            $table->string('cnic')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('nationality')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->enum('passenger_type', ['adult', 'child', 'infant'])->default('adult');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('passengers');
        Schema::dropIfExists('flight_bookings');
        Schema::dropIfExists('flights');
    }
};
