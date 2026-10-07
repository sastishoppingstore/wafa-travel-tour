<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Flight extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'flight_number', 'airline', 'airline_logo', 'departure_airport', 'arrival_airport',
        'departure_city', 'arrival_city', 'departure_time', 'arrival_time', 'duration',
        'stops', 'layovers', 'cabin_class', 'price', 'currency', 'available_seats',
        'is_refundable', 'provider', 'provider_id',
    ];

    protected $casts = [
        'departure_time' => 'datetime',
        'arrival_time' => 'datetime',
        'layovers' => 'array',
        'price' => 'decimal:2',
        'is_refundable' => 'boolean',
    ];
}
