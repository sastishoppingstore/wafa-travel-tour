<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Payment extends Model
{
    protected $fillable = ['user_id', 'reference', 'payable_type', 'payable_id', 'amount', 'currency', 'method', 'status', 'proof_path', 'transaction_id', 'notes', 'approved_at', 'approved_by'];
    protected $casts = ['amount' => 'decimal:2', 'approved_at' => 'datetime'];
    public function payable() { return $this->morphTo(); }
}
