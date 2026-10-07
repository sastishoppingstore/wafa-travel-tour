<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
            'service_type' => 'nullable|string',
        ]);

        $validated['user_id'] = $request->user()?->id;

        $enquiry = Enquiry::create($validated);

        // TODO: Send notification email to admin
        // TODO: Send confirmation email to user

        return response()->json([
            'message' => 'Your message has been sent successfully. We will get back to you within 24 hours.',
            'data' => $enquiry,
        ], 201);
    }

    public function newsletter(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'name' => 'nullable|string|max:255',
        ]);

        $subscriber = NewsletterSubscriber::updateOrCreate(
            ['email' => $validated['email']],
            ['name' => $validated['name'] ?? null, 'is_subscribed' => true]
        );

        return response()->json([
            'message' => 'Successfully subscribed to our newsletter!',
        ]);
    }
}
