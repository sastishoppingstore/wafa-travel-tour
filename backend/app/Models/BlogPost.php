<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class BlogPost extends Model
{
    use SoftDeletes;
    protected $fillable = ['title', 'slug', 'excerpt', 'content', 'featured_image', 'category', 'tags', 'author_id', 'is_published', 'published_at', 'views_count'];
    protected $casts = ['tags' => 'array', 'is_published' => 'boolean', 'published_at' => 'datetime'];
    public function author() { return $this->belongsTo(User::class, 'author_id'); }
    public function scopePublished($q) { return $q->where('is_published', true); }
}
