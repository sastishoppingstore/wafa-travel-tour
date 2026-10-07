<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Job extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'description', 'country', 'city', 'category',
        'salary_min', 'salary_max', 'salary_currency', 'salary_period',
        'experience_years', 'education', 'language_required',
        'positions_available', 'requirements', 'benefits',
        'deadline', 'is_active', 'is_featured',
    ];

    protected $casts = [
        'salary_min' => 'decimal:2',
        'salary_max' => 'decimal:2',
        'deadline' => 'date',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}
