<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FlightBooking;
use App\Models\JobApplication;
use App\Models\Enquiry;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        return response()->json([
            'total_users' => User::count(),
            'total_bookings' => FlightBooking::count(),
            'pending_bookings' => FlightBooking::where('status', 'pending')->count(),
            'total_applications' => JobApplication::count(),
            'pending_applications' => JobApplication::where('status', 'pending')->count(),
            'total_enquiries' => Enquiry::where('status', 'new')->count(),
            'revenue_this_month' => FlightBooking::where('payment_status', 'paid')
                ->whereMonth('created_at', now()->month)->sum('total_price'),
        ]);
    }
}
