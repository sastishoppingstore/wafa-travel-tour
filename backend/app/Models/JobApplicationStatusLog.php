<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplicationStatusLog extends Model
{
    protected $fillable = ['job_application_id', 'from_status', 'to_status', 'notes', 'changed_by', 'notification_sent'];
    public function application() { return $this->belongsTo(JobApplication::class); }
}
