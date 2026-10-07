<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Testimonial extends Model
{
    protected $fillable = ['name', 'location', 'content', 'rating', 'service_type', 'photo', 'is_approved', 'sort_order'];
    protected $casts = ['is_approved' => 'boolean'];
    public function scopeApproved($q) { return $q->where('is_approved', true); }
}
