<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FlightBooking extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'reference', 'user_id', 'flight_id', 'trip_type', 'return_flight_id',
        'total_price', 'currency', 'status', 'payment_status', 'payment_method',
        'payment_proof', 'notes', 'passengers', 'paid_at', 'confirmed_at',
    ];

    protected $casts = [
        'total_price' => 'decimal:2',
        'passengers' => 'array',
        'paid_at' => 'datetime',
        'confirmed_at' => 'datetime',
    ];

    public function user() { return $this->belongsTo(User::class); }
    public function flight() { return $this->belongsTo(Flight::class); }
    public function passengerRecords() { return $this->hasMany(Passenger::class); }
}
