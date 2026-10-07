<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobApplication extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id', 'job_id', 'full_name', 'age', 'cnic', 'phone', 'email',
        'passport_number', 'passport_status', 'experience_years', 'experience_details',
        'preferred_country', 'preferred_job', 'cv_path', 'passport_path',
        'documents', 'status', 'admin_notes',
    ];

    protected $casts = ['documents' => 'array'];

    public function user() { return $this->belongsTo(User::class); }
    public function job() { return $this->belongsTo(Job::class); }
    public function statusLogs() { return $this->hasMany(JobApplicationStatusLog::class)->orderBy('created_at'); }
}
