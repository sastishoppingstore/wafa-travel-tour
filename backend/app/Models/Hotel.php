<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Hotel extends Model
{
    protected $fillable = ['name', 'slug', 'city', 'country', 'star_rating', 'description', 'amenities', 'images', 'price_per_night', 'currency', 'is_active'];
    protected $casts = ['amenities' => 'array', 'images' => 'array', 'price_per_night' => 'decimal:2', 'is_active' => 'boolean'];
}
