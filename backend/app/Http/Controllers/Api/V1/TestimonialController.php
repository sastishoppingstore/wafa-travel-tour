<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;

class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::approved()->orderBy('sort_order')->get();
        return response()->json(['data' => $testimonials]);
    }
}
EOF

cat > /home/user/wafa-travel/backend/app/Http/Controllers/Api/V1/FaqController.php << 'PHPEOF'
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;

class FaqController extends Controller
{
    public function index(): JsonResponse
    {
        $faqs = Faq::active()->orderBy('sort_order')->get();
        return response()->json(['data' => $faqs]);
    }
}
EOF

echo "All controllers created"
