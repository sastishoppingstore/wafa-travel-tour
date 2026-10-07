<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Enquiry extends Model
{
    protected $fillable = ['user_id', 'name', 'email', 'phone', 'subject', 'message', 'service_type', 'status', 'admin_response'];
}
