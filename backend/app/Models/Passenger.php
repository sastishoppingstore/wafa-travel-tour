<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Passenger extends Model
{
    protected $fillable = [
        'flight_booking_id', 'first_name', 'last_name', 'passport_number',
        'cnic', 'date_of_birth', 'gender', 'nationality', 'phone', 'email', 'passenger_type',
    ];

    protected $casts = ['date_of_birth' => 'date'];
    public function booking() { return $this->belongsTo(FlightBooking::class, 'flight_booking_id'); }
}
