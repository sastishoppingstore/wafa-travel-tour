<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\VisaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VisaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $services = VisaService::where('is_active', true)->get();
        return response()->json(['data' => $services]);
    }

    public function apply(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'visa_service_id' => 'required|exists:visa_services,id',
            'full_name' => 'required|string',
            'passport_number' => 'required|string',
            'phone' => 'required|string',
            'email' => 'nullable|email',
        ]);
        return response()->json(['message' => 'Visa application submitted', 'data' => $validated], 201);
    }
}
