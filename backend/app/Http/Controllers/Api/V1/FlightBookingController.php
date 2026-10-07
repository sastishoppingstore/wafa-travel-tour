<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FlightBooking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FlightBookingController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'flight_id' => 'required|exists:flights,id',
            'trip_type' => 'in:one_way,round_trip,multi_city',
            'passengers' => 'required|array|min:1',
            'passengers.*.first_name' => 'required|string',
            'passengers.*.last_name' => 'required|string',
            'passengers.*.passport_number' => 'nullable|string',
        ]);

        $reference = 'WAFA-' . date('Y') . '-' . str()->upper(str()->random(5));

        $booking = FlightBooking::create([
            'reference' => $reference,
            'user_id' => $request->user()->id,
            'flight_id' => $validated['flight_id'],
            'trip_type' => $validated['trip_type'] ?? 'one_way',
            'total_price' => 0, // calculated from flight
            'passengers' => $validated['passengers'],
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Booking created successfully',
            'data' => $booking,
            'reference' => $reference,
        ], 201);
    }

    public function myBookings(Request $request): JsonResponse
    {
        $bookings = $request->user()->flightBookings()->with('flight')->orderByDesc('created_at')->get();
        return response()->json(['data' => $bookings]);
    }

    public function show(string $reference): JsonResponse
    {
        $booking = FlightBooking::where('reference', $reference)->with('flight')->firstOrFail();
        return response()->json(['data' => $booking]);
    }
}
