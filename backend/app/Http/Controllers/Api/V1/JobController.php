<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Job::where('is_active', true);

        // Filters
        if ($request->filled('country')) {
            $query->where('country', $request->country);
        }
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }
        if ($request->filled('experience')) {
            $query->where('experience_years', '<=', $request->experience);
        }

        $jobs = $query->orderByDesc('is_featured')
            ->orderByDesc('created_at')
            ->paginate($request->get('per_page', 12));

        return response()->json($jobs);
    }

    public function show(string $slug): JsonResponse
    {
        $job = Job::where('slug', $slug)->where('is_active', true)->firstOrFail();

        return response()->json(['data' => $job]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'country' => 'required|string|max:100',
            'city' => 'nullable|string|max:100',
            'category' => 'required|string|max:100',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0',
            'salary_currency' => 'string|max:3',
            'experience_years' => 'integer|min:0',
            'education' => 'nullable|string',
            'positions_available' => 'integer|min:1',
            'requirements' => 'nullable|string',
            'benefits' => 'nullable|string',
            'deadline' => 'nullable|date|after:today',
            'is_featured' => 'boolean',
        ]);

        $validated['slug'] = str()->slug($validated['title']) . '-' . str()->random(6);

        $job = Job::create($validated);

        return response()->json([
            'message' => 'Job created successfully',
            'data' => $job,
        ], 201);
    }
}
