<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class VisaService extends Model
{
    protected $fillable = ['country', 'visa_type', 'description', 'required_documents', 'processing_time', 'service_fee', 'currency', 'is_active'];
    protected $casts = ['required_documents' => 'array', 'service_fee' => 'decimal:2', 'is_active' => 'boolean'];
}
