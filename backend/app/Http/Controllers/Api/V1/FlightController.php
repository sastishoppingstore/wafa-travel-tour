<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\FlightSearchService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    protected FlightSearchService $flightService;

    public function __construct(FlightSearchService $flightService)
    {
        $this->flightService = $flightService;
    }

    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'from' => 'required|string|max:10',
            'to' => 'required|string|max:10',
            'depart_date' => 'required|date|after_or_equal:today',
            'return_date' => 'nullable|date|after:depart_date',
            'trip_type' => 'in:one_way,round_trip,multi_city',
            'passengers' => 'integer|min:1|max:9',
            'cabin_class' => 'in:economy,business,first',
        ]);

        $results = $this->flightService->search($validated);

        return response()->json([
            'data' => $results,
            'meta' => [
                'total' => count($results),
                'filters' => [
                    'airlines' => collect($results)->pluck('airline')->unique()->values(),
                    'stops' => collect($results)->pluck('stops')->unique()->values(),
                    'price_range' => [
                        'min' => collect($results)->min('price'),
                        'max' => collect($results)->max('price'),
                    ],
                ],
            ],
        ]);
    }
}
