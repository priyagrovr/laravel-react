<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    protected $table = 'assessments';

    protected $fillable = [
        'candidate_id',
        'scheduled_at',
    ];
    protected $casts = [
        'scheduled_at' => 'datetime',
    ];
    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }
    public function responses()
    {
        return $this->hasMany(Response::class);
    }
}
