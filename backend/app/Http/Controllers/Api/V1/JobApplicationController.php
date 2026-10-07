<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\JobApplicationStatusLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JobApplicationController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'job_id' => 'required|exists:jobs,id',
            'full_name' => 'required|string|max:255',
            'age' => 'required|integer|min:18|max:60',
            'cnic' => 'required|string|size:13',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email',
            'passport_number' => 'nullable|string|max:50',
            'passport_status' => 'in:valid,expired,not_available',
            'experience_years' => 'integer|min:0',
            'experience_details' => 'nullable|string',
            'preferred_country' => 'nullable|string',
            'preferred_job' => 'nullable|string',
            'cv' => 'required|file|mimes:pdf,doc,docx|max:5120',
            'passport_copy' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'other_documents.*' => 'file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        // Handle file uploads
        $cvPath = $request->file('cv')->store('applications/cv', 'public');
        $passportPath = null;
        $documents = [];

        if ($request->hasFile('passport_copy')) {
            $passportPath = $request->file('passport_copy')->store('applications/passports', 'public');
        }

        if ($request->hasFile('other_documents')) {
            foreach ($request->file('other_documents') as $doc) {
                $documents[] = $doc->store('applications/documents', 'public');
            }
        }

        $application = JobApplication::create([
            'user_id' => $request->user()?->id,
            'job_id' => $validated['job_id'],
            'full_name' => $validated['full_name'],
            'age' => $validated['age'],
            'cnic' => $validated['cnic'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'passport_number' => $validated['passport_number'] ?? null,
            'passport_status' => $validated['passport_status'] ?? 'not_available',
            'experience_years' => $validated['experience_years'] ?? 0,
            'experience_details' => $validated['experience_details'] ?? null,
            'preferred_country' => $validated['preferred_country'] ?? null,
            'preferred_job' => $validated['preferred_job'] ?? null,
            'cv_path' => $cvPath,
            'passport_path' => $passportPath,
            'documents' => $documents,
            'status' => 'pending',
        ]);

        // Create initial status log
        JobApplicationStatusLog::create([
            'job_application_id' => $application->id,
            'from_status' => null,
            'to_status' => 'pending',
            'notes' => 'Application submitted',
        ]);

        // TODO: Send notification (email/SMS/WhatsApp)

        return response()->json([
            'message' => 'Application submitted successfully! Our team will review your application and contact you soon.',
            'data' => $application,
        ], 201);
    }

    public function myApplications(Request $request): JsonResponse
    {
        $applications = $request->user()
            ->jobApplications()
            ->with('job:id,title,country,category')
            ->with('statusLogs')
            ->orderByDesc('created_at')
            ->get();

        return response()->json(['data' => $applications]);
    }

    public function showApplication(int $id): JsonResponse
    {
        $application = auth()->user()
            ->jobApplications()
            ->with('job', 'statusLogs')
            ->findOrFail($id);

        return response()->json(['data' => $application]);
    }

    public function adminIndex(Request $request): JsonResponse
    {
        $query = JobApplication::with('job:id,title,country');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('job_id')) {
            $query->where('job_id', $request->job_id);
        }
        if ($request->filled('search')) {
            $query->where('full_name', 'like', '%' . $request->search . '%');
        }

        $applications = $query->with('statusLogs')
            ->orderByDesc('created_at')
            ->paginate($request->get('per_page', 20));

        return response()->json($applications);
    }

    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,under_review,documents_verified,interview_scheduled,interview_passed,medical_pending,medical_passed,visa_processing,visa_approved,protector_issued,flight_booked,deployed,rejected,withdrawn',
            'notes' => 'nullable|string',
        ]);

        $application = JobApplication::findOrFail($id);
        $oldStatus = $application->status;

        $application->update(['status' => $validated['status']]);

        // Log status change
        JobApplicationStatusLog::create([
            'job_application_id' => $application->id,
            'from_status' => $oldStatus,
            'to_status' => $validated['status'],
            'notes' => $validated['notes'] ?? null,
            'changed_by' => $request->user()->id,
        ]);

        // TODO: Send notification to applicant

        return response()->json([
            'message' => 'Application status updated',
            'data' => $application->fresh()->load('statusLogs'),
        ]);
    }
}
