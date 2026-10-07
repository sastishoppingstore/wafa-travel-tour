<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('country');
            $table->string('city')->nullable();
            $table->string('category'); // Construction, Hospitality, Drivers, etc.
            $table->decimal('salary_min', 10, 2)->nullable();
            $table->decimal('salary_max', 10, 2)->nullable();
            $table->string('salary_currency', 3)->default('USD');
            $table->string('salary_period')->default('monthly');
            $table->integer('experience_years')->default(0);
            $table->string('education')->nullable();
            $table->string('language_required')->nullable();
            $table->integer('positions_available')->default(1);
            $table->text('requirements')->nullable();
            $table->text('benefits')->nullable();
            $table->date('deadline')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('job_id')->constrained()->cascadeOnDelete();
            $table->string('full_name');
            $table->integer('age');
            $table->string('cnic');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('passport_number')->nullable();
            $table->enum('passport_status', ['valid', 'expired', 'not_available'])->default('not_available');
            $table->integer('experience_years')->default(0);
            $table->text('experience_details')->nullable();
            $table->string('preferred_country')->nullable();
            $table->string('preferred_job')->nullable();
            $table->string('cv_path')->nullable();
            $table->string('passport_path')->nullable();
            $table->json('documents')->nullable();
            $table->enum('status', [
                'pending', 'under_review', 'documents_verified',
                'interview_scheduled', 'interview_passed',
                'medical_pending', 'medical_passed',
                'visa_processing', 'visa_approved',
                'protector_issued', 'flight_booked', 'deployed',
                'rejected', 'withdrawn'
            ])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('job_application_status_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_application_id')->constrained()->cascadeOnDelete();
            $table->string('from_status')->nullable();
            $table->string('to_status');
            $table->text('notes')->nullable();
            $table->foreignId('changed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('notification_sent')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_application_status_logs');
        Schema::dropIfExists('job_applications');
        Schema::dropIfExists('jobs');
    }
};
