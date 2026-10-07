<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'description', 'short_description', 'category', 'tier',
        'destination', 'duration_days', 'duration_nights', 'price', 'original_price',
        'currency', 'inclusions', 'exclusions', 'images', 'hotel_name',
        'hotel_distance_from_haram', 'flights_included', 'visa_included',
        'transport_included', 'ziyarat_included', 'is_featured', 'is_active',
        'sort_order', 'max_guests',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'inclusions' => 'array',
        'exclusions' => 'array',
        'images' => 'array',
        'flights_included' => 'boolean',
        'visa_included' => 'boolean',
        'transport_included' => 'boolean',
        'ziyarat_included' => 'boolean',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function itineraries()
    {
        return $this->hasMany(PackageItinerary::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeCategory($query, string $category)
    {
        return $query->where('category', $category);
    }
}
