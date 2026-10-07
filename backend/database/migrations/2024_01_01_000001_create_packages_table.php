<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->text('short_description')->nullable();
            $table->enum('category', ['hajj', 'umrah', 'international', 'domestic']);
            $table->enum('tier', ['economy', 'standard', 'premium'])->default('standard');
            $table->string('destination');
            $table->integer('duration_days');
            $table->integer('duration_nights');
            $table->decimal('price', 12, 2);
            $table->decimal('original_price', 12, 2)->nullable();
            $table->string('currency', 3)->default('PKR');
            $table->json('inclusions')->nullable();
            $table->json('exclusions')->nullable();
            $table->json('images')->nullable();
            $table->string('hotel_name')->nullable();
            $table->string('hotel_distance_from_haram')->nullable();
            $table->boolean('flights_included')->default(true);
            $table->boolean('visa_included')->default(true);
            $table->boolean('transport_included')->default(true);
            $table->boolean('ziyarat_included')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->integer('max_guests')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('package_itineraries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('package_id')->constrained()->cascadeOnDelete();
            $table->integer('day_number');
            $table->string('title');
            $table->text('description')->nullable();
            $table->json('meals')->nullable();
            $table->json('activities')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('package_itineraries');
        Schema::dropIfExists('packages');
    }
};
