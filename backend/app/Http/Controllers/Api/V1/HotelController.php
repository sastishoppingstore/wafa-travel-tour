<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $hotels = Hotel::where('is_active', true)
            ->when($request->city, fn($q) => $q->where('city', $request->city))
            ->paginate(12);
        return response()->json($hotels);
    }

    public function show(string $slug): JsonResponse
    {
        $hotel = Hotel::where('slug', $slug)->firstOrFail();
        return response()->json(['data' => $hotel]);
    }

    public function enquire(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'hotel_id' => 'nullable|exists:hotels,id',
            'full_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'check_in' => 'required|date',
            'check_out' => 'required|date|after:check_in',
            'guests' => 'integer|min:1',
            'rooms' => 'integer|min:1',
        ]);
        return response()->json(['message' => 'Enquiry submitted', 'data' => $validated], 201);
    }
}
