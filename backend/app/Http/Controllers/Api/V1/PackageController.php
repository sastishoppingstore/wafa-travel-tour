<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Package::active();

        if ($request->filled('category')) {
            $query->category($request->category);
        }
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }
        if ($request->filled('tier')) {
            $query->where('tier', $request->tier);
        }
        if ($request->boolean('featured')) {
            $query->featured();
        }

        $packages = $query->orderByDesc('is_featured')->orderBy('sort_order')->paginate(12);
        return response()->json($packages);
    }

    public function show(string $slug): JsonResponse
    {
        $package = Package::where('slug', $slug)->with('itineraries')->firstOrFail();
        return response()->json(['data' => $package]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|in:hajj,umrah,international,domestic',
            'tier' => 'in:economy,standard,premium',
            'destination' => 'required|string',
            'duration_days' => 'required|integer|min:1',
            'duration_nights' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        $validated['slug'] = str()->slug($validated['title']) . '-' . str()->random(6);
        $package = Package::create($validated);

        return response()->json(['message' => 'Package created', 'data' => $package], 201);
    }
}
