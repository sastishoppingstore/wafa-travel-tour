<?php

namespace App\Services;

use Carbon\Carbon;

/**
 * Flight Search Service — Mock Provider
 * 
 * Implements FlightProviderInterface for development.
 * Replace with Amadeus, Sabre, or local GDS integration for production.
 */
class FlightSearchService
{
    private array $airlines = [
        ['code' => 'PK', 'name' => 'Pakistan International Airlines', 'logo' => '/images/airlines/pia.png'],
        ['code' => 'EK', 'name' => 'Emirates', 'logo' => '/images/airlines/emirates.png'],
        ['code' => 'QR', 'name' => 'Qatar Airways', 'logo' => '/images/airlines/qatar.png'],
        ['code' => 'SV', 'name' => 'Saudia', 'logo' => '/images/airlines/saudia.png'],
        ['code' => 'TK', 'name' => 'Turkish Airlines', 'logo' => '/images/airlines/turkish.png'],
        ['code' => 'FZ', 'name' => 'FlyDubai', 'logo' => '/images/airlines/flydubai.png'],
        ['code' => 'EY', 'name' => 'Etihad Airways', 'logo' => '/images/airlines/etihad.png'],
    ];

    public function search(array $params): array
    {
        $results = [];
        $numResults = rand(5, 12);

        for ($i = 0; $i < $numResults; $i++) {
            $airline = $this->airlines[array_rand($this->airlines)];
            $departDate = Carbon::parse($params['depart_date']);
            $departHour = rand(0, 23);
            $departMin = rand(0, 59) ;
            $flightDuration = rand(2, 14); // hours
            $stops = rand(0, 2);

            $departure = $departDate->copy()->setTime($departHour, $departMin);
            $arrival = $departure->copy()->addHours($flightDuration)->addMinutes(rand(0, 59));

            $basePrice = match ($params['cabin_class'] ?? 'economy') {
                'business' => rand(180000, 450000),
                'first' => rand(350000, 800000),
                default => rand(35000, 180000),
            };

            $price = $basePrice + ($stops * 5000);

            $results[] = [
                'id' => $i + 1,
                'flight_number' => $airline['code'] . rand(100, 9999),
                'airline' => $airline['name'],
                'airline_code' => $airline['code'],
                'airline_logo' => $airline['logo'],
                'departure_airport' => strtoupper($params['from']),
                'arrival_airport' => strtoupper($params['to']),
                'departure_city' => $params['from'],
                'arrival_city' => $params['to'],
                'departure_time' => $departure->toIso8601String(),
                'arrival_time' => $arrival->toIso8601String(),
                'duration' => $this->formatDuration($flightDuration * 60 + rand(0, 59)),
                'stops' => $stops,
                'layovers' => $this->generateLayovers($stops),
                'cabin_class' => $params['cabin_class'] ?? 'economy',
                'price' => $price,
                'currency' => 'PKR',
                'available_seats' => rand(1, 50),
                'is_refundable' => rand(0, 1) === 1,
                'provider' => 'mock',
            ];
        }

        // Sort by price by default
        usort($results, fn($a, $b) => $a['price'] <=> $b['price']);

        return $results;
    }

    private function formatDuration(int $minutes): string
    {
        $hours = floor($minutes / 60);
        $mins = $minutes % 60;
        return "{$hours}h {$mins}m";
    }

    private function generateLayovers(int $stops): array
    {
        $layoverAirports = ['DXB', 'DOH', 'IST', 'JED', 'BAH', 'KHI', 'LHE'];
        $layovers = [];

        for ($i = 0; $i < $stops; $i++) {
            $layovers[] = [
                'airport' => $layoverAirports[array_rand($layoverAirports)],
                'duration' => rand(1, 6) . 'h ' . rand(0, 59) . 'm',
            ];
        }

        return $layovers;
    }
}
